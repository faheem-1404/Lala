import { BUSINESS } from "@/data/business";
import { instagramLink, swiggyLink, mapsLink, telLink, whatsappLink, justdialLink } from "@/utils/links";
import { Wordmark } from "@/components/ui/Wordmark";

export function Footer() {
  const year = new Date().getFullYear();
  const cols = [
    { title: "Site", links: [["Experience", "#story"], ["Menu", "#menu"], ["Visit", "#visit"]] },
    {
      title: "Order & contact",
      links: [
        [`WhatsApp ${BUSINESS.phoneDisplay}`, whatsappLink()],
        [`Call ${BUSINESS.phoneDisplay}`, telLink()],
        ["Order on Swiggy", swiggyLink()],
        ["Directions", mapsLink()],
        [`Instagram @${BUSINESS.instagramHandle}`, instagramLink()],
        ["Justdial", justdialLink()],
      ],
    },
  ];
  return (
    <footer data-nav-tone="dark" className="relative z-10 tone-cocoa" aria-label="Footer">
      <div className="mx-auto max-w-[1440px] px-6 pb-10 pt-16 md:px-10 md:pt-20">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <Wordmark />
            <p className="mt-5 text-sm leading-relaxed text-cream/55">{BUSINESS.positioning} {BUSINESS.addressLines.join(", ")}.</p>
          </div>
          <div className="flex flex-col gap-10 sm:flex-row sm:gap-20">
            {cols.map((c) => (
              <nav key={c.title} aria-label={c.title}>
                <p className="eyebrow !text-cream/45 mb-4">{c.title}</p>
                <ul className="space-y-2 text-sm">
                  {c.links.map(([label, href]) => (
                    <li key={label}>
                      <a href={href} className="link-sweep" {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
        <div className="ink-rule mt-14" />
        <div className="flex flex-col gap-3 pt-6 text-[0.625rem] tracking-[0.14em] uppercase text-cream/40 md:flex-row md:items-start md:justify-between">
          <span>© {year} {BUSINESS.name}, {BUSINESS.locality}, {BUSINESS.city}.</span>
          <span className="max-w-xl md:text-right">
            Photography is representative (Pexels contributors; Mysore pak by Vis M, CC BY-SA 4.0) until LALA&apos;s own is added. Hero artwork is concept art. Menu names as listed on Swiggy; prices on request.
          </span>
        </div>
      </div>
    </footer>
  );
}
