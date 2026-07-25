-- ═══════════════════════════════════════════════════════════════
-- Metrico — stricter account deletion (fallback when Edge Function not deployed)
-- Run AFTER account-deletion.sql
-- Client: verifyOtp → mark_account_deletion_verified() → delete_my_account()
-- Prefer Edge Function secure-delete-account (verifies OTP server-side).
-- ═══════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.account_deletion_verified (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  verified_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.account_deletion_verified ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.account_deletion_verified FROM PUBLIC;

CREATE OR REPLACE FUNCTION public.mark_account_deletion_verified()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid uuid := auth.uid();
  v_iat bigint;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not authenticated';
  END IF;

  IF public.is_demo_user(v_uid) THEN
    RAISE EXCEPTION 'demo account cannot be deleted';
  END IF;

  v_iat := nullif(auth.jwt()->>'iat', '')::bigint;
  IF v_iat IS NULL OR to_timestamp(v_iat) < now() - interval '10 minutes' THEN
    RAISE EXCEPTION 'recent login or OTP verification required';
  END IF;

  INSERT INTO public.account_deletion_verified (user_id, verified_at)
  VALUES (v_uid, now())
  ON CONFLICT (user_id) DO UPDATE SET verified_at = excluded.verified_at;
END;
$$;

REVOKE ALL ON FUNCTION public.mark_account_deletion_verified() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.mark_account_deletion_verified() TO authenticated;

CREATE OR REPLACE FUNCTION public.delete_my_account()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth
AS $$
DECLARE
  v_uid uuid := auth.uid();
  v_iat bigint;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not authenticated';
  END IF;

  IF public.is_demo_user(v_uid) THEN
    RAISE EXCEPTION 'demo account cannot be deleted from the app';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM public.account_deletion_verified v
    WHERE v.user_id = v_uid AND v.verified_at > now() - interval '15 minutes'
  ) THEN
    RAISE EXCEPTION 'email verification required; use OTP flow or secure-delete-account function';
  END IF;

  v_iat := nullif(auth.jwt()->>'iat', '')::bigint;
  IF v_iat IS NULL OR to_timestamp(v_iat) < now() - interval '10 minutes' THEN
    RAISE EXCEPTION 'recent authentication required';
  END IF;

  UPDATE public.activation_codes SET used_by = NULL WHERE used_by = v_uid;
  UPDATE public.plan_codes SET used_by = NULL WHERE used_by = v_uid;
  DELETE FROM public.payment_events WHERE user_id = v_uid;
  DELETE FROM public.account_deletion_verified WHERE user_id = v_uid;

  DELETE FROM auth.users WHERE id = v_uid;
END;
$$;

REVOKE ALL ON FUNCTION public.delete_my_account() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.delete_my_account() TO authenticated;
