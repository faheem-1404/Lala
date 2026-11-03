/**
 * Scroll storyboard: one continuous progress (0–1) across the pinned story.
 * Each scene mounts within [mountStart, mountEnd] and blends in/out with `fade`.
 */
export type SceneId = "milk" | "sweets" | "desserts" | "food";

export interface SceneRange {
  id: SceneId;
  start: number; // visual window start
  end: number; // visual window end
  mountStart: number; // mount early for texture warm-up
  mountEnd: number;
}

export const SCENES: SceneRange[] = [
  { id: "milk", start: 0, end: 0.34, mountStart: 0, mountEnd: 0.4 },
  { id: "sweets", start: 0.3, end: 0.52, mountStart: 0.2, mountEnd: 0.58 },
  { id: "desserts", start: 0.48, end: 0.68, mountStart: 0.38, mountEnd: 0.74 },
  { id: "food", start: 0.64, end: 0.86, mountStart: 0.54, mountEnd: 0.92 },
];

/** Story section height in viewport units (longer = slower, more cinematic). */
export const STORY_VH = 760;

/** Canvas fades to the cream menu surface over this window. */
export const CANVAS_FADE = { start: 0.88, end: 0.995 };

export interface Caption {
  id: string;
  at: [number, number]; // visible progress window
  eyebrow: string;
  title: string;
  lines?: string[];
  align?: "left" | "right" | "center";
  anchor?: "top" | "middle" | "bottom";
}

export const CAPTIONS: Caption[] = [
  {
    id: "first-sip",
    at: [0.07, 0.17],
    eyebrow: "01 — The first sip",
    title: "Saffron. Almond. Warm milk.",
    lines: ["Simmered slowly, the Madras way."],
    align: "right",
    anchor: "middle",
  },
  {
    id: "milk-motion",
    at: [0.17, 0.31],
    eyebrow: "02 — Milk in motion",
    title: "Milk in motion.",
    lines: ["Thick, creamy, poured hot and chilled cold."],
    align: "left",
    anchor: "bottom",
  },
  {
    id: "sweet-universe",
    at: [0.33, 0.5],
    eyebrow: "03 — The sweet universe",
    title: "Tradition in every bite.",
    lines: ["Rasmalai, gulab jamun, makkan peda, badusha, Mysore pak, milk peda, special laddu."],
    align: "left",
    anchor: "middle",
  },
  {
    id: "dessert-universe",
    at: [0.51, 0.66],
    eyebrow: "04 — The dessert universe",
    title: "Your cravings. Your universe.",
    lines: ["Royal falooda, ice cream falooda, rose milk, badam milk, milkshakes, masala paal."],
    align: "left",
    anchor: "middle",
  },
  {
    id: "food-experience",
    at: [0.67, 0.84],
    eyebrow: "05 — The food experience",
    title: "Street. Cafe. Home.",
    lines: ["Kova bun, muska bun, pav bhaji, pani puri, dahi puri, bhel puri, fries, Maggi, quick bites."],
    align: "left",
    anchor: "bottom",
  },
];
