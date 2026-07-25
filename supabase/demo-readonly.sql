-- ═══════════════════════════════════════════════════════════════
-- Metrico — حساب نمایشی فقط-خواندنی (server-side)
-- Run AFTER owner-portal-messages.sql (and product-feedback if used)
-- Blocks writes for demo@metrico.app via RLS + RPC checks
-- ═══════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION public.is_demo_user(p_uid uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, auth
AS $$
  SELECT coalesce(
    (SELECT lower(email) = lower('demo@metrico.app') FROM auth.users WHERE id = p_uid),
    false
  );
$$;

REVOKE ALL ON FUNCTION public.is_demo_user(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_demo_user(uuid) TO authenticated;

-- ─── projects: read own; demo cannot insert/update/delete ───
DROP POLICY IF EXISTS projects_owner_all ON public.projects;
DROP POLICY IF EXISTS projects_select_own ON public.projects;
DROP POLICY IF EXISTS projects_insert_own ON public.projects;
DROP POLICY IF EXISTS projects_update_own ON public.projects;
DROP POLICY IF EXISTS projects_delete_own ON public.projects;

CREATE POLICY projects_select_own ON public.projects
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY projects_insert_own ON public.projects
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id AND NOT public.is_demo_user());

CREATE POLICY projects_update_own ON public.projects
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id AND NOT public.is_demo_user())
  WITH CHECK (auth.uid() = user_id AND NOT public.is_demo_user());

CREATE POLICY projects_delete_own ON public.projects
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id AND NOT public.is_demo_user());

-- ─── owner_portals: same for demo ───
DROP POLICY IF EXISTS owner_portals_owner_all ON public.owner_portals;
DROP POLICY IF EXISTS owner_portals_select_own ON public.owner_portals;
DROP POLICY IF EXISTS owner_portals_insert_own ON public.owner_portals;
DROP POLICY IF EXISTS owner_portals_update_own ON public.owner_portals;
DROP POLICY IF EXISTS owner_portals_delete_own ON public.owner_portals;

CREATE POLICY owner_portals_select_own ON public.owner_portals
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY owner_portals_insert_own ON public.owner_portals
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id AND NOT public.is_demo_user());

CREATE POLICY owner_portals_update_own ON public.owner_portals
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id AND NOT public.is_demo_user())
  WITH CHECK (auth.uid() = user_id AND NOT public.is_demo_user());

CREATE POLICY owner_portals_delete_own ON public.owner_portals
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id AND NOT public.is_demo_user());

-- ─── SECURITY DEFINER RPCs (bypass RLS) — block demo ───
CREATE OR REPLACE FUNCTION public.upsert_owner_portal(
  portal_token TEXT,
  p_project_id TEXT,
  p_unit_id TEXT,
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

  INSERT INTO public.owner_portals (token, user_id, project_id, unit_id, payload, updated_at)
  VALUES (portal_token, v_uid, p_project_id, p_unit_id, coalesce(p_payload, '{}'::jsonb), NOW())
  ON CONFLICT (token) DO UPDATE SET
    project_id = EXCLUDED.project_id,
    unit_id = EXCLUDED.unit_id,
    payload = EXCLUDED.payload,
    updated_at = NOW()
  WHERE public.owner_portals.user_id = v_uid;
END;
$$;

CREATE OR REPLACE FUNCTION public.delete_owner_portal(portal_token TEXT)
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
  DELETE FROM public.owner_portals WHERE token = portal_token AND user_id = v_uid;
END;
$$;

REVOKE ALL ON FUNCTION public.upsert_owner_portal(TEXT, TEXT, TEXT, JSONB) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.delete_owner_portal(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.upsert_owner_portal(TEXT, TEXT, TEXT, JSONB) TO authenticated;
GRANT EXECUTE ON FUNCTION public.delete_owner_portal(TEXT) TO authenticated;

NOTIFY pgrst, 'reload schema';
