"use client";

import { useEffect, useState } from "react";
import { BUSINESS } from "@/data/business";
import { whatsappLink, telLink } from "@/utils/links";
import { scrollToId } from "@/components/providers/ScrollProvider";
import { Wordmark } from "@/components/ui/Wordmark";
import { SoundToggle } from "@/components/ui/SoundToggle";
import { IconWhatsApp, IconPhone } from "@/components/ui/Icons";
import { lalaAudio } from "@/utils/audio";

const LINKS = [
  { id: "story", label: "Experience" },
  { id: "menu", label: "Menu" },
  { id: "visit", label: "Visit" },
];

/** Fixed navigation. Transparent over the dark story; flips to a cream bar when the menu is under it. */
export function Nav() {
  const [open, setOpen] = useState(false);
  const [light, setLight] = useState(false);

  // The bar flips to cream whenever a light-toned section sits under it.
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-nav-tone]"));
    if (!sections.length) return;
    const under = new Set<HTMLElement>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? under.add(e.target as HTMLElement) : under.delete(e.target as HTMLElement)));
        setLight(Array.from(under).some((el) => el.dataset.navTone === "light"));
      },
      { rootMargin: "-36px 0px -95% 0px", threshold: 0 },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    lalaAudio?.tick();
    scrollToId(id);
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-[70] transition-colors duration-500 ${light ? "text-burgundy-deep" : "text-cream"}`}
        style={{ height: "var(--nav-h)" }}
      >
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${light ? "opacity-100" : "opacity-0"}`}
          style={{ background: "linear-gradient(to bottom, rgba(251,243,232,0.92), rgba(251,243,232,0.75))", backdropFilter: "blur(10px)" }}
          aria-hidden="true"
        />
        <div className={`absolute inset-0 transition-opacity duration-500 ${light ? "opacity-0" : "opacity-100"}`} style={{ background: "linear-gradient(to bottom, rgba(42,6,13,0.65), rgba(42,6,13,0))" }} aria-hidden="true" />
        <nav className="relative mx-auto flex h-full max-w-[1440px] items-center justify-between px-6 md:px-10" aria-label="Primary">
          <a href="#top" onClick={(e) => { e.preventDefault(); go("top"); }} className="link-sweep">
            <Wordmark />
          </a>
          <ul className="hidden lg:flex items-center gap-10">
            {LINKS.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} onClick={(e) => { e.preventDefault(); go(l.id); }} className="link-sweep text-[0.75rem] tracking-[0.22em] uppercase">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="hidden lg:flex items-center gap-7">
            <SoundToggle light={light} />
            <a href={telLink()} className="link-sweep inline-flex items-center gap-2 text-[0.75rem] tracking-[0.22em] uppercase" aria-label={`Call ${BUSINESS.phoneDisplay}`}>
              <IconPhone /> Call
            </a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={`btn !py-2.5 !px-4 ${light ? "btn-light" : ""}`}>
              <IconWhatsApp /> Order
            </a>
          </div>
          <button
            type="button"
            className="lg:hidden inline-flex flex-col justify-center gap-1.5 w-10 h-10 -mr-2"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <span className={`block h-px w-6 bg-current transition-transform duration-300 origin-center ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`block h-px w-6 bg-current transition-transform duration-300 origin-center ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </button>
        </nav>
      </header>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[65] lg:hidden bg-burgundy-deep text-cream transition-opacity duration-400 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div className="flex h-full flex-col justify-between px-6 pt-28 pb-10">
          <ul className="space-y-6">
            {LINKS.map((l, i) => (
              <li key={l.id} style={{ transitionDelay: `${i * 60}ms` }} className={`transition-all duration-500 ${open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
                <a href={`#${l.id}`} onClick={(e) => { e.preventDefault(); go(l.id); }} className="display-md block">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="space-y-5">
            <div className="rule-gold" />
            <div className="flex flex-wrap gap-3">
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-solid"><IconWhatsApp /> WhatsApp</a>
              <a href={telLink()} className="btn"><IconPhone /> Call</a>
            </div>
            <div className="flex items-center justify-between text-cream/60 text-xs tracking-[0.2em] uppercase">
              <span>{BUSINESS.locality}, {BUSINESS.city}</span>
              <SoundToggle />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
