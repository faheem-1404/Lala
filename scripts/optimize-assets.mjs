// Converts public/assets/raw/**/*.jpg into optimised WebP at the same relative path under public/assets/.
// Usage: node scripts/optimize-assets.mjs
import sharp from "sharp";
import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(new URL(".", import.meta.url).pathname, "..");
const RAW = path.join(ROOT, "public/assets/raw");
const OUT = path.join(ROOT, "public/assets");

const MAX = { hero: 2400, textures: 2048, atmosphere: 2400, default: 1600 };

async function* walk(dir) {
  for (const d of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, d.name);
    if (d.isDirectory()) yield* walk(p);
    else if (/\.(jpe?g|png)$/i.test(d.name)) yield p;
  }
}

let n = 0, skipped = 0, failed = 0;
for await (const file of walk(RAW)) {
  const rel = path.relative(RAW, file);
  const folder = rel.split(path.sep)[0];
  const out = path.join(OUT, rel.replace(/\.(jpe?g|png)$/i, ".webp"));
  try {
    const st = await fs.stat(file);
    if (st.size === 0) { skipped++; continue; }
    await fs.mkdir(path.dirname(out), { recursive: true });
    const max = MAX[folder] ?? MAX.default;
    const img = sharp(file).rotate();
    const meta = await img.metadata();
    await img
      .resize({ width: Math.min(max, meta.width ?? max), withoutEnlargement: true })
      .webp({ quality: folder === "hero" ? 84 : 80, effort: 5 })
      .toFile(out);
    n++;
    // small blur placeholder data for manifest/debug
  } catch (e) {
    failed++;
    console.error("failed", rel, e.message);
  }
}
console.log(`optimised ${n}, skipped ${skipped}, failed ${failed}`);
