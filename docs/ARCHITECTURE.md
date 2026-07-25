# Metrico — architecture overview

Last updated: 2026-07-25 · App version: see `index.html` `APP_VERSION`

Decision record: `docs/ADR-001-static-spa-supabase.md`

## Pattern

**Modular monolith (client) + BaaS (server)** — not microservices. Appropriate for current team size and stage.

```
[Browser PWA]
  React UI (single SPA) ──► Supabase Auth (JWT)
         │                      │
         │                      ├── PostgreSQL (RLS)
         │                      │     projects, profiles, owner_portals, …
         │                      └── Edge Functions (OTP delete)
         └── localStorage (offline cache + sync queue)
         └── user_metadata (company, contacts, reminders, inventory)
```

## Bounded areas (logical)

| Area | Primary storage | Server enforcement |
|------|-----------------|-------------------|
| Projects / units / finances | `projects.data` JSONB | RLS; demo read-only; INSERT plan limit trigger |
| Subscription | `profiles` | No client UPDATE (`profiles-hardening.sql`); RPCs for plan/codes |
| Owner portal | `owner_portals`, messages | Token RPCs; rate limit; plan check on portal upsert |
| Admin | RPCs + `admin_audit_log` | `is_super_admin()` |
| App settings (CRM-like) | Auth metadata | Client plan gates; server export via `export_my_data` |

## Quality attributes (honest)

- **Availability:** Depends on Supabase + GitHub Pages; offline-first for project edits (queue).
- **Security:** Defense in DB (RLS, RPC, Edge for delete); anon key in client is expected for Supabase SPAs.
- **Maintainability:** Limited by monolith file size — see roadmap.
- **Scalability:** Suitable for thousands of B2B users on Supabase; not designed for multi-region active-active yet.

## Roadmap (architecture)

### Phase A — now (shipped in repo)

- SQL catalog under `supabase/` with documented run order.
- Server-side project limits; owner portal plan enforcement (`plan-features-enforcement.sql`).
- Privacy/security/compliance docs aligned with code.

### Phase B — next (recommended before large team)

- **Build pipeline:** Vite (or similar) + code splitting; remove in-browser Babel.
- **Metadata migration:** Optional `user_app_data` table (JSONB per user) with RLS — single server source for contacts/company/inventory for reporting and DSAR.
- **Broader plan enforcement:** Extend `check_plan_feature` to more RPCs as features gain server endpoints.

### Phase C — scale / EU

- Supabase region + DPA; cron for `purge_stale_metrico_data`.
- E2E tests (Playwright) in CI; stricter CSP on built assets.

## Related docs

- `supabase/README.md` — SQL run order
- `docs/OPERATIONS-RUNBOOK.md`
- `docs/SECURITY-STATUS.md`
- `docs/COMPLIANCE-STATUS.md`
