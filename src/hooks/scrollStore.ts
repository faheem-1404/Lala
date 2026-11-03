/**
 * Lightweight scroll store: a mutable object read inside useFrame (no React re-renders per tick)
 * plus a subscribe API for the few HTML pieces that need it.
 */
export interface ScrollState {
  /** 0 → 1 across the pinned story section. */
  progress: number;
  /** Smoothed progress (damped) for camera & scene blends. */
  smooth: number;
  /** Lenis velocity (px/frame-ish), for motion accents. */
  velocity: number;
  /** Whether the story section is on screen (frameloop gate). */
  storyVisible: boolean;
}

export const scrollState: ScrollState = {
  progress: 0,
  smooth: 0,
  velocity: 0,
  storyVisible: true,
};

type Listener = (s: ScrollState) => void;
const listeners = new Set<Listener>();

export const subscribeScroll = (fn: Listener) => {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
};

export const setScrollProgress = (p: number, velocity = 0) => {
  scrollState.progress = p;
  scrollState.velocity = velocity;
  listeners.forEach((l) => l(scrollState));
};

/** Pointer in normalised device coords (-1..1), smoothed by consumers. */
export const pointerState = { x: 0, y: 0, active: false };
