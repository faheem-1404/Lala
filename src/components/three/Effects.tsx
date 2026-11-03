"use client";

import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";

/** Desktop-only polish: a restrained bloom on the brightest highlights and a soft vignette. */
export function Effects() {
  return (
    <EffectComposer multisampling={0} enableNormalPass={false}>
      <Bloom intensity={0.35} luminanceThreshold={0.9} luminanceSmoothing={0.2} mipmapBlur radius={0.55} />
      <Vignette eskil={false} offset={0.22} darkness={0.75} />
    </EffectComposer>
  );
}
