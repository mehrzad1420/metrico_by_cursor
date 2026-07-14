<!-- PROJECT LOGO & HEADER -->
<div align="center">
  <img src="icons/icon-512.png" alt="Metrico Logo" width="120" height="120" style="border-radius: 24px; box-shadow: 0 8px 24px rgba(0,0,0,0.15);"/>
  
  # 🏗️ Metrico
  ### Smart Construction & Project Management Platform
  
  <p align="center">
    <img src="https://img.shields.io/badge/Version-2.17.0-blue?style=for-the-badge&logo=semver" alt="Version"/>
    <img src="https://img.shields.io/badge/PWA-Ready-orange?style=for-the-badge&logo=progressive-web-apps" alt="PWA"/>
    <img src="https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript" alt="JS"/>
    <img src="https://img.shields.io/badge/UI%2FUX-Pro%20Max-purple?style=for-the-badge" alt="UI/UX"/>
  </p>

  <p align="center">
    <strong>A high-performance, mobile-first Progressive Web Application (PWA) tailored for modern real estate developers and construction managers.</strong>
  </p>
</div>

---

## 🌐 Overview

**Metrico** bridges the gap between complex construction accounting and intuitive on-site management. It allows developers to seamlessly oversee multiple construction projects, units, installment plans, client communications, and real-time financial health—both online and completely offline.

---

## 🚀 Key Features (v2.17.0)

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

---

## 🛠️ Tech Stack & Architecture

Metrico is engineered with an ultra-lightweight, zero-overhead philosophy to maximize mobile rendering speeds and eliminate expensive cloud database latencies:

*   **Frontend Core:** Semantic HTML5, Modular CSS3 (utilizing modern Glassmorphism & Soft Shadow systems).
*   **Logic Engine:** Vanilla JavaScript (ES6+) utilizing asynchronous client-side rendering.
*   **Data Persistence:** Browser-native Local Storage & IndexedDB architectures ensuring absolute data sovereignty and offline availability.
*   **Data Visualization:** [ApexCharts v3.45.0](https://apexcharts.com/) for lightweight, vector-based interactive rendering.
*   **Distribution Wrapper:** PWA Builder WebAPK Engine / Service Worker cache interception.

---

## 📂 Repository Structure

```bash
├── index.html          # Main Application Interface & UI Layout
├── manifest.json       # PWA Application Metadata (Standalone Configuration)
├── sw.js               # Service Worker Script & Caching Resource Map
├── css/
│   └── style.css       # Custom Design System (Responsive & Glassmorphism)
└── lib/
    └── apexcharts.min.js  # Locally Cached Visualization Engine
