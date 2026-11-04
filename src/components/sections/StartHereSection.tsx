"use client";

import { useEditorial } from "@/hooks/useEditorial";
import { Photo } from "@/components/ui/Photo";
import { highlightItems, getCategory } from "@/data/menu";
import { swiggyLink } from "@/utils/links";
import { IconArrow } from "@/components/ui/Icons";
import { SplitLines } from "@/components/ui/SplitLines";

/**
 * 09 — Start here. A campaign-style spread: one oversized photograph bleeding off the edge,
 * a typographic list of distinctive items from the current listing. No bestseller claims.
 */
export function StartHereSection() {
  const ref = useEditorial<HTMLElement>();
  const items = highlightItems();
  return (
    <section ref={ref} id="start-here" data-nav-tone="dark" className="relative z-10 tone-burgundy overflow-hidden" aria-labelledby="start-title">
      <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-40">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="relative md:col-span-6 md:pr-10">
            <p data-reveal className="eyebrow mb-6">09 — Start here</p>
            <SplitLines id="start-title" className="display-lg" lines={["If it\u2019s your", "first visit."]} />
            <p data-reveal className="lede mt-8 max-w-[26rem]">
              Start with the hot paal. Then try a few of the things LALA is listed for today — and ask at the counter what&apos;s fresh.
            </p>

            <ol className="mt-12 md:mt-16" data-reveal-group>
              {items.map((it, i) => (
                <li key={it.id} data-reveal className="flex items-baseline gap-5 border-t border-cream/15 py-5 md:gap-8 md:py-6">
                  <span className="font-sans text-[0.625rem] tracking-[0.25em] text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <div className="flex-1">
                    <p className="font-display text-[1.75rem] leading-tight md:text-[2.3rem]">{it.name}</p>
                    <p className="mt-1 text-[0.75rem] tracking-[0.16em] uppercase text-cream/50">{getCategory(it.category).name}</p>
                  </div>
                </li>
              ))}
            </ol>
            <a href={swiggyLink()} target="_blank" rel="noopener noreferrer" data-reveal className="link-sweep mt-10 inline-flex items-center gap-3 text-[0.75rem] tracking-[0.22em] uppercase">
              See the full menu on Swiggy <IconArrow className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="relative -order-1 md:order-none md:col-span-6">
            <div className="md:absolute md:inset-y-0 md:-right-10 md:left-6 lg:-right-24">
              <Photo
                src="/assets/beverages/masala-paal.webp"
                alt="Saffron milk in small glasses"
                ratio="free"
                parallax={0.14}
                sizes="(max-width: 768px) 100vw, 55vw"
                className="h-[62vh] md:h-full [&>div]:h-full"
                position="60% center"
              />
            </div>
            <div className="relative -mt-16 ml-auto w-[46%] md:absolute md:bottom-8 md:left-0 md:mt-0 md:w-[38%]">
              <Photo src="/assets/sweets/rasgulla.webp" alt="Milk sweets in a bowl — " ratio="square" parallax={0.08} sizes="(max-width: 768px) 46vw, 22vw" reveal="x"  />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
