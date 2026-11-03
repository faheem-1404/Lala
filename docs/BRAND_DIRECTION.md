# LALA — Brand & Art Direction

## Positioning
**THE ART OF MILK & INDULGENCE.** — A LITTLE SIP OF HAPPINESS.
A traditional Chennai paal nilayam (milk house) with a modern menu: hot masala paal and badam milk, falooda and milkshakes, halwa and mithai, buns, chaat and cafe snacks. We present it as a premium, cinematic, distinctly Indian food brand.

## Colour system (CSS custom properties in `src/app/globals.css`)
| Token | Hex | Role |
|---|---|---|
| `--burgundy` | #4A0D17 | Primary environment / page background (hero, scenes) |
| `--burgundy-deep` | #2A060D | Vignette edges, near-black |
| `--maroon` | #861E2C | Section transitions, accents, hover states |
| `--gold` | #D4AF37 | Highlights, rules, small labels, particles — **used sparingly** |
| `--cream` | #F8E6D1 | Display type, light surfaces (menu) |
| `--milk-brown` | #A77A4E | Secondary neutral, captions, dividers |
| `--pistachio` | #3F5C29 | Tiny accent (veg marker, ingredient detail) |

Contrast principle: deep dramatic environment (burgundy) → bright creamy product surfaces (milk, ivory UI) → warm golden highlights → warm photography. Never all gold, never all dark. The menu section flips to a cream surface so the business layer feels fast and legible.

## Typography
- **Display:** Playfair Display (variable) — italic for emotional lines, uppercase tracking for brand signatures. Hero headline scales from 44px (mobile) to 9vw (desktop), tight leading (0.92).
- **UI / body:** Inter (variable) — 14–18px, generous letter-spacing on small caps labels (0.18em).
- Editorial rhythm: a tiny gold eyebrow label → huge serif headline → one short sans sentence. No paragraphs of marketing copy.

## Layout grid
12-column fluid grid, 24px gutters mobile / 40px desktop, max content width 1440px. Hero text sits left-aligned on desktop (3D glass right of centre) and bottom-anchored on mobile (glass above).

## Scroll storyboard (one continuous pinned WebGL stage)
| Progress | Scene | Headline | WebGL | HTML |
|---|---|---|---|---|
| 0.00–0.14 | 01 The First Sip | THE ART OF MILK & INDULGENCE. | Glass centred, ribbon orbit, ingredients drift, camera dolly-in | Brand, headline, CTA |
| 0.14–0.32 | 02 Milk in Motion | MILK IN MOTION. | Liquid vortex (displaced tube ribbons + droplet particles), glass dissolves | Short line |
| 0.32–0.50 | 03 The Sweet Universe | TRADITION IN EVERY BITE. | Sweets as lit photo-planes with parallax depth + gold particles | Sweet names |
| 0.50–0.66 | 04 The Dessert Universe | YOUR CRAVINGS. YOUR UNIVERSE. | Floating procedural dessert glasses (rose / badam / falooda) each with own material + light | Product chips |
| 0.66–0.82 | 05 The Food Experience | STREET. CAFE. HOME. | Warm food photography with depth parallax, category transitions | Category labels |
| 0.82–1.00 | Transition to Menu | — | Scene fades to cream | Menu header rises |
| after | 06 Menu · 07 Visit · Footer | — | none (HTML only) | Full business UI |

## Motion language
- Easing: `power2.out` for reveals, `expo.out` for camera, Lenis lerp 0.09 (desktop), native scroll on touch.
- Cursor parallax max ±0.35 units, breathing ±0.02 units, no roll. Reduced-motion: static camera, no parallax, no autoplaying particles, instant reveals.
- Microinteractions: ingredient hover reacts in 3D (slight scale + glow), menu cards lift 4px, buttons underline-sweep, custom cursor dot on desktop only.

## Image treatment
All photography receives the same grade: slight warm lift, vignette, 2% grain overlay, rounded 6px corners on menu, square crops for products, 3:2 for scenes. Stock photographs are flagged "representative" in `ASSET_MANIFEST.md` and replaced by owner photos 1:1 by filename.

## What we avoid
Generic AI gradients, pill-button soup, card walls, decorative icons, random floating objects, stock hero photos pretending to be the shop.

## Post-WebGL editorial system (added 2026-11-03)
Principle: composition over containers. No product cards, no boxed sections, no repeated column grids. Rectangles only where functional (the map embed).

| # | Section | Tone | Composition |
|---|---|---|---|
| 06 | The next chapter | burgundy | Canvas settles; a gold hairline (the ribbon, flattened) draws with scroll; ghost numeral; hero-scale headline left, portrait photo right with vertical label |
| 07 | The LALA table | ivory | One tall photograph, headline overlapping its edge, two supporting crops of different ratios, vertical label |
| 08 | The counter (menu) | cocoa → per category | Sticky hairline category nav. Layouts: photo-left (sticky image), photo-right, portrait (image bleeds right, ghost numeral), duo (two crops, maroon), typeset (numbered list, small square photo). Rows: diet mark · serif name · note · "on request" at the far edge, hairline separators |
| 09 | Start here | burgundy | Oversized photograph bleeding off the right edge, numbered typographic list of listed candidates (no bestseller claims), small overlapping crop |
| 10 | The savoury side | maroon | Slow italic marquee, diagonal photo cluster, short copy, Swiggy link |
| 11 | Find us | burgundy | Full-bleed atmosphere photo with the headline set into it, address typeset large, hairline contact rows, tinted Google map, storefront slot awaiting the shop's photo |
| — | Sign-off + footer | burgundy / cocoa | LALA. and the signature line; footer as text columns on a hairline |

Rhythm: burgundy → ivory → cocoa/ivory/maroon alternation inside the menu → burgundy → maroon → burgundy → cocoa. Numerals continue the story (01–05 in WebGL, 06–11 after).
Mobile: every spread re-stacks (image first where the image carries the beat, list first where the list does), captions sit under a scrim, type scales with clamp(), category nav scrolls horizontally.
