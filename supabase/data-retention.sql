-- ═══════════════════════════════════════════════════════════════
-- Metrico — retention cleanup (portal messages + old feedback reads)
-- Run manually or schedule via Supabase cron / pg_cron
-- ═══════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION public.purge_stale_metrico_data(
  p_portal_message_days int DEFAULT 730,
  p_feedback_days int DEFAULT 1095
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_portal int := 0;
  v_feedback int := 0;
BEGIN
  IF NOT public.is_super_admin(auth.uid()) THEN
    RAISE EXCEPTION 'forbidden';
  END IF;

  DELETE FROM public.owner_portal_messages
  WHERE created_at < now() - make_interval(days => greatest(p_portal_message_days, 30));
  GET DIAGNOSTICS v_portal = ROW_COUNT;

  DELETE FROM public.product_feedback
  WHERE created_at < now() - make_interval(days => greatest(p_feedback_days, 90))
    AND read_at IS NOT NULL;
  GET DIAGNOSTICS v_feedback = ROW_COUNT;

  PERFORM public.admin_audit_write(
    'purge_stale_metrico_data',
    jsonb_build_object('portal_messages_deleted', v_portal, 'feedback_deleted', v_feedback)
  );

  RETURN jsonb_build_object(
    'portal_messages_deleted', v_portal,
    'feedback_deleted', v_feedback
  );
END;
$$;

REVOKE ALL ON FUNCTION public.purge_stale_metrico_data(int, int) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.purge_stale_metrico_data(int, int) TO authenticated;

COMMENT ON FUNCTION public.purge_stale_metrico_data IS
  'Super-admin only. Default: portal messages older than 2y; read feedback older than 3y.';
