"use client";

import { MENU_CATEGORIES } from "@/data/menu";
import { CategoryBlock } from "./CategoryBlock";
import { MenuNav } from "./MenuNav";
import { useEditorial } from "@/hooks/useEditorial";
import { swiggyLink, whatsappLink } from "@/utils/links";
import { IconArrow, IconWhatsApp } from "@/components/ui/Icons";
import { lalaAudio } from "@/utils/audio";

/** 08 — The counter. A typeset menu composed category by category; data from src/data/menu.ts only. */
export function EditorialMenu() {
  const ref = useEditorial<HTMLElement>();
  return (
    <section ref={ref} id="menu" aria-labelledby="menu-title" className="relative z-10">
      <div data-nav-tone="dark" className="tone-cocoa">
        <div className="mx-auto max-w-[1440px] px-6 pb-16 pt-28 md:px-10 md:pb-24 md:pt-44">
          <div className="grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <p data-reveal className="eyebrow mb-6">08 — The menu</p>
              <h2 id="menu-title" data-reveal className="display-hero">
                The counter.
              </h2>
            </div>
            <div className="md:col-span-4 md:pb-3">
              <p data-reveal className="text-sm leading-relaxed text-cream/65">
                Names as listed on Swiggy. Prices are on request until the shop confirms them — ask on WhatsApp or order online. Photographs are representative of the dish, not of LALA&apos;s own plates.
              </p>
              <div data-reveal className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-[0.75rem] tracking-[0.2em] uppercase">
                <a href={swiggyLink()} target="_blank" rel="noopener noreferrer" className="link-sweep inline-flex items-center gap-2" onClick={() => lalaAudio?.tick()}>
                  Order on Swiggy <IconArrow className="w-3.5 h-3.5" />
                </a>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="link-sweep inline-flex items-center gap-2" onClick={() => lalaAudio?.tick()}>
                  <IconWhatsApp className="w-3.5 h-3.5" /> Ask on WhatsApp
                </a>
              </div>
              <p data-reveal className="mt-6 flex items-center gap-5 text-[0.625rem] tracking-[0.18em] uppercase text-cream/50">
                <span className="inline-flex items-center gap-2"><span className="diet-mark" aria-hidden="true" /> Vegetarian</span>
                <span className="inline-flex items-center gap-2"><span className="diet-mark non-veg" aria-hidden="true" /> Non-vegetarian</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <MenuNav />
      {MENU_CATEGORIES.map((c) => (
        <CategoryBlock key={c.id} c={c} />
      ))}
    </section>
  );
}
