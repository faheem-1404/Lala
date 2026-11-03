"use client";

import { useEffect, useState } from "react";

export type DeviceTier = "high" | "mid" | "low";

export interface DeviceProfile {
  tier: DeviceTier;
  isTouch: boolean;
  isMobile: boolean;
  reducedMotion: boolean;
  dpr: [number, number];
  particles: number;
  ribbonSegments: number;
  postprocessing: boolean;
}

const base: DeviceProfile = {
  tier: "mid",
  isTouch: false,
  isMobile: false,
  reducedMotion: false,
  dpr: [1, 1.5],
  particles: 900,
  ribbonSegments: 320,
  postprocessing: false,
};

export function detectDeviceProfile(): DeviceProfile {
  if (typeof window === "undefined") return base;
  const nav = navigator as Navigator & { deviceMemory?: number };
  const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
  const isMobile = window.innerWidth < 768 || isTouch;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cores = nav.hardwareConcurrency ?? 4;
  const mem = nav.deviceMemory ?? 4;
  let tier: DeviceTier = "mid";
  if (!isMobile && cores >= 8 && mem >= 8) tier = "high";
  else if (isMobile && (cores <= 4 || mem <= 3)) tier = "low";
  else if (!isMobile && (cores <= 2 || mem <= 2)) tier = "low";

  const profiles: Record<DeviceTier, Partial<DeviceProfile>> = {
    high: { dpr: [1, 1.75], particles: 1800, ribbonSegments: 480, postprocessing: true },
    mid: { dpr: [1, 1.5], particles: 900, ribbonSegments: 320, postprocessing: !isMobile },
    low: { dpr: [1, 1.2], particles: 350, ribbonSegments: 200, postprocessing: false },
  };
  return { ...base, ...profiles[tier], tier, isTouch, isMobile, reducedMotion };
}

export function useDeviceProfile(): DeviceProfile {
  const [profile, setProfile] = useState<DeviceProfile>(base);
  useEffect(() => {
    setProfile(detectDeviceProfile());
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setProfile(detectDeviceProfile());
    mq.addEventListener("change", onChange);
    window.addEventListener("resize", onChange);
    return () => {
      mq.removeEventListener("change", onChange);
      window.removeEventListener("resize", onChange);
    };
  }, []);
  return profile;
}
