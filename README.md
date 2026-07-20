<!-- PROJECT LOGO & HEADER -->
<div align="center">
  <img src="icons/icon-512.png" alt="Metrico Logo" width="120" height="120" style="border-radius: 24px; box-shadow: 0 8px 24px rgba(0,0,0,0.15);"/>
  
  # 🏗️ Metrico
  ### Smart Construction & Project Management Platform
  
  # Metrico · میتریکو
  ### Smart Construction & Real-Estate Project Management Platform
  <p align="center">
    <img src="https://img.shields.io/badge/Version-2.17.0-blue?style=for-the-badge&logo=semver" alt="Version"/>
    <img src="https://img.shields.io/badge/Version-2.44.0-blue?style=for-the-badge&logo=semver" alt="Version"/>
    <img src="https://img.shields.io/badge/PWA-Ready-orange?style=for-the-badge&logo=progressive-web-apps" alt="PWA"/>
    <img src="https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript" alt="JS"/>
    <img src="https://img.shields.io/badge/UI%2FUX-Pro%20Max-purple?style=for-the-badge" alt="UI/UX"/>
    <img src="https://img.shields.io/badge/RTL-Persian-green?style=for-the-badge" alt="RTL"/>
    <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React"/>
    <img src="https://img.shields.io/badge/Supabase-Auth-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase"/>
  </p>
  <p align="center">
    <strong>A high-performance, mobile-first Progressive Web Application (PWA) tailored for modern real estate developers and construction managers.</strong>
    <strong>A mobile-first Progressive Web App for developers, investors, and construction managers — built in Persian (RTL), works offline, and installs like a native app.</strong>
  </p>
  <p align="center">
    <em>مدیریت پروژه‌های ساختمانی · واحدها · اقساط · حسابداری · انبار · متره · انرژی</em>
  </p>
</div>
---
## 🌐 Overview
## Overview
**Metrico** bridges the gap between complex construction accounting and intuitive on-site management. It allows developers to seamlessly oversee multiple construction projects, units, installment plans, client communications, and real-time financial health—both online and completely offline.
**Metrico** is an all-in-one platform for construction and real-estate project management. It connects on-site unit tracking, installment sales, expense logging, project accounting, material inventory, quantity takeoff, energy estimation, and interactive maps — in a single, fast, Persian-first interface.
Designed for teams who juggle multiple projects, buyers, contractors, and financial transactions daily. Metrico replaces scattered spreadsheets, paper notes, and messaging threads with one structured workspace that calculates revenue, expenses, profit, receivables, and payables automatically.
| | |
|---|---|
| **Audience** | Developers, contractors, investors, sales managers, project accountants |
| **Language** | Full Persian UI · RTL layout · Jalali-friendly dates |
| **Deployment** | Static PWA — host on any web server or CDN |
| **Data model** | Project data stored locally per device · Supabase for authentication & subscription |
---
## 🚀 Key Features (v2.17.0)
## Key Features
<table width="100%">
  <tr>
    <td width="50%">
      <h4>📊 Pro Analytics Dashboard</h4>
      <p>Integrated with <b>ApexCharts</b>. Features beautiful gradient donut charts tracking overall revenue, expenses, and live net profit calculations with dark-theme adaptive text styling.</p>
    </td>
    <td width="50%">
      <h4>🔍 Unified Live Search</h4>
      <p>A lightning-fast, client-side global search mechanism embedded directly in the header. Instantly filters projects, units (by ID or buyer name), and contacts as you type.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h4>📇 360° Contact Management</h4>
      <p>Universal entry points for creating and assigning client contacts. Accessible dynamically from the Contacts Panel, Expense Tracker, or individual Unit Profiles.</p>
    </td>
    <td width="50%">
      <h4>☎️ One-Touch Native Calling</h4>
      <p>Actionable user interface featuring direct-dial action triggers next to every phone record, opening the device's native dialer instantly via secure protocols.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h4>📱 True Standalone PWA Experience</h4>
      <p>Configured with an optimized <code>manifest.json</code> layout to fully eliminate browser address bars. Installs directly on Android and iOS with a dedicated splash screen.</p>
    </td>
    <td width="50%">
      <h4>⚙️ Resilient Offline Sync</h4>
      <p>Powered by a robust Service Worker caching architecture (<code>sw.js</code>), caching third-party libraries locally to ensure immediate load times even under zero-connectivity conditions.</p>
    </td>
  </tr>
</table>
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
## 🛠️ Tech Stack & Architecture
## Subscription Plans
Metrico is engineered with an ultra-lightweight, zero-overhead philosophy to maximize mobile rendering speeds and eliminate expensive cloud database latencies:
Metrico uses tiered subscriptions with feature gating. Higher plans inherit all lower-tier capabilities.
*   **Frontend Core:** Semantic HTML5, Modular CSS3 (utilizing modern Glassmorphism & Soft Shadow systems).
*   **Logic Engine:** Vanilla JavaScript (ES6+) utilizing asynchronous client-side rendering.
*   **Data Persistence:** Browser-native Local Storage & IndexedDB architectures ensuring absolute data sovereignty and offline availability.
*   **Data Visualization:** [ApexCharts v3.45.0](https://apexcharts.com/) for lightweight, vector-based interactive rendering.
*   **Distribution Wrapper:** PWA Builder WebAPK Engine / Service Worker cache interception.
| Plan | Persian Name | Highlights |
|------|-------------|------------|
| **Start** | میتریکو آغاز | Free · 1 project · unit sales & expenses · 15 contacts |
| **Plus** | میتریکو پلاس | Up to 3 projects · PDF export · AI chat · maps · backup/restore |
| **Pro** | میتریکو پرو | Up to 10 projects · full accounting · material inventory · tax · KML |
| **Ark** | میتریکو ارک | Unlimited projects · energy calculations · quantity takeoff |
Activation codes and plan upgrades are managed via Supabase RPC functions. An admin panel supports member management and code generation for super-admins.
---
## 📂 Repository Structure
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
├── index.html          # Main Application Interface & UI Layout
├── manifest.json       # PWA Application Metadata (Standalone Configuration)
├── sw.js               # Service Worker Script & Caching Resource Map
├── css/
│   └── style.css       # Custom Design System (Responsive & Glassmorphism)
└── lib/
    └── apexcharts.min.js  # Locally Cached Visualization Engine
Metrico/
├── index.html              # Main SPA — UI, logic, and styles
├── manifest.json           # PWA metadata (RTL, Persian, standalone)
├── sw.js                   # Service Worker & asset cache map
├── logo.png                # Brand logo
├── icons/
│   ├── icon-192.png
