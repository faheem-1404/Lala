"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { dessertVertex, dessertFragment } from "@/shaders/dessert";
import { seeded } from "@/utils/math";

export interface DessertVariant {
  id: string;
  name: string;
  layers: [string, string, string];
  splits: [number, number];
  noise: number;
  vermicelli: boolean;
  scoop: boolean;
  garnish: "pistachio" | "almond" | "saffron" | "none";
  light: string;
  tall: boolean;
}

export const VARIANTS: DessertVariant[] = [
  { id: "royal-falooda", name: "Special Royal Falooda", layers: ["#d8426c", "#f7d7dc", "#fbf3ea"], splits: [0.38, 0.78], noise: 0.5, vermicelli: true, scoop: true, garnish: "pistachio", light: "#ff6f9a", tall: true },
  { id: "rose-milk", name: "Rose Milk", layers: ["#e77b9d", "#ef9ab5", "#f4b4c8"], splits: [0.4, 0.8], noise: 0.25, vermicelli: false, scoop: false, garnish: "none", light: "#ff9fc0", tall: false },
  { id: "badam-milk", name: "Royal Badam Malai Paal", layers: ["#e9c98f", "#f1d9a8", "#f7e6c4"], splits: [0.45, 0.85], noise: 0.3, vermicelli: false, scoop: false, garnish: "almond", light: "#ffd38a", tall: false },
  { id: "masala-paal", name: "Hot Masala Paal", layers: ["#dba437", "#e8bb55", "#f1cf7b"], splits: [0.4, 0.8], noise: 0.45, vermicelli: false, scoop: false, garnish: "saffron", light: "#ffbf4a", tall: false },
  { id: "chocolate-shake", name: "Chocolate Milkshake", layers: ["#4b2a18", "#5e3520", "#7a4a2c"], splits: [0.4, 0.82], noise: 0.35, vermicelli: false, scoop: true, garnish: "none", light: "#c98a5a", tall: true },
];

const KEY_DIR = new THREE.Vector3(-0.6, 0.8, 0.5).normalize();

function glassProfile(tall: boolean): THREE.Vector2[] {
  const H = tall ? 1.5 : 1.15;
  const pts: [number, number][] = tall
    ? [[0, -H], [0.34, -H], [0.38, -H + 0.08], [0.33, -0.55], [0.4, 0.2], [0.5, 0.9], [0.54, H], [0.515, H], [0.47, 0.9], [0.37, 0.2], [0.31, -0.5], [0.33, -H + 0.2], [0, -H + 0.2]]
    : [[0, -H], [0.38, -H], [0.41, -H + 0.06], [0.44, -0.2], [0.49, 0.7], [0.5, H], [0.475, H], [0.465, 0.7], [0.415, -0.2], [0.385, -H + 0.18], [0, -H + 0.18]];
  return pts.map(([r, y]) => new THREE.Vector2(r, y));
}
function liquidProfile(tall: boolean): { pts: THREE.Vector2[]; top: number; bottom: number } {
  const H = tall ? 1.5 : 1.15;
  const top = tall ? 1.05 : 0.78;
  const pts: [number, number][] = tall
    ? [[0, -H + 0.21], [0.31, -H + 0.21], [0.3, -0.55], [0.36, 0.2], [0.455, 0.9], [0.47, top], [0, top]]
    : [[0, -H + 0.19], [0.37, -H + 0.19], [0.4, -0.2], [0.45, 0.7], [0.455, top], [0, top]];
  return { pts: pts.map(([r, y]) => new THREE.Vector2(r, y)), top, bottom: -H + 0.2 };
}

