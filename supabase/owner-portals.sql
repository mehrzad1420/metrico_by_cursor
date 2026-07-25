-- ═══════════════════════════════════════════════════════════════
-- Metrico — پنل اختصاصی مالک (owner_portals)
-- در Supabase → SQL Editor اجرا کنید (اجرای مجدد بی‌خطر است)
-- برای پیام‌رسانی مالک: پس از این فایل، owner-portal-messages.sql را هم اجرا کنید.
-- ═══════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.owner_portals (
  token TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  project_id TEXT NOT NULL,
  unit_id TEXT NOT NULL,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- اگر جدول قبلاً با UUID ساخته شده، به TEXT تبدیل کنید
ALTER TABLE public.owner_portals
  ALTER COLUMN project_id TYPE TEXT USING project_id::text;

CREATE INDEX IF NOT EXISTS owner_portals_user_id_idx ON public.owner_portals(user_id);

ALTER TABLE public.owner_portals ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.owner_portals TO authenticated;
GRANT ALL ON TABLE public.owner_portals TO service_role;

DROP POLICY IF EXISTS owner_portals_owner_all ON public.owner_portals;
CREATE POLICY owner_portals_owner_all ON public.owner_portals
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.get_owner_portal(portal_token TEXT)
RETURNS JSONB
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT payload FROM public.owner_portals WHERE token = portal_token LIMIT 1;
$$;

REVOKE ALL ON FUNCTION public.get_owner_portal(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_owner_portal(TEXT) TO anon, authenticated;

DROP FUNCTION IF EXISTS public.upsert_owner_portal(TEXT, UUID, TEXT, JSONB);
DROP FUNCTION IF EXISTS public.upsert_owner_portal(TEXT, TEXT, TEXT, JSONB);

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
  DELETE FROM public.owner_portals WHERE token = portal_token AND user_id = v_uid;
END;
$$;

REVOKE ALL ON FUNCTION public.delete_owner_portal(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.delete_owner_portal(TEXT) TO authenticated;

NOTIFY pgrst, 'reload schema';
