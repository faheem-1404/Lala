import Image from "next/image";

type Ratio = "portrait" | "landscape" | "square" | "tall" | "wide" | "free";
const RATIO: Record<Ratio, string> = {
  portrait: "aspect-[4/5]",
  tall: "aspect-[3/4]",
  landscape: "aspect-[3/2]",
  wide: "aspect-[16/9]",
  square: "aspect-square",
  free: "",
};

/**
 * Editorial photograph: masked wipe-in, optional parallax, no frame, no radius.
 * `representative` adds a quiet caption so stock imagery is never mistaken for LALA's own.
 */
export function Photo({
  src,
  alt,
  ratio = "portrait",
  parallax = 0.15,
  reveal = "y",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  className = "",
  position = "center",
  caption,
}: {
  src: string;
  alt: string;
  ratio?: Ratio;
  parallax?: number;
  reveal?: "y" | "x" | "none";
  sizes?: string;
  priority?: boolean;
  className?: string;
  position?: string;
  caption?: string;
}) {
  const mask = reveal === "y" ? "mask-reveal" : reveal === "x" ? "mask-reveal-x" : "";
  return (
    <figure className={`relative ${className}`}>
      <div className={`relative overflow-hidden ${RATIO[ratio]} ${mask}`}>
        <div className="absolute inset-[-10%]" data-parallax={parallax || undefined}>
          <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" style={{ objectPosition: position }} />
        </div>
      </div>
      {caption && <figcaption className="mt-2 text-[0.625rem] tracking-[0.18em] uppercase opacity-50">{caption}</figcaption>}
    </figure>
  );
}
