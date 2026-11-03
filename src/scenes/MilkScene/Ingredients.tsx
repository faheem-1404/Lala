"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { seeded } from "@/utils/math";
import { pointerState } from "@/hooks/scrollStore";
import { LIQUID_TOP_Y } from "./Glass";

type Kind = "almond" | "pistachio" | "saffron";

interface Orbit {
  r: number;
  y: number;
  speed: number;
  phase: number;
  spin: THREE.Vector3;
  scale: number;
  dir: THREE.Vector3;
}

const COLORS: Record<Kind, { color: string; rough: number }> = {
  almond: { color: "#c99a63", rough: 0.6 },
  pistachio: { color: "#8fb14e", rough: 0.55 },
  saffron: { color: "#c1341c", rough: 0.6 },
};

function geometryFor(kind: Kind) {
  if (kind === "saffron") return new THREE.CylinderGeometry(0.006, 0.004, 0.22, 5, 1);
  const g = new THREE.SphereGeometry(1, 14, 10);
  if (kind === "almond") g.scale(0.085, 0.028, 0.05);
  else g.scale(0.06, 0.026, 0.042);
  return g;
}

/**
 * Instanced ingredients: a cloud orbiting the glass plus pieces resting on the liquid surface.
 * `scatter` (0..1) flings the orbiting cloud outward during the milk explosion.
 */
export function Ingredients({
  kind,
  count,
  scatter,
  opacity,
  onSurface = false,
}: {
  kind: Kind;
  count: number;
  scatter: number;
  opacity: number;
  onSurface?: boolean;
}) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => geometryFor(kind), [kind]);
  const orbits = useMemo<Orbit[]>(() => {
    const rnd = seeded(kind.length * 101 + count + (onSurface ? 7 : 0));
    return Array.from({ length: count }, () => {
      const r = onSurface ? Math.sqrt(rnd()) * 0.42 : 1.0 + rnd() * 1.9;
      const y = onSurface ? LIQUID_TOP_Y + 0.01 : -1.6 + rnd() * 3.4;
      return {
        r,
        y,
        speed: onSurface ? 0.03 + rnd() * 0.05 : (0.08 + rnd() * 0.18) * (rnd() > 0.5 ? 1 : -1),
        phase: rnd() * Math.PI * 2,
        spin: new THREE.Vector3(rnd() - 0.5, rnd() - 0.5, rnd() - 0.5).multiplyScalar(onSurface ? 0.2 : 1.6),
        scale: 0.7 + rnd() * 0.7,
        dir: new THREE.Vector3(rnd() - 0.5, rnd() - 0.2, rnd() - 0.5).normalize(),
      };
    });
  }, [kind, count, onSurface]);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    const mesh = ref.current;
    if (!mesh) return;
    const t = state.clock.elapsedTime;
    const px = pointerState.x;
    const py = pointerState.y;
    for (let i = 0; i < orbits.length; i++) {
      const o = orbits[i];
      const a = o.phase + t * o.speed;
      const bob = onSurface ? Math.sin(t * 1.2 + o.phase) * 0.006 : Math.sin(t * 0.7 + o.phase) * 0.08;
      const r = o.r * (1 + scatter * 2.4);
      let x = Math.cos(a) * r;
      let z = Math.sin(a) * r;
      let y = o.y + bob + scatter * o.dir.y * 3.2;
      if (!onSurface) {
        // depth parallax: closer pieces react more to the pointer
        const depth = (z + 3) / 6;
        x += px * 0.25 * depth - scatter * o.dir.x * 0.5;
        y += py * 0.15 * depth;
        z += scatter * o.dir.z * 1.5;
      }
      dummy.position.set(x, y, z);
      if (onSurface) {
        dummy.rotation.set(kind === "saffron" ? Math.PI / 2 : 0, o.phase + t * o.spin.y, kind === "saffron" ? o.phase : 0);
      } else {
        dummy.rotation.set(t * o.spin.x + o.phase, t * o.spin.y, t * o.spin.z + o.phase);
      }
      const s = o.scale * (onSurface ? 0.85 : 1);
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (matRef.current && !onSurface) matRef.current.opacity = opacity;
  });

  const c = COLORS[kind];
  return (
    <instancedMesh ref={ref} args={[geometry, undefined, count]} frustumCulled={false} renderOrder={onSurface ? 1 : 2}>
      <meshStandardMaterial ref={matRef} color={c.color} roughness={c.rough} metalness={0.05} transparent={!onSurface} opacity={1} envMapIntensity={0.8} />
    </instancedMesh>
  );
}
