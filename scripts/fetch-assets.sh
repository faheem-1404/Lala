#!/usr/bin/env bash
# LALA — The Milkverse: asset acquisition script.
# Downloads licence-checked photographs (Pexels License: free for commercial use, no attribution required;
# one Wikimedia Commons image under CC BY-SA 4.0, credited in ASSET_MANIFEST.md) into public/assets/raw/.
# Run:  npm run assets:fetch   (needs network; then  npm run assets:optimize  to produce WebP variants)
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
RAW="$ROOT/public/assets/raw"
mkdir -p "$RAW"
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"

fetch() { # fetch <url> <relative-dest>
  local url="$1" dest="$RAW/$2"
  mkdir -p "$(dirname "$dest")"
  if [ -s "$dest" ]; then echo "skip  $2"; return; fi
  echo "fetch $2"
  curl -sS -L --fail --retry 3 -m 120 -A "$UA" "$url" -o "$dest" || echo "FAILED $2"
}
px() { # px <pexels-id> <relative-dest> <width>
  fetch "https://images.pexels.com/photos/$1/pexels-photo-$1.jpeg?auto=compress&cs=tinysrgb&w=$3" "$2"
}

# ---- hero / milk ----
px 35386596 hero/milk-splash-glass-black.jpg 2400
px 36007880 hero/milk-splash-black-2.jpg 2400
px 7452482  hero/milk-splash-dark.jpg 2400
px 6497904  textures/milk-splash-deep-red.jpg 2400
px 15082977 hero/saffron-milk-glasses.jpg 2400
# ---- beverages ----
px 15082977 beverages/masala-paal.jpg 1600
px 38260645 beverages/badam-milk.jpg 1600
px 4187716  beverages/almond-milk-glass.jpg 1600
px 4475024  beverages/kova-paal.jpg 1600
px 35680954 beverages/rose-milk.jpg 1600
px 35119724 beverages/rose-milk-cafe.jpg 1600
px 2198626  beverages/milk-glass-black.jpg 1600
px 31754107 beverages/milk-glass-cherry-black.jpg 1600
# ---- falooda ----
px 18646641 falooda/royal-falooda.jpg 1600
px 2835351  falooda/falooda-glass.jpg 1600
px 18646648 falooda/fruit-falooda.jpg 1600
px 36576778 falooda/kulfi-falooda.jpg 1600
px 5695591  falooda/fruit-dessert-glass-dark.jpg 1600
px 18646637 falooda/falooda-top-view.jpg 1600
# ---- sweets ----
px 9198596  sweets/gulab-jamun.jpg 1600
px 40000005 sweets/laddu.jpg 1600
px 9672994  sweets/badusha.jpg 1600
px 35532835 sweets/carrot-halwa.jpg 1600
px 38883078 sweets/kalakand.jpg 1600
px 18488313 sweets/milk-cake.jpg 1600
px 11484120 sweets/assorted-sweets.jpg 1600
px 38524183 sweets/sweets-display.jpg 1600
px 37219215 sweets/sweets-candlelight.jpg 1600
px 18488307 sweets/sweets-red-backdrop.jpg 1600
px 13040266 sweets/milk-dessert-rose.jpg 1600
px 8788869  sweets/rasgulla.jpg 1600
px 7182054  sweets/besan-barfi.jpg 1600
fetch "https://upload.wikimedia.org/wikipedia/commons/a/a9/Special_Mysore_Pak.jpg" sweets/mysore-pak.jpg
# ---- buns ----
px 166653   buns/glazed-buns.jpg 1600
px 20200307 buns/sesame-buns.jpg 1600
px 16111975 buns/bun-closeup.jpg 1600
px 12904147 buns/bread-rolls-basket.jpg 1600
# ---- snacks ----
px 30641912 snacks/pani-puri.jpg 1600
px 40000051 snacks/pani-puri-clay.jpg 1600
px 13063312 snacks/pani-puri-closeup.jpg 1600
px 32894826 snacks/dahi-puri.jpg 1600
px 35213277 snacks/bhel-puri.jpg 1600
px 36195516 snacks/bhel-puri-newspaper.jpg 1600
px 36170557 snacks/samosa.jpg 1600
px 5410400  snacks/pav-bhaji.jpg 1600
px 7625089  snacks/pav-bhaji-tray.jpg 1600
px 34507155 snacks/pav-bhaji-platter.jpg 1600
# ---- cafe ----
px 36292352 cafe/french-fries.jpg 1600
px 5836999  cafe/fries-bowl.jpg 1600
px 38660122 cafe/burger.jpg 1600
px 17121731 cafe/chicken-burger.jpg 1600
px 7230625  cafe/chicken-wings.jpg 1600
px 27562875 cafe/chicken-wings-sauce.jpg 1600
px 31109619 cafe/maggi-noodles.jpg 1600
px 34692573 cafe/cheese-balls.jpg 1600
px 18142621 cafe/chocolate-milkshake.jpg 1600
px 39948188 cafe/oreo-milkshake.jpg 1600
px 28525198 cafe/vanilla-milkshake.jpg 1600
px 29200682 cafe/chocolate-milkshake-tall.jpg 1600
px 6463660  cafe/milkshakes-assorted.jpg 1600
# ---- ingredients ----
px 33654800 ingredients/saffron.jpg 1600
px 10487658 ingredients/saffron-spoon.jpg 1600
px 32268320 ingredients/pistachios.jpg 1600
px 19746115 ingredients/pistachios-bowl.jpg 1600
px 8652963  ingredients/almonds-black.jpg 1600
px 33803616 ingredients/almonds-moody.jpg 1600
px 37568646 ingredients/cardamom-dark.jpg 1600
px 6086300  ingredients/cardamom-green.jpg 1600
# ---- textures ----
px 6843276  textures/red-velvet.jpg 2400
px 36305726 textures/red-velvet-drape.jpg 2400
px 6843282  textures/red-velvet-2.jpg 2400
# ---- atmosphere (Chennai context; never presented as the LALA shop) ----
px 6667282  atmosphere/chennai-temple-street.jpg 2400
px 26975430 atmosphere/chennai-sunset-road.jpg 2400
px 35282842 atmosphere/kapaleeshwarar-gopuram.jpg 2400
px 27128244 atmosphere/chennai-street.jpg 2400
px 5864767  atmosphere/sweet-counter-representative.jpg 1600
px 30251968 atmosphere/sweet-shop-representative.jpg 1600
echo "done. files:"; find "$RAW" -type f | wc -l
