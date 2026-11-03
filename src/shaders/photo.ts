import { simplex3 } from "./noise";

/**
 * Photo plane: rounded-rect mask, warm grade, vignette, moving sheen highlight, fade.
 * Used for the Sweet Universe and Food Experience galleries.
 */
export const photoVertex = /* glsl */ `
varying vec2 vUv;
varying vec3 vWorldPos;
void main() {
  vUv = uv;
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWorldPos = wp.xyz;
  gl_Position = projectionMatrix * viewMatrix * wp;
}
`;

export const photoFragment = /* glsl */ `
precision highp float;
uniform sampler2D uMap;
uniform float uOpacity;
uniform float uRadius;    // corner radius in uv units
uniform float uAspect;    // width / height of the plane
uniform float uTime;
uniform float uReveal;    // 0..1 wipe-in
uniform vec3 uTint;
varying vec2 vUv;
varying vec3 vWorldPos;
${simplex3}
float roundedBox(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}
void main() {
  vec2 p = (vUv - 0.5) * vec2(uAspect, 1.0);
  float d = roundedBox(p, vec2(uAspect * 0.5, 0.5), uRadius);
  float mask = 1.0 - smoothstep(-0.004, 0.004, d);
  // reveal wipe rising from the bottom with a soft noisy edge (uReveal 0 → hidden, 1 → fully shown)
  float edge = vUv.y + snoise(vec3(vUv * 6.0, uTime * 0.1)) * 0.06;
  float lift = uReveal * 1.25;
  float reveal = 1.0 - smoothstep(lift - 0.16, lift + 0.02, edge);
  vec4 tex = texture2D(uMap, vUv);
  // sRGB → linear (texture uploaded raw)
  vec3 s = tex.rgb;
  vec3 col = mix(pow((s + 0.055) / 1.055, vec3(2.4)), s / 12.92, step(s, vec3(0.04045)));
  // warm grade
  col = mix(col, col * uTint, 0.1);
  // vignette
  float vig = 1.0 - smoothstep(0.55, 1.15, length((vUv - 0.5) * vec2(1.0, 1.0)) * 1.6);
  col *= 0.82 + 0.18 * vig;
  // moving sheen
  float sheen = 1.0 - smoothstep(0.0, 0.35, abs((vUv.x + vUv.y * 0.4) - fract(uTime * 0.05) * 1.8 + 0.2));
  col += vec3(0.95, 0.85, 0.6) * sheen * 0.07;
  // hairline gold border (only within ~1% of the edge)
  float border = smoothstep(-0.014, -0.004, d) * mask;
  col = mix(col, vec3(0.83, 0.69, 0.22), border * 0.55);
  float alpha = mask * uOpacity * reveal;
  if (alpha < 0.005) discard;
  gl_FragColor = vec4(col, alpha);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;
