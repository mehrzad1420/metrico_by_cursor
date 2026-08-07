-- ═══════════════════════════════════════════════════════════════
-- Metrico — Team plan + workspace members (RBAC)
-- Run AFTER schema.sql, plans.sql, plan-features-enforcement.sql
-- ═══════════════════════════════════════════════════════════════

-- 1) Allow plan = team
alter table public.profiles drop constraint if exists profiles_plan_check;
alter table public.profiles
  add constraint profiles_plan_check
  check (plan in ('start', 'plus', 'pro', 'ark', 'team'));

alter table public.profiles
  add column if not exists team_owner_id uuid references auth.users(id) on delete set null,
  add column if not exists member_role text not null default 'manager',
  add column if not exists display_name text;

alter table public.profiles drop constraint if exists profiles_member_role_check;
alter table public.profiles
  add constraint profiles_member_role_check
  check (member_role in ('manager', 'sales', 'accountant', 'site', 'viewer'));

create index if not exists profiles_team_owner_idx on public.profiles (team_owner_id);

-- plan_codes / payment_events may still constrain plans — widen if present
do $$
begin
  if exists (
    select 1 from information_schema.tables
    where table_schema = 'public' and table_name = 'plan_codes'
  ) then
    alter table public.plan_codes drop constraint if exists plan_codes_plan_check;
    alter table public.plan_codes
      add constraint plan_codes_plan_check
      check (plan in ('plus', 'pro', 'ark', 'team'));
  end if;
  if exists (
    select 1 from information_schema.tables
    where table_schema = 'public' and table_name = 'payment_events'
  ) then
    alter table public.payment_events drop constraint if exists payment_events_plan_check;
    alter table public.payment_events
      add constraint payment_events_plan_check
      check (plan in ('plus', 'pro', 'ark', 'team'));
  end if;
  if exists (
    select 1 from information_schema.tables
    where table_schema = 'public' and table_name = 'payment_orders'
  ) then
    begin
      alter table public.payment_orders drop constraint if exists payment_orders_plan_check;
      alter table public.payment_orders
        add constraint payment_orders_plan_check
        check (plan in ('plus', 'pro', 'ark', 'team'));
    exception when others then null;
    end;
  end if;
end $$;

-- 2) Teams table (one workspace per owner)
create table if not exists public.teams (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null unique references auth.users(id) on delete cascade,
  name text not null default 'تیم متریکو',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.teams enable row level security;

drop policy if exists teams_owner_all on public.teams;
create policy teams_owner_all on public.teams
  for all using (auth.uid() = owner_user_id)
  with check (auth.uid() = owner_user_id);

drop policy if exists teams_member_select on public.teams;
create policy teams_member_select on public.teams
  for select using (
    auth.uid() = owner_user_id
    or exists (
      select 1 from public.profiles p
      where p.user_id = auth.uid() and p.team_owner_id = teams.owner_user_id
    )
  );

-- 3) Helpers
create or replace function public.is_team_owner(p_uid uuid default auth.uid())
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where user_id = p_uid
      and coalesce(plan, 'start') = 'team'
      and team_owner_id is null
  );
$$;

create or replace function public.team_owner_of(p_uid uuid default auth.uid())
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (select team_owner_id from public.profiles where user_id = p_uid),
    case when public.is_team_owner(p_uid) then p_uid else null end
  );
$$;

create or replace function public.ensure_team_for_owner(p_owner uuid)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id uuid;
begin
  select id into v_id from public.teams where owner_user_id = p_owner;
  if v_id is null then
    insert into public.teams (owner_user_id, name)
    values (p_owner, 'تیم متریکو')
    returning id into v_id;
  end if;
  return v_id;
end;
$$;

-- Effective plan: members inherit owner's team plan
-- Existing fn has DEFAULT auth.uid(); CREATE OR REPLACE cannot remove defaults.
drop function if exists public.effective_user_plan(uuid);

create or replace function public.effective_user_plan(p_uid uuid default auth.uid())
returns text
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_plan text;
  v_exp timestamptz;
  v_owner uuid;
  v_owner_plan text;
  v_owner_exp timestamptz;
begin
  select plan, plan_expires_at, team_owner_id
    into v_plan, v_exp, v_owner
  from public.profiles where user_id = p_uid;

  if v_owner is not null then
    select plan, plan_expires_at into v_owner_plan, v_owner_exp
    from public.profiles where user_id = v_owner;
    if coalesce(v_owner_plan, 'start') = 'team'
       and (v_owner_exp is null or v_owner_exp > now()) then
      return 'team';
    end if;
    return 'start';
  end if;

  if v_plan is null then return 'start'; end if;
  if v_plan <> 'start' and v_exp is not null and v_exp < now() then
    return 'start';
  end if;
  return v_plan;
end;
$$;

-- Team plan shares ark-level project capacity on the server
create or replace function public.max_projects_for_plan(p_plan text)
returns int
language sql
immutable
as $$
  select case lower(trim(coalesce(p_plan, 'start')))
    when 'start' then 1
    when 'plus' then 3
    when 'pro' then 10
    when 'ark' then 999
    when 'team' then 999
    else 1
  end;
$$;

create or replace function public.plan_rank(p_plan text)
returns int
language sql
immutable
as $$
  select case lower(trim(coalesce(p_plan, 'start')))
    when 'start' then 0
    when 'plus' then 1
    when 'pro' then 2
    when 'ark' then 3
    when 'team' then 4
    else 0
  end;
$$;

