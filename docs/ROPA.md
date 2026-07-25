# Metrico — Record of Processing Activities (RoPA)

Last updated: 2026-07-25 · App version: see `index.html` `APP_VERSION`

## Controller & contact

| Role | Entity |
|------|--------|
| **Controller (app accounts)** | Metrico operator — identity and DPO contact on the in-app **About** page |
| **Processor (hosting)** | [Supabase Inc.](https://supabase.com) — PostgreSQL, Auth, RLS |
| **Sub-processors** | See Supabase DPA and sub-processor list in your Supabase project settings |

**EU transfers:** Choose a Supabase **region** (e.g. EU) in the project dashboard. Sign Supabase’s [DPA](https://supabase.com/legal/dpa) and document the region in your pitch deck.

## B2B buyer / owner data

Customers (developers/contractors) are typically **controllers** for buyer PII entered into projects and owner portals. **Metrico** acts as **processor** for storage and portal delivery on their instructions. A customer-facing DPA should be offered before EU scale.

## Processing activities

| # | Activity | Data categories | Storage | Legal basis (typical) | Retention | Erasure |
|---|----------|-----------------|---------|----------------------|-----------|---------|
| 1 | Account & auth | Email, password hash | Supabase Auth | Contract | Life of account | `delete_my_account()` RPC + client clears local cache |
| 2 | Subscription profile | Plan, activation, role | `profiles` | Contract | Life of account | CASCADE on auth user delete |
| 3 | Project ERP | Units, buyers, phones, finance, docs (JSON) | `projects.data` | Contract / legitimate interest | Life of account | CASCADE |
| 4 | CRM-lite | Company, contacts, inventory, reminders | Auth `user_metadata` | Contract | Life of account | Removed with auth user; client backup may retain copy until cleared |
| 5 | Owner portal | Token, unit payload (name, phone, installments, gallery) | `owner_portals` | Customer’s contract with buyer | Until link revoked or account deleted | Developer deletes link or account deletion |
| 6 | Owner messages | Sender name, phone, text | `owner_portal_messages` | Same as portal | Until account deleted | CASCADE |
| 7 | Product feedback | Email, company, message | `product_feedback` | Legitimate interest | Until account deleted | CASCADE |
| 8 | Local device cache | Project snapshot, offline queue | Browser `localStorage` | Strictly necessary (functionality) | Until logout / account delete flow | Cleared on logout and after self-delete |
| 9 | Map tiles | IP address to tile CDN | OpenStreetMap tile servers | Legitimate interest (map feature) | Per OSM operator policy | N/A (no account at OSM) |
| 10 | In-app assistant | Questions (in-memory) | Not persisted to third-party AI | N/A | Session only | N/A |

## Technical measures

- Row Level Security on tenant tables.
- Owner portal: unguessable token; anon RPCs scoped to token.
- Demo account: server read-only when `demo-readonly.sql` applied.
- No marketing analytics cookies in current build.

## DSAR (access / portability)

- **Export:** in-app **Backup** → JSON (projects, company, contacts, reminders, inventory).
- **Full erasure:** Privacy page → **Delete account** (requires `account-deletion.sql` on Supabase).
- **Other requests:** About page contact; target response within 30 business days.

## Retention notes

- No automated purge of old portal messages or feedback while the account is active.
- After account deletion, database rows tied to the user are removed via CASCADE (codes unlinked, payment_events rows for that user deleted in RPC).

## Related documents

- `docs/COMPLIANCE-STATUS.md`
- `docs/DPIA-owner-portal.md`
- `supabase/README.md` (SQL run order)
