"use client";

import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { DeviceProfile } from "@/hooks/useDeviceTier";
import { scrollState, pointerState } from "@/hooks/scrollStore";
import { smoothstep, damp, range } from "@/utils/math";
import { PhotoPlane } from "@/scenes/shared/PhotoPlane";
import { useSceneTextures } from "@/scenes/shared/useSceneTextures";
import { Droplets } from "@/scenes/MilkScene/Droplets";

export const SWEET_PHOTOS = [
  "/assets/sweets/gulab-jamun.webp",
  "/assets/sweets/sweets-red-backdrop.webp",
  "/assets/sweets/laddu.webp",
  "/assets/sweets/badusha.webp",
  "/assets/sweets/mysore-pak.webp",
  "/assets/sweets/sweets-candlelight.webp",
  "/assets/sweets/rasgulla.webp",
  "/assets/sweets/assorted-sweets.webp",
];

interface Slot {
  pos: [number, number, number];
  rot: [number, number, number];
  h: number;
  stagger: number;
}

const DESKTOP_SLOTS: Slot[] = [
  { pos: [-0.6, 1.3, -0.8], rot: [0, 0.2, 0.02], h: 1.4, stagger: 0.0 },
  { pos: [0.9, -0.8, 0.4], rot: [0, 0.08, -0.03], h: 1.7, stagger: 0.08 },
  { pos: [2.4, 1.1, -0.9], rot: [0, -0.12, 0.02], h: 1.45, stagger: 0.16 },
  { pos: [4.0, -0.3, 0.1], rot: [0, -0.28, 0.03], h: 1.8, stagger: 0.24 },
  { pos: [-1.6, -1.6, -2.2], rot: [0, 0.3, 0], h: 1.25, stagger: 0.32 },
  { pos: [1.6, 0.2, -2.8], rot: [0, 0, 0.04], h: 1.4, stagger: 0.4 },
  { pos: [4.6, 1.6, -2.0], rot: [0, -0.3, -0.02], h: 1.3, stagger: 0.48 },
  { pos: [3.0, 2.4, -3.4], rot: [0, -0.12, 0], h: 1.4, stagger: 0.56 },
];

const MOBILE_SLOTS: Slot[] = [
  { pos: [-1.1, 2.9, 0.0], rot: [0, 0.1, 0.02], h: 1.4, stagger: 0.0 },
  { pos: [1.0, 1.5, -0.4], rot: [0, -0.1, -0.02], h: 1.4, stagger: 0.1 },
  { pos: [-1.0, 0.1, -0.2], rot: [0, 0.12, 0.02], h: 1.3, stagger: 0.2 },
  { pos: [1.2, -0.9, -0.8], rot: [0, -0.1, 0], h: 1.2, stagger: 0.3 },
  { pos: [-1.7, 4.4, -1.6], rot: [0, 0.2, 0], h: 1.1, stagger: 0.4 },
  { pos: [1.8, 3.6, -2.2], rot: [0, -0.2, 0], h: 1.1, stagger: 0.5 },
  { pos: [-2.0, -1.8, -2.4], rot: [0, 0.2, 0], h: 1.0, stagger: 0.6 },
  { pos: [0.6, 5.4, -2.8], rot: [0, 0, 0], h: 1.2, stagger: 0.7 },
];

/** Scene 03 — sweets floating in a lit burgundy space with gold dust. Window 0.30–0.52. */
export function SweetScene({ profile }: { profile: DeviceProfile }) {
  const textures = useSceneTextures(SWEET_PHOTOS);
  const group = useRef<THREE.Group>(null);
  const [u, setU] = useState({ reveal: 0, opacity: 0, time: 0, local: 0 });
  const lastTick = useRef(0);
  const slots = profile.isMobile ? MOBILE_SLOTS : DESKTOP_SLOTS;
  const dust = useMemo(() => Math.round(profile.particles * 0.35), [profile.particles]);

  useFrame((state, dt) => {
    const p = scrollState.smooth;
    const t = state.clock.elapsedTime;
    const local = range(p, 0.3, 0.52);
    const enter = smoothstep(0.3, 0.42, p);
    const exit = 1 - smoothstep(0.47, 0.53, p);
    if (group.current) {
      // drift upward as we leave, parallax with pointer
      const rise = smoothstep(0.44, 0.53, p) * 3.5;
      group.current.position.y = damp(group.current.position.y, rise - (1 - enter) * 2.5, 5, dt);
      group.current.position.x = damp(group.current.position.x, profile.isMobile ? 0 : pointerState.x * 0.25, 2.5, dt);
      group.current.rotation.y = damp(group.current.rotation.y, (profile.isMobile ? 0 : pointerState.x * 0.05) + (local - 0.5) * 0.25, 2.5, dt);
      group.current.visible = exit > 0.002 && enter > 0.002;
    }
    if (t - lastTick.current > 1 / 30) {
      lastTick.current = t;
      setU({ reveal: enter, opacity: exit, time: t, local });
    }
  });

  return (
    <group ref={group}>
      {textures.map((tex, i) => {
        const s = slots[i];
        const reveal = smoothstep(s.stagger * 0.5, s.stagger * 0.5 + 0.5, u.reveal);
        return (
          <PhotoPlane
            key={SWEET_PHOTOS[i]}
            texture={tex}
            position={s.pos}
            rotation={s.rot}
            height={s.h}
            reveal={reveal}
            opacity={u.opacity}
            time={u.time}
            float={{ amp: 0.08, speed: 0.6, phase: i * 1.3 }}
          />
        );
      })}
      <Droplets count={dust} burst={0} opacity={u.opacity * u.reveal * 0.7} color="#e9c45a" size={2} spread={4.5} seed={23} />
    </group>
  );
}
