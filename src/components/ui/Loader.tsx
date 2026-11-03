"use client";

import { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";
import { Wordmark } from "./Wordmark";

/** Loading veil: wordmark + a milk-fill line. Lifts when the hero assets are ready (or after a safety timeout). */
export function Loader() {
  const { progress, active } = useProgress();
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 4500);
    if (!active && progress >= 100) {
      clearTimeout(t);
      const d = setTimeout(() => setDone(true), 350);
      return () => clearTimeout(d);
    }
    return () => clearTimeout(t);
  }, [progress, active]);

  useEffect(() => {
    if (!done) return;
    document.documentElement.classList.add("is-loaded");
    const t = setTimeout(() => setGone(true), 900);
    return () => clearTimeout(t);
  }, [done]);

  if (gone) return null;
  const pct = Math.min(100, Math.max(progress, done ? 100 : 8));
  return (
    <div
      className={`fixed inset-0 z-[80] flex flex-col items-center justify-center bg-burgundy-deep text-cream transition-opacity duration-700 ${done ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      aria-live="polite"
      aria-busy={!done}
    >
      <Wordmark className="items-center" />
      <div className="mt-8 h-px w-40 bg-cream/15 overflow-hidden">
        <div className="h-full bg-gold transition-[width] duration-300 ease-out" style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-4 eyebrow !text-cream/50">Pouring</p>
    </div>
  );
}
