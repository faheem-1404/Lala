"use client";

import { useMemo } from "react";
import * as THREE from "three";
import type { DeviceProfile } from "@/hooks/useDeviceTier";

/** Tumbler profile (radius, height): outer wall up to the rim, then the inner wall back down. Solid = real thickness. */
export const GLASS_PROFILE: [number, number][] = [
  [0.0, -1.22],
  [0.40, -1.22],
  [0.44, -1.18],
  [0.48, -0.9],
  [0.515, -0.3],
  [0.55, 0.4],
  [0.58, 1.0],
  [0.59, 1.2],
  [0.585, 1.24],
  [0.56, 1.24],
  [0.545, 1.2],
  [0.525, 0.6],
  [0.49, -0.2],
  [0.455, -0.8],
  [0.42, -1.02],
  [0.0, -1.02],
];
export const GLASS_INNER_TOP_R = 0.527;
export const LIQUID_TOP_Y = 0.92;

export function Glass({ profile, opacity = 1 }: { profile: DeviceProfile; opacity?: number }) {
  const geometry = useMemo(() => {
    const pts = GLASS_PROFILE.map(([r, y]) => new THREE.Vector2(r, y));
    const seg = profile.tier === "low" ? 48 : 96;
    const g = new THREE.LatheGeometry(pts, seg);
    g.computeVertexNormals();
    return g;
  }, [profile.tier]);

  const condensation = useMemo(() => {
    // tiny droplets clinging to the outer wall, biased to the lower half
    const count = profile.tier === "low" ? 0 : profile.tier === "mid" ? 180 : 320;
    const dummy = new THREE.Object3D();
    const mesh = new THREE.InstancedMesh(
      new THREE.SphereGeometry(1, 8, 6),
      new THREE.MeshPhysicalMaterial({ color: "#ffffff", roughness: 0.05, transmission: 0.95, thickness: 0.05, ior: 1.33, transparent: true, opacity: 0.9 }),
      Math.max(count, 1),
    );
    let seed = 7;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    for (let i = 0; i < count; i++) {
      const y = -1.0 + rnd() * 1.9 * Math.pow(rnd(), 0.6);
      // radius at height y from the outer profile (approx linear interpolation)
      const r = 0.455 + ((y + 1.0) / 2.2) * 0.135 + 0.006;
      const a = rnd() * Math.PI * 2;
      const s = 0.008 + rnd() * 0.016;
      dummy.position.set(Math.cos(a) * r, y, Math.sin(a) * r);
      dummy.scale.set(s, s * (1.1 + rnd() * 0.6), s * 0.6);
      dummy.lookAt(0, y, 0);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.count = count;
    mesh.instanceMatrix.needsUpdate = true;
    return mesh;
  }, [profile.tier]);

  const lowTier = profile.tier === "low";
  return (
    <group>
      <mesh geometry={geometry} renderOrder={2}>
        {lowTier ? (
          <meshPhysicalMaterial color="#fff6ea" roughness={0.08} metalness={0} transparent opacity={0.28} reflectivity={1} clearcoat={1} clearcoatRoughness={0.1} envMapIntensity={1.4} side={THREE.DoubleSide} />
        ) : (
          <meshPhysicalMaterial
            color="#fffaf3"
            roughness={0.06}
            metalness={0}
            transmission={1}
            thickness={0.55}
            ior={1.5}
            attenuationColor="#fff4e4"
            attenuationDistance={6}
            clearcoat={1}
            clearcoatRoughness={0.08}
            envMapIntensity={1.3}
            specularIntensity={1}
            side={THREE.DoubleSide}
          />
        )}
      </mesh>
      {!lowTier && <primitive object={condensation} />}
    </group>
  );
}
