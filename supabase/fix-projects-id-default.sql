-- Repair projects.id to match Metrico app + schema.sql (UUID).
-- Live DBs sometimes drifted to BIGINT IDENTITY → errors like:
--   invalid input syntax for type uuid: "15"
--   column "id" is of type bigint but default expression is of type uuid
-- Safe to re-run. Paste this WHOLE file into Supabase SQL Editor (no UI collapse text).

DO $$
DECLARE
  typ text;
  pk_name text;
BEGIN
  SELECT c.data_type INTO typ
  FROM information_schema.columns c
  WHERE c.table_schema = 'public'
    AND c.table_name = 'projects'
    AND c.column_name = 'id';

  IF typ IS NULL THEN
    RAISE EXCEPTION 'public.projects.id not found';
  END IF;

  -- Always drop IDENTITY first when present (blocks SET DEFAULT).
  BEGIN
    ALTER TABLE public.projects ALTER COLUMN id DROP IDENTITY IF EXISTS;
  EXCEPTION
    WHEN undefined_column THEN NULL;
    WHEN others THEN NULL;
  END;

  IF typ IN ('bigint', 'integer', 'smallint', 'numeric') THEN
    -- Swap BIGINT → UUID without relying on invalid casts of "15"::uuid
    SELECT tc.constraint_name INTO pk_name
    FROM information_schema.table_constraints tc
    WHERE tc.table_schema = 'public'
      AND tc.table_name = 'projects'
      AND tc.constraint_type = 'PRIMARY KEY'
    LIMIT 1;

    IF pk_name IS NOT NULL THEN
      EXECUTE format('ALTER TABLE public.projects DROP CONSTRAINT %I', pk_name);
    END IF;

    ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS id_uuid uuid;
    UPDATE public.projects SET id_uuid = gen_random_uuid() WHERE id_uuid IS NULL;
    ALTER TABLE public.projects ALTER COLUMN id_uuid SET NOT NULL;
    ALTER TABLE public.projects ALTER COLUMN id_uuid SET DEFAULT gen_random_uuid();

    ALTER TABLE public.projects DROP COLUMN id;
    ALTER TABLE public.projects RENAME COLUMN id_uuid TO id;
    ALTER TABLE public.projects ADD PRIMARY KEY (id);
  ELSIF typ = 'uuid' THEN
    ALTER TABLE public.projects ALTER COLUMN id DROP DEFAULT;
    ALTER TABLE public.projects ALTER COLUMN id SET DEFAULT gen_random_uuid();
  ELSE
    RAISE EXCEPTION 'unsupported projects.id type: %', typ;
  END IF;
END $$;

CREATE OR REPLACE FUNCTION public.ensure_demo_project_seed(p_name text, p_data jsonb)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid uuid := auth.uid();
  v_id uuid;
  v_name text := trim(coalesce(p_name, ''));
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'not authenticated';
  END IF;
  IF NOT public.is_demo_user(v_uid) THEN
    RAISE EXCEPTION 'forbidden';
  END IF;
  IF v_name = '' THEN
    RAISE EXCEPTION 'project name required';
  END IF;

  SELECT id INTO v_id FROM public.projects WHERE user_id = v_uid ORDER BY created_at LIMIT 1;
  IF v_id IS NOT NULL THEN
    RETURN v_id;
  END IF;

  PERFORM set_config('metrico.allow_demo_seed', '1', true);
  INSERT INTO public.projects (user_id, name, data)
  VALUES (v_uid, v_name, coalesce(p_data, '{}'::jsonb))
  RETURNING id INTO v_id;
  PERFORM set_config('metrico.allow_demo_seed', '', true);

  RETURN v_id;
END;
$$;

REVOKE ALL ON FUNCTION public.ensure_demo_project_seed(text, jsonb) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.ensure_demo_project_seed(text, jsonb) TO authenticated;

NOTIFY pgrst, 'reload schema';
