<!-- PROJECT LOGO & HEADER -->
<div align="center">
  <img src="icons/icon-512.png" alt="Metrico Logo" width="120" height="120" style="border-radius: 24px; box-shadow: 0 8px 24px rgba(0,0,0,0.15);"/>

  # Metrico · میتریکو
  ### Smart Construction & Real-Estate Project Management Platform

  <p align="center">
    <img src="https://img.shields.io/badge/Version-2.44.0-blue?style=for-the-badge&logo=semver" alt="Version"/>
    <img src="https://img.shields.io/badge/PWA-Ready-orange?style=for-the-badge&logo=progressive-web-apps" alt="PWA"/>
    <img src="https://img.shields.io/badge/RTL-Persian-green?style=for-the-badge" alt="RTL"/>
    <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React"/>
    <img src="https://img.shields.io/badge/Supabase-Auth-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase"/>
  </p>

  <p align="center">
    <strong>A mobile-first Progressive Web App for developers, investors, and construction managers — built in Persian (RTL), works offline, and installs like a native app.</strong>
  </p>

  <p align="center">
    <em>مدیریت پروژه‌های ساختمانی · واحدها · اقساط · حسابداری · انبار · متره · انرژی</em>
  </p>
</div>

---

## Overview

**Metrico** is an all-in-one platform for construction and real-estate project management. It connects on-site unit tracking, installment sales, expense logging, project accounting, material inventory, quantity takeoff, energy estimation, and interactive maps — in a single, fast, Persian-first interface.

Designed for teams who juggle multiple projects, buyers, contractors, and financial transactions daily. Metrico replaces scattered spreadsheets, paper notes, and messaging threads with one structured workspace that calculates revenue, expenses, profit, receivables, and payables automatically.

| | |
|---|---|
| **Audience** | Developers, contractors, investors, sales managers, project accountants |
| **Language** | Full Persian UI · RTL layout · Jalali-friendly dates |
| **Deployment** | Static PWA — host on any web server or CDN |
| **Data model** | Project data stored locally per device · Supabase for authentication & subscription |

---

## Key Features

### Core Project Management
- **Visual building map** — floors and units rendered as a color-coded grid (sold / reserved / vacant)
- **Unit profiles** — area, orientation, buyer info, price per m², down payment, installment schedules
- **Multi-project dashboard** — swipeable project cards with progress, revenue, expenses, profit, receivables & payables
- **Contacts CRM** — investors, buyers, contractors, suppliers with role filters and balance tracking
- **Notes & reminders** — project-level quick notes and scheduled alerts

### Financial & Accounting
- **Expense tracker** — categorized payments with payment method, linked contacts, and document attachments
- **Project accounting** — bank accounts, investor capital, transaction ledger, inter-account transfers
- **Financial reports** — per-project revenue, cost, net profit, and sold-unit analytics
- **FAB report hub** — account balances, cash flow, and cheque reports in bottom-sheet popups
- **PDF / print export** — printable reports for expenses, contacts, accounts, cheques, units, inventory, and more

### Advanced Tools
- **Material inventory** — stock tracking, in/out transactions, project allocation *(Pro plan)*
- **Quantity takeoff & estimation** — 5-category material estimates + map-based area measurement *(Ark plan)*
- **Energy calculations** — building energy consumption estimates *(Ark plan)*
- **Interactive maps** — Leaflet-powered project geolocation, multi-project overview, KML export with avg. sale price per m²
- **Tax module** — structured financial data for compliance workflows *(Pro plan)*
- **AI chat assistant** — natural-language queries about projects, sales, costs, profit, and energy (with voice input)
- **Global search** — instant filter across projects, units, and contacts from the header

### Platform & UX
- **True standalone PWA** — no browser chrome after install · portrait-optimized · custom splash
- **Offline-first shell** — Service Worker caches app shell and libraries for fast cold starts
- **Radial FAB menu** — one-tap access to new projects, finance actions, and reports
- **In-app guide** — step-by-step tutorials for every major module
- **Backup & restore** — full JSON export/import of all local project data
- **Auto session timeout** — secure logout after inactivity

