"use client";

import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useMemo } from "react";

/**
 * Loads a set of photos as sRGB textures with mipmaps + anisotropy. Suspends while loading.
 * Textures are uploaded raw (NoColorSpace) and decoded in the photo shader, which avoids three.js
 * keeping a stale internal format when colour space changes after the first upload.
 */
export function useSceneTextures(urls: string[]) {
  const textures = useTexture(urls) as THREE.Texture[];
  return useMemo(() => {
    for (const t of textures) {
      if (t.userData.lalaPrepared !== true) {
        t.userData.lalaPrepared = true;
        // Uploaded raw; the photo shader decodes sRGB itself (see shaders/photo.ts).
        t.colorSpace = THREE.NoColorSpace;
        t.generateMipmaps = true;
        t.minFilter = THREE.LinearMipmapLinearFilter;
        t.magFilter = THREE.LinearFilter;
        t.anisotropy = 4;
        t.needsUpdate = true;
      }
    }
    return textures;
  }, [textures]);
}
