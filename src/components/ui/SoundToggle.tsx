"use client";

import { useState } from "react";
import { lalaAudio } from "@/utils/audio";
import { IconSound } from "./Icons";

/** User-controlled ambience. Never autoplays. */
export function SoundToggle({ light = false }: { light?: boolean }) {
  const [on, setOn] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOn(lalaAudio.toggle())}
      aria-pressed={on}
      aria-label={on ? "Turn ambient sound off" : "Turn ambient sound on"}
      className={`inline-flex items-center gap-2 text-[0.6875rem] tracking-[0.2em] uppercase transition-colors ${light ? "text-burgundy-deep/70 hover:text-burgundy-deep" : "text-cream/70 hover:text-cream"}`}
    >
      <IconSound on={on} />
      <span className="hidden sm:inline">{on ? "Sound on" : "Sound"}</span>
    </button>
  );
}
