"use client";

import { useEditorial } from "@/hooks/useEditorial";
import { Photo } from "@/components/ui/Photo";
import { SplitLines } from "@/components/ui/SplitLines";

/** 07 — What we serve: one large photograph, two supporting crops, typography that overlaps the image edge. */
export function ExperienceSection() {
  const ref = useEditorial<HTMLElement>();
  return (
    <section ref={ref} id="experience" data-nav-tone="light" className="relative z-10 tone-ivory overflow-hidden" aria-labelledby="exp-title">
      <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-40">
        <div className="relative grid gap-10 md:grid-cols-12 md:gap-8">
          {/* large image */}
          <div className="relative md:col-span-5 md:row-span-2">
            <Photo
              src="/assets/falooda/falooda-glass.webp"
              alt="A tall falooda in a glass"
              ratio="tall"
              parallax={0.18}
              sizes="(max-width: 768px) 100vw, 42vw"
              caption="Falooda"
            />
          </div>

          {/* headline overlapping the image edge */}
          <div className="relative md:col-span-7 md:-ml-24 md:pt-10">
            <p data-reveal className="eyebrow mb-6 !text-maroon">07 — What we serve</p>
            <SplitLines id="exp-title" className="display-lg" lines={["Milk, sweets,", "falooda, chaat,", <em key="e" className="font-normal italic">buns.</em>]} />
            <p data-reveal className="lede mt-8 max-w-[26rem] !text-burgundy-deep/70 md:ml-28">
              Hot drinks in the morning, cold drinks in the afternoon, sweets for the way home. Traditional favourites and cafe snacks, side by side.
            </p>
          </div>

          {/* supporting crops, different proportions */}
          <div className="relative md:col-span-7 md:mt-10">
            <div className="grid grid-cols-12 items-end gap-4 md:gap-8">
              <div className="col-span-5 md:col-span-4">
                <Photo src="/assets/sweets/gulab-jamun.webp" alt="Gulab jamun" ratio="square" parallax={0.12} sizes="(max-width: 768px) 40vw, 18vw" reveal="x" />
              </div>
              <div className="col-span-7 md:col-span-7 md:col-start-6">
                <Photo src="/assets/snacks/pav-bhaji.webp" alt="Pav bhaji" ratio="landscape" parallax={0.22} sizes="(max-width: 768px) 60vw, 30vw" />
              </div>
            </div>
            <span className="vertical-label absolute -right-2 top-0 hidden md:block">From the counter</span>
          </div>
        </div>
      </div>
    </section>
  );
}
