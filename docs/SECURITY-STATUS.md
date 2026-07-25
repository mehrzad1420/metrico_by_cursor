# Metrico — security status (summary)

Last updated: 2026-07-25 · App version: see `index.html` `APP_VERSION`

## Fixed in repo (v2.52.3+)

- **Profiles privilege bypass:** `profiles-hardening.sql` revokes client `UPDATE` on `profiles`; trigger blocks sensitive columns unless `metrico.profile_admin_update` is set inside trusted RPCs (`activate_with_code`, `set_user_plan`, admin SQL).
- **Demo password:** removed from frontend bundle; demo login uses password typed in Guide (operator sets password in Supabase Auth; see `supabase/README.md`).
- **Owner portal spam:** rate limit on `submit_owner_portal_message` (8 messages / minute / token) in `owner-portal-messages.sql`.

## Accepted / by design

- **Supabase anon key** in `index.html` — public; rely on RLS + RPC checks.
- **Owner portal anon RPCs** — token-gated read/message; UUID token entropy.

## Open (honest)

- **Account deletion OTP** is verified in the browser; `delete_my_account` trusts the session JWT. Full fix: Edge Function or Auth hook that binds deletion to OTP/MFA (roadmap).
- **CSP** not enforced on GitHub Pages static SPA (inline Babel/React).
- **Demo `user_metadata`** still writable at Auth layer if `demo-readonly.sql` not applied.
- **Super-admin actions** not audit-logged.

## Supabase run order (security-related)

After base scripts, run:

`profiles-hardening.sql`

Re-run or patch `owner-portal-messages.sql` for rate limit if already deployed.

## Related

- `docs/COMPLIANCE-STATUS.md`
- `docs/ROPA.md`
