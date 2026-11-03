"use client";

import { useReveal } from "@/hooks/useReveal";
import { BUSINESS } from "@/data/business";

/** The brand signature that closes the story. */
export function BrandSignOff() {
  const ref = useReveal<HTMLElement>();
  return (
    <section ref={ref} data-nav-tone="dark" className="relative z-10 overflow-hidden bg-burgundy text-cream" aria-label="Brand signature">
      <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "url(/assets/textures/red-velvet-drape.webp)", backgroundSize: "cover", backgroundPosition: "center", mixBlendMode: "multiply" }} aria-hidden="true" />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(212,175,55,0.14), transparent 60%)" }} aria-hidden="true" />
      <div className="relative mx-auto flex min-h-[70vh] max-w-[1440px] flex-col items-center justify-center px-6 py-28 text-center md:px-10">
        <p data-reveal className="font-display font-semibold leading-none tracking-[0.12em] text-[clamp(5rem,22vw,20rem)]">LALA.</p>
        <p data-reveal className="mt-4 eyebrow !text-cream/80 !tracking-[0.3em] md:!text-[0.8rem]">{BUSINESS.signature}</p>
      </div>
    </section>
  );
}
