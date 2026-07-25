# Metrico — compliance & readiness status (summary)

Last updated: 2026-07-25 · App version: see `index.html` `APP_VERSION`

## Data hosting

- **Processor / infrastructure:** Supabase (PostgreSQL + Auth).
- **Tenant isolation:** Row Level Security on `projects`, `profiles`, owner portal tables.
- **Demo account:** Server-side read-only for projects/portals when `demo-readonly.sql` is applied; optional one-time seed via `plan-enforcement.sql` → `ensure_demo_project_seed`.

## In-app assistant

- Rule-based answers from the user’s own data.
- No third-party LLM API for chat text.

## Owner portal

- Token URL grants access without login; treat links as secrets.
- New tokens use `crypto.randomUUID` (client).

## User rights (GDPR-oriented, operational)

- In-app privacy policy (FA/EN strings).
- Full account deletion: request via About page; target response within 30 business days.
- **Not yet formalized:** signed DPA with Supabase, documented EU region choice, RoPA, DPIA PDF.

## Engineering evidence

- SQL migrations tracked under `supabase/` with run order in `supabase/README.md`.
- CI smoke workflow: `.github/workflows/smoke.yml` checks `APP_VERSION` on push.

## Known gaps (honest)

- Plan limits enforced on **project INSERT** (server); other plan features remain client-gated.
- Auth `user_metadata` (contacts, company) not blocked for demo at Auth layer.
- No Playwright E2E yet — smoke check only.
