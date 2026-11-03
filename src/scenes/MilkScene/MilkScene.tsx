"use client";

import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { DeviceProfile } from "@/hooks/useDeviceTier";
import { scrollState } from "@/hooks/scrollStore";
import { range, smoothstep, damp } from "@/utils/math";
import { Glass } from "./Glass";
import { Liquid } from "./Liquid";
import { MilkRibbon, type RibbonSpec } from "./MilkRibbon";
import { Ingredients } from "./Ingredients";
import { Droplets } from "./Droplets";
import { lalaAudio } from "@/utils/audio";

const RIBBONS: RibbonSpec[] = [
  { radius: 1.05, turns: 2.4, yFrom: -1.5, yTo: 1.5, phase: 0.4, direction: 1, tube: 0.17, tilt: 0.12 },
  { radius: 0.82, turns: 1.6, yFrom: 1.3, yTo: -1.3, phase: 2.6, direction: -1, tube: 0.12, tilt: 0.2 },
  { radius: 1.5, turns: 1.2, yFrom: -0.9, yTo: 1.1, phase: 4.1, direction: 1, tube: 0.14, tilt: 0.3 },
];

/**
 * Scene 01 + 02. Progress windows (story 0–1):
 *  0.00–0.14 hero: glass centred, one ribbon orbits, ingredients drift, camera dollies in.
 *  0.14–0.30 explosion: glass sinks away, three ribbons unwind outward, droplets burst, ingredients scatter.
 *  0.30–0.36 everything fades for the Sweet Universe.
 */
export function MilkScene({ profile }: { profile: DeviceProfile }) {
  const glassGroup = useRef<THREE.Group>(null);
  const root = useRef<THREE.Group>(null);
  const splashed = useRef(false);
  const [u, setU] = useState({ unwind: 0, burst: 0, opacity: 1, glassOpacity: 1, scatter: 0, extra: 0, time: 0, agitation: 0 });
  const lastTick = useRef(0);

  const counts = useMemo(() => {
    const base = profile.tier === "low" ? 0.45 : profile.tier === "mid" ? 0.75 : 1;
    return {
      almonds: Math.round(26 * base),
      pistachios: Math.round(26 * base),
      saffron: Math.round(48 * base),
      droplets: profile.particles,
      segments: profile.ribbonSegments,
    };
  }, [profile]);

  useFrame((state, dt) => {
    const p = scrollState.smooth;
    const t = state.clock.elapsedTime;
    const unwind = smoothstep(0.15, 0.29, p);
    const burst = smoothstep(0.16, 0.31, p);
    const fade = 1 - smoothstep(0.3, 0.37, p);
    const glassFade = 1 - smoothstep(0.17, 0.25, p);
    const extra = smoothstep(0.14, 0.2, p) * fade;
    const agitation = smoothstep(0.06, 0.16, p) * glassFade;

    if (glassGroup.current) {
      const sink = smoothstep(0.16, 0.27, p);
      glassGroup.current.position.y = damp(glassGroup.current.position.y, -sink * 4.2, 8, dt);
      const s = 1 - sink * 0.35;
      glassGroup.current.scale.setScalar(s);
      glassGroup.current.rotation.y = t * 0.12 + range(p, 0, 0.16) * 0.9;
      glassGroup.current.visible = glassFade > 0.001;
    }
    if (root.current) {
      root.current.rotation.y = damp(root.current.rotation.y, -range(p, 0, 0.34) * 0.5, 4, dt);
      root.current.visible = fade > 0.001;
    }
    if (burst > 0.35 && !splashed.current) {
      splashed.current = true;
      lalaAudio?.splash();
    }
    if (burst < 0.05) splashed.current = false;

    // throttle React state to ~30fps; uniforms are cheap but setState is not
    if (t - lastTick.current > 1 / 30) {
      lastTick.current = t;
      setU({ unwind, burst, opacity: fade, glassOpacity: glassFade, scatter: burst, extra, time: t, agitation });
    }
  });

  return (
    <group ref={root}>
      <group ref={glassGroup}>
        <Glass profile={profile} opacity={u.glassOpacity} />
        <Liquid agitation={u.agitation} opacity={u.glassOpacity} />
        <Ingredients kind="almond" count={10} scatter={0} opacity={u.glassOpacity} onSurface />
        <Ingredients kind="pistachio" count={12} scatter={0} opacity={u.glassOpacity} onSurface />
        <Ingredients kind="saffron" count={14} scatter={0} opacity={u.glassOpacity} onSurface />
      </group>

      <MilkRibbon spec={RIBBONS[0]} segments={counts.segments} unwind={u.unwind} opacity={u.opacity} time={u.time} />
      <MilkRibbon spec={RIBBONS[1]} segments={Math.round(counts.segments * 0.7)} unwind={u.unwind} opacity={u.extra} time={u.time} />
      <MilkRibbon spec={RIBBONS[2]} segments={Math.round(counts.segments * 0.7)} unwind={u.unwind} opacity={u.extra} time={u.time} />

      <Ingredients kind="almond" count={counts.almonds} scatter={u.scatter} opacity={u.opacity} />
      <Ingredients kind="pistachio" count={counts.pistachios} scatter={u.scatter} opacity={u.opacity} />
      <Ingredients kind="saffron" count={counts.saffron} scatter={u.scatter} opacity={u.opacity} />

      <Droplets count={counts.droplets} burst={u.burst} opacity={u.opacity * (0.5 + 0.5 * u.burst)} size={3.2} />
      <Droplets count={Math.round(counts.droplets * 0.25)} burst={u.burst} opacity={u.opacity * 0.5} color="#e9c45a" size={2} spread={2.6} seed={11} />
    </group>
  );
}
