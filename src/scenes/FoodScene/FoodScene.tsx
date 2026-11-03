"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { DeviceProfile } from "@/hooks/useDeviceTier";
import { scrollState, pointerState } from "@/hooks/scrollStore";
import { smoothstep, damp, range, window01 } from "@/utils/math";
import { PhotoPlane } from "@/scenes/shared/PhotoPlane";
import { useSceneTextures } from "@/scenes/shared/useSceneTextures";

interface FoodGroup {
  id: string;
  at: [number, number]; // local window within the scene (0..1)
  photos: string[];
}

/** Three category beats cross-fading inside the scene window (0.64–0.86). */
export const FOOD_GROUPS: FoodGroup[] = [
  { id: "buns", at: [0.0, 0.4], photos: ["/assets/buns/glazed-buns.webp", "/assets/buns/bun-closeup.webp", "/assets/buns/sesame-buns.webp", "/assets/snacks/pav-bhaji.webp"] },
  { id: "chaat", at: [0.3, 0.7], photos: ["/assets/snacks/pani-puri.webp", "/assets/snacks/dahi-puri.webp", "/assets/snacks/bhel-puri.webp", "/assets/snacks/bhel-puri-newspaper.webp"] },
  { id: "cafe", at: [0.6, 1.0], photos: ["/assets/cafe/french-fries.webp", "/assets/cafe/cheese-balls.webp", "/assets/cafe/oreo-milkshake.webp", "/assets/cafe/maggi-noodles.webp"] },
];
export const FOOD_PHOTOS = FOOD_GROUPS.flatMap((g) => g.photos);

const SLOTS_D: [number, number, number][] = [[-0.9, 1.2, -0.6], [0.9, -0.6, 0.3], [2.7, 1.0, -0.8], [4.4, -0.4, 0.0]];
const SLOTS_M: [number, number, number][] = [[-1.0, 2.9, 0.0], [1.0, 1.4, -0.3], [-1.0, 0.0, -0.2], [1.1, -1.2, -0.6]];

export function FoodScene({ profile }: { profile: DeviceProfile }) {
  const textures = useSceneTextures(FOOD_PHOTOS);
  const group = useRef<THREE.Group>(null);
  const [u, setU] = useState({ time: 0, local: 0, opacity: 0 });
  const lastTick = useRef(0);
  const slots = profile.isMobile ? SLOTS_M : SLOTS_D;

  useFrame((state, dt) => {
    const p = scrollState.smooth;
    const t = state.clock.elapsedTime;
    const local = range(p, 0.64, 0.86);
    const enter = smoothstep(0.64, 0.7, p);
    const exit = 1 - smoothstep(0.84, 0.9, p);
    if (group.current) {
      group.current.position.x = damp(group.current.position.x, profile.isMobile ? 0 : pointerState.x * 0.2, 3, dt);
      group.current.position.y = damp(group.current.position.y, (1 - exit) * 3, 4, dt);
      group.current.rotation.y = damp(group.current.rotation.y, (local - 0.5) * 0.4, 3, dt);
      group.current.visible = enter > 0.002 && exit > 0.002;
    }
    if (t - lastTick.current > 1 / 30) {
      lastTick.current = t;
      setU({ time: t, local, opacity: Math.min(enter, exit) });
    }
  });

  let k = 0;
  return (
    <group ref={group}>
      {FOOD_GROUPS.map((g, gi) => {
        const vis = window01(u.local, g.at[0], g.at[1], 0.12);
        const inward = range(u.local, g.at[0], g.at[0] + 0.14);
        return g.photos.map((src, i) => {
          const tex = textures[k++];
          const s = slots[i];
          // each category rises through the frame as it appears, so transitions feel continuous
          const y = s[1] + (1 - inward) * -1.2 + (1 - vis) * 1.8;
          const reveal = smoothstep(i * 0.08, i * 0.08 + 0.6, inward);
          return (
            <PhotoPlane
              key={src}
              texture={tex}
              position={[s[0], y, s[2] - gi * 0.3]}
              rotation={[0, (i - 1.5) * -0.12, (i % 2 ? 1 : -1) * 0.02]}
              height={profile.isMobile ? 1.45 : 1.7}
              reveal={reveal}
              opacity={vis * u.opacity}
              time={u.time}
              tint="#ff9a3c"
              float={{ amp: 0.06, speed: 0.7, phase: i * 1.1 + gi }}
            />
          );
        });
      })}
    </group>
  );
}
