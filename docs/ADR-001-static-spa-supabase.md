# ADR-001: Static PWA + Supabase BaaS

## Status

Accepted (2026-07-25)

## Context

Metrico targets construction teams in Iran first, with a path toward EU startup due diligence. The team is small; deployment must stay cheap (GitHub Pages). The product grew as a single-file React SPA with in-browser Babel transpilation.

## Decision

1. **Frontend:** One static PWA (`index.html` + service worker), no build pipeline in production yet.
2. **Backend:** Supabase PostgreSQL + Auth + Edge Functions for sensitive flows (account deletion).
3. **Business rules on server:** RLS, `SECURITY DEFINER` RPCs, triggers (project count limits, demo read-only, plan checks on owner portal writes).
4. **Secondary data:** Company, contacts, reminders, inventory live in Auth `user_metadata` until a later migration to PostgreSQL (see `docs/ARCHITECTURE.md` roadmap).

## Consequences

**Easier**

- Fast deploys and demos; clear SQL migration folder; EU pitch: “security at the database layer.”

**Harder**

- Large single file maintenance; strict CSP and bundle optimization without a build step; unified GDPR export across metadata + tables requires export RPC + backup v4.

**Reversibility**

- High for backend (SQL evolves incrementally). Medium for frontend (Vite/React build can wrap existing components over time).

## Supersedes

None.
