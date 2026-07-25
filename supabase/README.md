# Supabase setup — Metrico

Run these SQL scripts **in order** in Supabase Dashboard → SQL Editor.

| # | File | Purpose |
|---|------|---------|
| 1 | `schema.sql` | Base tables: `profiles`, `projects`, `activation_codes` + RLS + `activate_with_code` |
| 2 | `plans.sql` | Subscription plans, `plan_codes`, `redeem_plan_code`, payment stub |
| 3 | `admin.sql` | Super-admin role + `admin_list_members`, `admin_set_member_plan` |
| 4 | `admin-members-tools.sql` | Activation/plan code generators from app admin panel |
| 5 | `owner-portals.sql` | Owner portal links (`owner_portals`, `get_owner_portal`) |
| 6 | `owner-portal-messages.sql` | Owner ↔ developer messaging |
| 7 | `product-feedback.sql` | About-page feedback → super admin inbox |
| 8 | `demo-readonly.sql` | Server-side read-only for `demo@metrico.app` (RLS + portal RPCs) |
| 9 | `plan-enforcement.sql` | Project count limits + `ensure_demo_project_seed` RPC |
| 10 | `account-deletion.sql` | Self-service GDPR erasure → `delete_my_account()` |
| 11 | `profiles-hardening.sql` | Block client updates to plan/role/activated on `profiles` |
| 12 | `account-deletion-server.sql` | Deletion gate: OTP mark + JWT freshness (fallback path) |
| 13 | `admin-audit-log.sql` | Super-admin audit log + patched admin RPCs |
| 14 | `export-user-data.sql` | DSAR JSON export RPC `export_my_data` |
| 15 | `data-retention.sql` | Purge old portal messages / read feedback (admin) |
| — | `projects-updated-at-fix.sql` | **If saves fail** with `record "new" has no field "updated_at"` |

## After running scripts

1. Set `SUPABASE_URL` and anon key in `index.html` (lines 13–15).
2. Promote your account to super-admin (edit email in `admin.sql` if needed, then re-run the UPDATE block).
3. Create an activation code:
   ```sql
   insert into public.activation_codes (code, note)
   values ('ACT-PILOT-01', 'کاربر آزمایشی');
   ```
4. (Optional) Create plan upgrade codes — see comments at bottom of `plans.sql`.

## Data model

| Table | Contents |
|-------|----------|
| `profiles` | `activated`, `plan`, `role`, expiry dates |
| `projects` | One row per project; JSON in `data` column |
| `activation_codes` | One-time signup activation |
| `plan_codes` | One-time plan upgrade codes |
| `owner_portals` | Public owner portal payloads (token URL) |

Company name, contacts, reminders, and inventory are stored in Supabase Auth `user_metadata` (not separate tables).

## Security notes

- Project data is isolated per user via RLS on `projects`.
- `activation_codes` and admin RPCs use `security definer` — users cannot read codes directly.
- Review `owner_portals` policies if you change public portal behavior.
- Run `profiles-hardening.sql` so clients cannot UPDATE `profiles` (plan/role/activation bypass).
- Run `account-deletion.sql` so users can erase their account after email OTP in **Company Info**.
- In Supabase Dashboard → **Authentication** → **Providers** → Email: enable **Email OTP** (or magic link + OTP template) so deletion codes can be sent to the registered email.
- **Demo password:** set only in Supabase Auth; users type it in Guide → demo (not in git).
- Auth `user_metadata` (contacts, company, inventory) is still writable by the demo user until a Supabase Auth hook blocks it — use a dedicated demo project only.