create or replace function public.min_plan_for_feature(p_feature text)
returns text
language sql
immutable
as $$
  select case lower(trim(coalesce(p_feature, '')))
    when 'backup_restore' then 'plus'
    when 'pdf_export' then 'plus'
    when 'finance_transfer' then 'plus'
    when 'fab_accounts' then 'plus'
    when 'chat' then 'plus'
    when 'map' then 'plus'
    when 'owner_portal' then 'plus'
    when 'project_maps' then 'plus'
    when 'investor_portal' then 'plus'
    when 'unit_reservation_expiry' then 'plus'
    when 'invoice_receipt' then 'plus'
    when 'accounting_export' then 'pro'
    when 'construction_progress' then 'pro'
    when 'accounting' then 'pro'
    when 'fab_flow' then 'pro'
    when 'fab_checks' then 'pro'
    when 'kml_export' then 'pro'
    when 'inventory' then 'pro'
    when 'tax' then 'pro'
    when 'contracts' then 'pro'
    when 'energy' then 'ark'
    when 'takeoff' then 'ark'
    when 'team_workspace' then 'team'
    else 'start'
  end;
$$;

-- 4) List members (owner only)
create or replace function public.list_team_members()
returns table (
  user_id uuid,
  email text,
  display_name text,
  member_role text,
  activated boolean,
  created_at timestamptz,
  is_owner boolean
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
begin
  if v_uid is null then raise exception 'not authenticated'; end if;
  if not public.is_team_owner(v_uid) then
    raise exception 'team plan owner required';
  end if;
  perform public.ensure_team_for_owner(v_uid);

  return query
  select
    v_uid,
    coalesce((select email from auth.users where id = v_uid), '')::text,
    coalesce((select display_name from public.profiles where user_id = v_uid), 'مدیر تیم')::text,
    'manager'::text,
    true,
    (select created_at from public.profiles where user_id = v_uid),
    true
  union all
  select
    p.user_id,
    coalesce(u.email, '')::text,
    coalesce(p.display_name, '')::text,
    p.member_role,
    p.activated,
    p.created_at,
    false
  from public.profiles p
  left join auth.users u on u.id = p.user_id
  where p.team_owner_id = v_uid
  order by is_owner desc, created_at asc;
end;
$$;

grant execute on function public.list_team_members() to authenticated;

-- 5) Member context for client
create or replace function public.get_team_context()
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_owner uuid;
  v_role text;
  v_plan text;
  v_name text;
begin
  if v_uid is null then raise exception 'not authenticated'; end if;
  select team_owner_id, member_role into v_owner, v_role
  from public.profiles where user_id = v_uid;

  if v_owner is null and public.is_team_owner(v_uid) then
    v_owner := v_uid;
    v_role := 'manager';
  end if;

  v_plan := public.effective_user_plan(v_uid);
  select name into v_name from public.teams where owner_user_id = coalesce(v_owner, v_uid);

  return jsonb_build_object(
    'user_id', v_uid,
    'team_owner_id', v_owner,
    'member_role', coalesce(v_role, 'manager'),
    'is_team_owner', (v_owner is not null and v_owner = v_uid and public.is_team_owner(v_uid)),
    'effective_plan', v_plan,
    'team_name', coalesce(v_name, 'تیم متریکو'),
    'is_member', (v_owner is not null and v_owner <> v_uid)
  );
end;
$$;

grant execute on function public.get_team_context() to authenticated;

-- 6) Projects accessible to team members (read via RLS)
drop policy if exists projects_team_member_select on public.projects;
create policy projects_team_member_select on public.projects
  for select using (
    auth.uid() = user_id
    or user_id = public.team_owner_of(auth.uid())
  );

drop policy if exists projects_team_member_update on public.projects;
create policy projects_team_member_update on public.projects
  for update using (
    auth.uid() = user_id
    or (
      user_id = public.team_owner_of(auth.uid())
      and exists (
        select 1 from public.profiles p
        where p.user_id = auth.uid()
          and p.team_owner_id = projects.user_id
          and p.member_role in ('manager', 'sales', 'accountant', 'site')
      )
    )
  );

drop policy if exists projects_team_member_insert on public.projects;
-- members do not insert under own id; manager-owner inserts only
-- (keep existing insert policies)

-- 7) Widen set_user_plan to accept team
create or replace function public.set_user_plan(
  p_user_id uuid,
  p_plan text,
  p_months int default 1
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_plan text := lower(trim(p_plan));
  v_months int := greatest(coalesce(p_months, 1), 1);
  v_expires timestamptz;
  v_current_expires timestamptz;
begin
  if v_plan not in ('start', 'plus', 'pro', 'ark', 'team') then
    raise exception 'invalid plan';
  end if;

  select plan_expires_at into v_current_expires
  from public.profiles where user_id = p_user_id;

  if v_plan = 'start' then
    v_expires := null;
  else
    v_expires := greatest(coalesce(v_current_expires, now()), now()) + (v_months || ' months')::interval;
  end if;

  perform set_config('metrico.profile_admin_update', '1', true);

  update public.profiles
  set plan = v_plan,
      plan_expires_at = v_expires,
      plan_updated_at = now()
  where user_id = p_user_id;

  if not found then
    insert into public.profiles (user_id, activated, plan, plan_expires_at, plan_updated_at)
    values (p_user_id, true, v_plan, v_expires, now());
  end if;

  if v_plan = 'team' then
    perform public.ensure_team_for_owner(p_user_id);
  end if;
end;
$$;
