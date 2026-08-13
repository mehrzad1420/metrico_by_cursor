-- ═══════════════════════════════════════════════════════════════
-- Metrico — پنل ابلاغ کار پیمانکار / کارگر / کارمند (crew_portals)
-- پس از owner-portals.sql و demo-readonly.sql در SQL Editor اجرا کنید
-- ═══════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.crew_portals (
  token TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  crew_id TEXT NOT NULL,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS crew_portals_user_id_idx ON public.crew_portals(user_id);
CREATE INDEX IF NOT EXISTS crew_portals_crew_id_idx ON public.crew_portals(user_id, crew_id);

ALTER TABLE public.crew_portals ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.crew_portals TO authenticated;
GRANT ALL ON TABLE public.crew_portals TO service_role;

DROP POLICY IF EXISTS crew_portals_select_own ON public.crew_portals;
CREATE POLICY crew_portals_select_own ON public.crew_portals
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS crew_portals_insert_own ON public.crew_portals;
CREATE POLICY crew_portals_insert_own ON public.crew_portals
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id AND NOT public.is_demo_user());

DROP POLICY IF EXISTS crew_portals_update_own ON public.crew_portals;
CREATE POLICY crew_portals_update_own ON public.crew_portals
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id AND NOT public.is_demo_user())
  WITH CHECK (auth.uid() = user_id AND NOT public.is_demo_user());

DROP POLICY IF EXISTS crew_portals_delete_own ON public.crew_portals;
CREATE POLICY crew_portals_delete_own ON public.crew_portals
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id AND NOT public.is_demo_user());

CREATE OR REPLACE FUNCTION public.get_crew_portal(portal_token TEXT)
RETURNS JSONB
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT payload FROM public.crew_portals WHERE token = portal_token LIMIT 1;
$$;

REVOKE ALL ON FUNCTION public.get_crew_portal(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_crew_portal(TEXT) TO anon, authenticated;

CREATE OR REPLACE FUNCTION public.upsert_crew_portal(
  portal_token TEXT,
  p_crew_id TEXT,
  p_payload JSONB
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid UUID := auth.uid();
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not authenticated';
  END IF;
  IF public.is_demo_user(v_uid) THEN
    RAISE EXCEPTION 'demo account is read-only';
  END IF;

  INSERT INTO public.crew_portals (token, user_id, crew_id, payload, updated_at)
  VALUES (portal_token, v_uid, p_crew_id, coalesce(p_payload, '{}'::jsonb), NOW())
  ON CONFLICT (token) DO UPDATE SET
    crew_id = EXCLUDED.crew_id,
    payload = EXCLUDED.payload,
    updated_at = NOW()
  WHERE public.crew_portals.user_id = v_uid;
END;
$$;

REVOKE ALL ON FUNCTION public.upsert_crew_portal(TEXT, TEXT, JSONB) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.upsert_crew_portal(TEXT, TEXT, JSONB) TO authenticated;

CREATE OR REPLACE FUNCTION public.delete_crew_portal(portal_token TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid UUID := auth.uid();
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not authenticated';
  END IF;
  IF public.is_demo_user(v_uid) THEN
    RAISE EXCEPTION 'demo account is read-only';
  END IF;
  DELETE FROM public.crew_portals WHERE token = portal_token AND user_id = v_uid;
END;
$$;

REVOKE ALL ON FUNCTION public.delete_crew_portal(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.delete_crew_portal(TEXT) TO authenticated;

-- پیمانکار از لینک عمومی: انجام یا رد با دلیل
CREATE OR REPLACE FUNCTION public.respond_crew_task(
  portal_token TEXT,
  p_task_id TEXT,
  p_action TEXT,
  p_reason TEXT DEFAULT ''
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_portal public.crew_portals%ROWTYPE;
  v_action TEXT;
  v_reason TEXT;
  v_new_status TEXT;
  v_tasks JSONB;
  v_found BOOLEAN := false;
BEGIN
  v_action := lower(trim(coalesce(p_action, '')));
  v_reason := trim(coalesce(p_reason, ''));
  IF v_action NOT IN ('done', 'reject') THEN
    RAISE EXCEPTION 'invalid action';
  END IF;
  IF v_action = 'reject' AND length(v_reason) < 2 THEN
    RAISE EXCEPTION 'reason required';
  END IF;
  IF length(v_reason) > 500 THEN
    RAISE EXCEPTION 'reason too long';
  END IF;
  IF length(trim(coalesce(p_task_id, ''))) < 2 THEN
    RAISE EXCEPTION 'invalid task';
  END IF;

  SELECT * INTO v_portal FROM public.crew_portals WHERE token = portal_token LIMIT 1;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'invalid portal token';
  END IF;

  v_new_status := CASE WHEN v_action = 'done' THEN 'done_pending' ELSE 'rejected' END;
  v_tasks := coalesce(v_portal.payload->'tasks', '[]'::jsonb);

  SELECT jsonb_agg(
    CASE
      WHEN elem->>'id' = p_task_id THEN
        CASE
          WHEN coalesce(elem->>'status', 'assigned') IN ('assigned', 'rework') THEN
            elem || jsonb_build_object(
              'status', v_new_status,
              'rejectReason', CASE WHEN v_action = 'reject' THEN v_reason ELSE coalesce(elem->>'rejectReason', '') END,
              'respondedAt', to_char(now() AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"')
            )
          ELSE elem
        END
      ELSE elem
    END
  )
  INTO v_tasks
  FROM jsonb_array_elements(v_tasks) elem;

  SELECT EXISTS (
    SELECT 1 FROM jsonb_array_elements(coalesce(v_portal.payload->'tasks', '[]'::jsonb)) e
    WHERE e->>'id' = p_task_id
  ) INTO v_found;
  IF NOT v_found THEN
    RAISE EXCEPTION 'task not found';
  END IF;

  UPDATE public.crew_portals
  SET payload = jsonb_set(coalesce(payload, '{}'::jsonb), '{tasks}', coalesce(v_tasks, '[]'::jsonb), true),
      updated_at = NOW()
  WHERE token = portal_token;

  RETURN (SELECT payload FROM public.crew_portals WHERE token = portal_token);
END;
$$;

REVOKE ALL ON FUNCTION public.respond_crew_task(TEXT, TEXT, TEXT, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.respond_crew_task(TEXT, TEXT, TEXT, TEXT) TO anon, authenticated;

NOTIFY pgrst, 'reload schema';
