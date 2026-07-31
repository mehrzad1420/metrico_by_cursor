-- Metrico — discount codes + payment orders (Zarinpal / future Stripe)
-- Run in Supabase SQL Editor after plans.sql

create table if not exists public.discount_codes (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  percent_off int not null check (percent_off > 0 and percent_off <= 90),
  applies_to text not null default 'both'
    check (applies_to in ('purchase', 'renewal', 'both')),
  max_uses int,
  used_count int not null default 0,
  active boolean not null default true,
  valid_until timestamptz,
  note text,
  created_at timestamptz default now()
);

alter table public.discount_codes enable row level security;

create table if not exists public.payment_orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  email text,
  plan text not null check (plan in ('plus', 'pro', 'ark')),
  months int not null default 12 check (months > 0),
  kind text not null default 'purchase' check (kind in ('purchase', 'renewal')),
  currency text not null default 'IRR',
  amount_toman bigint,
  amount_eur numeric(12,2),
  discount_code text,
  discount_percent int not null default 0,
  provider text not null default 'zarinpal',
  provider_ref text,
  status text not null default 'pending'
    check (status in ('pending', 'redirected', 'paid', 'failed', 'cancelled', 'manual')),
  raw jsonb,
  created_at timestamptz default now(),
  paid_at timestamptz
);

create index if not exists payment_orders_user_idx on public.payment_orders (user_id);
create index if not exists payment_orders_ref_idx on public.payment_orders (provider_ref);

alter table public.payment_orders enable row level security;

-- Users can read their own orders
drop policy if exists payment_orders_select_own on public.payment_orders;
create policy payment_orders_select_own on public.payment_orders
  for select to authenticated
  using (auth.uid() = user_id);

-- Public validate discount (read-only percent)
create or replace function public.validate_discount_code(
  code_input text,
  kind_input text default 'purchase'
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_code text := upper(trim(coalesce(code_input, '')));
  v_kind text := lower(trim(coalesce(kind_input, 'purchase')));
  v_row public.discount_codes%rowtype;
begin
  if v_kind not in ('purchase', 'renewal') then
    return jsonb_build_object('ok', false, 'reason', 'bad_kind');
  end if;

  select * into v_row
  from public.discount_codes
  where upper(trim(code)) = v_code
  limit 1;

  if not found or not v_row.active then
    return jsonb_build_object('ok', false, 'reason', 'not_found');
  end if;

  if v_row.valid_until is not null and v_row.valid_until < now() then
    return jsonb_build_object('ok', false, 'reason', 'expired');
  end if;

  if v_row.max_uses is not null and v_row.used_count >= v_row.max_uses then
    return jsonb_build_object('ok', false, 'reason', 'exhausted');
  end if;

  if v_row.applies_to <> 'both' and v_row.applies_to <> v_kind then
    return jsonb_build_object('ok', false, 'reason', 'wrong_kind');
  end if;

  return jsonb_build_object(
    'ok', true,
    'percent', v_row.percent_off,
    'code', v_row.code
  );
end;
$$;

grant execute on function public.validate_discount_code(text, text) to anon, authenticated;

-- Seed sample codes (safe to re-run)
insert into public.discount_codes (code, percent_off, applies_to, note)
values
  ('METRICO10', 10, 'both', 'Launch 10%'),
  ('METRICO20', 20, 'both', 'Launch 20%'),
  ('RENEW15', 15, 'renewal', 'Renewal 15%')
on conflict (code) do nothing;
