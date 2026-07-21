<p align="center">
  <img src="icons/icon-512.png" alt="Metrico Logo" width="120" height="120" style="border-radius: 24px; box-shadow: 0 8px 24px rgba(0,0,0,0.15);"/>
</p>

<h1 align="center">Metrico · میتریکو</h1>
<h3 align="center">Smart Construction &amp; Real-Estate Project Management Platform</h3>

<p align="center">
  <img src="https://img.shields.io/badge/Version-2.50.7-blue?style=for-the-badge" alt="Version"/>
  <img src="https://img.shields.io/badge/PWA-Ready-orange?style=for-the-badge" alt="PWA"/>
  <img src="https://img.shields.io/badge/RTL-Persian-green?style=for-the-badge" alt="RTL"/>
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&amp;logo=react&amp;logoColor=white" alt="React"/>
  <img src="https://img.shields.io/badge/Supabase-Auth-3ECF8E?style=for-the-badge&amp;logo=supabase&amp;logoColor=white" alt="Supabase"/>
</p>

<p align="center">
  <strong>A mobile-first Progressive Web App for developers, investors, and construction managers.</strong><br/>
  Built in Persian (RTL) · works offline · installs like a native app
</p>

<p align="center"><em>مدیریت پروژه‌های ساختمانی · واحدها · اقساط · حسابداری · انبار · متره · انرژی</em></p>

---

## Overview

**Metrico** is an all-in-one platform for construction and real-estate project management. It connects on-site unit tracking, installment sales, expense logging, project accounting, material inventory, quantity takeoff, energy estimation, and interactive maps — in a single, fast, Persian-first interface.

Designed for teams who manage multiple projects, buyers, contractors, and financial transactions every day. Metrico replaces scattered spreadsheets and paper notes with one workspace that calculates revenue, expenses, profit, receivables, and payables automatically.

<br/>

<table>
  <tr>
    <td><b>Audience</b></td>
    <td>Developers, contractors, investors, sales managers, project accountants</td>
  </tr>
  <tr>
    <td><b>Language</b></td>
    <td>Full Persian UI · RTL layout · Jalali-friendly dates</td>
  </tr>
  <tr>
    <td><b>Deployment</b></td>
    <td>Static PWA — host on any web server or CDN</td>
  </tr>
  <tr>
    <td><b>Data model</b></td>
    <td>Projects &amp; files in Supabase PostgreSQL · contacts/reminders in auth metadata · JSON backup export</td>
  </tr>
</table>

---

## Key Features

<table width="100%">
  <tr>
    <td width="50%" valign="top">
      <h4>🏗️ Visual Project Management</h4>
      <p>Color-coded building grid for every floor and unit (sold / reserved / vacant). Unit profiles with area, buyer info, price per m², down payment, and installment schedules.</p>
    </td>
    <td width="50%" valign="top">
      <h4>📊 Analytics Dashboard</h4>
      <p>Swipeable project cards with progress bars, revenue, expenses, net profit, receivables, payables, and average sale price per m² — powered by ApexCharts.</p>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h4>💰 Financial &amp; Accounting</h4>
      <p>Expense tracker, bank accounts, investor capital, transaction ledger, inter-account transfers, and per-project financial reports with PDF export.</p>
    </td>
    <td width="50%" valign="top">
      <h4>📇 Contacts CRM</h4>
      <p>Investors, buyers, contractors, and suppliers in one place. Role filters, balance tracking, one-tap native calling, and printable contact lists.</p>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h4>📦 Material Inventory</h4>
      <p>Stock tracking, in/out transactions, project allocation, and inventory reports. Available on <b>Pro</b> plan and above.</p>
    </td>
    <td width="50%" valign="top">
      <h4>📐 Quantity Takeoff</h4>
      <p>5-category material estimation plus map-based area measurement from uploaded plans. Available on <b>Ark</b> plan.</p>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h4>⚡ Energy Calculations</h4>
      <p>Building energy consumption estimates based on area, floors, and usage type. Available on <b>Ark</b> plan.</p>
    </td>
    <td width="50%" valign="top">
      <h4>🗺️ Maps &amp; Geolocation</h4>
      <p>Leaflet-powered project maps, multi-project overview, and KML export with average sale price per m² per location.</p>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h4>🤖 AI Chat Assistant</h4>
      <p>Ask questions about projects, sales, costs, profit, and energy in natural language — with optional voice input.</p>
    </td>
    <td width="50%" valign="top">
      <h4>🔍 Global Search</h4>
      <p>Instant client-side search across projects, units (by ID or buyer name), and contacts directly from the header.</p>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h4>📱 Standalone PWA</h4>
      <p>Optimized <code>manifest.json</code> for full-screen install on Android and iOS — no browser address bar after install.</p>
    </td>
    <td width="50%" valign="top">
      <h4>⚙️ Offline-Ready Shell</h4>
      <p>Service Worker (<code>sw.js</code>) caches the app shell and all libraries locally for fast load times even with poor connectivity.</p>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h4>📐 CAD / BIM Maps</h4>
      <p>Upload and view AutoCAD files (PDF, DXF, DWG) inside the app. DWG rendered locally via WebAssembly. BIM/3D viewers coming soon.</p>
    </td>
    <td width="50%" valign="top">
      <h4>🔗 Owner Portal</h4>
      <p>Share a private link with unit buyers — progress photos, payment status, and messaging without requiring app login.</p>
    </td>
  </tr>
</table>

<br/>

**Also included:** radial FAB menu · in-app step-by-step guide · backup &amp; restore · tax module (Pro) · PDF/print on all major reports · auto session timeout · admin member management

---

## Subscription Plans

Higher plans include all features from lower tiers.

