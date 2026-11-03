# Technical Architecture

## Stack (pinned in package.json)
Next.js 16 (App Router, Turbopack) · React 19.2 · TypeScript 5.9 · three 0.186 · @react-three/fiber 9.6 · @react-three/drei 10.7 · @react-three/postprocessing 3 · GSAP 3.15 + ScrollTrigger · Lenis 1.3 · Tailwind CSS 4 · custom GLSL (template-string shaders, no loader needed).

## Folder structure
```
src/
  app/                layout.tsx (fonts, metadata, providers), page.tsx, globals.css, error.tsx, not-found.tsx, sitemap/robots
  components/
    navigation/       Nav, MobileMenu
    hero/             HeroCopy (HTML layer over the canvas)
    three/            MilkverseCanvas (single persistent <Canvas>), Stage (scene switcher), Lighting, StudioEnvironment, Effects, AdaptiveQuality
    transitions/      SceneCopy (per-scene HTML captions driven by progress)
    sections/         MenuSection, VisitSection, SignatureSection
    menu/             MenuFilters, MenuGrid, MenuCard, PriceLabel
    footer/           Footer
    ui/               Button, Eyebrow, Loader, SoundToggle, Cursor, NoWebGLFallback
  scenes/
    MilkScene/        Glass (procedural lathe geometry + MeshPhysicalMaterial transmission), Liquid (custom shader), MilkRibbon (tube + vertex displacement), Ingredients (instanced almonds/pistachios/saffron), Droplets (points)
    SweetScene/       SweetField (textured planes in depth + gold dust)
    FaloodaScene/     DessertGlasses (procedural layered glasses, per-product materials)
    FoodScene/        FoodField (photo planes with category transitions)
  shaders/            liquid.ts, ribbon.ts, particles.ts, noise.ts (GLSL strings)
  hooks/              useScrollProgress (Lenis + ScrollTrigger store), usePointerParallax, useDeviceTier, useReducedMotion, useWebGLSupport
  data/               menu.ts, business.ts, scenes.ts
  utils/              math.ts, links.ts (WhatsApp / Maps / tel builders)
  styles/             (Tailwind theme lives in globals.css @theme)
public/assets/        brand/ hero/ beverages/ falooda/ sweets/ buns/ snacks/ cafe/ ingredients/ textures/ 3d/ storefront/ atmosphere/ icons/ raw/
docs/                 PROJECT_PLAN, BRAND_DIRECTION, ASSET_MANIFEST, MENU_DATA, TECHNICAL_ARCHITECTURE
scripts/              fetch-assets.sh, optimize-assets.mjs
```

## Rendering model
- **One persistent full-viewport `<Canvas>`** fixed behind the document for the pinned story (0 → ~82% of the story section). HTML copy lives in the DOM (accessible, selectable); only visuals are WebGL.
- **Scroll progress** is a single number (0–1) from a GSAP ScrollTrigger on the story wrapper, written to a lightweight store (`useScrollProgress`) and read inside `useFrame` — no React re-renders per scroll tick.
- **Scenes** are mounted lazily by progress window (`scenes.ts` defines ranges) with ±0.08 overlap for cross-fades. A scene not in range is unmounted and its GPU resources disposed.
- **Camera** follows a hand-authored path (CatmullRom of keyframes) sampled by progress; pointer parallax and breathing are added on top with damped lerp (maath).
- **Glass**: lathe-profile geometry (thickness via inner + outer walls), `MeshPhysicalMaterial` with `transmission`, `thickness`, `ior 1.5`, `roughness 0.05`, clearcoat; condensation = instanced tiny spheres on the outer wall with a transmissive material; environment = drei `<Environment>` rendered from `<Lightformer>`s (procedural studio, **no network HDRI**).
- **Liquid**: separate lathe mesh with a custom `ShaderMaterial` — vertex noise on the top surface, saffron/cream colour mix by depth, fresnel rim, subtle subsurface tint. Ingredients inside = instanced capsule/ellipsoid meshes.
- **Milk ribbon**: TubeGeometry around a CatmullRom spiral; vertex shader adds travelling-wave displacement and a scroll-driven "explosion" parameter that unwinds the spiral into open arcs; fragment shader = cream base, fresnel highlight, noise-based gloss breakup.
- **Particles**: droplets as `Points` with size attenuation and soft sprite shader; counts scale with device tier.
- **Post-processing**: Bloom (low intensity, threshold high) + Vignette on desktop tier only; disabled on mobile / low tier.

## Performance
- Adaptive DPR: `[1, 1.75]` desktop, `[1, 1.25]` mobile, drops under frame budget (drei `PerformanceMonitor`).
- Device tier (`useDeviceTier`): screen width, `hardwareConcurrency`, `deviceMemory`, `prefers-reduced-motion`, touch → `high | mid | low`.
- Particle counts, ribbon segments, glass segments, post-processing and shadow usage scale with tier.
- Textures delivered as WebP (`scripts/optimize-assets.mjs`), `next/image` for DOM, `TextureLoader` with `colorSpace = SRGB` in WebGL, generated mipmaps, anisotropy 4.
- Scenes outside their window are unmounted; `frameloop="always"` only while the story is in view (IntersectionObserver) — otherwise `demand`.
- WebGL unavailable → static hero (concept art) + all HTML sections. Reduced motion → single composed frame, no scroll animation; copy reveals instantly.
- Menu and ordering are plain HTML/React and render even if the canvas throws (error boundary around the canvas).

## Links (utils/links.ts)
- WhatsApp: `https://wa.me/917550006861?text=<encoded prefilled message>`
- Call: `tel:+917550006861`
- Swiggy: brief URL · Instagram: brief URL · Maps: brief search URL · Justdial: brief URL.

## Hard-won rendering notes
- three.js renders only **opaque** objects into the transmission buffer: anything that must be seen *through* the glass (liquid body, surface disc, pieces on the surface, scoops) must have `transparent: false`. Fades are done with motion/scale, never opacity, for those meshes.
- Custom `ShaderMaterial`s must include `#include <tonemapping_fragment>` before `#include <colorspace_fragment>` or they bypass ACES and look hotter than the PBR materials.
- Photo textures are uploaded raw (`NoColorSpace`) and decoded sRGB→linear in `shaders/photo.ts`; three keeps the first internal format, so flipping `colorSpace` after upload has no effect.
- Headless Chromium (SwiftShader) runs at a few fps; damped scroll state lags the DOM captions in screenshots — `scripts/qa-screenshots.mjs` waits 2.8 s per step for that reason.

## Quality gates
`npm run typecheck` · `npm run build` · manual runtime check (console clean, no WebGL errors) · link audit · mobile (375×812) + desktop (1440×900) viewport check · reduced-motion check.
