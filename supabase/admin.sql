-- ═══════════════════════════════════════════════════════════════
-- Metrico — Super Admin (مدیر کل) + مدیریت اعضا
-- Run once in Supabase SQL Editor AFTER plans.sql
-- ═══════════════════════════════════════════════════════════════

-- 1) Role column on profiles
alter table public.profiles
  add column if not exists role text not null default 'user';

alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles
  add constraint profiles_role_check
  check (role in ('user', 'super_admin'));

-- 2) Check if caller is super admin (server-side — not bypassable from app)
create or replace function public.is_super_admin(p_uid uuid default auth.uid())
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (select role = 'super_admin' from public.profiles where user_id = p_uid),
    false
  );
$$;

-- 3) List all members (email + plan) — only super admin
create or replace function public.admin_list_members()
returns table (
  user_id uuid,
  email text,
  activated boolean,
  plan text,
  plan_expires_at timestamptz,
  plan_updated_at timestamptz,
  created_at timestamptz
)
language plpgsql
security definer
set search_path = public, auth
as $$
begin
  if not public.is_super_admin(auth.uid()) then
    raise exception 'forbidden';
  end if;

  return query
  select
    p.user_id,
    u.email::text,
    p.activated,
    p.plan,
    p.plan_expires_at,
    p.plan_updated_at,
    p.created_at
  from public.profiles p
  inner join auth.users u on u.id = p.user_id
  order by p.created_at desc nulls last;
end;
$$;

-- 4) Change a member's plan — only super admin
create or replace function public.admin_set_member_plan(
  p_target_user_id uuid,
  p_plan text,
  p_months int default 12
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_super_admin(auth.uid()) then
    raise exception 'forbidden';
  end if;

  perform public.set_user_plan(p_target_user_id, p_plan, greatest(coalesce(p_months, 1), 1));
end;
$$;

revoke all on function public.admin_list_members() from public;
revoke all on function public.admin_set_member_plan(uuid, text, int) from public;
grant execute on function public.is_super_admin(uuid) to authenticated;
grant execute on function public.admin_list_members() to authenticated;
grant execute on function public.admin_set_member_plan(uuid, text, int) to authenticated;

-- ═══ Promote founder to super admin (edit email if needed) ═══
select set_config('metrico.profile_admin_update', '1', true);

update public.profiles
set role = 'super_admin'
where user_id = (
  select id from auth.users
  where lower(email) = lower('mehrzad.saeedi@gmail.com')
  limit 1
);

-- Verify:
-- select user_id, role, plan from public.profiles where role = 'super_admin';
