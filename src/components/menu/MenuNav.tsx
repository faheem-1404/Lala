"use client";

import { useEffect, useState } from "react";
import { MENU_CATEGORIES } from "@/data/menu";
import { scrollToId } from "@/components/providers/ScrollProvider";
import { lalaAudio } from "@/utils/audio";

/** Refined category navigation: a single hairline row of names, the current one underlined in gold. */
export function MenuNav() {
  const [active, setActive] = useState<string>(MENU_CATEGORIES[0].id);
  const [light, setLight] = useState(false);

  useEffect(() => {
    const blocks = Array.from(document.querySelectorAll<HTMLElement>("[data-menu-cat]"));
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (vis) {
          const el = vis.target as HTMLElement;
          setActive(el.dataset.menuCat!);
          setLight(el.dataset.navTone === "light");
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.1, 0.5] },
    );
    blocks.forEach((b) => io.observe(b));
    return () => io.disconnect();
  }, []);

  return (
    <nav
      aria-label="Menu categories"
      className={`sticky z-30 transition-colors duration-500 ${light ? "text-burgundy-deep" : "text-cream"}`}
      style={{ top: "var(--nav-h)", background: light ? "rgba(251,243,232,0.86)" : "rgba(27,10,7,0.72)", backdropFilter: "blur(10px)" }}
    >
      <ul className="mx-auto flex max-w-[1440px] gap-7 overflow-x-auto px-6 py-3 md:gap-9 md:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {MENU_CATEGORIES.map((c) => {
          const on = active === c.id;
          return (
            <li key={c.id} className="shrink-0">
              <a
                href={`#menu-${c.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  lalaAudio?.tick();
                  scrollToId(`menu-${c.id}`);
                }}
                aria-current={on ? "true" : undefined}
                className={`relative inline-block py-1 text-[0.6875rem] tracking-[0.22em] uppercase transition-opacity ${on ? "opacity-100" : "opacity-55 hover:opacity-100"}`}
              >
                <span className="mr-2 opacity-50">{c.number}</span>
                {c.shortName}
                <span className={`absolute inset-x-0 -bottom-0.5 h-px bg-gold transition-transform duration-500 [transition-timing-function:var(--ease-expo)] ${on ? "scale-x-100" : "scale-x-0"}`} style={{ transformOrigin: "left" }} />
              </a>
            </li>
          );
        })}
      </ul>
      <div className="ink-rule" />
    </nav>
  );
}
