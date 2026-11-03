"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { BUSINESS } from "@/data/business";
import { scrollToId } from "@/components/providers/ScrollProvider";
import { subscribeScroll } from "@/hooks/scrollStore";
import { IconArrow } from "@/components/ui/Icons";
import { lalaAudio } from "@/utils/audio";

/**
 * The HTML layer of the first screen. Sits over the 3D glass (right of centre on desktop, above on mobile).
 * Fades and lifts as the camera starts to move.
 */
export function HeroCopy({ staticMode = false }: { staticMode?: boolean }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current!;
    const items = el.querySelectorAll<HTMLElement>("[data-hero]");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      // no entrance animation, but the copy must still yield to the captions once the story starts
      gsap.set(items, { opacity: 1, y: 0 });
      return subscribeScroll((s) => {
        const hidden = s.progress > 0.03;
        el.style.opacity = hidden ? "0" : "1";
        el.style.visibility = hidden ? "hidden" : "visible";
        el.style.pointerEvents = hidden ? "none" : "";
      });
    }
    const tl = gsap.timeline({ delay: 0.2, paused: true });
    tl.fromTo(items, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 1.4, ease: "expo.out", stagger: 0.12 });
    const start = () => tl.play();
    if (document.documentElement.classList.contains("is-loaded")) start();
    const mo = new MutationObserver(() => {
      if (document.documentElement.classList.contains("is-loaded")) {
        start();
        mo.disconnect();
      }
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    const setOpacity = gsap.quickSetter(el, "opacity");
    const setY = gsap.quickSetter(el, "y", "px");
    const unsub = subscribeScroll((s) => {
      const k = Math.min(1, Math.max(0, (s.progress - 0.02) / 0.08));
      setOpacity(1 - k);
      setY(-k * 60);
      el.style.pointerEvents = k > 0.8 ? "none" : "";
    });
    return () => {
      unsub();
      mo.disconnect();
      tl.kill();
    };
  }, []);

  return (
    <div ref={root} className="sticky top-0 z-10 h-dvh w-full pointer-events-none">
      <div className="absolute inset-x-0 bottom-0 h-[58%] md:hidden" style={{ background: "linear-gradient(to top, rgba(42,6,13,0.9) 30%, rgba(42,6,13,0))" }} aria-hidden="true" />
      <div className="relative mx-auto flex h-full max-w-[1440px] flex-col justify-end px-6 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-24 md:justify-center md:px-10 md:pb-0">
        <div className="pointer-events-auto max-w-[44rem] md:max-w-[50vw]">
          <p data-hero className="eyebrow mb-5 md:mb-8">{BUSINESS.locality} · {BUSINESS.city} · Paal Nilayam</p>
          <h1 data-hero className="display-xl text-cream">
            The art of
            <br />
            milk &amp;
            <br />
            <em className="font-normal italic text-gold-soft">indulgence.</em>
          </h1>
          <p data-hero className="mt-6 md:mt-8 font-display italic text-[clamp(1.15rem,1.6vw,1.6rem)] text-cream/85">
            A little sip of happiness.
          </p>
          <div data-hero className="mt-8 md:mt-12 flex items-center gap-6">
            {staticMode ? (
              <a href="#menu" className="btn btn-solid" onClick={(e) => { e.preventDefault(); scrollToId("menu"); }}>
                See the menu <IconArrow />
              </a>
            ) : (
              <button type="button" className="btn btn-solid" onClick={() => { lalaAudio?.tick(); scrollToId("story-start"); }}>
                Explore the experience <IconArrow />
              </button>
            )}
          </div>
        </div>
      </div>
      {!staticMode && (
        <div data-hero className="absolute bottom-8 right-6 md:right-10 hidden md:flex items-center gap-3 text-cream/50">
          <span className="text-[0.625rem] tracking-[0.3em] uppercase">Scroll</span>
          <span className="block h-10 w-px bg-cream/30 overflow-hidden"><span className="block h-1/2 w-full bg-gold animate-[scrollhint_1.8s_ease-in-out_infinite]" /></span>
        </div>
      )}
    </div>
  );
}
