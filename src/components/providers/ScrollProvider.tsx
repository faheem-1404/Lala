"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { pointerState } from "@/hooks/scrollStore";

gsap.registerPlugin(ScrollTrigger);

/**
 * Sets up Lenis smooth scrolling, syncs it with GSAP ScrollTrigger, and tracks the pointer.
 * Reduced-motion users get native scrolling (Lenis disabled).
 */
export function ScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;

    let lenis: Lenis | null = null;
    if (!reduced) {
      lenis = new Lenis({
        lerp: isTouch ? 0.12 : 0.09,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 1,
      });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
      return () => {
        gsap.ticker.remove(tick);
        lenis?.destroy();
        delete (window as unknown as { __lenis?: Lenis }).__lenis;
      };
    }
    document.documentElement.classList.remove("lenis");
    return undefined;
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointerState.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerState.y = -((e.clientY / window.innerHeight) * 2 - 1);
      pointerState.active = true;
    };
    const onLeave = () => {
      pointerState.active = false;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <>{children}</>;
}

/** Smooth-scroll helper for in-page anchors (falls back to native). */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
  if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) });
  else el.scrollIntoView({ behavior: "smooth" });
}
