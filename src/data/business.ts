/**
 * Business facts for La La Paal Nilayam.
 * Only verified / brief-supplied facts live here. Anything the owner must confirm is marked.
 */
export const BUSINESS = {
  name: "La La Paal Nilayam",
  shortName: "LALA",
  tagline: "A little sip of happiness.",
  positioning: "The art of milk & indulgence.",
  signature: "Made with love, served with happiness.",
  locality: "Triplicane",
  city: "Chennai",
  state: "Tamil Nadu",
  country: "India",
  /** From reference-book research. Swiggy also references "Door No. 225, Bharathi Salai" — owner to confirm. */
  addressLines: ["150, Bharathi Salai", "Ellis Puram, Padupakkam", "Triplicane, Chennai 600005"],
  addressConfirmed: false,
  phoneDisplay: "+91 75500 06861",
  phoneE164: "+917550006861",
  whatsappNumber: "917550006861",
  whatsappMessage:
    "Hello La La Paal Nilayam! I would like to explore your menu and place an order.",
  instagramHandle: "lala_paalnilayam",
  instagramUrl: "https://www.instagram.com/lala_paalnilayam/",
  swiggyUrl:
    "https://www.swiggy.com/city/chennai/lala-paal-nilayam-royapettah-rest1385944",
  justdialUrl:
    "https://www.justdial.com/Chennai/La-La-Pal-Nilayam-Triplicane/044PXX44-XX44-251129210124-J3P2_BZDET",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=La+La+Paal+Nilayam+Triplicane+Chennai",
  /** Not verified from an official source — shown as "call to confirm". */
  hours: null as null | { days: string; open: string; close: string }[],
  /** From the public Instagram bio at research time (Nov 2026). */
  instagramBio: "Paarambariya milk varieties & chat items",
} as const;

export type Business = typeof BUSINESS;
