#!/usr/bin/env node
/**
 * Pre-deploy checks: APP_VERSION ↔ sw.js cache name; precache assets exist on disk.
 */
import fs from "node:fs";

const root = process.cwd();
const indexHtml = fs.readFileSync(`${root}/index.html`, "utf8");
const swJs = fs.readFileSync(`${root}/sw.js`, "utf8");

const verMatch = indexHtml.match(/const APP_VERSION = "([^"]+)"/);
if (!verMatch) {
  console.error("FAIL: APP_VERSION not found in index.html");
  process.exit(1);
}
const ver = verMatch[1];
const cacheTag = `metrico-cache-v${ver}`;
if (!swJs.includes(cacheTag)) {
  console.error(`FAIL: sw.js must include ${cacheTag} (matches index.html APP_VERSION)`);
  process.exit(1);
}

const assetPaths = [...swJs.matchAll(/"\.\/[^"]+"/g)]
  .map((m) => m[0].slice(1, -1))
  .filter((p) => p.startsWith("./"));

const missing = [];
for (const rel of assetPaths) {
  const path = `${root}/${rel.replace(/^\.\//, "")}`;
  if (!fs.existsSync(path)) missing.push(rel);
}

if (missing.length) {
  console.error("FAIL: precache assets missing from repo:");
  missing.forEach((p) => console.error(" ", p));
  process.exit(1);
}

console.log("OK: ops preflight — version", ver, "—", assetPaths.length, "precache paths exist");
