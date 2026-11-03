"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { DeviceProfile } from "@/hooks/useDeviceTier";
import { scrollState, pointerState } from "@/hooks/scrollStore";
import { smoothstep, damp, range } from "@/utils/math";
import { DessertGlass, VARIANTS } from "./DessertGlass";
import { Droplets } from "@/scenes/MilkScene/Droplets";

/** Scene 04 — the Dessert Universe. Floating procedural dessert glasses, each with its own light. Window 0.48–0.68. */
export function FaloodaScene({ profile }: { profile: DeviceProfile }) {
  const group = useRef<THREE.Group>(null);
  const items = useRef<(THREE.Group | null)[]>([]);
  const [u, setU] = useState({ opacity: 0, time: 0 });
  const lastTick = useRef(0);
  const lowTier = profile.tier === "low";
  const variants = profile.isMobile ? VARIANTS.slice(0, 4) : VARIANTS;

  useFrame((state, dt) => {
    const p = scrollState.smooth;
    const t = state.clock.elapsedTime;
    const enter = smoothstep(0.48, 0.56, p);
    const exit = 1 - smoothstep(0.63, 0.68, p);
    const local = range(p, 0.48, 0.68);
    const op = Math.min(enter, exit);
    if (group.current) {
      // the row glides past the camera: translate x with progress, drift up on exit
      const x = profile.isMobile ? 0 : (0.5 - local) * 3.2;
      group.current.position.x = damp(group.current.position.x, x + (profile.isMobile ? 0 : pointerState.x * 0.2), 4, dt);
      group.current.position.y = damp(group.current.position.y, (1 - enter) * -3 + (1 - exit) * 6, 6, dt);
      group.current.rotation.y = damp(group.current.rotation.y, (profile.isMobile ? 0 : pointerState.x * 0.06) - (local - 0.5) * 0.3, 3, dt);
      group.current.visible = op > 0.002;
    }
    items.current.forEach((g, i) => {
      if (!g) return;
      const stagger = smoothstep(i * 0.06, i * 0.06 + 0.4, enter);
      g.position.y = Math.sin(t * 0.7 + i * 1.7) * 0.12 + (1 - stagger) * -2.5;
      g.rotation.y = Math.sin(t * 0.25 + i) * 0.35 + t * 0.08;
      g.rotation.z = Math.sin(t * 0.4 + i * 2.1) * 0.03;
      g.scale.setScalar(0.6 + 0.4 * stagger);
    });
    if (t - lastTick.current > 1 / 30) {
      lastTick.current = t;
      setU({ opacity: op, time: t });
    }
  });

  const layout = profile.isMobile
    ? [[-0.95, 2.2, 0], [0.95, 1.2, -0.6], [-0.8, -0.3, -0.4], [1.0, -1.2, -1.2]]
    : [[-2.2, 0.2, -0.4], [-0.5, -0.6, 0.6], [1.2, 0.4, -1.0], [3.0, -0.5, 0.4], [4.8, 0.3, -0.8]];

  return (
    <group ref={group}>
      {variants.map((v, i) => (
        <group key={v.id} position={layout[i] as [number, number, number]} ref={(el) => { items.current[i] = el; }}>
          <DessertGlass variant={v} lowTier={lowTier} opacity={u.opacity} time={u.time} />
          {!lowTier && <pointLight position={[0.6, 1.6, 1.2]} intensity={5 * u.opacity} color={v.light} distance={5} decay={2} />}
        </group>
      ))}
      <Droplets count={Math.round(profile.particles * 0.3)} burst={0} opacity={u.opacity * 0.5} color="#f8e6d1" size={3} spread={5} seed={41} />
    </group>
  );
}
