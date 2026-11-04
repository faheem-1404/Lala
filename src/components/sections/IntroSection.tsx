"use client";

import { useEditorial } from "@/hooks/useEditorial";
import { Photo } from "@/components/ui/Photo";
import { BUSINESS } from "@/data/business";
import { SplitLines } from "@/components/ui/SplitLines";

/**
 * 06 — The next chapter. The canvas settles into burgundy and the editorial world opens like a magazine spread.
 * The gold line is the ribbon from the 3D scene, flattened and drawn by scroll.
 */
export function IntroSection() {
  const ref = useEditorial<HTMLElement>();
  return (
    <section ref={ref} id="intro" data-nav-tone="dark" className="relative z-10 -mt-[58vh] md:-mt-[78vh]" style={{ color: "var(--color-cream)", "--stroke": "rgba(248,230,209,0.22)" } as React.CSSProperties} aria-labelledby="intro-title">
      <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(42,6,13,0) 0, #2a060d 34vh, #2a060d 100%)" }} aria-hidden="true" />

      <div className="relative mx-auto max-w-[1440px] px-6 pt-[8vh] pb-28 md:px-10 md:pb-44 md:pt-[12vh]">
        {/* ribbon motif → hairline */}
        <svg className="mb-4 h-[56px] w-full md:mb-8 md:h-[110px]" viewBox="0 0 1400 120" fill="none" preserveAspectRatio="none" aria-hidden="true">
          <path data-draw d="M-20 96 C 180 96, 260 20, 460 28 S 760 112, 960 70 S 1260 8, 1420 40" stroke="#d4af37" strokeOpacity="0.8" strokeWidth="1.2" />
        </svg>

        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="relative md:col-span-7">
            <p data-reveal className="eyebrow relative mb-8 md:mb-12">Welcome to LALA</p>
            <span data-reveal className="display-number pointer-events-none absolute -left-2 top-[0.1em] md:-left-6 md:top-0" aria-hidden="true">06</span>
            <SplitLines
              id="intro-title"
              className="display-hero relative"
              lines={["More than", "milk.", <em key="e" className="font-normal italic text-gold-soft">A world of</em>, "indulgence."]}
            />
            <p data-reveal className="lede relative mt-10 max-w-[30rem] md:mt-14">
              {BUSINESS.name} is a milk shop on Bharathi Salai, Triplicane. Hot masala paal and badam milk at the counter, cold falooda and milkshakes for the heat, and buns, chaat and snacks for everything in between.
            </p>
          </div>

          <div className="relative md:col-span-5 md:pt-24">
            <span className="vertical-label absolute -left-6 top-8 hidden md:block">{BUSINESS.locality} · {BUSINESS.city}</span>
            <Photo
              src="/assets/hero/saffron-milk-glasses.webp"
              alt="Small glasses of saffron milk with pistachio"
              ratio="portrait"
              parallax={0.2}
              sizes="(max-width: 768px) 100vw, 40vw"
              caption="Stock photo"
              className="md:ml-8"
            />
            <p data-reveal className="mt-6 max-w-[18rem] text-sm leading-relaxed text-cream/60 md:ml-8">
              In the shop&apos;s own words: traditional milk varieties and chaat.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
