"use client";

import { useEditorial } from "@/hooks/useEditorial";
import { Photo } from "@/components/ui/Photo";
import { swiggyLink } from "@/utils/links";
import { IconArrow } from "@/components/ui/Icons";
import { SplitLines } from "@/components/ui/SplitLines";

const WORDS = ["Chaat", "Pav bhaji", "Buns", "Fries", "Maggi", "Quick bites", "Loaded fries"];

/** 10 — Not just milk. A more energetic spread: a slow typographic marquee and a diagonal photo cluster. */
export function FoodSection() {
  const ref = useEditorial<HTMLElement>();
  const line = WORDS.map((w) => `${w} · `).join("");
  return (
    <section ref={ref} id="food" data-nav-tone="dark" className="relative z-10 tone-maroon overflow-hidden" aria-labelledby="food-title">
      <div className="marquee border-y border-cream/15 py-5 font-display italic text-[clamp(2rem,5vw,4.5rem)] leading-none text-cream/90" aria-hidden="true">
        <span>{line}</span>
        <span>{line}</span>
      </div>

      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-32">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5 md:pt-16">
            <p data-reveal className="eyebrow mb-6">10 — Snacks and street food</p>
            <SplitLines id="food-title" className="display-lg" lines={["Not just", "milk."]} />
            <p data-reveal className="lede mt-8 max-w-[24rem]">
              Pani puri and dahi puri made fresh, pav bhaji, bhel puri, buttered buns, fries, Maggi — and chicken loaded fries too.
            </p>
            <a href={swiggyLink()} target="_blank" rel="noopener noreferrer" data-reveal className="link-sweep mt-8 inline-flex items-center gap-3 text-[0.75rem] tracking-[0.22em] uppercase">
              Order on Swiggy <IconArrow className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="relative md:col-span-7">
            <div className="grid grid-cols-12 gap-4 md:gap-6">
              <div className="col-span-7 md:col-span-5 md:-mt-10">
                <Photo src="/assets/snacks/pani-puri-clay.webp" alt="Pani puri in a clay bowl — " ratio="portrait" parallax={0.22} sizes="(max-width: 768px) 60vw, 28vw" reveal="x"  />
              </div>
              <div className="col-span-5 self-end md:col-span-4 md:col-start-7 md:mt-20">
                <Photo src="/assets/cafe/cheese-balls.webp" alt="Golden fried cheese balls — " ratio="square" parallax={0.1} sizes="(max-width: 768px) 40vw, 20vw"  />
              </div>
              <div className="col-span-8 col-start-3 md:col-span-6 md:col-start-4 md:-mt-6">
                <Photo src="/assets/snacks/pav-bhaji-tray.webp" alt="Pav bhaji on a steel tray — " ratio="landscape" parallax={0.16} sizes="(max-width: 768px) 70vw, 30vw"  />
              </div>
              <div className="col-span-4 self-start md:col-span-3 md:col-start-10 md:-mt-28">
                <Photo src="/assets/cafe/maggi-noodles.webp" alt="A bowl of seasoned noodles — " ratio="square" parallax={0.26} sizes="(max-width: 768px) 35vw, 16vw" reveal="x" />
              </div>
            </div>
            <span className="vertical-label absolute -right-3 bottom-0 hidden md:block">Hot from the counter</span>
          </div>
        </div>
      </div>
    </section>
  );
}
