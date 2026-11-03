"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Gentle scroll parallax for [data-parallax="<strength>"] descendants (0.1–0.3 recommended),
 * plus clip-path mask reveals for .mask-reveal / .mask-reveal-x. Skipped under reduced motion.
 */
export function useParallax<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const masks = Array.from(root.querySelectorAll<HTMLElement>(".mask-reveal, .mask-reveal-x"));
    const triggers: ScrollTrigger[] = [];
    for (const m of masks) {
      if (reduced) {
        m.classList.add("is-in");
        continue;
      }
      triggers.push(ScrollTrigger.create({ trigger: m, start: "top 85%", once: true, onEnter: () => m.classList.add("is-in") }));
    }
    const tweens: gsap.core.Tween[] = [];
    if (!reduced) {
      const items = Array.from(root.querySelectorAll<HTMLElement>("[data-parallax]"));
      for (const el of items) {
        const k = parseFloat(el.dataset.parallax ?? "0.15");
        tweens.push(
          gsap.fromTo(
            el,
            { yPercent: -k * 40 },
            { yPercent: k * 40, ease: "none", scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: 0.6 } },
          ),
        );
      }
    }
    return () => {
      triggers.forEach((t) => t.kill());
      tweens.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
    };
  }, []);
  return ref;
}
