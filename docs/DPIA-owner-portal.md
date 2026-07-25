# DPIA — Owner portal (summary)

Version: 2026-07-25 · Metrico app

## 1. Description

Developers generate a **secret link** (UUID token) so a **buyer** can view unit progress, gallery, installments, and send messages **without** a Metrico login. Data is loaded via Supabase RPCs with the token; `anon` role may read/submit within token scope.

## 2. Necessity & proportionality

- **Purpose:** Transparency to buyers and async communication — core to construction sales.
- **Minimization:** Payload is limited to one unit/project; aggregate stats hide other buyers’ names.
- **Alternatives:** PDF/email only — weaker audit trail and no structured messaging.

## 3. Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Token leak → unauthorized view | Medium | High (buyer PII, financial) | UUID token; user education; revoke link in app |
| Anon abuse (spam messages) | Low | Medium | Rate limits recommended (future); message length cap (500 chars) |
| Processor vs controller confusion | Medium | Legal | B2B customer is controller for buyer data; Metrico processor — see `docs/ROPA.md` |
| No recorded buyer consent to platform | Medium | Medium | Customer should inform buyers; link = implied invitation |

## 4. Measures in place

- RLS + SECURITY DEFINER RPCs (`owner-portals.sql`, `owner-portal-messages.sql`, `demo-readonly.sql`).
- Tokens from `crypto.randomUUID` / CSPRNG on client.
- Privacy policy discloses portal behaviour (FA/EN).

## 5. Residual risk & decision

**Residual risk:** Medium — acceptable for controlled B2B rollout if customers contractually accept processor role and secure link handling.

**Review trigger:** Public EU marketing, high-volume anon traffic, or regulatory request.

**Sign-off:** Product owner / DPO (document name in About page when appointed).
