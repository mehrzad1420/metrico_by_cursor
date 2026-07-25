# Metrico — compliance & readiness status (summary)

Last updated: 2026-07-25 · App version: see `index.html` `APP_VERSION`

## Data hosting

- **Processor / infrastructure:** Supabase (PostgreSQL + Auth).
- **Tenant isolation:** Row Level Security on `projects`, `profiles`, owner portal tables.
- **Demo account:** Server-side read-only for projects/portals when `demo-readonly.sql` is applied; optional one-time seed via `plan-enforcement.sql` → `ensure_demo_project_seed`.
- **RoPA:** `docs/ROPA.md` (processing map, DSAR, retention notes).
- **Owner portal DPIA:** `docs/DPIA-owner-portal.md`.

## In-app assistant

- Rule-based answers from the user’s own data.
- No third-party LLM API for chat text.

## Owner portal

- Token URL grants access without login; treat links as secrets.
- New tokens use `crypto.randomUUID` (client).
- B2B: customer typically **controller** for buyer data; Metrico **processor** — stated in Privacy screen.

## User rights (GDPR-oriented, operational)

- In-app privacy policy (FA/EN strings).
- **Public EN privacy (web):** `privacy-en.html` on GitHub Pages — linked from the in-app Privacy screen.
- **Portability:** Backup screen → JSON export v4 (local state + optional `export_my_data` RPC when `export-user-data.sql` is applied).
- **Erasure:** Company Info → email OTP → Edge Function `secure-delete-account` (preferred) or OTP + `mark_account_deletion_verified` + `delete_my_account` (requires `account-deletion.sql` + `account-deletion-server.sql`); local cache cleared on logout/delete.
- Manual contact via About page for requests not covered by in-app tools; target 30 business days.
- **Operator must still:** pick Supabase region, sign Supabase DPA, publish controller/DPO contact on About.

## Erasure & export — server dependencies

These controls exist in the repo; they are **active in production only after** the operator runs SQL and deploys Edge Functions on the Supabase project:

| Control | Repo | Operator action |
|---------|------|-----------------|
| Stricter deletion gate | `account-deletion-server.sql` | Run in SQL Editor (after `account-deletion.sql`) |
| Server-side delete OTP | `supabase/functions/secure-delete-account` | Deploy Edge Function |
| DSAR server export | `export-user-data.sql` | Run in SQL Editor |
| Super-admin audit | `admin-audit-log.sql` | Run in SQL Editor |
| Retention purge | `data-retention.sql` | Run + optional cron |

Full order: `supabase/README.md`. Security summary: `docs/SECURITY-STATUS.md`.

## Third-party technical processing

- **OpenStreetMap** map tiles (`tile.openstreetmap.org`) — IP may be sent when using the map; disclosed in Privacy policy.

## Engineering evidence

- SQL migrations tracked under `supabase/` with run order in `supabase/README.md`.
- CI smoke workflow: `.github/workflows/smoke.yml` checks `APP_VERSION` on push.

## Known gaps (honest)

- Plan limits enforced on **project INSERT** (server); other plan features remain client-gated.
- Auth `user_metadata` (contacts, company) not blocked for demo at Auth layer (client guard only).
- No Playwright E2E yet — smoke check only.
- Retention purge (`purge_stale_metrico_data`) is manual or scheduled — not automatic for active accounts.
- Full EU GDPR readiness still requires operator legal steps (region, DPA, DPO/contact on About).
