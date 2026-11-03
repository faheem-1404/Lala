"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState, pointerState } from "@/hooks/scrollStore";
import { damp, smoothstep } from "@/utils/math";

interface Key {
  p: number;
  pos: [number, number, number];
  look: [number, number, number];
  fov: number;
}

/** Hand-authored camera path across the story (desktop). */
const DESKTOP: Key[] = [
  { p: 0.0, pos: [0.0, 0.25, 6.4], look: [-0.55, 0.05, 0], fov: 36 },
  { p: 0.1, pos: [0.9, 0.45, 4.6], look: [-0.25, 0.15, 0], fov: 34 },
  { p: 0.18, pos: [0.2, 0.1, 5.2], look: [0, 0, 0], fov: 40 },
  { p: 0.3, pos: [0.0, 0.3, 7.4], look: [0, 0.2, 0], fov: 44 },
  { p: 0.42, pos: [0.8, 0.2, 6.8], look: [0.2, 0.1, 0], fov: 42 },
  { p: 0.56, pos: [-1.4, 0.5, 7.0], look: [-0.2, 0.2, 0], fov: 40 },
  { p: 0.7, pos: [1.0, 0.3, 7.2], look: [0.3, 0.1, 0], fov: 42 },
  { p: 0.86, pos: [0.0, 1.4, 8.6], look: [0, 0.4, 0], fov: 44 },
  { p: 1.0, pos: [0.0, 2.6, 9.6], look: [0, 0.6, 0], fov: 46 },
];

/** Mobile: pull back, keep the glass centred and high, leave the lower third for type. */
const MOBILE: Key[] = [
  { p: 0.0, pos: [0.0, 0.9, 8.2], look: [0, 0.55, 0], fov: 46 },
  { p: 0.1, pos: [0.3, 0.9, 6.6], look: [0, 0.5, 0], fov: 44 },
  { p: 0.18, pos: [0.0, 0.6, 7.2], look: [0, 0.3, 0], fov: 50 },
  { p: 0.3, pos: [0.0, 0.7, 9.4], look: [0, 0.4, 0], fov: 52 },
  { p: 0.42, pos: [0.3, 0.6, 9.0], look: [0, 0.4, 0], fov: 52 },
  { p: 0.56, pos: [-0.4, 0.8, 9.4], look: [0, 0.5, 0], fov: 50 },
  { p: 0.7, pos: [0.3, 0.7, 9.4], look: [0, 0.5, 0], fov: 52 },
  { p: 0.86, pos: [0.0, 1.6, 10.4], look: [0, 0.6, 0], fov: 52 },
  { p: 1.0, pos: [0.0, 2.6, 11.2], look: [0, 0.8, 0], fov: 54 },
];

const tmpA = new THREE.Vector3();
const tmpB = new THREE.Vector3();
const tmpLook = new THREE.Vector3();

function sample(keys: Key[], p: number, outPos: THREE.Vector3, outLook: THREE.Vector3): number {
  let i = 0;
  while (i < keys.length - 2 && p > keys[i + 1].p) i++;
  const a = keys[i];
  const b = keys[i + 1];
  const t = smoothstep(a.p, b.p, p);
  outPos.set(...a.pos).lerp(tmpA.set(...b.pos), t);
  outLook.set(...a.look).lerp(tmpB.set(...b.look), t);
  return a.fov + (b.fov - a.fov) * t;
}

export function CameraRig({ isMobile, reducedMotion }: { isMobile: boolean; reducedMotion: boolean }) {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const px = useRef(0);
  const py = useRef(0);
  const breathe = useRef(0);
  const pos = useRef(new THREE.Vector3());

  useFrame((_, dt) => {
    const d = Math.min(dt, 0.1);
    scrollState.smooth = damp(scrollState.smooth, scrollState.progress, 7, d);
    const p = scrollState.smooth;
    const keys = isMobile ? MOBILE : DESKTOP;
    const fov = sample(keys, p, pos.current, tmpLook);

    // pointer parallax (desktop only) + breathing
    const targetX = reducedMotion || isMobile ? 0 : pointerState.x * 0.35;
    const targetY = reducedMotion || isMobile ? 0 : pointerState.y * 0.2;
    px.current = damp(px.current, targetX, 3.5, d);
    py.current = damp(py.current, targetY, 3.5, d);
    breathe.current += d;
    const b = reducedMotion ? 0 : Math.sin(breathe.current * 0.6) * 0.03;

    camera.position.set(pos.current.x + px.current, pos.current.y + py.current + b, pos.current.z);
    camera.lookAt(tmpLook.x + px.current * 0.35, tmpLook.y + py.current * 0.3, tmpLook.z);
    if (Math.abs(camera.fov - fov) > 0.01) {
      camera.fov = fov;
      camera.updateProjectionMatrix();
    }
  });
  return null;
}
