import type { Metadata, Viewport } from "next";
import "./globals.css";
import { BUSINESS } from "@/data/business";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lala-milkverse.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "LALA — La La Paal Nilayam, Triplicane · The Art of Milk & Indulgence",
    template: "%s · LALA Paal Nilayam",
  },
  description:
    "La La Paal Nilayam, Triplicane, Chennai. Hot masala paal, badam milk, royal falooda, halwa, kova buns, chaat and cafe snacks. A little sip of happiness.",
  keywords: [
    "La La Paal Nilayam",
    "Lala Paal Nilayam",
    "masala paal Chennai",
    "badam milk Triplicane",
    "falooda Chennai",
    "beetroot halwa",
    "kova bun",
    "Triplicane sweets",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "LALA Paal Nilayam",
    title: "LALA — The Art of Milk & Indulgence",
    description: "A little sip of happiness. Milk, sweets, falooda, buns and chaat in Triplicane, Chennai.",
    images: [{ url: "/assets/hero/hero-concept-art.jpg", width: 1536, height: 1024, alt: "LALA — concept artwork of saffron masala paal" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "LALA — The Art of Milk & Indulgence",
    description: "A little sip of happiness. Triplicane, Chennai.",
    images: ["/assets/hero/hero-concept-art.jpg"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#2a060d",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: BUSINESS.name,
  alternateName: "LALA",
  telephone: BUSINESS.phoneE164,
  servesCuisine: ["Indian", "Beverages", "Desserts", "Street Food"],
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.addressLines.slice(0, 2).join(", "),
    addressLocality: "Triplicane, Chennai",
    addressRegion: "Tamil Nadu",
    postalCode: "600005",
    addressCountry: "IN",
  },
  sameAs: [BUSINESS.instagramUrl, BUSINESS.swiggyUrl, BUSINESS.justdialUrl],
  url: SITE_URL,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className="lenis">
      <body className="grain">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
