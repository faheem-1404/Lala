# LALA — THE MILKVERSE · Project Plan

**Client:** La La Paal Nilayam, Triplicane, Chennai (Tamil Nadu, India)
**Positioning:** THE ART OF MILK & INDULGENCE. · Tagline: A LITTLE SIP OF HAPPINESS.
**Deliverable:** A cinematic, scroll-driven Three.js / React Three Fiber website that is also a fully functional business site (menu, WhatsApp/Swiggy ordering, directions, call, Instagram).

## Phases

| Phase | Scope | Status |
|---|---|---|
| 1 · Research & discovery | Reference book + guide reviewed; Instagram profile verified; Swiggy / Justdial / Google Maps blocked for automated access (see MENU_DATA.md); image library sourced from Pexels (licence verified) + 1 Wikimedia Commons image | Done |
| 2 · Visual design | Colour system, typography (Playfair Display + Inter), layout grid, scroll storyboard, motion language → BRAND_DIRECTION.md | Done |
| 3 · Hero development | Procedural glass + liquid + milk ribbon + instanced ingredients + lighting + cursor parallax + scroll camera | Built |
| 4 · Scroll storytelling | Scenes 01–07 driven by one Lenis + GSAP ScrollTrigger timeline; WebGL scenes cross-fade by progress | Built |
| 5 · Functional website | Data-driven menu, category filter + search, WhatsApp / Swiggy / Maps / Call / Instagram, footer, SEO, loader, error boundary | Built |
| 6 · Responsiveness | Mobile camera composition, reduced particle counts, adaptive DPR, mobile layouts, reduced-motion & no-WebGL fallbacks | Built |
| 7 · QA | `tsc` clean · `next build` succeeds (static) · Playwright run: 0 page errors, 0 failed requests, 72 links / 0 bad / 0 missing anchors / 0 broken images, desktop 1440×900 + iPhone 13 + reduced-motion screenshots in `.research/qa/` | Done (2026-11-03) |

| 8 · Post-WebGL redesign | Replaced the card grid with an editorial system: intro spread with the ribbon-line motif, "The LALA table" composition, a typeset menu composed per category (five layouts, four tones, sticky hairline category nav), "Start here" campaign spread, savoury marquee spread, full-bleed Visit with tinted map; menu data rewritten to the surfaced Swiggy inventory | Done (2026-11-03) |

## Facts confirmed vs. requiring owner confirmation

**Confirmed from brief / public profile**
- Name: La La Paal Nilayam ("LALA"). Instagram @lala_paalnilayam (bio: "PAARAMBARIYA MILK variety's & CHAT items", ~4.7k followers at research time).
- Phone: +91 75500 06861 · WhatsApp: +917550006861.
- Swiggy listing: https://www.swiggy.com/city/chennai/lala-paal-nilayam-royapettah-rest1385944
- Justdial listing and Google Maps search URL (supplied in brief).
- Address (from reference book research): 150, Bharathi Salai, Ellis Puram, Padupakkam, Triplicane, Chennai 600005. Swiggy references "Door No. 225 / Bharathi Salai" — **owner must confirm the public-facing address**.

**Owner must confirm before launch** (all are surfaced in the UI as "to be confirmed" states, never invented)
- Menu prices, availability, variants and pack sizes (names follow the surfaced Swiggy inventory; prices are `null` → "on request").
- Business hours (the supplied Google listing indicates 24 hours; not published until confirmed — the page says "to be confirmed").
- Official logo (current wordmark is a typographic placeholder in Playfair Display).
- Storefront, interior and real product photographs (all current product imagery is licensed stock, flagged "representative").
- Year established / any history claims (none are made).

## Out of scope by design
- No checkout, no payments, no fake reviews, no invented awards.
