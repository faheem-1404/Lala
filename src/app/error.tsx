"use client";

import Link from "next/link";
import { whatsappLink, swiggyLink, telLink } from "@/utils/links";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center px-6 text-center bg-burgundy-deep text-cream">
      <p className="eyebrow mb-6">Something spilled</p>
      <h1 className="display-md mb-6">The page could not load.</h1>
      <p className="lede max-w-md mb-10">You can still order and reach us directly.</p>
      <div className="flex flex-wrap gap-3 justify-center">
        <button className="btn btn-solid" onClick={reset}>Try again</button>
        <a className="btn" href={whatsappLink()} target="_blank" rel="noopener noreferrer">WhatsApp</a>
        <a className="btn" href={swiggyLink()} target="_blank" rel="noopener noreferrer">Swiggy</a>
        <a className="btn" href={telLink()}>Call</a>
      </div>
      <Link href="/" className="link-sweep mt-10 text-sm text-milk-brown">Back to LALA</Link>
    </main>
  );
}
