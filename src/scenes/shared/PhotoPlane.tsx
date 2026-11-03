"use client";

import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { photoVertex, photoFragment } from "@/shaders/photo";

export interface PhotoPlaneProps {
  texture: THREE.Texture;
  position: [number, number, number];
  rotation?: [number, number, number];
  height?: number;
  reveal: number; // 0..1
  opacity: number;
  time: number;
  tint?: string;
  /** optional offset applied per frame (floating) */
  float?: { amp: number; speed: number; phase: number };
}

/** A photograph floating in 3D with rounded corners, warm grade and a scroll-driven reveal wipe. */
export function PhotoPlane({ texture, position, rotation = [0, 0, 0], height = 1.5, reveal, opacity, time, tint = "#d4af37", float }: PhotoPlaneProps) {
  const img = texture.image as { width?: number; height?: number } | undefined;
  const aspect = img?.width && img?.height ? img.width / img.height : 1;
  const width = height * aspect;

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: photoVertex,
        fragmentShader: photoFragment,
        uniforms: {
          uMap: { value: texture },
          uOpacity: { value: 1 },
          uRadius: { value: 0.035 },
          uAspect: { value: aspect },
          uTime: { value: 0 },
          uReveal: { value: 0 },
          uTint: { value: new THREE.Color(tint) },
        },
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    [texture, aspect, tint],
  );

  const group = useMemo(() => new THREE.Group(), []);

  useFrame(() => {
    material.uniforms.uTime.value = time;
    material.uniforms.uReveal.value = reveal;
    material.uniforms.uOpacity.value = opacity;
    if (float) {
      group.position.set(position[0], position[1] + Math.sin(time * float.speed + float.phase) * float.amp, position[2]);
      group.rotation.set(rotation[0], rotation[1] + Math.sin(time * float.speed * 0.6 + float.phase) * 0.03, rotation[2]);
    } else {
      group.position.set(...position);
      group.rotation.set(...rotation);
    }
    group.visible = opacity > 0.002 && reveal > 0.001;
  });

  return (
    <primitive object={group}>
      <mesh material={material} renderOrder={5}>
        <planeGeometry args={[width, height, 1, 1]} />
      </mesh>
    </primitive>
  );
}
