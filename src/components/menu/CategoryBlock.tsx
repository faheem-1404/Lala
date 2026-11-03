import { itemsByCategory, type MenuCategory } from "@/data/menu";
import { MenuRow } from "./MenuRow";
import { Photo } from "@/components/ui/Photo";

const TONE_CLASS = { burgundy: "tone-burgundy", ivory: "tone-ivory", cocoa: "tone-cocoa", maroon: "tone-maroon" } as const;
const NAV_TONE = { burgundy: "dark", ivory: "light", cocoa: "dark", maroon: "dark" } as const;

function Title({ c, className = "" }: { c: MenuCategory; className?: string }) {
  return (
    <header className={className} data-reveal-group>
      <p data-reveal className="eyebrow mb-4">
        {c.number} — {c.name}
      </p>
      <h3 data-reveal className="display-lg">
        {c.name}
      </h3>
      <p data-reveal className="mt-4 font-display italic text-[1.1rem] opacity-70 md:text-[1.3rem]">
        {c.intro}
      </p>
      {c.dietNote && (
        <p data-reveal className="mt-3 inline-flex items-center gap-2 text-[0.6875rem] tracking-[0.18em] uppercase opacity-70">
          <span className="diet-mark non-veg" aria-hidden="true" /> {c.dietNote}
        </p>
      )}
    </header>
  );
}

function Rows({ c, numbered = false }: { c: MenuCategory; numbered?: boolean }) {
  const items = itemsByCategory(c.id);
  return (
    <ol className="mt-8 md:mt-10" data-reveal-group aria-label={`${c.name} items`}>
      {items.map((it, i) => (
        <MenuRow key={it.id} item={it} index={numbered ? i : undefined} />
      ))}
    </ol>
  );
}

/**
 * One category, composed one of five ways. Rows and images are the only ingredients; no containers.
 */
export function CategoryBlock({ c }: { c: MenuCategory }) {
  const img = c.images[0];
  const wrap = `relative ${TONE_CLASS[c.tone]}`;
  const inner = "mx-auto max-w-[1440px] px-6 md:px-10";

  if (c.layout === "photo-left" || c.layout === "photo-right") {
    const left = c.layout === "photo-left";
    return (
      <section id={`menu-${c.id}`} data-nav-tone={NAV_TONE[c.tone]} data-menu-cat={c.id} className={wrap}>
        <div className={`${inner} grid gap-10 py-20 md:grid-cols-12 md:gap-8 md:py-32`}>
          <div className={`md:col-span-5 ${left ? "md:order-1" : "md:order-2 md:col-start-8"}`}>
            {img && (
              <div className="md:sticky md:top-[calc(var(--nav-h)+2rem)]">
                <Photo src={img.src} alt={img.alt} ratio={img.ratio} parallax={0.12} sizes="(max-width: 768px) 100vw, 40vw" caption="Representative photograph" />
              </div>
            )}
          </div>
          <div className={`md:col-span-6 ${left ? "md:order-2 md:col-start-7" : "md:order-1"}`}>
            <Title c={c} />
            <Rows c={c} />
          </div>
        </div>
      </section>
    );
  }

  if (c.layout === "portrait") {
    return (
      <section id={`menu-${c.id}`} data-nav-tone={NAV_TONE[c.tone]} data-menu-cat={c.id} className={`${wrap} overflow-hidden`}>
        <div className={`${inner} relative py-20 md:py-32`}>
          <div className="grid gap-8 md:grid-cols-12">
            <div className="relative z-10 md:col-span-7 md:pt-20">
              <Title c={c} />
              <Rows c={c} />
            </div>
            <div className="relative md:col-span-5 md:-mr-10 lg:-mr-24">
              {img && (
                <Photo src={img.src} alt={img.alt} ratio="tall" parallax={0.22} sizes="(max-width: 768px) 100vw, 45vw" caption="Representative photograph" className="md:-mt-10" />
              )}
              <span className="display-number pointer-events-none absolute -left-10 bottom-10 hidden md:block" aria-hidden="true">{c.number}</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (c.layout === "duo") {
    const [a, b] = c.images;
    return (
      <section id={`menu-${c.id}`} data-nav-tone={NAV_TONE[c.tone]} data-menu-cat={c.id} className={`${wrap} overflow-hidden`}>
        <div className={`${inner} py-20 md:py-32`}>
          <div className="grid gap-10 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-5">
              <Title c={c} />
              <Rows c={c} />
            </div>
            <div className="relative md:col-span-7 md:pl-10">
              <div className="grid grid-cols-12 gap-4 md:gap-6">
                {a && (
                  <div className="col-span-7 md:col-span-6 md:-mt-12">
                    <Photo src={a.src} alt={a.alt} ratio="portrait" parallax={0.2} sizes="(max-width: 768px) 60vw, 30vw" reveal="x" caption="Representative" />
                  </div>
                )}
                {b && (
                  <div className="col-span-5 self-end md:col-span-6 md:mt-24">
                    <Photo src={b.src} alt={b.alt} ratio="square" parallax={0.1} sizes="(max-width: 768px) 40vw, 25vw" caption="Representative" />
                  </div>
                )}
              </div>
              <span className="vertical-label absolute -right-2 top-4 hidden md:block">Made to order</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // typeset: title column + numbered list, optional small square photograph
  return (
    <section id={`menu-${c.id}`} data-nav-tone={NAV_TONE[c.tone]} data-menu-cat={c.id} className={wrap}>
      <div className={`${inner} grid gap-8 py-16 md:grid-cols-12 md:py-24`}>
        <div className="md:col-span-4">
          <Title c={c} />
          {img && (
            <div className="mt-8 hidden max-w-[12rem] md:block">
              <Photo src={img.src} alt={img.alt} ratio="square" parallax={0.08} sizes="12rem" reveal="x" caption="Representative" />
            </div>
          )}
        </div>
        <div className="md:col-span-7 md:col-start-6">
          <Rows c={c} numbered />
        </div>
      </div>
    </section>
  );
}
