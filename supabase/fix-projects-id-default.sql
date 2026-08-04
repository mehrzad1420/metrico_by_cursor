-- Fix: projects.id DEFAULT was advancing a sequence and casting to uuid
-- (error: invalid input syntax for type uuid: "15" / "19" / …)
-- Run in Supabase SQL Editor after plan-enforcement.sql / demo-readonly.sql

ALTER TABLE public.projects
  ALTER COLUMN id SET DEFAULT gen_random_uuid();

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
  INSERT INTO public.projects (id, user_id, name, data)
  VALUES (gen_random_uuid(), v_uid, v_name, coalesce(p_data, '{}'::jsonb))
  RETURNING id INTO v_id;
  PERFORM set_config('metrico.allow_demo_seed', '', true);

  RETURN v_id;
END;
$$;

NOTIFY pgrst, 'reload schema';
