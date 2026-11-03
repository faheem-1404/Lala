"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor, Preload } from "@react-three/drei";
import * as THREE from "three";
import { CameraRig } from "./CameraRig";
import { StudioEnvironment } from "./StudioEnvironment";
import { Lighting } from "./Lighting";
import { Effects } from "./Effects";
import { Stage } from "./Stage";
import type { DeviceProfile } from "@/hooks/useDeviceTier";
import { scrollState, subscribeScroll } from "@/hooks/scrollStore";
import { CANVAS_FADE } from "@/data/scenes";
import { range } from "@/utils/math";

/**
 * The single persistent WebGL stage, fixed behind the document.
 * - Adaptive DPR (drops when frames are slow).
 * - frameloop pauses when the story is off-screen.
 * - Fades out as the menu arrives.
 */
export function MilkverseCanvas({ profile }: { profile: DeviceProfile }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [dpr, setDpr] = useState(profile.dpr[1]);
  const [active, setActive] = useState(true);

  useEffect(() => setDpr(profile.dpr[1]), [profile.dpr]);

  // fade with progress and gate the frameloop
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    return subscribeScroll((s) => {
      const o = 1 - range(s.progress, CANVAS_FADE.start, CANVAS_FADE.end);
      el.style.opacity = o.toFixed(3);
      const vis = s.progress < 0.995;
      scrollState.storyVisible = vis;
      setActive((a) => (a === vis ? a : vis));
    });
  }, []);

  return (
    <div ref={wrap} className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <Canvas
        dpr={dpr}
        frameloop={active ? "always" : "demand"}
        camera={{ position: [0, 0.25, 6.4], fov: 36, near: 0.1, far: 60 }}
        gl={{
          antialias: !profile.postprocessing,
          alpha: false,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
        }}
        onCreated={({ gl, scene }) => {
          gl.setClearColor(new THREE.Color("#2a060d"), 1);
          scene.fog = new THREE.FogExp2("#2a060d", 0.045);
        }}
        style={{ position: "absolute", inset: 0 }}
      >
        <PerformanceMonitor
          onDecline={() => setDpr((d) => Math.max(profile.dpr[0], d - 0.25))}
          onIncline={() => setDpr((d) => Math.min(profile.dpr[1], d + 0.25))}
          flipflops={3}
          onFallback={() => setDpr(profile.dpr[0])}
        />
        <color attach="background" args={["#2a060d"]} />
        <CameraRig isMobile={profile.isMobile} reducedMotion={profile.reducedMotion} />
        <Lighting />
        <Suspense fallback={null}>
          <StudioEnvironment resolution={profile.tier === "low" ? 128 : 256} />
          <Stage profile={profile} />
          <Preload all />
        </Suspense>
        {profile.postprocessing && <Effects />}
      </Canvas>
    </div>
  );
}
