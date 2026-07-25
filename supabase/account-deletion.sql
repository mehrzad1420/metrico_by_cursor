-- ═══════════════════════════════════════════════════════════════
-- Metrico — self-service account deletion (GDPR Art. 17)
-- Run AFTER demo-readonly.sql (uses is_demo_user)
-- ═══════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION public.delete_my_account()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth
AS $$
DECLARE
  v_uid uuid := auth.uid();
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not authenticated';
  END IF;

  IF public.is_demo_user(v_uid) THEN
    RAISE EXCEPTION 'demo account cannot be deleted from the app';
  END IF;

  UPDATE public.activation_codes SET used_by = NULL WHERE used_by = v_uid;
  UPDATE public.plan_codes SET used_by = NULL WHERE used_by = v_uid;
  DELETE FROM public.payment_events WHERE user_id = v_uid;

  DELETE FROM auth.users WHERE id = v_uid;
END;
$$;

REVOKE ALL ON FUNCTION public.delete_my_account() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.delete_my_account() TO authenticated;

COMMENT ON FUNCTION public.delete_my_account IS
  'Removes auth user; ON DELETE CASCADE cleans profiles, projects, portals, messages, feedback.';
