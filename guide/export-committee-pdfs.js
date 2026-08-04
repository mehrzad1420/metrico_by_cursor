/**
 * Export committee landing sheets to PDF (EN pack only).
 * Uses system Chrome via puppeteer-core + local static server.
 */
const http = require("http");
const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");

const ROOT = path.resolve(__dirname, "..");
const LANDING = path.join(ROOT, "landing");
const OUT = path.join(ROOT, "guide", "committee-pdfs");
const PORT = 8765;
const CHROME =
  process.env.CHROME_PATH ||
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const STORAGE_KEY = "metrico-landing-lang";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
};

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      try {
        let urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
        if (urlPath === "/") urlPath = "/index.html";
        const filePath = path.normalize(path.join(LANDING, urlPath));
        if (!filePath.startsWith(LANDING)) {
          res.writeHead(403);
          res.end("Forbidden");
          return;
        }
        if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
          res.writeHead(404);
          res.end("Not found");
          return;
        }
        const ext = path.extname(filePath).toLowerCase();
        res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
        fs.createReadStream(filePath).pipe(res);
      } catch (e) {
        res.writeHead(500);
        res.end(String(e));
      }
    });
    server.listen(PORT, "127.0.0.1", () => resolve(server));
  });
}

const JOBS = [
  { file: "onepager.html", out: "metrico-onepager-en.pdf", lang: null },
  { file: "markets.html", out: "metrico-markets-en.pdf", lang: null },
  { file: "competitors.html", out: "metrico-competitors-en.pdf", lang: "en" },
  { file: "revenue.html", out: "metrico-revenue-en.pdf", lang: "en" },
  { file: "market-evidence.html", out: "metrico-market-evidence-en.pdf", lang: "en" },
  { file: "market-map.html", out: "metrico-market-map-en.pdf", lang: "en" },
  { file: "estonia-presence.html", out: "metrico-estonia-presence-en.pdf", lang: null },
  { file: "business-plan.html", out: "metrico-business-plan-en.pdf", lang: null },
  {
    file: "business-plan-full.html",
    out: "metrico-business-plan-full-en.pdf",
    lang: null,
  },
  {
    file: "cv-full.html",
    out: "metrico-cv-mehrzad-saeedi-en.pdf",
    lang: null,
  },
  { file: "guide.html", out: "metrico-guide-en.pdf", lang: "en" },
  {
    file: "pitch-deck.html",
    out: "metrico-pitch-deck-en.pdf",
    lang: null,
    landscape: true,
    margin: { top: "0", bottom: "0", left: "0", right: "0" },
  },
];

async function main() {
  const filter = (process.argv[2] || "").trim().toLowerCase();
  const jobs = filter
    ? JOBS.filter(
        (j) =>
          j.file.toLowerCase().includes(filter) ||
          j.out.toLowerCase().includes(filter)
      )
    : JOBS;
  if (!jobs.length) {
    throw new Error("No jobs matched filter: " + filter);
  }

  fs.mkdirSync(OUT, { recursive: true });
  if (!fs.existsSync(CHROME)) {
    throw new Error("Chrome not found at " + CHROME);
  }

  let puppeteer;
  try {
    puppeteer = require("puppeteer-core");
  } catch {
    console.log("Installing puppeteer-core…");
    require("child_process").execSync("npm install --no-save puppeteer-core", {
      cwd: ROOT,
      stdio: "inherit",
    });
    puppeteer = require("puppeteer-core");
  }

  const server = await startServer();
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: "new",
    args: ["--no-sandbox", "--disable-gpu"],
  });

  const results = [];
  try {
    for (const job of jobs) {
      const page = await browser.newPage();
      const landscape = !!job.landscape;
      await page.setViewport({
        width: landscape ? 1600 : 1280,
        height: landscape ? 1000 : 1600,
        deviceScaleFactor: 1,
      });
      const url = `http://127.0.0.1:${PORT}/${job.file}`;
      await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });

      if (job.lang) {
        await page.evaluate(
          (key, lang) => {
            localStorage.setItem(key, lang);
          },
          STORAGE_KEY,
          job.lang
        );
        await page.reload({ waitUntil: "networkidle0", timeout: 60000 });
      }

      // Let fonts / i18n settle
      await new Promise((r) => setTimeout(r, 800));

      const outPath = path.join(OUT, job.out);
      await page.pdf({
        path: outPath,
        format: "A4",
        landscape,
        printBackground: true,
        margin: job.margin || {
          top: "12mm",
          bottom: "12mm",
          left: "12mm",
          right: "12mm",
        },
      });
      const size = fs.statSync(outPath).size;
      results.push({ out: job.out, bytes: size, ok: size > 5000 });
      console.log((size > 5000 ? "OK" : "SMALL") + " " + job.out + " (" + size + " bytes)");
      await page.close();
    }
  } finally {
    await browser.close();
    server.close();
  }

  const failed = results.filter((r) => !r.ok);
  if (failed.length) {
    console.error("Some PDFs look too small:", failed);
    process.exitCode = 1;
  } else {
    console.log("All PDFs written to", OUT);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
