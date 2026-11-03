"use client";

import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { liquidSurfaceVertex, liquidSurfaceFragment } from "@/shaders/liquid";
import { dessertVertex, dessertFragment } from "@/shaders/dessert";
import { LIQUID_TOP_Y } from "./Glass";

const KEY_DIR = new THREE.Vector3(-0.6, 0.8, 0.5).normalize();

/** The masala paal: an opaque golden body (lathe) and a custom-shader surface disc that ripples. */
export function Liquid({ agitation = 0, opacity = 1 }: { agitation?: number; opacity?: number }) {
  const bodyGeo = useMemo(() => {
    const pts: [number, number][] = [
      [0.0, -1.0],
      [0.405, -1.0],
      [0.44, -0.8],
      [0.475, -0.2],
      [0.51, 0.6],
      [0.52, LIQUID_TOP_Y],
    ];
    return new THREE.LatheGeometry(pts.map(([r, y]) => new THREE.Vector2(r, y)), 64);
  }, []);

  const surfaceGeo = useMemo(() => new THREE.RingGeometry(0.001, 0.52, 96, 24), []);
  const surfaceMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: liquidSurfaceVertex,
        fragmentShader: liquidSurfaceFragment,
        uniforms: {
          uTime: { value: 0 },
          uAgitation: { value: 0 },
          uColorA: { value: new THREE.Color("#edc062") },
          uColorB: { value: new THREE.Color("#fbeccb") },
          uColorC: { value: new THREE.Color("#d08a2a") },
          uKeyDir: { value: KEY_DIR },
          uOpacity: { value: 1 },
        },
        transparent: false,
      }),
    [],
  );
  const bodyMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: dessertVertex,
        fragmentShader: dessertFragment,
        uniforms: {
          uTime: { value: 0 },
          uLayer0: { value: new THREE.Color("#dfa63c") },
          uLayer1: { value: new THREE.Color("#efc45e") },
          uLayer2: { value: new THREE.Color("#f6d98f") },
          uSplit0: { value: 0.3 },
          uSplit1: { value: 0.78 },
          uHeight: { value: LIQUID_TOP_Y + 1.0 },
          uBottom: { value: -1.0 },
          uNoise: { value: 0.35 },
          uVermicelli: { value: 0 },
          uKeyDir: { value: KEY_DIR },
          uOpacity: { value: 1 },
        },
        transparent: false,
      }),
    [],
  );

  useFrame((state) => {
    surfaceMat.uniforms.uTime.value = state.clock.elapsedTime;
    surfaceMat.uniforms.uAgitation.value = agitation;
    surfaceMat.uniforms.uOpacity.value = opacity;
    bodyMat.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <group>
      <mesh geometry={bodyGeo} material={bodyMat} renderOrder={1} />
      <mesh geometry={surfaceGeo} material={surfaceMat} rotation={[-Math.PI / 2, 0, 0]} position={[0, LIQUID_TOP_Y + 0.002, 0]} renderOrder={1} />
    </group>
  );
}
