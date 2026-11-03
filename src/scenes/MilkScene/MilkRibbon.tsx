"use client";

import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ribbonVertex, ribbonFragment } from "@/shaders/ribbon";

const KEY_DIR = new THREE.Vector3(-0.6, 0.7, 0.6).normalize();

export interface RibbonSpec {
  radius: number;
  turns: number;
  yFrom: number;
  yTo: number;
  phase: number;
  direction: 1 | -1;
  tube: number;
  tilt: number;
}

function helix(spec: RibbonSpec, points = 80) {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= points; i++) {
    const t = i / points;
    const a = spec.phase + spec.direction * t * spec.turns * Math.PI * 2;
    const r = spec.radius * (1 + 0.12 * Math.sin(t * Math.PI * 3.0));
    const y = spec.yFrom + (spec.yTo - spec.yFrom) * t;
    pts.push(new THREE.Vector3(Math.cos(a) * r, y + Math.sin(a) * spec.tilt, Math.sin(a) * r));
  }
  return new THREE.CatmullRomCurve3(pts, false, "catmullrom", 0.5);
}

export function MilkRibbon({
  spec,
  segments,
  unwind,
  opacity,
  time,
}: {
  spec: RibbonSpec;
  segments: number;
  unwind: number;
  opacity: number;
  time: number;
}) {
  const geometry = useMemo(() => new THREE.TubeGeometry(helix(spec), segments, spec.tube, 12, false), [spec, segments]);
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: ribbonVertex,
        fragmentShader: ribbonFragment,
        uniforms: {
          uTime: { value: 0 },
          uUnwind: { value: 0 },
          uAmp: { value: 0.07 },
          uFlatten: { value: 1 },
          uOpacity: { value: 1 },
          uColor: { value: new THREE.Color("#fbf0e0") },
          uShadow: { value: new THREE.Color("#c9a070") },
          uRim: { value: new THREE.Color("#e9c45a") },
          uKeyDir: { value: KEY_DIR },
        },
        transparent: true,
        side: THREE.DoubleSide,
      }),
    [],
  );

  useFrame(() => {
    material.uniforms.uTime.value = time;
    material.uniforms.uUnwind.value = unwind;
    material.uniforms.uOpacity.value = opacity;
  });

  return <mesh geometry={geometry} material={material} renderOrder={3} frustumCulled={false} />;
}
