export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};
/** 0 → 1 → 0 window with soft edges. */
export const window01 = (x: number, start: number, end: number, fade = 0.06) =>
  smoothstep(start, start + fade, x) * (1 - smoothstep(end - fade, end, x));
/** Remap x in [a,b] to [0,1], clamped. */
export const range = (x: number, a: number, b: number) => clamp((x - a) / (b - a));
/** Frame-rate independent damping factor. */
export const damp = (current: number, target: number, lambda: number, dt: number) =>
  lerp(current, target, 1 - Math.exp(-lambda * dt));
/** Deterministic pseudo-random for stable instance layouts. */
export const seeded = (seed: number) => {
  let s = seed >>> 0 || 1;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
};
