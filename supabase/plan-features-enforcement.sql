-- ═══════════════════════════════════════════════════════════════
-- Metrico — server-side plan feature checks (align with app FEATURE_MIN_PLAN)
-- Run AFTER plan-enforcement.sql and demo-readonly.sql
-- Patches upsert_owner_portal to require "plus" or higher
-- ═══════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION public.plan_rank(p_plan text)
RETURNS int
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT CASE lower(trim(coalesce(p_plan, 'start')))
    WHEN 'start' THEN 0
    WHEN 'plus' THEN 1
    WHEN 'pro' THEN 2
    WHEN 'ark' THEN 3
    ELSE 0
  END;
$$;

CREATE OR REPLACE FUNCTION public.min_plan_for_feature(p_feature text)
RETURNS text
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT CASE lower(trim(coalesce(p_feature, '')))
    WHEN 'backup_restore' THEN 'plus'
    WHEN 'pdf_export' THEN 'plus'
    WHEN 'finance_transfer' THEN 'plus'
    WHEN 'fab_accounts' THEN 'plus'
    WHEN 'chat' THEN 'plus'
    WHEN 'map' THEN 'plus'
    WHEN 'owner_portal' THEN 'plus'
    WHEN 'project_maps' THEN 'plus'
    WHEN 'accounting' THEN 'pro'
    WHEN 'fab_flow' THEN 'pro'
    WHEN 'fab_checks' THEN 'pro'
    WHEN 'kml_export' THEN 'pro'
    WHEN 'inventory' THEN 'pro'
    WHEN 'tax' THEN 'pro'
    WHEN 'contracts' THEN 'pro'
    WHEN 'energy' THEN 'ark'
    WHEN 'takeoff' THEN 'ark'
    ELSE 'start'
  END;
$$;

CREATE OR REPLACE FUNCTION public.assert_plan_feature(p_feature text)
RETURNS void
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid uuid := auth.uid();
  v_plan text;
  v_min text;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not authenticated';
  END IF;
  IF public.is_demo_user(v_uid) THEN
    RAISE EXCEPTION 'demo account is read-only';
  END IF;

  v_plan := coalesce(public.effective_user_plan(v_uid), 'start');
  v_min := public.min_plan_for_feature(p_feature);
  IF public.plan_rank(v_plan) < public.plan_rank(v_min) THEN
    RAISE EXCEPTION 'plan feature not available: % requires %', p_feature, v_min;
  END IF;
END;
$$;

CREATE OR REPLACE FUNCTION public.check_plan_feature(p_feature text)
RETURNS void
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  PERFORM public.assert_plan_feature(p_feature);
END;
$$;

REVOKE ALL ON FUNCTION public.assert_plan_feature(text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.check_plan_feature(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.check_plan_feature(text) TO authenticated;

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

  PERFORM public.assert_plan_feature('owner_portal');

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

REVOKE ALL ON FUNCTION public.upsert_owner_portal(TEXT, TEXT, TEXT, JSONB) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.upsert_owner_portal(TEXT, TEXT, TEXT, JSONB) TO authenticated;

NOTIFY pgrst, 'reload schema';
