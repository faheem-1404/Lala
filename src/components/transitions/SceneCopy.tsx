"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { CAPTIONS } from "@/data/scenes";
import { subscribeScroll } from "@/hooks/scrollStore";
import { smoothstep } from "@/utils/math";

/**
 * Editorial captions for scenes 01–05. Each is pinned (sticky) for the story and shown only inside its window.
 * Visibility is computed from scroll progress every tick with quickSetters (no React re-render).
 */
export function SceneCopy() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current!;
    const nodes = Array.from(el.querySelectorAll<HTMLElement>("[data-caption]"));
    const setters = nodes.map((n) => ({
      id: n.dataset.caption!,
      o: gsap.quickSetter(n, "opacity"),
      y: gsap.quickSetter(n, "y", "px"),
      node: n,
    }));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return subscribeScroll((s) => {
      for (const st of setters) {
        const c = CAPTIONS.find((c) => c.id === st.id)!;
        const [a, b] = c.at;
        const f = reduced ? 0.001 : 0.035;
        const vis = smoothstep(a, a + f, s.progress) * (1 - smoothstep(b - f, b, s.progress));
        st.o(vis);
        st.y(reduced ? 0 : (1 - vis) * 24 * (s.progress < (a + b) / 2 ? 1 : -1));
        st.node.style.visibility = vis > 0.01 ? "visible" : "hidden";
      }
    });
  }, []);

  return (
    <div ref={root} className="pointer-events-none absolute inset-0 z-10">
      {CAPTIONS.map((c) => (
        <div
          key={c.id}
          data-caption={c.id}
          style={{ opacity: 0, visibility: "hidden" }}
          className={`sticky top-0 -mt-[100dvh] h-dvh w-full ${c.id === CAPTIONS[0].id ? "mt-0" : ""}`}
        >
          <div className="absolute inset-x-0 bottom-0 h-[62%] md:hidden" style={{ background: "linear-gradient(to top, rgba(42,6,13,0.92) 35%, rgba(42,6,13,0))" }} aria-hidden="true" />
          <div className="relative mx-auto flex h-full max-w-[1440px] px-6 md:px-10">
            <div
              className={`flex w-full flex-col ${c.anchor === "bottom" ? "justify-end pb-24 md:pb-20" : "justify-end pb-24 md:justify-center md:pb-0"} ${
                c.align === "right" ? "items-end text-right" : c.align === "center" ? "items-center text-center" : "items-start"
              } ${c.anchor === "middle" ? "md:pt-16" : ""}`}
            >
              <div className="max-w-[26rem] md:max-w-[34rem]">
                <p className="eyebrow mb-4">{c.eyebrow}</p>
                <h2 className="display-lg text-cream">{c.title}</h2>
                {c.lines?.map((l) => (
                  <p key={l} className="lede mt-5">{l}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
