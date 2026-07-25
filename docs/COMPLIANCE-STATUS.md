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

- **Portability:** Backup screen → JSON export.

- **Erasure:** Company Info → **Delete account** → email OTP, then RPC `delete_my_account` (requires `account-deletion.sql` on Supabase); local cache cleared on logout/delete.

- Manual contact via About page for requests not covered by in-app tools; target 30 business days.

- **Operator must still:** pick Supabase region, sign Supabase DPA, publish controller/DPO contact on About.



## Third-party technical processing



- **OpenStreetMap** map tiles (`tile.openstreetmap.org`) — IP may be sent when using the map; disclosed in Privacy policy.



## Engineering evidence



- SQL migrations tracked under `supabase/` with run order in `supabase/README.md`.

- CI smoke workflow: `.github/workflows/smoke.yml` checks `APP_VERSION` on push.



## Known gaps (honest)



- Plan limits enforced on **project INSERT** (server); other plan features remain client-gated.

- Auth `user_metadata` (contacts, company) not blocked for demo at Auth layer.

- No Playwright E2E yet — smoke check only.

- No automated retention purge for old portal messages while account is active.

- Standalone public EN privacy URL (outside SPA) not yet published.

- Internal super-admin access logging not implemented.

