#!/usr/bin/env node
/**
 * Minimal smoke check: APP_VERSION in index.html matches expected pattern.
 * Usage: node scripts/smoke-check.mjs [url-or-file-path]
 */
const target = process.argv[2] || "index.html";
const fs = require("fs");

async function loadHtml() {
  if (/^https?:\/\//i.test(target)) {
    const res = await fetch(target, { redirect: "follow" });
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${target}`);
    return res.text();
  }
  return fs.readFileSync(target, "utf8");
}

(async () => {
  const html = await loadHtml();
  const m = html.match(/const APP_VERSION = "([^"]+)"/);
  if (!m) {
    console.error("FAIL: APP_VERSION not found in", target);
    process.exit(1);
  }
  const ver = m[1];
  if (!/^\d+\.\d+\.\d+$/.test(ver)) {
    console.error("FAIL: invalid version format:", ver);
    process.exit(1);
  }
  console.log("OK: APP_VERSION =", ver, "from", target);
})().catch((e) => {
  console.error("FAIL:", e.message);
  process.exit(1);
});
