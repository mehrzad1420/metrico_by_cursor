# Metrico — technical due diligence one-pager

**Document type:** Investor / partner technical summary  
**Last updated:** 2026-07-25  
**Application version:** 2.54.1 (see `index.html` `APP_VERSION`)  
**Live demo (frontend):** https://mehrzad1420.github.io/metrico_by_cursor/index.html  
**Source:** https://github.com/mehrzad1420/metrico_by_cursor  

---

## 1. What Metrico is

Metrico is a **Persian-first, mobile-oriented PWA** for construction and real-estate project management: units and sales, installments, project accounting, inventory, quantity takeoff, maps, owner portal, and subscription tiers. Data is stored per authenticated user in **Supabase (PostgreSQL + Auth)** with offline-friendly client caching.

**Primary users:** developers, contractors, investors, and project accountants managing multiple building projects in Iran, with documentation aimed at EU-style privacy and security diligence.

---

## 2. Architecture (30-second view)

| Layer | Choice | Notes |
|-------|--------|--------|
| Client | Single-page React app (static) + Service Worker | Deployed on GitHub Pages; no production bundler yet (ADR-001) |
| Identity | Supabase Auth (JWT) | Anon key in client — expected for Supabase SPAs |
| Data | PostgreSQL + RLS | Projects JSONB; profiles; owner portal tables |
| Sensitive flows | Edge Function + RPCs | Account deletion with email OTP (`secure-delete-account`) |
| Secondary state | Auth `user_metadata` | Contacts, company, reminders — export via backup v4 + optional `export_my_data` RPC |

**Decision record:** `docs/ADR-001-static-spa-supabase.md` · **Detail:** `docs/ARCHITECTURE.md`

---

## 3. Maturity snapshot (honest)

Scores reflect **repository + documented operator steps**; production score depends on Supabase SQL/Edge deployment.

| Area | Repo readiness | Production (operator-dependent) |
|------|----------------|----------------------------------|
| Security controls (RLS, hardening, delete/export) | Strong — SQL + Edge in repo | **Conditional** until scripts applied per `supabase/README.md` |
| Privacy / GDPR-oriented ops | Strong docs + in-app flows | **Conditional** — region, DPA, public DPO/contact on About |
| Architecture clarity | Good — ADR + roadmap | N/A |
| Operations (deploy, rollback, CI) | Good — v2.54.1 runbook + smoke CI | Frontend verified on push; backend manual |
| Test automation | Basic smoke only | No E2E in CI yet |
| Scalability | Suitable for thousands of B2B users on Supabase | Not multi-region active-active |

**Security summary:** `docs/SECURITY-STATUS.md`  
**Compliance summary:** `docs/COMPLIANCE-STATUS.md`  
**Processing map:** `docs/ROPA.md` · **Owner portal DPIA:** `docs/DPIA-owner-portal.md`

---

## 4. What diligence reviewers should verify

1. **Supabase project:** All SQL files in run order (`supabase/README.md`), including v2.54+ `plan-features-enforcement.sql` and privacy pack (`profiles-hardening`, `export-user-data`, `data-retention`, `admin-audit-log`, `account-deletion-server`).
2. **Edge Function:** `secure-delete-account` deployed and smoke-tested (staging user only).
3. **Legal / privacy:** Supabase region, DPA, controller/processor roles, published contact on About; public EN policy at `privacy-en.html`.
4. **CI:** GitHub Actions **Smoke check** on `main` — ops preflight, secret pattern scan, Pages version match.
5. **Backups:** Supabase backup/PITR enabled; restore drill documented in `docs/OPERATIONS-RUNBOOK.md` (operator responsibility).

---

## 5. Material risks (disclosed)

| Risk | Mitigation in repo | Residual |
|------|-------------------|----------|
| DB drift vs code | Versioned SQL + README order | Manual apply — no CI deploy to Supabase |
| Client plan gates bypass | Server checks on project INSERT + owner portal upsert | Other features still client-gated |
| Demo account abuse | Read-only SQL + client metadata guard | Direct Auth metadata API not blocked at Auth layer |
| Large monolith frontend | Documented Phase B (Vite, split) | Maintainability cost until build pipeline |
| No external uptime monitoring | Runbook recommends checks | Alerting not wired |

---

## 6. Evidence index (start here)

| Document | Purpose |
|----------|---------|
| `README.md` | Product overview, features, setup |
| `docs/ARCHITECTURE.md` | Boundaries, roadmap |
| `docs/ADR-001-static-spa-supabase.md` | Why static SPA + Supabase |
| `docs/SECURITY-STATUS.md` | Security control list |
| `docs/COMPLIANCE-STATUS.md` | Privacy, DSAR, erasure, gaps |
| `docs/OPERATIONS-RUNBOOK.md` | Release, rollback, Supabase ops |
| `docs/ROPA.md` | Record of processing activities |
| `supabase/README.md` | SQL migration order |
| `.github/workflows/smoke.yml` | Automated release checks |

---

## 7. Technical writer verdict

**Documentation trail:** Above average for an early-stage product — status docs, ADR, runbook, and compliance artifacts are **linked and aligned with code** (post v2.54.x audit passes). A reviewer can trace claims from this page to SQL filenames and CI steps without spelunking the monolith.

**Investment / partnership framing:** Metrico is **technically credible** as a B2B vertical SaaS on Supabase with deliberate server-side enforcement for subscription and sensitive user rights. It is **not** yet a fully automated enterprise platform: backend promotion is operator-driven, and observability/E2E are thin.

**Recommended narrative:** *“Security and privacy enforced at PostgreSQL + Edge; frontend is intentionally simple to ship; roadmap includes build pipeline and metadata migration.”*

---

*Prepared as the closing artifact of the Metrico documentation & diligence review series (Reality → Privacy → SecOps → Archaeologist → Architect → DevOps → Technical Writer).*
