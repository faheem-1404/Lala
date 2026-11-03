# LALA — The Milkverse

Cinematic, scroll-driven Three.js website for **La La Paal Nilayam**, Triplicane, Chennai — and a working business site (menu, WhatsApp / Swiggy ordering, call, directions, Instagram).

## Run
```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run typecheck
```
Assets: `npm run assets:fetch` (downloads licence-checked originals, needs network) then `npm run assets:optimize` (WebP). Visual QA: `node scripts/qa-screenshots.mjs http://localhost:3000` (needs `npm i -D playwright`; writes to `.research/qa/`).

## QA status (2026-11-03, after the editorial redesign)
- Section captures at 1440, 1280, 768, 390 and 375 px via `node scripts/qa-sections.mjs` → `.research/qa/sections/`; no horizontal overflow, no page errors.
- `npm run typecheck` — clean. `npm run build` — succeeds, all routes static.
- Playwright run (`scripts/qa-screenshots.mjs`): no page errors, no failed requests, 72 links with 0 broken / 0 missing anchors / 0 broken images; screenshots at 13 scroll positions on desktop (1440×900) and iPhone 13, plus reduced-motion.
- Not yet measured: real-device frame rate on mid-range Android (tiering reduces particles/DPR/post-processing automatically; verify on hardware).

## Documents
- `docs/PROJECT_PLAN.md` — phases, confirmed facts, items the owner must confirm.
- `docs/BRAND_DIRECTION.md` — colour, type, grid, scroll storyboard, motion language.
- `docs/TECHNICAL_ARCHITECTURE.md` — stack, structure, rendering model, performance.
- `docs/MENU_DATA.md` — how to edit `src/data/menu.ts` (prices are `null` until confirmed).
- `docs/ASSET_MANIFEST.md` — every image: source, licence, replacement requirement.

## Owner to-do before launch
1. Prices + availability in `src/data/menu.ts`.
2. Confirm address / door number and hours in `src/data/business.ts`.
3. Official logo (replace `src/components/ui/Wordmark.tsx`, `src/app/icon.svg`).
4. Storefront, interior and product photographs (drop-in paths in `docs/ASSET_MANIFEST.md`).
5. Set `NEXT_PUBLIC_SITE_URL` for correct canonical / OG URLs.
# Lala
