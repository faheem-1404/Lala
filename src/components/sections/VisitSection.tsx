"use client";

import Image from "next/image";
import { useEditorial } from "@/hooks/useEditorial";
import { BUSINESS } from "@/data/business";
import { mapsLink, telLink, whatsappLink, instagramLink, swiggyLink, justdialLink } from "@/utils/links";
import { IconArrow } from "@/components/ui/Icons";
import { lalaAudio } from "@/utils/audio";

const MAP_EMBED = "https://www.google.com/maps?q=La+La+Paal+Nilayam+Triplicane+Chennai&output=embed&z=16";

/**
 * 11 — Find us. A full-bleed atmosphere photograph with the headline set into it, the address typeset large,
 * contact rows as hairlines, and a tinted map. The storefront slot waits for the shop's own photograph.
 */
export function VisitSection() {
  const ref = useEditorial<HTMLElement>();
  const rows = [
    { label: "Phone", value: BUSINESS.phoneDisplay, href: telLink(), external: false },
    { label: "WhatsApp", value: "Message the counter", href: whatsappLink(), external: true },
    { label: "Instagram", value: `@${BUSINESS.instagramHandle}`, href: instagramLink(), external: true },
    { label: "Swiggy", value: "Order online", href: swiggyLink(), external: true },
    { label: "Justdial", value: "Listing", href: justdialLink(), external: true },
  ];
  return (
    <section ref={ref} id="visit" data-nav-tone="dark" className="relative z-10 tone-burgundy" aria-labelledby="visit-title">
      {/* full-bleed atmosphere */}
      <div className="relative h-[78vh] min-h-[520px] overflow-hidden">
        <div className="absolute inset-[-8%]" data-parallax={0.18}>
          <Image src="/assets/atmosphere/chennai-temple-street.webp" alt="A temple street in Chennai — neighbourhood atmosphere, not the LALA storefront" fill sizes="100vw" className="object-cover" />
        </div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(42,6,13,0.25) 0%, rgba(42,6,13,0.2) 45%, #2a060d 100%)" }} aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-[1440px] px-6 pb-10 md:px-10 md:pb-14">
            <p data-reveal className="eyebrow mb-5">11 — Find us</p>
            <h2 id="visit-title" data-reveal className="display-hero">
              Find us in
              <br />
              Triplicane.
            </h2>
          </div>
        </div>
        <span className="vertical-label absolute right-6 top-28 hidden text-cream md:block">Bharathi Salai · Chennai 600005</span>
      </div>

      <div className="mx-auto max-w-[1440px] px-6 pb-24 pt-16 md:px-10 md:pb-36 md:pt-24">
        <div className="grid gap-14 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-6">
            <address className="not-italic" data-reveal-group>
              <p data-reveal className="eyebrow !text-cream/50 mb-4">Address</p>
              {BUSINESS.addressLines.map((l) => (
                <p key={l} data-reveal className="display-md">{l}</p>
              ))}
              {!BUSINESS.addressConfirmed && (
                <p data-reveal className="mt-4 max-w-[26rem] text-sm text-cream/55">
                  The online listing shows a different door number; follow the Google Maps pin and confirm with the shop.
                </p>
              )}
            </address>

            <div className="mt-12 grid gap-10 sm:grid-cols-2" data-reveal-group>
              <div>
                <p data-reveal className="eyebrow !text-cream/50 mb-3">Hours</p>
                <p data-reveal className="font-display text-[1.25rem] leading-snug">To be confirmed with the shop — please call before you travel.</p>
              </div>
              <div>
                <p data-reveal className="eyebrow !text-cream/50 mb-3">On Google</p>
                <p data-reveal className="font-display text-[1.25rem] leading-snug">
                  <span className="text-gold">4.9</span> rating
                  <span className="block text-sm text-cream/50">review count changes over time</span>
                </p>
              </div>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4" data-reveal-group>
              <a href={mapsLink()} target="_blank" rel="noopener noreferrer" data-reveal className="btn btn-solid" onClick={() => lalaAudio?.tick()}>
                Get directions <IconArrow />
              </a>
              <a href={telLink()} data-reveal className="link-sweep text-[0.75rem] tracking-[0.22em] uppercase">Call {BUSINESS.phoneDisplay}</a>
            </div>

            <ul className="mt-14" data-reveal-group aria-label="Contact and listings">
              {rows.map((r) => (
                <li key={r.label} data-reveal className="border-t border-cream/15 last:border-b">
                  <a
                    href={r.href}
                    target={r.external ? "_blank" : undefined}
                    rel={r.external ? "noopener noreferrer" : undefined}
                    className="group flex items-baseline justify-between gap-6 py-4"
                    onClick={() => lalaAudio?.tick()}
                  >
                    <span className="text-[0.6875rem] tracking-[0.22em] uppercase text-cream/50">{r.label}</span>
                    <span className="flex flex-1 items-baseline justify-end gap-4 font-display text-[1.15rem] md:text-[1.35rem]">
                      {r.value}
                      <IconArrow className="w-4 h-4 translate-y-0.5 opacity-50 transition-transform duration-500 [transition-timing-function:var(--ease-expo)] group-hover:translate-x-1 group-hover:opacity-100" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-5 md:col-start-8">
            <div className="relative aspect-[4/5] overflow-hidden mask-reveal">
              <iframe
                title="Map — La La Paal Nilayam, Triplicane"
                src={MAP_EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="map-tint absolute inset-0 h-full w-full border-0"
                allowFullScreen
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/30" aria-hidden="true" />
            </div>
            <p className="mt-3 text-[0.625rem] tracking-[0.18em] uppercase text-cream/45">Map · Google</p>

            <div className="relative mt-10 overflow-hidden" data-reveal>
              <div className="relative aspect-[3/2]">
                <Image src="/assets/textures/red-velvet-drape.webp" alt="" fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover opacity-70" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <p className="eyebrow mb-2">Storefront</p>
                  <p className="font-display italic text-[1.35rem] leading-tight text-cream/90">Photograph of the shop to come from LALA.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
