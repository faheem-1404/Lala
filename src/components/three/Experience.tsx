"use client";

import dynamic from "next/dynamic";
import { Component, type ReactNode } from "react";
import Image from "next/image";
import { useDeviceProfile } from "@/hooks/useDeviceTier";
import { useWebGLSupport } from "@/hooks/useWebGLSupport";

const MilkverseCanvas = dynamic(() => import("./MilkverseCanvas").then((m) => m.MilkverseCanvas), { ssr: false });

class CanvasBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(err: unknown) {
    console.error("[LALA] WebGL stage failed, using static fallback.", err);
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

/** Static art-directed fallback (no WebGL / reduced motion / render failure). Concept artwork, documented in ASSET_MANIFEST.md. */
export function StaticHero() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <Image src="/assets/hero/hero-concept-art.jpg" alt="" fill priority sizes="100vw" className="object-cover object-[62%_center] md:object-center" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(42,6,13,0.85) 0%, rgba(42,6,13,0.35) 50%, rgba(42,6,13,0.55) 100%)" }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(42,6,13,0.9) 100%)" }} />
    </div>
  );
}

/** Chooses the live WebGL stage or the static fallback. Never blocks the HTML sections. */
export function Experience() {
  const profile = useDeviceProfile();
  const webgl = useWebGLSupport();
  if (webgl === null) return null;
  if (!webgl || profile.reducedMotion) return <StaticHero />;
  return (
    <CanvasBoundary fallback={<StaticHero />}>
      <MilkverseCanvas profile={profile} />
    </CanvasBoundary>
  );
}
