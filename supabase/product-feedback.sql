-- ═══════════════════════════════════════════════════════════════
-- Metrico — نظرات و پیشنهادات کاربران (صفحه درباره → مدیر کل)
-- پس از admin.sql در Supabase → SQL Editor اجرا کنید
-- ═══════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.product_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  author_email TEXT NOT NULL DEFAULT '',
  company_name TEXT NOT NULL DEFAULT '',
  message TEXT NOT NULL,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS product_feedback_created_idx ON public.product_feedback (created_at DESC);
CREATE INDEX IF NOT EXISTS product_feedback_unread_idx ON public.product_feedback (created_at DESC) WHERE read_at IS NULL;

ALTER TABLE public.product_feedback ENABLE ROW LEVEL SECURITY;

GRANT SELECT, UPDATE ON TABLE public.product_feedback TO authenticated;

DROP POLICY IF EXISTS product_feedback_select ON public.product_feedback;
CREATE POLICY product_feedback_select ON public.product_feedback
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.is_super_admin());

DROP POLICY IF EXISTS product_feedback_update_admin ON public.product_feedback;
CREATE POLICY product_feedback_update_admin ON public.product_feedback
  FOR UPDATE TO authenticated
  USING (public.is_super_admin())
  WITH CHECK (public.is_super_admin());

DROP FUNCTION IF EXISTS public.submit_product_feedback(TEXT, TEXT);

CREATE OR REPLACE FUNCTION public.submit_product_feedback(
  p_message TEXT,
  p_company_name TEXT DEFAULT ''
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth
AS $$
DECLARE
  v_msg TEXT;
  v_email TEXT;
  v_uid UUID := auth.uid();
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not authenticated';
  END IF;

  v_msg := trim(coalesce(p_message, ''));
  IF length(v_msg) < 5 THEN
    RAISE EXCEPTION 'message too short';
  END IF;
  IF length(v_msg) > 2000 THEN
    RAISE EXCEPTION 'message too long';
  END IF;

  SELECT email::text INTO v_email FROM auth.users WHERE id = v_uid;

  INSERT INTO public.product_feedback (user_id, author_email, company_name, message)
  VALUES (v_uid, coalesce(v_email, ''), trim(coalesce(p_company_name, '')), v_msg);
END;
$$;

DROP FUNCTION IF EXISTS public.admin_list_product_feedback(INT);

CREATE OR REPLACE FUNCTION public.admin_list_product_feedback(p_limit INT DEFAULT 100)
RETURNS SETOF public.product_feedback
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.is_super_admin() THEN
    RAISE EXCEPTION 'forbidden';
  END IF;

  RETURN QUERY
  SELECT *
  FROM public.product_feedback
  ORDER BY created_at DESC
  LIMIT greatest(1, least(coalesce(p_limit, 100), 200));
END;
$$;

DROP FUNCTION IF EXISTS public.admin_mark_product_feedback_read(UUID);

CREATE OR REPLACE FUNCTION public.admin_mark_product_feedback_read(p_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.is_super_admin() THEN
    RAISE EXCEPTION 'forbidden';
  END IF;

  UPDATE public.product_feedback
  SET read_at = coalesce(read_at, now())
  WHERE id = p_id;
END;
$$;

REVOKE ALL ON FUNCTION public.submit_product_feedback(TEXT, TEXT) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.admin_list_product_feedback(INT) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.admin_mark_product_feedback_read(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.submit_product_feedback(TEXT, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_list_product_feedback(INT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_mark_product_feedback_read(UUID) TO authenticated;
