# Metrico — security status (summary)

Last updated: 2026-07-25 · App version: see `index.html` `APP_VERSION`

**Maturity target:** 5/5 when all SQL scripts below are applied **and** Edge Function `secure-delete-account` is deployed.

## Implemented (v2.53.0+)

| Control | Implementation |
|---------|----------------|
| Profiles bypass | `profiles-hardening.sql` |
| Demo password in git | Removed; Guide password field |
| Portal spam | Rate limit in `owner-portal-messages.sql` |
| Account deletion OTP (server) | Edge `secure-delete-account` + fallback `account-deletion-server.sql` |
| Admin audit | `admin-audit-log.sql` |
| DSAR export | `export-user-data.sql` + backup v4 in app |
| Retention | `data-retention.sql` (`purge_stale_metrico_data`) |
| Demo metadata (client) | `authUpdateUserData()` blocks demo writes except one-time seed |
| Public EN privacy | `privacy-en.html` |

## Supabase run order (after existing scripts)

1. `account-deletion-server.sql` (after `account-deletion.sql`)
2. `admin-audit-log.sql` (after `product-feedback.sql`)
3. `export-user-data.sql`
4. `data-retention.sql`

## Edge Function (recommended for 5/5 deletion)

Deploy `supabase/functions/secure-delete-account` — see `supabase/functions/README.md`.

## Residual (acceptable for static SPA)

- **CSP** strict policy not compatible with in-browser Babel without a build pipeline.
- **Demo metadata API** — direct Auth API updates still possible unless Supabase Auth hook is added later.
- **Anon key** in client — by design; RLS + RPC enforce access.

## Related

- `docs/COMPLIANCE-STATUS.md`
- `docs/ROPA.md`
