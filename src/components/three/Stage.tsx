"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { SCENES, type SceneId } from "@/data/scenes";
import { scrollState } from "@/hooks/scrollStore";
import type { DeviceProfile } from "@/hooks/useDeviceTier";
import { MilkScene } from "@/scenes/MilkScene/MilkScene";
import { SweetScene, SWEET_PHOTOS } from "@/scenes/SweetScene/SweetScene";
import { FaloodaScene } from "@/scenes/FaloodaScene/FaloodaScene";
import { FoodScene, FOOD_PHOTOS } from "@/scenes/FoodScene/FoodScene";

/**
 * Mounts scenes only inside their progress window (with warm-up margin) so GPU memory is released
 * for scenes far from the viewport. State updates happen only when a boundary is crossed.
 */
export function Stage({ profile }: { profile: DeviceProfile }) {
  const [mounted, setMounted] = useState<Record<SceneId, boolean>>({ milk: true, sweets: false, desserts: false, food: false });
  const last = useRef(mounted);

  // Warm the photo textures shortly after the hero is up, so later scenes never pop in.
  useEffect(() => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    const idle = (cb: () => void) => (w.requestIdleCallback ? w.requestIdleCallback(cb, { timeout: 6000 }) : window.setTimeout(cb, 2500));
    const t = setTimeout(() => idle(() => { useTexture.preload(SWEET_PHOTOS); idle(() => useTexture.preload(FOOD_PHOTOS)); }), 2500);
    return () => clearTimeout(t);
  }, []);

  useFrame(() => {
    const p = scrollState.smooth;
    let changed = false;
    const next = { ...last.current };
    for (const s of SCENES) {
      const should = p >= s.mountStart && p <= s.mountEnd;
      if (next[s.id] !== should) {
        next[s.id] = should;
        changed = true;
      }
    }
    if (changed) {
      last.current = next;
      setMounted(next);
    }
  });

  return (
    <>
      {mounted.milk && <MilkScene profile={profile} />}
      <Suspense fallback={null}>{mounted.sweets && <SweetScene profile={profile} />}</Suspense>
      {mounted.desserts && <FaloodaScene profile={profile} />}
      <Suspense fallback={null}>{mounted.food && <FoodScene profile={profile} />}</Suspense>
    </>
  );
}
