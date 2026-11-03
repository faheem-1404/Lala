"use client";

import { useEffect, useRef } from "react";

/** Small gold dot cursor on fine-pointer devices; grows over interactive elements. CSS hides it on touch. */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const el = ref.current!;
    let x = 0, y = 0, tx = 0, ty = 0, raf = 0;
    const move = (e: PointerEvent) => { tx = e.clientX; ty = e.clientY; };
    const loop = () => {
      x += (tx - x) * 0.35; y += (ty - y) * 0.35;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    const over = (e: Event) => {
      const t = e.target as HTMLElement;
      el.classList.toggle("is-hover", !!t.closest("a, button, [role=button], input, label"));
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over);
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("pointermove", move); document.removeEventListener("pointerover", over); };
  }, []);
  return <div ref={ref} className="cursor-dot hidden md:block" aria-hidden="true" />;
}
