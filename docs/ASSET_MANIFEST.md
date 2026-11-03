# Asset Manifest — LALA · The Milkverse

**Licences.** Unless stated otherwise every photograph is from Pexels under the Pexels License (free for commercial use, modification allowed, no attribution required; not to be sold unaltered or used as a trademark; verified on https://www.pexels.com/license/ on 2026-11-03). Two Mysore pak photographs are from Wikimedia Commons under **CC BY-SA 4.0** and require attribution (given in the site footer and here). Hero concept art and the moodboard were supplied by the client in the LALA Visual Reference Book and are **generated concept art**, never presented as photographs of the shop.

**Genuine LALA photography: none yet.** Every product/scene image below is *representative stock* flagged `REPLACE` — swap in the owner's photograph at the same path (same filename, WebP) and nothing else changes. Raw originals live in `public/assets/raw/`; `npm run assets:optimize` regenerates the WebP files.

**Pipeline.** `scripts/fetch-assets.sh` downloads originals (Pexels 1600 px / 2400 px variants) → `scripts/optimize-assets.mjs` resizes to ≤1600 px (hero/textures/atmosphere ≤2400) WebP q80–84.

Source URL pattern for Pexels IDs: `https://www.pexels.com/photo/<id>/`. Photographer = Pexels username slug.

| File (public/assets/) | Subject | Source (ID / photographer) | Licence | Genuine LALA? | Section | Res (WebP) | Replace? |
|---|---|---|---|---|---|---|---|
| hero/hero-concept-art.jpg | Hero key visual (saffron paal glass, milk ribbon) | Client-supplied concept art (Reference Book) | Client | Concept art | Static hero fallback, OG image | 1536×1024 | Optional (keep as concept) |
| hero/milk-splash-glass-black.webp | Milk splash in glass, black | Pexels 35386596 / christopher-welsch-leveroni | Pexels | No | Reserve (fallbacks, social) | ≤2400 | Optional |
| hero/milk-splash-black-2.webp | Milk splash, black | Pexels 36007880 / christopher-welsch-leveroni | Pexels | No | Reserve | ≤2400 | Optional |
| hero/milk-splash-dark.webp | Milk splash close-up | Pexels 7452482 / nord6 | Pexels | No | Reserve | ≤2400 | Optional |
| hero/saffron-milk-glasses.webp | Saffron/turmeric milk with pistachio | Pexels 15082977 / shameel-mukkath | Pexels | No | Visit mosaic, "Special Masala Paal" | ≤2400 | REPLACE |
| beverages/masala-paal.webp | Saffron milk glasses | Pexels 15082977 / shameel-mukkath | Pexels | No | Menu: Hot Masala Paal | 1600 | REPLACE |
| beverages/badam-milk.webp | Milk sharbat in clay pot with almonds | Pexels 38260645 / naheedzain-siddiqui | Pexels | No | Menu: Royal Badam Malai Paal | 1600 | REPLACE |
| beverages/almond-milk-glass.webp | Almond milk glass | Pexels 4187716 / polina-tankilevitch | Pexels | No | Menu: Badam Milk | 1600 | REPLACE |
| beverages/kova-paal.webp | Lassi glasses with nuts | Pexels 4475024 / robin-kumar-biswal | Pexels | No | Menu: Hot Kova Paal | 1600 | REPLACE |
| beverages/rose-milk.webp | Rose milk in jar | Pexels 35680954 / shafky-zubair | Pexels | No | Menu: Rose Milk | 1600 | REPLACE |
| beverages/rose-milk-cafe.webp | Pink milkshake, cafe | Pexels 35119724 / slytonic | Pexels | No | Menu: Strawberry Milkshake | 1600 | REPLACE |
| beverages/milk-glass-black.webp | Glass of milk, black | Pexels 2198626 / alexasfotos | Pexels | No | Menu: Pal Sharbat | 1600 | REPLACE |
| beverages/milk-glass-cherry-black.webp | Milk glass with cherry | Pexels 31754107 / ender-ergul | Pexels | No | Reserve | 1600 | Optional |
| falooda/royal-falooda.webp | Falooda with pistachio and rose | Pexels 18646641 / dreamer-dude | Pexels | No | Menu: Special Royal Falooda | 1600 | REPLACE |
| falooda/falooda-glass.webp | Falooda in glass | Pexels 2835351 / automnenoble | Pexels | No | Menu: Mini Falooda | 1600 | REPLACE |
| falooda/fruit-falooda.webp | Rose milkshake with fruit | Pexels 18646648 / dreamer-dude | Pexels | No | Menu: Fruit Falooda | 1600 | REPLACE |
| falooda/kulfi-falooda.webp | Kulfi with vermicelli, nuts | Pexels 36576778 / kunal-lakhotia | Pexels | No | Menu: Ice Cream Falooda | 1600 | REPLACE |
| falooda/fruit-dessert-glass-dark.webp | Fruit dessert glass, dark | Pexels 5695591 / shouravsheikh | Pexels | No | Menu: Fruit Mix | 1600 | REPLACE |
| falooda/falooda-top-view.webp | Dessert top view | Pexels 18646637 / dreamer-dude | Pexels | No | Reserve | 1600 | Optional |
| sweets/gulab-jamun.webp | Gulab jamun | Pexels 9198596 / Mushtaq Hussain (chinarianphotographer) | Pexels | No | Sweet Universe, Menu | 1600 | REPLACE |
| sweets/laddu.webp | Ladoos with saffron | Pexels 40000005 / jahratreza | Pexels | No | Sweet Universe, Menu | 1600 | REPLACE |
| sweets/badusha.webp | Badusha tray | Pexels 9672994 / sohanikamat | Pexels | No | Sweet Universe, Menu | 1600 | REPLACE |
| sweets/carrot-halwa.webp | Gajar halwa with pistachio | Pexels 35532835 / athul-santhosh | Pexels | No | Sweet Universe, Menu | 1600 | REPLACE |
| sweets/kalakand.webp | Kalakand with silver foil | Pexels 38883078 / mangalam-bhargava | Pexels | No | Sweet Universe, Menu | 1600 | REPLACE |
| sweets/mysore-pak.webp | Mysore pak | Wikimedia Commons "Mysore pak 10.jpg" by **Vis M** | **CC BY-SA 4.0** (attribution in footer) | No | Sweet Universe, Menu | 1600 | REPLACE |
| sweets/mysore-pak-ghee.webp | Ghee Mysore pak | Wikimedia Commons "Ghee Mysore Pak.jpg" by **Vaidehi Pujary** | **CC BY-SA 4.0** | No | Reserve | 1600 | Optional |
| sweets/rasgulla.webp | Rasgulla in bowl | Pexels 8788869 / divigraphy | Pexels | No | Sweet Universe (as rasmalai stand-in) | 1600 | REPLACE |
| sweets/milk-dessert-rose.webp | Milk dessert with rose petals | Pexels 13040266 / the-pixel-blanket | Pexels | No | Menu: Rasmalai | 1600 | REPLACE |
| sweets/besan-barfi.webp | Besan barfi | Pexels 7182054 / pure-punjabi | Pexels | No | Reserve | 1600 | Optional |
| sweets/assorted-sweets.webp | Assorted mithai | Pexels 11484120 / towfiqu-barbhuiya | Pexels | No | Sweet Universe | 1600 | REPLACE |
| sweets/sweets-display.webp | Sweet shop display (not LALA) | Pexels 38524183 / capturingbybilal | Pexels | No | Reserve | 1600 | Optional |
| sweets/sweets-candlelight.webp | Sweets with candle | Pexels 37219215 / tharunthejasjp | Pexels | No | Reserve | 1600 | Optional |
| sweets/sweets-red-backdrop.webp | Sweets on red backdrop | Pexels 18488307 / gaurav-kumar | Pexels | No | Visit mosaic | 1600 | REPLACE |
| sweets/milk-cake.webp | Milk cake | Pexels 18488313 / gaurav-kumar | Pexels | No | Reserve | 1600 | Optional |
| buns/glazed-buns.webp | Glazed buns | Pexels 166653 / digitalbuggu | Pexels | No | Food scene, Menu: Kova Bun | 1600 | REPLACE |
| buns/bun-closeup.webp | Bun close-up | Pexels 16111975 / vuralyavas | Pexels | No | Food scene, Menu: Muska Bun | 1600 | REPLACE |
| buns/sesame-buns.webp | Sesame buns | Pexels 20200307 / dilara | Pexels | No | Food scene, Menu: Carrot Bun | 1600 | REPLACE |
| buns/bread-rolls-basket.webp | Bread rolls | Pexels 12904147 / beytlik | Pexels | No | Menu: Beetroot Bun | 1600 | REPLACE |
| snacks/pav-bhaji.webp | Pav bhaji top view | Pexels 5410400 / saveurssecretes | Pexels | No | Food scene, Menu | 1600 | REPLACE |
| snacks/pav-bhaji-tray.webp | Pav bhaji tray | Pexels 7625089 / saveurssecretes | Pexels | No | Reserve | 1600 | Optional |
| snacks/pav-bhaji-platter.webp | Pav bhaji platter | Pexels 34507155 / viridianaor | Pexels | No | Reserve | 1600 | Optional |
| snacks/pani-puri.webp | Pani puri, dark | Pexels 30641912 / shootsaga | Pexels | No | Food scene, Menu | 1600 | REPLACE |
| snacks/pani-puri-clay.webp | Pani puri in clay bowl | Pexels 40000051 / jahratreza | Pexels | No | Reserve | 1600 | Optional |
| snacks/pani-puri-closeup.webp | Pani puri close-up | Pexels 13063312 / shahbaz-ansari | Pexels | No | Reserve | 1600 | Optional |
| snacks/dahi-puri.webp | Dahi puri | Pexels 32894826 / abeesh-akhilesh | Pexels | No | Food scene, Menu | 1600 | REPLACE |
| snacks/bhel-puri.webp | Bhel puri bowl | Pexels 35213277 / calwin-veigas | Pexels | No | Food scene, Menu | 1600 | REPLACE |
| snacks/bhel-puri-newspaper.webp | Bhel in newspaper | Pexels 36195516 / mylaststory | Pexels | No | Reserve | 1600 | Optional |
| snacks/samosa.webp | Samosas, black | Pexels 36170557 / itsemshuvo | Pexels | No | Food scene, Menu | 1600 | REPLACE |
| cafe/french-fries.webp | Fries with ketchup, black | Pexels 36292352 / mony-cruz | Pexels | No | Food scene, Menu | 1600 | REPLACE |
| cafe/fries-bowl.webp | Fries bowl | Pexels 5836999 / roman-odintsov | Pexels | No | Reserve | 1600 | Optional |
| cafe/burger.webp | Cheeseburger on slate | Pexels 38660122 / jonathan-pagaoa | Pexels | No | Food scene, Menu | 1600 | REPLACE |
| cafe/chicken-burger.webp | Chicken burgers | Pexels 17121731 / ali-dashti | Pexels | No | Reserve | 1600 | Optional |
| cafe/chicken-wings.webp | Spicy wings with chillies | Pexels 7230625 / ahmedbhutta11 | Pexels | No | Food scene, Menu | 1600 | REPLACE |
| cafe/chicken-wings-sauce.webp | Wings in sauce | Pexels 27562875 / philippe-alamazani | Pexels | No | Reserve | 1600 | Optional |
| cafe/maggi-noodles.webp | Seasoned instant noodles | Pexels 31109619 / deep-dasgupta | Pexels | No | Food scene, Menu | 1600 | REPLACE |
| cafe/cheese-balls.webp | Fried cheese balls | Pexels 34692573 / laura-oliveira | Pexels | No | Menu | 1600 | REPLACE |
| cafe/chocolate-milkshake.webp | Chocolate shake, tall | Pexels 18142621 / jdgromov | Pexels | No | Menu | 1600 | REPLACE |
| cafe/chocolate-milkshake-tall.webp | Chocolate shake | Pexels 29200682 / buselliyy | Pexels | No | Menu: Milkshakes category | 1600 | REPLACE |
| cafe/oreo-milkshake.webp | Oreo shake | Pexels 39948188 / mike-c | Pexels | No | Food scene (WebGL) | 1600 | REPLACE |
| cafe/vanilla-milkshake.webp | Vanilla shake | Pexels 28525198 / alejandro-aznar | Pexels | No | Menu | 1600 | REPLACE |
| cafe/milkshakes-assorted.webp | Assorted shakes | Pexels 6463660 / alleksana | Pexels | No | Menu: Mango shake | 1600 | REPLACE |
| ingredients/saffron.webp | Saffron threads | Pexels 33654800 / enginakyurt | Pexels | No | Visit mosaic | 1600 | Optional |
| ingredients/saffron-spoon.webp | Saffron on spoon | Pexels 10487658 / victoria-bowers | Pexels | No | Reserve | 1600 | Optional |
| ingredients/pistachios.webp | Pistachios | Pexels 32268320 / sa72 | Pexels | No | Reserve | 1600 | Optional |
| ingredients/pistachios-bowl.webp | Pistachios in bowl | Pexels 19746115 / sadegh-abdollahi | Pexels | No | Reserve | 1600 | Optional |
| ingredients/almonds-black.webp | Almonds on black | Pexels 8652963 / helloaesthe | Pexels | No | Reserve | 1600 | Optional |
| ingredients/almonds-moody.webp | Almonds low light | Pexels 33803616 / newman-photographs | Pexels | No | Reserve | 1600 | Optional |
| ingredients/cardamom-dark.webp | Cardamom, dark | Pexels 37568646 / jahratreza | Pexels | No | Reserve | 1600 | Optional |
| ingredients/cardamom-green.webp | Green cardamom | Pexels 6086300 / eva-bronzini | Pexels | No | Reserve | 1600 | Optional |
| textures/red-velvet.webp | Red velvet texture | Pexels 6843276 / shkrabaanthony | Pexels | No | Reserve | ≤2048 | Optional |
| textures/red-velvet-drape.webp | Red velvet drape | Pexels 36305726 / urfriendlyphotog | Pexels | No | Signature section background | ≤2048 | Optional |
| textures/red-velvet-2.webp | Red velvet | Pexels 6843282 / shkrabaanthony | Pexels | No | Reserve | ≤2048 | Optional |
| textures/milk-splash-deep-red.webp | Milk splash on deep red | Pexels 6497904 / skyler-ewing | Pexels | No | Reserve | ≤2048 | Optional |
| atmosphere/chennai-temple-street.webp | Temple street, Chennai | Pexels 6667282 / varan | Pexels | No (neighbourhood only, captioned) | Visit section | ≤2400 | REPLACE with storefront |
| atmosphere/chennai-sunset-road.webp | Chennai road at sunset | Pexels 26975430 / bhagavathi-d-m-e | Pexels | No | Reserve | ≤2400 | Optional |
| atmosphere/kapaleeshwarar-gopuram.webp | Kapaleeshwarar gopuram | Pexels 35282842 / kamakshi | Pexels | No | Reserve | ≤2400 | Optional |
| atmosphere/chennai-street.webp | Chennai street | Pexels 27128244 / alen-j | Pexels | No | Reserve | ≤2400 | Optional |
| atmosphere/sweet-counter-representative.webp | Cafe dessert display (not LALA) | Pexels 5864767 / rachel-claire | Pexels | No | **Not used** (could be mistaken for the shop) | 1600 | — |
| atmosphere/sweet-shop-representative.webp | Sweet shop, Andhra Pradesh (not LALA) | Pexels 30251968 / mnannapaneni | Pexels | No | **Not used** (different shop) | 1600 | — |

## Where photographs appear after the redesign (category level only; no item photos)
Intro: hero/saffron-milk-glasses · LALA table: falooda/falooda-glass, sweets/gulab-jamun, snacks/pav-bhaji · Menu: hot drinks → hero/saffron-milk-glasses; buns → buns/glazed-buns; falooda → falooda/royal-falooda; cold → beverages/rose-milk; chaat → snacks/pani-puri + snacks/dahi-puri; sweets → sweets/gulab-jamun; maggi → cafe/maggi-noodles; milkshakes → cafe/chocolate-milkshake-tall; fries → cafe/french-fries; quick bites → cafe/cheese-balls; loaded fries → none (typeset) · Start here: beverages/masala-paal, sweets/rasgulla · Savoury: snacks/pani-puri-clay, cafe/cheese-balls, snacks/pav-bhaji-tray, cafe/maggi-noodles · Visit: atmosphere/chennai-temple-street (captioned as neighbourhood), textures/red-velvet-drape (storefront slot) · Sign-off: textures/red-velvet-drape.

## 3D assets (procedural — no downloaded models)
| Asset | Implementation | File |
|---|---|---|
| Hero tumbler glass | Lathe profile with real wall thickness, MeshPhysicalMaterial transmission, instanced condensation droplets | `src/scenes/MilkScene/Glass.tsx` |
| Masala paal liquid | Lathe body + RingGeometry surface with custom GLSL (noise ripple, saffron swirl, fresnel) | `src/scenes/MilkScene/Liquid.tsx`, `src/shaders/liquid.ts` |
| Milk ribbons | TubeGeometry on CatmullRom helices, GLSL vertex displacement + unwind explosion, in-shader lighting | `src/scenes/MilkScene/MilkRibbon.tsx`, `src/shaders/ribbon.ts` |
| Almonds / pistachios / saffron | InstancedMesh ellipsoids & thin cylinders, orbit + pointer parallax + scatter | `src/scenes/MilkScene/Ingredients.tsx` |
| Droplets / gold dust | Points with custom sprite shader, burst attribute | `src/scenes/MilkScene/Droplets.tsx`, `src/shaders/particles.ts` |
| Dessert glasses (5 variants) | Lathe glass + lathe liquid with layered-colour GLSL, scoop, garnish, straw | `src/scenes/FaloodaScene/DessertGlass.tsx`, `src/shaders/dessert.ts` |
| Photo planes | Rounded-rect masked shader planes with reveal wipe | `src/scenes/shared/PhotoPlane.tsx`, `src/shaders/photo.ts` |
| Studio environment | drei Environment from Lightformers (no HDRI download) | `src/components/three/StudioEnvironment.tsx` |

## Brand assets
| Asset | Status |
|---|---|
| Logo | **Placeholder** typographic wordmark (`src/components/ui/Wordmark.tsx`). Replace with the official SVG once supplied. |
| Favicon | `src/app/icon.svg` — gold "L" monogram placeholder. |
| Storefront / interior / counter photography | **Missing — owner must supply.** Slot: `public/assets/storefront/` and the figure in `VisitSection.tsx`. |

## Owner replacement checklist
1. Storefront day + night, signboard readable → `public/assets/storefront/storefront-day.webp`, `storefront-night.webp`, then point `VisitSection.tsx` figure at them.
2. One photo per menu item, same angle/lighting, square crop ≥1600 px → overwrite the paths in the table (keep filenames).
3. Official logo SVG → replace `Wordmark` and `icon.svg`.
