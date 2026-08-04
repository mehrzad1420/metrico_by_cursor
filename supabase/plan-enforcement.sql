-- ═══════════════════════════════════════════════════════════════
-- Metrico — enforce subscription project limits (server-side)
-- Run AFTER plans.sql and demo-readonly.sql
-- ═══════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION public.effective_user_plan(p_uid uuid DEFAULT auth.uid())
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT CASE
    WHEN p.plan IS NULL OR p.plan = 'start' THEN 'start'
    WHEN p.plan <> 'start'
      AND p.plan_expires_at IS NOT NULL
      AND p.plan_expires_at < now() THEN 'start'
    ELSE p.plan
  END
  FROM public.profiles p
  WHERE p.user_id = p_uid;
$$;

CREATE OR REPLACE FUNCTION public.max_projects_for_plan(p_plan text)
RETURNS int
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT CASE lower(trim(coalesce(p_plan, 'start')))
    WHEN 'start' THEN 1
    WHEN 'plus' THEN 3
    WHEN 'pro' THEN 10
    WHEN 'ark' THEN 999
    ELSE 1
  END;
$$;

CREATE OR REPLACE FUNCTION public.enforce_project_plan_limit()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_plan text;
  v_max int;
  v_count int;
BEGIN
  IF current_setting('metrico.allow_demo_seed', true) = '1' AND public.is_demo_user(NEW.user_id) THEN
    RETURN NEW;
  END IF;

  IF public.is_demo_user(NEW.user_id) THEN
    RAISE EXCEPTION 'demo account is read-only';
  END IF;

  v_plan := coalesce(public.effective_user_plan(NEW.user_id), 'start');
  v_max := public.max_projects_for_plan(v_plan);
  SELECT count(*)::int INTO v_count FROM public.projects WHERE user_id = NEW.user_id;

  IF v_count >= v_max THEN
    RAISE EXCEPTION 'project plan limit exceeded';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS projects_enforce_plan_limit ON public.projects;
CREATE TRIGGER projects_enforce_plan_limit
  BEFORE INSERT ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.enforce_project_plan_limit();

-- Repair broken projects.id default (serial/sequence cast to uuid → 22P02)
ALTER TABLE public.projects
  ALTER COLUMN id SET DEFAULT gen_random_uuid();

-- One-time demo seed (bypasses RLS; only when demo user has zero projects)
CREATE OR REPLACE FUNCTION public.ensure_demo_project_seed(p_name text, p_data jsonb)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid uuid := auth.uid();
  v_id uuid;
  v_name text := trim(coalesce(p_name, ''));
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not authenticated';
  END IF;
  IF NOT public.is_demo_user(v_uid) THEN
    RAISE EXCEPTION 'forbidden';
  END IF;
  IF v_name = '' THEN
    RAISE EXCEPTION 'project name required';
  END IF;

  SELECT id INTO v_id FROM public.projects WHERE user_id = v_uid ORDER BY created_at LIMIT 1;
  IF v_id IS NOT NULL THEN
    RETURN v_id;
  END IF;

  PERFORM set_config('metrico.allow_demo_seed', '1', true);
  -- Explicit id: avoids broken DEFAULT nextval(...)::uuid on some DBs
  INSERT INTO public.projects (id, user_id, name, data)
  VALUES (gen_random_uuid(), v_uid, v_name, coalesce(p_data, '{}'::jsonb))
  RETURNING id INTO v_id;
  PERFORM set_config('metrico.allow_demo_seed', '', true);

  RETURN v_id;
END;
$$;

REVOKE ALL ON FUNCTION public.ensure_demo_project_seed(text, jsonb) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.ensure_demo_project_seed(text, jsonb) TO authenticated;

NOTIFY pgrst, 'reload schema';
