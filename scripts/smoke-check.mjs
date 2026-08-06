#!/usr/bin/env node
/**
 * Smoke check: APP_VERSION in index.html (file or URL).
 * With EXPECT_VERSION env or argv[3]: fail if deployed version differs (Pages lag retry).
 *
 * Usage:
 *   node scripts/smoke-check.mjs index.html
 *   node scripts/smoke-check.mjs https://.../index.html [expectedVersion]
 */
import fs from "node:fs";

const target = process.argv[2] || "index.html";
const expectVersion = process.env.EXPECT_VERSION || process.argv[3] || "";

async function loadHtml(src) {
  if (/^https?:\/\//i.test(src)) {
    const res = await fetch(src, { redirect: "follow", cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${src}`);
    return res.text();
  }
  return fs.readFileSync(src, "utf8");
}

function parseVersion(html, label) {
  const m = html.match(/const APP_VERSION = "([^"]+)"/);
  if (!m) throw new Error(`APP_VERSION not found in ${label}`);
  const ver = m[1];
  if (!/^\d+\.\d+\.\d+$/.test(ver)) throw new Error(`invalid version format in ${label}: ${ver}`);
  return ver;
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

(async () => {
  const isUrl = /^https?:\/\//i.test(target);

  if (isUrl && expectVersion) {
    // GitHub Pages can lag several minutes after push; keep retrying.
    const maxAttempts = 24;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      const html = await loadHtml(target);
      const ver = parseVersion(html, target);
      if (ver === expectVersion) {
        console.log("OK: deployed APP_VERSION =", ver, "matches expected");
        return;
      }
      console.log(`Attempt ${attempt}/${maxAttempts}: deployed ${ver}, expected ${expectVersion}`);
      if (attempt < maxAttempts) await sleep(20000);
    }
    throw new Error(`deployed version never matched ${expectVersion}`);
  }

  const html = await loadHtml(target);
  const ver = parseVersion(html, target);
  console.log("OK: APP_VERSION =", ver, "from", target);
})().catch((e) => {
  console.error("FAIL:", e.message);
  process.exit(1);
});