<table width="100%">
  <tr>
    <th align="left">Plan</th>
    <th align="left">Persian Name</th>
    <th align="left">Highlights</th>
  </tr>
  <tr>
    <td><b>Start</b></td>
    <td>میتریکو آغاز</td>
    <td>Free · 1 project · unit sales &amp; expenses · 15 contacts</td>
  </tr>
  <tr>
    <td><b>Plus</b></td>
    <td>میتریکو پلاس</td>
    <td>3 projects · PDF export · AI chat · maps · backup/restore</td>
  </tr>
  <tr>
    <td><b>Pro</b></td>
    <td>میتریکو پرو</td>
    <td>10 projects · full accounting · material inventory · tax · KML</td>
  </tr>
  <tr>
    <td><b>Ark</b></td>
    <td>میتریکو ارک</td>
    <td>Unlimited projects · energy calculations · quantity takeoff</td>
  </tr>
</table>

<br/>

Activation codes and plan upgrades are managed via Supabase RPC functions. Super-admins can manage members and generate activation/plan codes from the in-app admin panel.

---

## Tech Stack

<table width="100%">
  <tr>
    <td width="30%"><b>UI</b></td>
    <td>React 18 (in-browser JSX via Babel Standalone)</td>
  </tr>
  <tr>
    <td><b>Styling</b></td>
    <td>Tailwind CSS (runtime) · Lucide-style SVG icons</td>
  </tr>
  <tr>
    <td><b>Charts</b></td>
    <td>ApexCharts</td>
  </tr>
  <tr>
    <td><b>Maps</b></td>
    <td>Leaflet</td>
  </tr>
  <tr>
    <td><b>Auth &amp; billing</b></td>
    <td>Supabase (Auth + PostgreSQL RPCs)</td>
  </tr>
  <tr>
    <td><b>Backend &amp; data</b></td>
    <td>Supabase PostgreSQL (<code>projects</code>, <code>profiles</code>) + Auth user metadata</td>
  </tr>
  <tr>
    <td><b>CAD engine</b></td>
    <td>LibreDWG WebAssembly (<code>lib/wasm/</code>)</td>
  </tr>
  <tr>
    <td><b>Preferences</b></td>
    <td><code>localStorage</code> for UI language only</td>
  </tr>
  <tr>
    <td><b>PWA</b></td>
    <td><code>manifest.json</code> + Service Worker (<code>sw.js</code>)</td>
  </tr>
  <tr>
    <td><b>Fonts</b></td>
    <td>Vazirmatn (Persian)</td>
  </tr>
</table>

<br/>

> Metrico is a single-file SPA (<code>index.html</code>) with vendored libraries under <code>lib/</code>. **No build step required** — deploy the folder as-is.

---

## Repository Structure

```
Metrico/
├── index.html              # Main SPA — UI, logic, and styles
├── manifest.json           # PWA metadata (RTL, Persian, standalone)
├── sw.js                   # Service Worker & asset cache map
├── logo.png
├── guide/                  # In-app guide illustrations (SVG)
├── icons/
│   ├── icon-192.png
│   └── icon-512.png
├── fonts/
│   ├── Vazirmatn.woff2
│   └── Vazirmatn[wght].woff2
├── lib/                    # Vendored dependencies (offline-ready)
│   ├── react.production.min.js
│   ├── react-dom.production.min.js
│   ├── babel.min.js
│   ├── tailwind.js
│   ├── apexcharts.min.js
│   ├── leaflet.js
│   ├── leaflet.css
│   ├── supabase.js
│   ├── cad/                # DWG bootstrap
│   └── wasm/               # libredwg-web.wasm (~10 MB)
└── supabase/               # Database schema & admin SQL scripts
    ├── README.md           # Run order & setup notes
    ├── schema.sql          # profiles, projects, activation (run first)
    ├── plans.sql
    ├── admin.sql
    ├── admin-members-tools.sql
    ├── owner-portals.sql
    └── owner-portal-messages.sql
```

---

## Getting Started

**1. Deploy** — Upload the entire folder to any static host (GitHub Pages, Netlify, Vercel, cPanel). Include `lib/cad/`, `lib/wasm/`, and `guide/`. Serve `index.html` at the site root (or adjust relative paths for subdirectory deploy).

**2. Configure Supabase**

- Create a Supabase project
- Run SQL scripts in order (see `supabase/README.md`):
  `schema.sql` → `plans.sql` → `admin.sql` → `admin-members-tools.sql` → `owner-portals.sql` → `owner-portal-messages.sql`
- Set `SUPABASE_URL` and anon key in `index.html`
- Create an activation code and promote your admin account (see `supabase/README.md`)

**3. Install as PWA** — Open on mobile → Add to Home Screen

**4. Activate** — New users register, then enter an activation code from the administrator

**5. Demo** — Use the in-app guide to log in with `demo@metrico.app` (read-only Ark plan sample project)

---

## Privacy &amp; Data

- **Authentication** — Supabase Auth; each account is isolated via Row Level Security
- **Project data** — stored in Supabase `projects` table (JSON `data` column); synced across devices for the same account
- **Contacts &amp; inventory** — stored in Supabase Auth user metadata
- **Backup** — JSON export/import for manual backup and migration
- **Security** — auto-logout after 10 minutes of inactivity; activation gate for new signups

---

## Roadmap

- [ ] Online payment for plan upgrades (Zarinpal)
- [ ] BIM / 3D model viewer in browser
- [ ] English / bilingual UI toggle

---

## Author

**Mehrzad Saeedi** · Sepehr Construction Group

For activation codes and commercial licensing, contact the author.

---

<p align="center"><sub>Metrico v2.50.7 · Built for the construction industry in Iran</sub></p>
