// Editorial QA: scroll the whole page (so reveals/masks fire), then capture each post-WebGL section
// at five viewports. Usage: node scripts/qa-sections.mjs [baseUrl]
import { chromium } from "playwright";
import { promises as fs } from "node:fs";
import path from "node:path";

const BASE = process.argv[2] ?? "http://localhost:3001";
const OUT = path.resolve(".research/qa/sections");
await fs.mkdir(OUT, { recursive: true });
const VIEWPORTS = (process.env.QA_VP ?? "1440x900,1280x800,768x1024,390x844,375x812").split(",").map((v) => v.split("x").map(Number));
const SECTIONS = (process.env.QA_SEC ?? "intro,experience,menu-hot-drinks,menu-buns,menu-falooda,menu-cold-drinks,menu-chaat,menu-sweets,menu-maggi,menu-milkshakes,menu-fries,menu-loaded-fries,start-here,food,visit,footer").split(",");
const log = [];

const browser = await chromium.launch({ headless: true, args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
for (const [w, h] of VIEWPORTS) {
  const label = `${w}x${h}`;
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, isMobile: w < 768, hasTouch: w < 768 });
  const page = await ctx.newPage();
  page.on("pageerror", (e) => log.push(`[${label}] pageerror: ${e.message}`));
  page.on("console", (m) => { if (m.type() === "error") log.push(`[${label}] console.error: ${m.text()}`); });
  await page.goto(BASE, { waitUntil: "domcontentloaded", timeout: 120000 });
  await page.waitForSelector("html.is-loaded", { timeout: 60000 }).catch(() => log.push(`[${label}] loader never finished`));
  // walk the document so every ScrollTrigger fires
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < total; y += Math.round(h * 0.7)) {
    await page.evaluate((y) => { const l = window.__lenis; if (l) l.scrollTo(y, { immediate: true }); else window.scrollTo(0, y); }, y);
    await page.waitForTimeout(140);
  }
  await page.waitForTimeout(800);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  log.push(`[${label}] doc=${total}px horizontalOverflow=${overflow}px`);
  for (const id of SECTIONS) {
    const sel = id === "footer" ? "footer" : `#${id}`;
    const el = page.locator(sel).first();
    if (!(await el.count())) { log.push(`[${label}] missing ${sel}`); continue; }
    await el.evaluate((n) => { const y = n.getBoundingClientRect().top + window.scrollY - 60; const l = window.__lenis; if (l) l.scrollTo(y, { immediate: true }); else window.scrollTo(0, y); });
    await page.waitForTimeout(900);
    await el.screenshot({ path: path.join(OUT, `${label}-${id}.jpg`), type: "jpeg", quality: 72, timeout: 120000 }).catch((e) => log.push(`[${label}] shot failed ${id}: ${e.message.split("\n")[0]}`));
  }
  await ctx.close();
}
await browser.close();
await fs.writeFile(path.join(OUT, "log.txt"), log.join("\n"));
console.log(log.join("\n") || "no issues logged");
