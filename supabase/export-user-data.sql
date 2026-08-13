-- ═══════════════════════════════════════════════════════════════
-- Metrico — DSAR / portability export (server-side supplement)
-- Run AFTER product-feedback.sql and owner-portal-messages.sql
-- ═══════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION public.export_my_data()
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public, auth
AS $$
DECLARE
  v_uid uuid := auth.uid();
  v_email text := '';
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not authenticated';
  END IF;

  SELECT email::text INTO v_email FROM auth.users WHERE id = v_uid;

  RETURN jsonb_build_object(
    'exported_at', now(),
    'user_id', v_uid,
    'email', coalesce(v_email, ''),
    'profile', (
      SELECT to_jsonb(p) FROM public.profiles p WHERE p.user_id = v_uid
    ),
    'projects', coalesce((
      SELECT jsonb_agg(jsonb_build_object(
        'id', pr.id,
        'name', pr.name,
        'data', pr.data,
        'created_at', pr.created_at,
        'updated_at', pr.updated_at
      ) ORDER BY pr.created_at)
      FROM public.projects pr WHERE pr.user_id = v_uid
    ), '[]'::jsonb),
    'owner_portals', coalesce((
      SELECT jsonb_agg(to_jsonb(op) ORDER BY op.updated_at DESC)
      FROM public.owner_portals op WHERE op.user_id = v_uid
    ), '[]'::jsonb),
    'owner_portal_messages', coalesce((
      SELECT jsonb_agg(to_jsonb(m) ORDER BY m.created_at DESC)
      FROM public.owner_portal_messages m WHERE m.user_id = v_uid
    ), '[]'::jsonb),
    'crew_portals', coalesce((
      SELECT jsonb_agg(to_jsonb(cp) ORDER BY cp.updated_at DESC)
      FROM public.crew_portals cp WHERE cp.user_id = v_uid
    ), '[]'::jsonb),
    'product_feedback', coalesce((
      SELECT jsonb_agg(to_jsonb(f) ORDER BY f.created_at DESC)
      FROM public.product_feedback f WHERE f.user_id = v_uid
    ), '[]'::jsonb)
  );
END;
$$;

REVOKE ALL ON FUNCTION public.export_my_data() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.export_my_data() TO authenticated;
