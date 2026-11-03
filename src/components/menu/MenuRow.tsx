import { formatPrice, type MenuItem } from "@/data/menu";

/** A typeset menu line: diet mark · name + note · price at the far edge. No box. */
export function MenuRow({ item, index }: { item: MenuItem; index?: number }) {
  return (
    <li className="menu-row" data-reveal>
      <span className="pt-1">
        {item.diet !== "unknown" && (
          <span className={`diet-mark ${item.diet === "non-veg" ? "non-veg" : ""}`} role="img" aria-label={item.diet === "veg" ? "Vegetarian" : "Non-vegetarian"} />
        )}
      </span>
      <div className="min-w-0">
        <h4 className="font-display text-[1.2rem] leading-tight md:text-[1.35rem]">
          {index !== undefined && <span className="mr-3 font-sans text-[0.625rem] tracking-[0.2em] opacity-40">{String(index + 1).padStart(2, "0")}</span>}
          {item.name}
        </h4>
        {item.description && <p className="mt-1 max-w-[34rem] text-[0.8125rem] leading-snug opacity-60">{item.description}</p>}
      </div>
      <span className={`whitespace-nowrap pl-6 text-right ${item.price === null ? "text-[0.6875rem] tracking-[0.18em] uppercase opacity-50" : "font-display text-[1.1rem]"}`}>
        {formatPrice(item.price)}
      </span>
    </li>
  );
}
