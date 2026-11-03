"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STORY_VH } from "@/data/scenes";
import { setScrollProgress } from "@/hooks/scrollStore";
import { HeroCopy } from "@/components/hero/HeroCopy";
import { SceneCopy } from "@/components/transitions/SceneCopy";

gsap.registerPlugin(ScrollTrigger);

/**
 * The tall scroll track for the pinned WebGL story. The canvas is fixed behind; this section
 * only provides scroll length, the hero copy, and sticky captions.
 */
export function Story() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current!;
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => setScrollProgress(self.progress, self.getVelocity()),
    });
    setScrollProgress(st.progress, 0);
    return () => st.kill();
  }, []);

  return (
    <section ref={ref} id="story" className="relative" style={{ height: `${STORY_VH}vh` }} aria-label="The LALA experience">
      <div id="top" className="absolute top-0" />
      <HeroCopy />
      <div id="story-start" className="absolute left-0" style={{ top: "100vh" }} />
      <div className="absolute inset-0 top-[100dvh]" style={{ height: `calc(${STORY_VH}vh - 100dvh)` }}>
        <SceneCopy />
      </div>
    </section>
  );
}
