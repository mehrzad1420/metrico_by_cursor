-- Fix: projects.id was IDENTITY (or a sequence cast to uuid), so INSERT got
-- invalid uuid values like "15". Postgres rejects ALTER ... SET DEFAULT on an
-- IDENTITY column (42601) — DROP IDENTITY first, then set gen_random_uuid().
-- Re-run this entire file in Supabase SQL Editor (safe to repeat).

-- Drop identity if present (required before changing default)
ALTER TABLE public.projects ALTER COLUMN id DROP IDENTITY IF EXISTS;

-- Ensure uuid default (not a serial sequence cast)
ALTER TABLE public.projects ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.projects ALTER COLUMN id SET DEFAULT gen_random_uuid();

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
  -- Rely on DEFAULT gen_random_uuid() after DROP IDENTITY above
  INSERT INTO public.projects (user_id, name, data)
  VALUES (v_uid, v_name, coalesce(p_data, '{}'::jsonb))
  RETURNING id INTO v_id;
  PERFORM set_config('metrico.allow_demo_seed', '', true);

  RETURN v_id;
END;
$$;

REVOKE ALL ON FUNCTION public.ensure_demo_project_seed(text, jsonb) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.ensure_demo_project_seed(text, jsonb) TO authenticated;

NOTIFY pgrst, 'reload schema';
