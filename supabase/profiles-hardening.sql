-- ═══════════════════════════════════════════════════════════════
-- Metrico — prevent privilege / plan / activation bypass via profiles UPDATE
-- Run AFTER schema.sql (and after admin.sql if profiles already exists)
-- App only SELECTs profiles; plan/role/activated change via SECURITY DEFINER RPCs only.
-- ═══════════════════════════════════════════════════════════════

REVOKE UPDATE ON TABLE public.profiles FROM authenticated;

DROP POLICY IF EXISTS profiles_update_own ON public.profiles;

-- Belt-and-suspenders: block sensitive column changes even from table owner sessions
CREATE OR REPLACE FUNCTION public.profiles_block_sensitive_update()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF TG_OP <> 'UPDATE' THEN
    RETURN NEW;
  END IF;

  IF current_setting('metrico.profile_admin_update', true) = '1' THEN
    RETURN NEW;
  END IF;

  IF NEW.role IS DISTINCT FROM OLD.role
     OR NEW.activated IS DISTINCT FROM OLD.activated
     OR NEW.plan IS DISTINCT FROM OLD.plan
     OR NEW.plan_expires_at IS DISTINCT FROM OLD.plan_expires_at
     OR NEW.plan_updated_at IS DISTINCT FROM OLD.plan_updated_at THEN
    RAISE EXCEPTION 'profiles sensitive fields are read-only';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS profiles_block_sensitive_update ON public.profiles;
CREATE TRIGGER profiles_block_sensitive_update
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.profiles_block_sensitive_update();
