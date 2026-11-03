# Menu Data — sources, status and editing guide

**Source of truth:** `src/data/menu.ts`. Every menu composition on the page (category spreads, the "Start here" list, the category navigation) reads from it. Nothing is duplicated in components.

## Inventory status (Nov 2026)
Item names are the ones currently surfaced on LALA's Swiggy listing, as supplied in the redesign brief. The listing is a changing third-party snapshot, not the final menu. **Before publishing, confirm with the shop:** spelling, availability, variants, pack sizes, and every price.

| # | Category | Items in data |
|---|---|---|
| 01 | Hot Drinks | Royal Badam Malai Paal · Hot Kova Pal · Kova Masala Melt Bun · Hot Masala Paal |
| 02 | Bun Varieties | Carrot Bun · Kova Bun · Muska Bun · Beetroot Bun · Bun Butter Jam |
| 03 | Falooda | Ice Cream Falooda · Mini Falooda · Special Royal Falooda · Fruit Falooda |
| 04 | Cold Drinks | Pal Sharbat · Badam Milk · Fruit Mix · Rose Milk |
| 05 | Chaat & Street Food | Pav Bhaji · Murukku Sandwich · Bhel Puri · Pani Puri · Dahi Puri · Khakhra Sandwich · *Extra Pav Bun (draft, hidden)* |
| 06 | Sweets | Rasmalai · Makkan Peda · Gulab Jamun · Assorted Sweets (badusha, milk peda, kova, Mysore pak, malai jamun, Bombay halwa, special laddu — pack sizes to confirm) |
| 07 | Maggi | Veg · Classic · Cheese · Paneer |
| 08 | Milkshakes | Kit Kat · Oreo · Strawberry · Bourbon · Vanilla · Butterscotch · Chocolate (no other flavours invented) |
| 09 | French Fries | Peri Peri · Classic · Cheese |
| 10 | Quick Bites | Cheese Balls · Veg Crunch · Smiley · Onion Rings |
| 11 | Chicken Loaded Fries (non-veg) | Korean · Loaded French Fries · Hot Spicy |

Removed from the earlier draft because they are not on the surfaced listing: Special Masala Paal, Carrot Halwa, Beetroot Halwa, Mysore Pak (as a standalone item), Kalakand, Laddu, Samosa, Burger, Chicken Wings, Mango Milkshake.

## Rules encoded in the data
- `price: null` renders "on request". No price is invented. Set a number in INR once confirmed.
- `diet`: `"veg"` / `"non-veg"` show the standard green / red mark; `"unknown"` shows nothing. Only Chicken Loaded Fries are marked non-veg.
- `status: "draft"` keeps an item in the file but off the page (used for the Extra Pav Bun add-on until the shop decides how to display it). `available: false` hides an item without deleting it.
- `highlight: true` puts an item in the "Start here" spread. These are candidates from the listing, **not** bestseller claims; the copy never says "signature" or "most loved".
- Photographs are attached to categories, never items, and are representative stock until LALA supplies its own. An item without a picture is a typographic entry by design.

## How the owner edits
1. Open `src/data/menu.ts`.
2. Change a name, price (`price: 60`), diet or description on the item line.
3. To reorder categories or change how one is composed, edit `MENU_CATEGORIES` (`layout`: photo-left / photo-right / portrait / duo / typeset; `tone`: burgundy / ivory / cocoa / maroon; `images`).
4. Save. The page, the category navigation and the "Start here" list update together.
