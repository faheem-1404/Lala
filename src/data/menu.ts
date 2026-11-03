/**
 * LALA menu — single source of truth for every menu composition on the site.
 * Owner editing guide: docs/MENU_DATA.md
 *
 * Inventory source: the item names currently surfaced on LALA's Swiggy listing (Nov 2026), as supplied in the brief.
 * It is a changing third-party snapshot: confirm names, spelling, availability, variants and prices with the shop.
 *
 * price:   number in INR, or null = shown as "on request" (no price has been invented).
 * diet:    "veg" | "non-veg" | "unknown" — the Indian green/red mark is shown only when known.
 * status:  "listed"  = surfaced on the listing and shown
 *          "draft"   = surfaced but needs the owner's decision on how to display → hidden until confirmed
 * Photographs live at category level (representative, flagged in docs/ASSET_MANIFEST.md); items never carry
 * unrelated photos — an item without a picture is a typographic entry.
 */
export type MenuCategoryId =
  | "hot-drinks"
  | "buns"
  | "falooda"
  | "cold-drinks"
  | "chaat"
  | "sweets"
  | "maggi"
  | "milkshakes"
  | "fries"
  | "quick-bites"
  | "loaded-fries";

export type Diet = "veg" | "non-veg" | "unknown";
export type ItemStatus = "listed" | "draft";

/** How the category is composed on the page (editorial variants, not a grid). */
export type MenuLayout = "photo-left" | "photo-right" | "portrait" | "typeset" | "duo";
export type Tone = "burgundy" | "ivory" | "cocoa" | "maroon";

export interface MenuCategory {
  id: MenuCategoryId;
  number: string;
  name: string;
  shortName: string;
  intro: string;
  layout: MenuLayout;
  tone: Tone;
  /** Representative photography for the category (never claimed as LALA's own). */
  images: { src: string; alt: string; ratio: "portrait" | "landscape" | "square" }[];
  dietNote?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategoryId;
  price: number | null;
  diet: Diet;
  description?: string;
  status?: ItemStatus;
  available?: boolean;
  /** Candidate for the "start here" composition — not a bestseller claim. */
  highlight?: boolean;
}

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: "hot-drinks",
    number: "01",
    name: "Hot Drinks",
    shortName: "Hot paal",
    intro: "Milk simmered slowly and served hot — the reason the shop exists.",
    layout: "photo-left",
    tone: "burgundy",
    images: [{ src: "/assets/hero/saffron-milk-glasses.webp", alt: "Saffron milk in small glasses with pistachio — representative photograph", ratio: "portrait" }],
  },
  {
    id: "buns",
    number: "02",
    name: "Bun Varieties",
    shortName: "Buns",
    intro: "Soft buns, split and filled.",
    layout: "photo-right",
    tone: "ivory",
    images: [{ src: "/assets/buns/glazed-buns.webp", alt: "Glazed soft buns under warm light — representative photograph", ratio: "landscape" }],
  },
  {
    id: "falooda",
    number: "03",
    name: "Falooda",
    shortName: "Falooda",
    intro: "Tall, layered, chilled.",
    layout: "portrait",
    tone: "cocoa",
    images: [{ src: "/assets/falooda/royal-falooda.webp", alt: "A tall falooda glass with rose syrup and pistachio — representative photograph", ratio: "portrait" }],
  },
  {
    id: "cold-drinks",
    number: "04",
    name: "Cold Drinks",
    shortName: "Cold",
    intro: "Chilled milk, flavoured the old way.",
    layout: "typeset",
    tone: "cocoa",
    images: [{ src: "/assets/beverages/rose-milk.webp", alt: "Rose milk in a glass jar — representative photograph", ratio: "square" }],
  },
  {
    id: "chaat",
    number: "05",
    name: "Chaat & Street Food",
    shortName: "Chaat",
    intro: "Crunchy, tangy, made to order.",
    layout: "duo",
    tone: "maroon",
    images: [
      { src: "/assets/snacks/pani-puri.webp", alt: "Pani puri with red chutney — representative photograph", ratio: "portrait" },
      { src: "/assets/snacks/dahi-puri.webp", alt: "Dahi puri topped with sev and chutneys — representative photograph", ratio: "landscape" },
    ],
  },
  {
    id: "sweets",
    number: "06",
    name: "Sweets",
    shortName: "Sweets",
    intro: "Milk sweets and classics from the counter.",
    layout: "photo-left",
    tone: "ivory",
    images: [{ src: "/assets/sweets/gulab-jamun.webp", alt: "Gulab jamun in syrup — representative photograph", ratio: "portrait" }],
  },
  {
    id: "maggi",
    number: "07",
    name: "Maggi",
    shortName: "Maggi",
    intro: "Noodles, the cafe way.",
    layout: "typeset",
    tone: "burgundy",
    images: [{ src: "/assets/cafe/maggi-noodles.webp", alt: "A bowl of seasoned instant noodles — representative photograph", ratio: "square" }],
  },
  {
    id: "milkshakes",
    number: "08",
    name: "Milkshakes",
    shortName: "Shakes",
    intro: "Thick and cold.",
    layout: "photo-right",
    tone: "burgundy",
    images: [{ src: "/assets/cafe/chocolate-milkshake-tall.webp", alt: "A tall milkshake topped with cream — representative photograph", ratio: "portrait" }],
  },
  {
    id: "fries",
    number: "09",
    name: "French Fries",
    shortName: "Fries",
    intro: "Hot, salted, three ways.",
    layout: "typeset",
    tone: "cocoa",
    images: [{ src: "/assets/cafe/french-fries.webp", alt: "French fries with ketchup on black — representative photograph", ratio: "square" }],
  },
  {
    id: "quick-bites",
    number: "10",
    name: "Quick Bites",
    shortName: "Bites",
    intro: "For the wait, or the walk home.",
    layout: "typeset",
    tone: "cocoa",
    images: [{ src: "/assets/cafe/cheese-balls.webp", alt: "Golden fried cheese balls — representative photograph", ratio: "square" }],
  },
  {
    id: "loaded-fries",
    number: "11",
    name: "Chicken Loaded Fries",
    shortName: "Loaded",
    intro: "Fries, loaded.",
    layout: "typeset",
    tone: "cocoa",
    images: [],
    dietNote: "Non-vegetarian items.",
  },
];

