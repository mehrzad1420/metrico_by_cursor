-- ═══════════════════════════════════════════════════════════════
-- Metrico — super-admin audit log
-- Run AFTER admin.sql
-- ═══════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.admin_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  detail JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS admin_audit_log_created_idx ON public.admin_audit_log (created_at DESC);

ALTER TABLE public.admin_audit_log ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.admin_audit_log FROM PUBLIC;
GRANT SELECT ON TABLE public.admin_audit_log TO authenticated;

DROP POLICY IF EXISTS admin_audit_log_select ON public.admin_audit_log;
CREATE POLICY admin_audit_log_select ON public.admin_audit_log
  FOR SELECT TO authenticated
  USING (public.is_super_admin());

CREATE OR REPLACE FUNCTION public.admin_audit_write(p_action TEXT, p_detail JSONB DEFAULT '{}'::jsonb)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN;
  END IF;
  INSERT INTO public.admin_audit_log (actor_user_id, action, detail)
  VALUES (auth.uid(), left(trim(coalesce(p_action, '')), 120), coalesce(p_detail, '{}'::jsonb));
END;
$$;

REVOKE ALL ON FUNCTION public.admin_audit_write(TEXT, JSONB) FROM PUBLIC;

-- Patch admin_set_member_plan
CREATE OR REPLACE FUNCTION public.admin_set_member_plan(
  p_target_user_id uuid,
  p_plan text,
  p_months int default 12
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.is_super_admin(auth.uid()) THEN
    RAISE EXCEPTION 'forbidden';
  END IF;

  PERFORM public.set_user_plan(p_target_user_id, p_plan, greatest(coalesce(p_months, 1), 1));

  PERFORM public.admin_audit_write(
    'admin_set_member_plan',
    jsonb_build_object('target_user_id', p_target_user_id, 'plan', p_plan, 'months', p_months)
  );
END;
$$;

-- Patch code generators (from admin-members-tools)
CREATE OR REPLACE FUNCTION public.admin_create_activation_code(p_note text default null)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_code text;
BEGIN
  IF NOT public.is_super_admin(auth.uid()) THEN
    RAISE EXCEPTION 'forbidden';
  END IF;

  v_code := 'ACT-' || to_char(now(), 'YYMM') || '-' ||
    upper(substring(replace(gen_random_uuid()::text, '-', '') from 1 for 6));

  BEGIN
    INSERT INTO public.activation_codes (code, note)
    VALUES (v_code, nullif(trim(p_note), ''));
  EXCEPTION
    WHEN undefined_column THEN
      INSERT INTO public.activation_codes (code) VALUES (v_code);
  END;

  PERFORM public.admin_audit_write('admin_create_activation_code', jsonb_build_object('code_prefix', left(v_code, 12)));

  RETURN v_code;
END;
$$;

CREATE OR REPLACE FUNCTION public.admin_create_plan_code(
  p_plan text default 'plus',
  p_months int default 12,
  p_note text default null
)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_plan text := lower(trim(coalesce(p_plan, 'plus')));
  v_months int := greatest(coalesce(p_months, 12), 1);
  v_code text;
  v_prefix text;
BEGIN
  IF NOT public.is_super_admin(auth.uid()) THEN
    RAISE EXCEPTION 'forbidden';
  END IF;

  IF v_plan NOT IN ('plus', 'pro', 'ark') THEN
    RAISE EXCEPTION 'invalid plan for code';
  END IF;

  v_prefix := CASE v_plan
    WHEN 'plus' THEN 'PLU'
    WHEN 'pro' THEN 'PRO'
    WHEN 'ark' THEN 'ARK'
  END;

  v_code := v_prefix || '-' || to_char(now(), 'YYMM') || '-' ||
    upper(substring(replace(gen_random_uuid()::text, '-', '') from 1 for 6));

  INSERT INTO public.plan_codes (code, plan, months, note)
  VALUES (v_code, v_plan, v_months, nullif(trim(p_note), ''));

  PERFORM public.admin_audit_write(
    'admin_create_plan_code',
    jsonb_build_object('plan', v_plan, 'months', v_months, 'code_prefix', left(v_code, 12))
  );

  RETURN v_code;
END;
$$;

CREATE OR REPLACE FUNCTION public.admin_mark_product_feedback_read(p_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.is_super_admin(auth.uid()) THEN
    RAISE EXCEPTION 'forbidden';
  END IF;

  UPDATE public.product_feedback SET read_at = NOW() WHERE id = p_id;

  PERFORM public.admin_audit_write('admin_mark_product_feedback_read', jsonb_build_object('feedback_id', p_id));
END;
$$;

NOTIFY pgrst, 'reload schema';
