-- ═══════════════════════════════════════════════════════════════
-- Metrico — Subscription plans (متریکو آغاز / پلاس / پرو / ارک)
-- Run once in Supabase SQL Editor AFTER schema.sql
-- ═══════════════════════════════════════════════════════════════

-- 1) Plan columns on profiles
alter table public.profiles
  add column if not exists plan text not null default 'start',
  add column if not exists plan_expires_at timestamptz,
  add column if not exists plan_updated_at timestamptz default now();

-- Drop old constraint if re-running
alter table public.profiles drop constraint if exists profiles_plan_check;
alter table public.profiles
  add constraint profiles_plan_check
  check (plan in ('start', 'plus', 'pro', 'ark'));

create index if not exists profiles_plan_idx on public.profiles (plan);

-- 2) Upgrade codes (manual sale now, payment gateway later)
create table if not exists public.plan_codes (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  plan text not null check (plan in ('plus', 'pro', 'ark')),
  months int not null default 1 check (months > 0),
  note text,
  used_by uuid references auth.users(id),
  used_at timestamptz,
  created_at timestamptz default now()
);

alter table public.plan_codes enable row level security;

-- 3) Payment audit log (for future Zarinpal/Stripe webhooks)
create table if not exists public.payment_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  provider text not null default 'manual',
  provider_ref text,
  plan text not null check (plan in ('plus', 'pro', 'ark')),
  months int not null default 1,
  amount_rial bigint,
  status text not null default 'verified',
  raw jsonb,
  created_at timestamptz default now()
);

alter table public.payment_events enable row level security;

-- 4) Core: set plan for a user (used by redeem + webhook)
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
  if v_plan not in ('start', 'plus', 'pro', 'ark') then
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
end;
$$;

-- 5) User redeems an upgrade code from the app
create or replace function public.redeem_plan_code(code_input text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_row public.plan_codes%rowtype;
begin
  if v_uid is null then
    raise exception 'not authenticated';
  end if;

  select * into v_row
  from public.plan_codes
  where lower(trim(code)) = lower(trim(code_input))
  for update;

  if not found then
    return false;
  end if;

  if v_row.used_by is not null then
    return false;
  end if;

  update public.plan_codes
  set used_by = v_uid, used_at = now()
  where id = v_row.id;

  perform public.set_user_plan(v_uid, v_row.plan, v_row.months);

  insert into public.payment_events (user_id, provider, provider_ref, plan, months, status)
  values (v_uid, 'plan_code', v_row.code, v_row.plan, v_row.months, 'verified');

  return true;
end;
$$;

-- 6) Webhook entry point (call from Edge Function with service_role)
-- Example body: { "user_id": "...", "plan": "pro", "months": 12, "provider": "zarinpal", "ref": "ABC123", "amount_rial": 990000 }
create or replace function public.apply_payment_upgrade(
  p_user_id uuid,
  p_plan text,
  p_months int default 1,
  p_provider text default 'zarinpal',
  p_provider_ref text default null,
  p_amount_rial bigint default null,
  p_raw jsonb default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  perform public.set_user_plan(p_user_id, p_plan, p_months);

  insert into public.payment_events (user_id, provider, provider_ref, plan, months, amount_rial, status, raw)
  values (p_user_id, coalesce(p_provider, 'manual'), p_provider_ref, lower(trim(p_plan)), greatest(p_months, 1), p_amount_rial, 'verified', p_raw);
end;
$$;

revoke all on function public.set_user_plan(uuid, text, int) from public;
revoke all on function public.apply_payment_upgrade(uuid, text, int, text, text, bigint, jsonb) from public;
grant execute on function public.redeem_plan_code(text) to authenticated;

-- ═══ Admin helpers (run manually in SQL Editor) ═══

-- Give a user a plan directly:
-- select public.set_user_plan('USER-UUID-HERE'::uuid, 'pro', 12);

-- Create upgrade codes for pilots:
-- insert into public.plan_codes (code, plan, months, note) values
--   ('PLUS-PILOT-01', 'plus', 12, 'کاربر آزمایشی پلاس'),
--   ('PRO-PILOT-01', 'pro', 12, 'کاربر آزمایشی پرو'),
--   ('ARK-PILOT-01', 'ark', 12, 'کاربر آزمایشی ارک');

-- Future: Supabase Edge Function on payment success:
-- await supabase.rpc('apply_payment_upgrade', { p_user_id, p_plan: 'pro', p_months: 12, p_provider_ref: authority })
