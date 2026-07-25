-- ═══════════════════════════════════════════════════════════════
-- Metrico — پیام‌های مالک از پنل اختصاصی (owner_portal_messages)
-- پس از owner-portals.sql در Supabase → SQL Editor اجرا کنید
-- ═══════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.owner_portal_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  project_id TEXT NOT NULL,
  unit_id TEXT NOT NULL,
  portal_token TEXT NOT NULL,
  buyer_name TEXT NOT NULL DEFAULT '',
  buyer_phone TEXT DEFAULT '',
  unit_number TEXT DEFAULT '',
  project_name TEXT DEFAULT '',
  message TEXT NOT NULL,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS owner_portal_messages_user_idx ON public.owner_portal_messages(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS owner_portal_messages_project_idx ON public.owner_portal_messages(user_id, project_id);
CREATE INDEX IF NOT EXISTS owner_portal_messages_unread_idx ON public.owner_portal_messages(user_id) WHERE read_at IS NULL;

ALTER TABLE public.owner_portal_messages ENABLE ROW LEVEL SECURITY;

GRANT SELECT, UPDATE ON TABLE public.owner_portal_messages TO authenticated;
GRANT ALL ON TABLE public.owner_portal_messages TO service_role;

DROP POLICY IF EXISTS owner_portal_messages_owner_select ON public.owner_portal_messages;
CREATE POLICY owner_portal_messages_owner_select ON public.owner_portal_messages
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS owner_portal_messages_owner_update ON public.owner_portal_messages;
CREATE POLICY owner_portal_messages_owner_update ON public.owner_portal_messages
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP FUNCTION IF EXISTS public.submit_owner_portal_message(TEXT, TEXT);

CREATE OR REPLACE FUNCTION public.submit_owner_portal_message(
  portal_token TEXT,
  p_message TEXT
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_portal public.owner_portals%ROWTYPE;
  v_msg TEXT;
BEGIN
  v_msg := trim(coalesce(p_message, ''));
  IF length(v_msg) < 2 THEN
    RAISE EXCEPTION 'message too short';
  END IF;
  IF length(v_msg) > 500 THEN
    RAISE EXCEPTION 'message too long';
  END IF;

  SELECT * INTO v_portal FROM public.owner_portals WHERE token = portal_token LIMIT 1;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'invalid portal token';
  END IF;

  INSERT INTO public.owner_portal_messages (
    user_id, project_id, unit_id, portal_token,
    buyer_name, buyer_phone, unit_number, project_name, message
  ) VALUES (
    v_portal.user_id,
    v_portal.project_id,
    v_portal.unit_id,
    portal_token,
    coalesce(v_portal.payload->>'buyerName', ''),
    coalesce(v_portal.payload->>'buyerPhone', ''),
    coalesce(v_portal.payload->>'unitNumber', ''),
    coalesce(v_portal.payload->>'projectName', ''),
    v_msg
  );
END;
$$;

REVOKE ALL ON FUNCTION public.submit_owner_portal_message(TEXT, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.submit_owner_portal_message(TEXT, TEXT) TO anon, authenticated;

-- ── پاسخ مدیر به پیام مالک ──
ALTER TABLE public.owner_portal_messages
  ADD COLUMN IF NOT EXISTS reply_text TEXT,
  ADD COLUMN IF NOT EXISTS replied_at TIMESTAMPTZ;

DROP FUNCTION IF EXISTS public.reply_owner_portal_message(UUID, TEXT);

CREATE OR REPLACE FUNCTION public.reply_owner_portal_message(
  p_message_id UUID,
  p_reply TEXT
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_reply TEXT;
BEGIN
  v_reply := trim(coalesce(p_reply, ''));
  IF length(v_reply) < 2 THEN
    RAISE EXCEPTION 'reply too short';
  END IF;
  IF length(v_reply) > 500 THEN
    RAISE EXCEPTION 'reply too long';
  END IF;

  UPDATE public.owner_portal_messages
  SET reply_text = v_reply, replied_at = NOW()
  WHERE id = p_message_id AND user_id = auth.uid();

  IF NOT FOUND THEN
    RAISE EXCEPTION 'message not found';
  END IF;
END;
$$;

REVOKE ALL ON FUNCTION public.reply_owner_portal_message(UUID, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.reply_owner_portal_message(UUID, TEXT) TO authenticated;

DROP FUNCTION IF EXISTS public.get_owner_portal_thread(TEXT);

CREATE OR REPLACE FUNCTION public.get_owner_portal_thread(portal_token TEXT)
RETURNS TABLE (
  id UUID,
  message TEXT,
  reply_text TEXT,
  replied_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.owner_portals WHERE token = portal_token LIMIT 1) THEN
    RAISE EXCEPTION 'invalid portal token';
  END IF;

  RETURN QUERY
  SELECT m.id, m.message, m.reply_text, m.replied_at, m.created_at
  FROM public.owner_portal_messages m
  WHERE m.portal_token = get_owner_portal_thread.portal_token
  ORDER BY m.created_at ASC;
END;
$$;

REVOKE ALL ON FUNCTION public.get_owner_portal_thread(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_owner_portal_thread(TEXT) TO anon, authenticated;

NOTIFY pgrst, 'reload schema';
