"use client";

import { useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { particleVertex, particleFragment } from "@/shaders/particles";
import { seeded } from "@/utils/math";

/** Milk droplets around the glass; `burst` 0..1 flings them outward (scene 02). */
export function Droplets({
  count,
  burst,
  opacity,
  color = "#fbf0e0",
  size = 9,
  spread = 1.6,
  seed = 3,
}: {
  count: number;
  burst: number;
  opacity: number;
  color?: string;
  size?: number;
  spread?: number;
  seed?: number;
}) {
  const dpr = useThree((s) => s.viewport.dpr);
  const geometry = useMemo(() => {
    const rnd = seeded(seed);
    const pos = new Float32Array(count * 3);
    const dir = new Float32Array(count * 3);
    const sd = new Float32Array(count);
    const sc = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // shell around the glass
      const a = rnd() * Math.PI * 2;
      const r = 0.9 + rnd() * spread;
      const y = -1.8 + rnd() * 3.8;
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(a) * r;
      const d = new THREE.Vector3(Math.cos(a), (rnd() - 0.3) * 0.8, Math.sin(a)).normalize();
      dir[i * 3] = d.x;
      dir[i * 3 + 1] = d.y;
      dir[i * 3 + 2] = d.z;
      sd[i] = rnd();
      sc[i] = 0.4 + Math.pow(rnd(), 2.2) * 1.6;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aDir", new THREE.BufferAttribute(dir, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(sd, 1));
    g.setAttribute("aScale", new THREE.BufferAttribute(sc, 1));
    return g;
  }, [count, spread, seed]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: particleVertex,
        fragmentShader: particleFragment,
        uniforms: {
          uTime: { value: 0 },
          uBurst: { value: 0 },
          uSize: { value: size },
          uPixelRatio: { value: 1 },
          uColor: { value: new THREE.Color(color) },
          uOpacity: { value: 1 },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.NormalBlending,
      }),
    [size, color],
  );

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
    material.uniforms.uBurst.value = burst;
    material.uniforms.uOpacity.value = opacity;
    material.uniforms.uPixelRatio.value = dpr;
  });

  return <points geometry={geometry} material={material} frustumCulled={false} renderOrder={4} />;
}
