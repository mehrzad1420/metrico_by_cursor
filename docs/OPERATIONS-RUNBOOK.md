# Metrico — operations runbook (frontend + Supabase)

Last updated: 2026-07-25 · App version: see `index.html` `APP_VERSION`

## Deploy frontend (GitHub Pages)

1. Merge or push to `main`.
2. Wait for GitHub Actions **Smoke check** to pass (compares `APP_VERSION` on Pages with repo; retries for deploy lag).
3. Hard-refresh the app or reinstall PWA if users report an old version.

**Rollback:** revert the git commit on `main` and push; bump `APP_VERSION` and `sw.js` `CACHE_NAME` together on any forward fix.

## Before every release (developer)

1. Set the same version in `index.html` (`APP_VERSION`) and `sw.js` (`metrico-cache-vX.Y.Z`).
2. Run locally:

```bash
node scripts/ops-preflight.mjs
node scripts/smoke-check.mjs index.html
```

3. Only list files in `sw.js` `ASSETS` that exist in the repository (precache fails silently for missing URLs on install).

## Supabase (operator — not automated in CI)

Run SQL in order: `supabase/README.md`.

After app releases that add SQL:

1. Apply new `.sql` files in the Dashboard SQL Editor (or CLI).
2. Redeploy Edge Function `secure-delete-account` if `supabase/functions/secure-delete-account` changed.
3. Smoke-test: login, save project, owner portal (if used), backup export, delete-account OTP (staging user only).

**Backups:** enable Supabase project backups / PITR per your plan; test restore in a non-production project periodically.

**Secrets:** never commit `.env` or service role keys. Anon key in `index.html` is expected; protect data with RLS and RPC.

## Monitoring (recommended)

- GitHub Actions: failed **Smoke check** on `main`.
- Supabase Dashboard: Auth errors, Edge Function invocations, database CPU/storage.
- Optional external uptime check on the Pages URL.

## Related

- `docs/ARCHITECTURE.md`
- `docs/COMPLIANCE-STATUS.md` (server dependency checklist)
- `.github/workflows/smoke.yml`
