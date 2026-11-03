// Visual + runtime QA: screenshots across the scroll story at desktop and mobile sizes,
// console/page error capture, and a link audit. Run with the dev server up:
//   node scripts/qa-screenshots.mjs [baseUrl]
import { chromium, devices } from "playwright";
import { promises as fs } from "node:fs";
import path from "node:path";

const BASE = process.argv[2] ?? "http://localhost:3001";
const OUT = path.resolve(".research/qa");
await fs.mkdir(OUT, { recursive: true });

const STEPS = process.env.QA_STEPS ? process.env.QA_STEPS.split(",").map(Number) : [0, 0.06, 0.12, 0.2, 0.27, 0.4, 0.46, 0.56, 0.62, 0.68, 0.74, 0.8, 0.9];
const LABELS = (process.env.QA_LABELS ?? "desktop,mobile").split(",");
const SECTIONS = process.env.QA_SECTIONS === "0" ? [] : ["menu", "visit"];
const log = [];

async function run(label, ctxOpts) {
  const browser = await chromium.launch({
    headless: true,
    args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist", "--enable-webgl"],
  });
  const ctx = await browser.newContext(ctxOpts);
  const page = await ctx.newPage();
  page.on("console", (m) => {
    if (["error", "warning"].includes(m.type())) log.push(`[${label}] console.${m.type()}: ${m.text()}`);
  });
  page.on("pageerror", (e) => log.push(`[${label}] pageerror: ${e.message}`));
  page.on("requestfailed", (r) => log.push(`[${label}] requestfailed: ${r.url()} ${r.failure()?.errorText}`));
  page.on("response", (r) => { if (r.status() >= 400) log.push(`[${label}] http ${r.status()}: ${r.url()}`); });

  const t0 = Date.now();
  await page.goto(BASE, { waitUntil: "domcontentloaded", timeout: 120000 });
  await page.waitForSelector("html.is-loaded", { timeout: 60000 }).catch(() => log.push(`[${label}] loader never finished`));
  log.push(`[${label}] loaded in ${Date.now() - t0}ms`);
  await page.waitForTimeout(1500);

  const info = await page.evaluate(() => {
    const story = document.getElementById("story");
    return { storyH: story?.offsetHeight ?? 0, vh: innerHeight, docH: document.documentElement.scrollHeight, webgl: !!document.querySelector("canvas") };
  });
  log.push(`[${label}] story=${info.storyH}px vh=${info.vh} doc=${info.docH} canvas=${info.webgl}`);

  for (const p of STEPS) {
    const y = Math.round(p * (info.storyH - info.vh));
    await page.evaluate((y) => {
      const l = window.__lenis;
      if (l) l.scrollTo(y, { immediate: true }); else window.scrollTo(0, y);
    }, y);
    await page.waitForTimeout(2800);
    await page.screenshot({ path: path.join(OUT, `${label}-story-${p.toFixed(2)}.jpg`), type: "jpeg", quality: 70, timeout: 120000 });
  }
  // sections after the story
  for (const id of SECTIONS) {
    await page.evaluate((id) => {
      const el = document.getElementById(id);
      const y = el.getBoundingClientRect().top + window.scrollY;
      const l = window.__lenis;
      if (l) l.scrollTo(y, { immediate: true }); else window.scrollTo(0, y);
    }, id);
    await page.waitForTimeout(1200);
    await page.screenshot({ path: path.join(OUT, `${label}-${id}.jpg`), type: "jpeg", quality: 70, timeout: 120000 });
  }
  if (SECTIONS.length) {
    await page.evaluate(() => { const l = window.__lenis; if (l) l.scrollTo(document.documentElement.scrollHeight, { immediate: true }); else window.scrollTo(0, 1e9); });
    await page.waitForTimeout(1200);
    await page.screenshot({ path: path.join(OUT, `${label}-footer.jpg`), type: "jpeg", quality: 70 });
  }

  // link audit
  const links = await page.evaluate(() => Array.from(document.querySelectorAll("a")).map((a) => ({ href: a.getAttribute("href"), text: a.textContent.trim().slice(0, 40) })));
  const bad = links.filter((l) => !l.href || l.href === "#" || l.href === "javascript:void(0)");
  log.push(`[${label}] links=${links.length} bad=${bad.length} ${JSON.stringify(bad)}`);
  const anchors = links.filter((l) => l.href?.startsWith("#")).map((l) => l.href.slice(1));
  const missing = await page.evaluate((ids) => ids.filter((id) => !document.getElementById(id)), anchors);
  log.push(`[${label}] missing anchor targets: ${JSON.stringify([...new Set(missing)])}`);
  const imgs = await page.evaluate(() => Array.from(document.images).filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.currentSrc || i.src));
  log.push(`[${label}] broken images: ${JSON.stringify(imgs)}`);
  await browser.close();
}

if (LABELS.includes("desktop")) await run("desktop", { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
if (LABELS.includes("mobile")) await run("mobile", { ...devices["iPhone 13"], viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
if (LABELS.includes("reduced")) await run("reduced", { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, reducedMotion: "reduce" });
await fs.writeFile(path.join(OUT, "log.txt"), log.join("\n"));
console.log(log.join("\n"));
