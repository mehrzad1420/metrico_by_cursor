-- ═══════════════════════════════════════════════════════════════
-- Metrico — ابزار مدیریت اعضا (جستجو + ساخت کد از اپ)
-- Run once in Supabase SQL Editor AFTER admin.sql
-- ═══════════════════════════════════════════════════════════════

-- 1) ثبت‌نام جدید → پلن «آغاز» (start)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (user_id, activated, plan, role)
  values (new.id, false, 'start', 'user')
  on conflict (user_id) do update
    set plan = case
      when public.profiles.plan is null or trim(public.profiles.plan) = '' then 'start'
      else public.profiles.plan
    end;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- کاربران قدیمی بدون پلن
update public.profiles
set plan = 'start'
where plan is null or trim(plan) = '';

-- 2) ساخت کد فعال‌سازی اولیه (فقط مدیر کل)
create or replace function public.admin_create_activation_code(p_note text default null)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_code text;
begin
  if not public.is_super_admin(auth.uid()) then
    raise exception 'forbidden';
  end if;

  v_code := 'ACT-' || to_char(now(), 'YYMM') || '-' ||
    upper(substring(replace(gen_random_uuid()::text, '-', '') from 1 for 6));

  begin
    insert into public.activation_codes (code, note)
    values (v_code, nullif(trim(p_note), ''));
  exception
    when undefined_column then
      insert into public.activation_codes (code) values (v_code);
  end;

  return v_code;
end;
$$;

-- 3) ساخت کد ارتقای پلن (فقط مدیر کل)
create or replace function public.admin_create_plan_code(
  p_plan text default 'plus',
  p_months int default 12,
  p_note text default null
)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_plan text := lower(trim(coalesce(p_plan, 'plus')));
  v_months int := greatest(coalesce(p_months, 12), 1);
  v_code text;
  v_prefix text;
begin
  if not public.is_super_admin(auth.uid()) then
    raise exception 'forbidden';
  end if;

  if v_plan not in ('plus', 'pro', 'ark') then
    raise exception 'invalid plan for code';
  end if;

  v_prefix := case v_plan
    when 'plus' then 'PLU'
    when 'pro' then 'PRO'
    when 'ark' then 'ARK'
  end;

  v_code := v_prefix || '-' || to_char(now(), 'YYMM') || '-' ||
    upper(substring(replace(gen_random_uuid()::text, '-', '') from 1 for 6));

  insert into public.plan_codes (code, plan, months, note)
  values (v_code, v_plan, v_months, nullif(trim(p_note), ''));

  return v_code;
end;
$$;

revoke all on function public.admin_create_activation_code(text) from public;
revoke all on function public.admin_create_plan_code(text, int, text) from public;
grant execute on function public.admin_create_activation_code(text) to authenticated;
grant execute on function public.admin_create_plan_code(text, int, text) to authenticated;