/** A procedural dessert glass: transmissive glass + layered liquid shader + optional scoop and garnish. */
export function DessertGlass({ variant, lowTier, opacity, time }: { variant: DessertVariant; lowTier: boolean; opacity: number; time: number }) {
  const glassGeo = useMemo(() => new THREE.LatheGeometry(glassProfile(variant.tall), lowTier ? 40 : 72), [variant.tall, lowTier]);
  const liq = useMemo(() => liquidProfile(variant.tall), [variant.tall]);
  const liqGeo = useMemo(() => new THREE.LatheGeometry(liq.pts, 48), [liq]);
  const height = liq.top - liq.bottom;

  const liqMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: dessertVertex,
        fragmentShader: dessertFragment,
        uniforms: {
          uTime: { value: 0 },
          uLayer0: { value: new THREE.Color(variant.layers[0]) },
          uLayer1: { value: new THREE.Color(variant.layers[1]) },
          uLayer2: { value: new THREE.Color(variant.layers[2]) },
          uSplit0: { value: variant.splits[0] },
          uSplit1: { value: variant.splits[1] },
          uHeight: { value: height },
          uBottom: { value: liq.bottom },
          uNoise: { value: variant.noise },
          uVermicelli: { value: variant.vermicelli ? 1 : 0 },
          uKeyDir: { value: KEY_DIR },
          uOpacity: { value: 1 },
        },
        transparent: false,
      }),
    [variant, height, liq.bottom],
  );

  const garnish = useMemo(() => {
    if (variant.garnish === "none") return null;
    const rnd = seeded(variant.id.length * 31);
    const n = variant.garnish === "saffron" ? 10 : 9;
    const geo =
      variant.garnish === "saffron"
        ? new THREE.CylinderGeometry(0.005, 0.004, 0.16, 5, 1)
        : (() => {
            const g = new THREE.SphereGeometry(1, 10, 8);
            if (variant.garnish === "almond") g.scale(0.08, 0.03, 0.05);
            else g.scale(0.055, 0.028, 0.04);
            return g;
          })();
    const color = variant.garnish === "saffron" ? "#c1341c" : variant.garnish === "almond" ? "#9a6236" : "#7d9b45";
    const mesh = new THREE.InstancedMesh(geo, new THREE.MeshStandardMaterial({ color, roughness: 0.55 }), n);
    const d = new THREE.Object3D();
    const topY = variant.scoop ? liq.top + 0.42 : liq.top + 0.01;
    const R = variant.scoop ? 0.26 : 0.36;
    for (let i = 0; i < n; i++) {
      const a = rnd() * Math.PI * 2;
      const r = Math.sqrt(rnd()) * R;
      d.position.set(Math.cos(a) * r, topY + (variant.scoop ? Math.sqrt(Math.max(0, 0.42 * 0.42 - r * r)) - 0.42 + 0.02 : 0), Math.sin(a) * r);
      d.rotation.set(variant.garnish === "saffron" ? Math.PI / 2 : 0, rnd() * Math.PI, rnd() * 0.4);
      d.updateMatrix();
      mesh.setMatrixAt(i, d.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    return mesh;
  }, [variant, liq.top]);

  const glassMat = useRef<THREE.MeshPhysicalMaterial>(null);
  const scoopMat = useRef<THREE.MeshPhysicalMaterial>(null);

  useFrame(() => {
    liqMat.uniforms.uTime.value = time;
    liqMat.uniforms.uOpacity.value = opacity;
    if (glassMat.current && lowTier) glassMat.current.opacity = 0.3 * opacity;
  });

  return (
    <group>
      <mesh geometry={liqGeo} material={liqMat} position={[0, 0, 0]} renderOrder={1} />
      <mesh geometry={glassGeo} renderOrder={2}>
        {lowTier ? (
          <meshPhysicalMaterial ref={glassMat} color="#fff6ea" roughness={0.08} transparent opacity={0.3} clearcoat={1} envMapIntensity={1.4} side={THREE.DoubleSide} />
        ) : (
          <meshPhysicalMaterial ref={glassMat} color="#fffaf3" roughness={0.06} transmission={1} thickness={0.4} ior={1.5} clearcoat={1} clearcoatRoughness={0.08} envMapIntensity={1.2} side={THREE.DoubleSide} />
        )}
      </mesh>
      {variant.scoop && (
        <mesh position={[0, liq.top + 0.26, 0]} renderOrder={1}>
          <sphereGeometry args={[0.4, 28, 20]} />
          <meshPhysicalMaterial ref={scoopMat} color="#fbf3ea" roughness={0.72} sheen={0.8} sheenColor="#f8e6d1" />
        </mesh>
      )}
      {garnish && <primitive object={garnish} />}
      {/* straw */}
      <mesh position={[0.18, liq.top + 0.5, 0.05]} rotation={[0, 0, -0.22]} renderOrder={2}>
        <cylinderGeometry args={[0.016, 0.016, 1.9, 10]} />
        <meshStandardMaterial color={variant.id === "chocolate-shake" ? "#f8e6d1" : "#d4af37"} roughness={0.4} metalness={0.2} transparent opacity={opacity} />
      </mesh>
    </group>
  );
}