---

## Subscription Plans

Metrico uses tiered subscriptions with feature gating. Higher plans inherit all lower-tier capabilities.

| Plan | Persian Name | Highlights |
|------|-------------|------------|
| **Start** | میتریکو آغاز | Free · 1 project · unit sales & expenses · 15 contacts |
| **Plus** | میتریکو پلاس | Up to 3 projects · PDF export · AI chat · maps · backup/restore |
| **Pro** | میتریکو پرو | Up to 10 projects · full accounting · material inventory · tax · KML |
| **Ark** | میتریکو ارک | Unlimited projects · energy calculations · quantity takeoff |

Activation codes and plan upgrades are managed via Supabase RPC functions. An admin panel supports member management and code generation for super-admins.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **UI** | React 18 (in-browser JSX via Babel Standalone) |
| **Styling** | Tailwind CSS (runtime) · custom Lucide-style SVG icons |
| **Charts** | ApexCharts |
| **Maps** | Leaflet |
| **Auth & billing** | Supabase (Auth + PostgreSQL RPCs) |
| **Local storage** | `localStorage` for all project/business data |
| **PWA** | `manifest.json` + Service Worker (`sw.js`) |
| **Fonts** | Vazirmatn (Persian) |

> **Architecture note:** Metrico is intentionally a single-file SPA (`index.html`) with vendored libraries under `lib/`. No build step required — deploy the folder as-is.

---

## Repository Structure

```bash
Metrico/
├── index.html              # Main SPA — UI, logic, and styles
├── manifest.json           # PWA metadata (RTL, Persian, standalone)
├── sw.js                   # Service Worker & asset cache map
├── logo.png                # Brand logo
├── icons/
│   ├── icon-192.png
│   └── icon-512.png
├── fonts/
│   └── Vazirmatn.woff2     # Persian web font
├── lib/                    # Vendored dependencies (offline-ready)
│   ├── react.production.min.js
│   ├── react-dom.production.min.js
│   ├── babel.min.js
│   ├── tailwind.js
│   ├── apexcharts.min.js
│   ├── leaflet.js
│   ├── leaflet.css
│   └── supabase.js
└── supabase/               # Database schema & admin SQL scripts
    ├── plans.sql           # Subscription plans, codes, upgrade RPCs
    ├── admin.sql           # Roles & member management
    └── admin-members-tools.sql  # Signup trigger, activation & plan code tools
```

---

## Getting Started

### 1. Deploy the static files

Upload the repository contents to any static host (GitHub Pages, Netlify, Vercel, cPanel, etc.). Ensure `index.html` is served at the site root.

### 2. Configure Supabase

1. Create a Supabase project
2. Run the SQL scripts in `supabase/` in order:
   - `plans.sql`
   - `admin.sql`
   - `admin-members-tools.sql`
3. Set your Supabase URL and anon key in `index.html` (search for `SUPABASE_URL`)

### 3. Install as PWA

Open the deployed URL on mobile → **Add to Home Screen**. The app runs in standalone mode with offline shell caching.

### 4. Activate an account

New users register with email/password, then enter an activation code provided by the system administrator.

---

## Screenshots

> _Add screenshots of the dashboard, project view, accounting screen, and plan comparison table here._

---

## Privacy & Data

- **Authentication** is handled by Supabase — each user's account is isolated
- **Project data** (units, expenses, accounting, inventory, etc.) is stored in the browser's local storage on the user's device
- **Backup files** are JSON exports the user controls — no automatic cloud sync of business data
- Auto-logout after 10 minutes of inactivity

---

## Roadmap

- [ ] Online payment integration for plan upgrades
- [ ] Cloud sync option for multi-device teams
- [ ] English / bilingual UI toggle

---

## Author

**Mehrzad Saeedi** · Sepehr Construction Group

For activation codes and commercial licensing, contact the author.

---

<div align="center">
  <sub>Metrico v2.44.0 · Built with care for the construction industry in Iran</sub>
</div>
