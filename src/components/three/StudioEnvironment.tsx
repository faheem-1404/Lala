"use client";

import { Environment, Lightformer } from "@react-three/drei";

/**
 * Procedural studio environment (no external HDRI, no network):
 * a warm amber key panel, a soft gold rim strip, a cool-cream fill and a dark burgundy floor glow.
 * Rendered once into a small cubemap and used for reflections / refraction on the glass and liquids.
 */
export function StudioEnvironment({ resolution = 256 }: { resolution?: number }) {
  return (
    <Environment resolution={resolution} frames={1} background={false} environmentIntensity={1}>
      {/* key: warm amber, upper left-front */}
      <Lightformer form="rect" intensity={3.2} color="#ffd9a6" position={[-4, 4, 3]} rotation={[0, Math.PI / 5, 0]} scale={[5, 3, 1]} />
      {/* rim: gold strip behind-right */}
      <Lightformer form="rect" intensity={2.4} color="#f1c45f" position={[5, 2.5, -3]} rotation={[0, -Math.PI / 2.5, 0]} scale={[1.2, 6, 1]} />
      {/* fill: cream, low right */}
      <Lightformer form="rect" intensity={0.8} color="#f8e6d1" position={[4, -1, 4]} rotation={[0, -Math.PI / 4, 0]} scale={[4, 2, 1]} />
      {/* top ring: soft highlights on the rim of the glass */}
      <Lightformer form="ring" intensity={1.5} color="#fff2dc" position={[0, 6, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[3, 3, 1]} />
      {/* burgundy floor glow so refraction stays in-palette */}
      <Lightformer form="rect" intensity={0.9} color="#861e2c" position={[0, -6, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[12, 12, 1]} />
      {/* deep walls */}
      <Lightformer form="rect" intensity={0.5} color="#4a0d17" position={[0, 0, -8]} scale={[16, 10, 1]} />
    </Environment>
  );
}