export const MENU_ITEMS: MenuItem[] = [
  // 01 Hot Drinks
  { id: "royal-badam-malai-paal", name: "Royal Badam Malai Paal", category: "hot-drinks", price: null, diet: "veg", description: "Almond milk with malai, served hot.", highlight: true },
  { id: "hot-kova-pal", name: "Hot Kova Pal", category: "hot-drinks", price: null, diet: "veg", description: "Hot milk with kova.", highlight: true },
  { id: "kova-masala-melt-bun", name: "Kova Masala Melt Bun", category: "hot-drinks", price: null, diet: "veg", highlight: true },
  { id: "hot-masala-paal", name: "Hot Masala Paal", category: "hot-drinks", price: null, diet: "veg", description: "The Madras masala milk, served hot.", highlight: true },

  // 02 Bun Varieties
  { id: "carrot-bun", name: "Carrot Bun", category: "buns", price: null, diet: "veg", highlight: true },
  { id: "kova-bun", name: "Kova Bun", category: "buns", price: null, diet: "veg" },
  { id: "muska-bun", name: "Muska Bun", category: "buns", price: null, diet: "veg", description: "Bun with butter." },
  { id: "beetroot-bun", name: "Beetroot Bun", category: "buns", price: null, diet: "veg", highlight: true },
  { id: "bun-butter-jam", name: "Bun Butter Jam", category: "buns", price: null, diet: "veg" },

  // 03 Falooda
  { id: "ice-cream-falooda", name: "Ice Cream Falooda", category: "falooda", price: null, diet: "veg" },
  { id: "mini-falooda", name: "Mini Falooda", category: "falooda", price: null, diet: "veg" },
  { id: "special-royal-falooda", name: "Special Royal Falooda", category: "falooda", price: null, diet: "veg", highlight: true },
  { id: "fruit-falooda", name: "Fruit Falooda", category: "falooda", price: null, diet: "veg" },

  // 04 Cold Drinks
  { id: "pal-sharbat", name: "Pal Sharbat", category: "cold-drinks", price: null, diet: "veg" },
  { id: "badam-milk", name: "Badam Milk", category: "cold-drinks", price: null, diet: "veg", description: "Chilled almond milk." },
  { id: "fruit-mix", name: "Fruit Mix", category: "cold-drinks", price: null, diet: "veg" },
  { id: "rose-milk", name: "Rose Milk", category: "cold-drinks", price: null, diet: "veg", description: "Chilled milk with rose." },

  // 05 Chaat & Street Food
  { id: "pav-bhaji", name: "Pav Bhaji", category: "chaat", price: null, diet: "veg" },
  { id: "murukku-sandwich", name: "Murukku Sandwich", category: "chaat", price: null, diet: "veg" },
  { id: "bhel-puri", name: "Bhel Puri", category: "chaat", price: null, diet: "veg" },
  { id: "pani-puri", name: "Pani Puri", category: "chaat", price: null, diet: "veg" },
  { id: "dahi-puri", name: "Dahi Puri", category: "chaat", price: null, diet: "veg" },
  { id: "khakhra-sandwich", name: "Khakhra Sandwich", category: "chaat", price: null, diet: "veg" },
  { id: "extra-pav-bun", name: "Extra Pav Bun", category: "chaat", price: null, diet: "veg", description: "Add-on.", status: "draft", available: false },

  // 06 Sweets
  { id: "rasmalai", name: "Rasmalai", category: "sweets", price: null, diet: "veg", highlight: true },
  { id: "makkan-peda", name: "Makkan Peda", category: "sweets", price: null, diet: "veg" },
  { id: "gulab-jamun", name: "Gulab Jamun", category: "sweets", price: null, diet: "veg" },
  {
    id: "assorted-sweets",
    name: "Assorted Sweets",
    category: "sweets",
    price: null,
    diet: "veg",
    description: "Badusha, milk peda, kova, Mysore pak, malai jamun, Bombay halwa and special laddu. Pack sizes to be confirmed with the shop.",
  },

  // 07 Maggi
  { id: "veg-maggi", name: "Veg Maggi", category: "maggi", price: null, diet: "veg" },
  { id: "classic-maggi", name: "Classic Maggi", category: "maggi", price: null, diet: "veg" },
  { id: "cheese-maggi", name: "Cheese Maggi", category: "maggi", price: null, diet: "veg" },
  { id: "paneer-maggi", name: "Paneer Maggi", category: "maggi", price: null, diet: "veg" },

  // 08 Milkshakes (only flavours currently surfaced)
  { id: "kit-kat-milkshake", name: "Kit Kat Milkshake", category: "milkshakes", price: null, diet: "veg" },
  { id: "oreo-milkshake", name: "Oreo Milkshake", category: "milkshakes", price: null, diet: "veg" },
  { id: "strawberry-milkshake", name: "Strawberry Milkshake", category: "milkshakes", price: null, diet: "veg" },
  { id: "bourbon-milkshake", name: "Bourbon Milkshake", category: "milkshakes", price: null, diet: "veg" },
  { id: "vanilla-milkshake", name: "Vanilla Milkshake", category: "milkshakes", price: null, diet: "veg" },
  { id: "butterscotch-milkshake", name: "Butterscotch Milkshake", category: "milkshakes", price: null, diet: "veg" },
  { id: "chocolate-milkshake", name: "Chocolate Milkshake", category: "milkshakes", price: null, diet: "veg" },

  // 09 French Fries
  { id: "peri-peri-fries", name: "Peri Peri Fries", category: "fries", price: null, diet: "veg" },
  { id: "classic-fries", name: "Classic Fries", category: "fries", price: null, diet: "veg" },
  { id: "cheese-french-fries", name: "Cheese French Fries", category: "fries", price: null, diet: "veg" },

  // 10 Quick Bites
  { id: "cheese-balls", name: "Cheese Balls", category: "quick-bites", price: null, diet: "veg" },
  { id: "veg-crunch", name: "Veg Crunch", category: "quick-bites", price: null, diet: "veg" },
  { id: "smiley", name: "Smiley", category: "quick-bites", price: null, diet: "veg" },
  { id: "onion-rings", name: "Onion Rings", category: "quick-bites", price: null, diet: "veg" },

  // 11 Chicken Loaded Fries — non-vegetarian
  { id: "korean-loaded-fries", name: "Korean Loaded Fries", category: "loaded-fries", price: null, diet: "non-veg" },
  { id: "loaded-french-fries", name: "Loaded French Fries", category: "loaded-fries", price: null, diet: "non-veg" },
  { id: "hot-spicy-loaded-fries", name: "Hot Spicy Loaded Fries", category: "loaded-fries", price: null, diet: "non-veg" },
];

export const getCategory = (id: MenuCategoryId) => MENU_CATEGORIES.find((c) => c.id === id)!;

/** Items shown to customers: listed and available. Drafts stay in the file for the owner but never render. */
export const itemsByCategory = (id: MenuCategoryId) =>
  MENU_ITEMS.filter((i) => i.category === id && i.available !== false && i.status !== "draft");

export const highlightItems = () => MENU_ITEMS.filter((i) => i.highlight && i.available !== false && i.status !== "draft");

export const formatPrice = (price: number | null) => (price === null ? "on request" : `₹${price}`);
