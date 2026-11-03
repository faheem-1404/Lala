"use client";

import { useEffect, useState } from "react";

export function detectWebGL(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const c = document.createElement("canvas");
    const gl = c.getContext("webgl2") || c.getContext("webgl");
    return !!gl;
  } catch {
    return false;
  }
}

/** null while unknown (SSR / first paint), then boolean. */
export function useWebGLSupport() {
  const [ok, setOk] = useState<boolean | null>(null);
  useEffect(() => setOk(detectWebGL()), []);
  return ok;
}
