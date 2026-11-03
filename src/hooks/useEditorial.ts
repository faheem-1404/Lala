"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * One hook for editorial sections:
 *  - [data-reveal] children fade/rise once when the section enters (staggered),
 *  - .mask-reveal / .mask-reveal-x images wipe in when they enter,
 *  - [data-parallax="k"] elements drift gently with scroll (k ≈ 0.1–0.3),
 *  - [data-draw] SVG paths draw with scroll (stroke-dashoffset, scrubbed).
 * Everything collapses to static under prefers-reduced-motion.
 */
export function useEditorial<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const kills: (() => void)[] = [];

    const reveals = root.querySelectorAll<HTMLElement>("[data-reveal]");
    if (reveals.length) {
      if (reduced) gsap.set(reveals, { opacity: 1, y: 0 });
      else {
        const groups = new Map<Element, HTMLElement[]>();
        reveals.forEach((el) => {
          const g = el.closest("[data-reveal-group]") ?? root;
          groups.set(g, [...(groups.get(g) ?? []), el]);
        });
        groups.forEach((items, g) => {
          const tw = gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: 1.3,
            ease: "expo.out",
            stagger: 0.08,
            scrollTrigger: { trigger: g as HTMLElement, start: "top 78%", once: true },
          });
          kills.push(() => {
            tw.scrollTrigger?.kill();
            tw.kill();
          });
        });
      }
    }

    root.querySelectorAll<HTMLElement>(".mask-reveal, .mask-reveal-x").forEach((m) => {
      if (reduced) return void m.classList.add("is-in");
      const st = ScrollTrigger.create({ trigger: m, start: "top 86%", once: true, onEnter: () => m.classList.add("is-in") });
      kills.push(() => st.kill());
    });

    if (!reduced) {
      root.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const k = parseFloat(el.dataset.parallax ?? "0.15");
        const tw = gsap.fromTo(
          el,
          { yPercent: -k * 40 },
          { yPercent: k * 40, ease: "none", scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: 0.6 } },
        );
        kills.push(() => {
          tw.scrollTrigger?.kill();
          tw.kill();
        });
      });
      root.querySelectorAll<SVGPathElement>("path[data-draw]").forEach((p) => {
        const len = p.getTotalLength();
        p.style.strokeDasharray = `${len}`;
        const tw = gsap.fromTo(
          p,
          { strokeDashoffset: len },
          { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: p.closest("svg") ?? p, start: "top 95%", end: "bottom 45%", scrub: 0.8 } },
        );
        kills.push(() => {
          tw.scrollTrigger?.kill();
          tw.kill();
        });
      });
    } else {
      root.querySelectorAll<SVGPathElement>("path[data-draw]").forEach((p) => (p.style.strokeDasharray = "none"));
    }

    return () => kills.forEach((k) => k());
  }, []);
  return ref;
}
