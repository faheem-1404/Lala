import { simplex3 } from "./noise";

/** Milk droplets / gold dust: soft sprites with burst + drift, driven by scroll. */
export const particleVertex = /* glsl */ `
uniform float uTime;
uniform float uBurst;    // 0 = resting cloud, 1 = fully burst outward
uniform float uSize;
uniform float uPixelRatio;
attribute vec3 aDir;     // burst direction
attribute float aSeed;
attribute float aScale;
varying float vAlpha;
varying float vSeed;
${simplex3}
void main() {
  vSeed = aSeed;
  vec3 pos = position;
  // gentle drift
  float t = uTime * 0.25 + aSeed * 10.0;
  pos += vec3(snoise(vec3(aSeed, t, 0.0)), snoise(vec3(t, aSeed, 1.0)), snoise(vec3(0.0, aSeed, t))) * 0.12;
  // burst
  float b = uBurst * (0.6 + aSeed * 0.8);
  pos += aDir * b * 4.5;
  pos.y -= b * b * 0.6; // slight gravity sag
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  float size = uSize * aScale * (1.0 + uBurst * 0.6);
  gl_PointSize = size * uPixelRatio * (12.0 / -mv.z);
  vAlpha = smoothstep(0.0, 0.15, aSeed) * (1.0 - smoothstep(0.85, 1.0, uBurst * aSeed));
  gl_Position = projectionMatrix * mv;
}
`;

export const particleFragment = /* glsl */ `
precision highp float;
uniform vec3 uColor;
uniform float uOpacity;
varying float vAlpha;
varying float vSeed;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c);
  float disc = 1.0 - smoothstep(0.32, 0.5, d);
  float core = 1.0 - smoothstep(0.0, 0.22, d);
  // tiny highlight offset to read as a droplet
  float hl = 1.0 - smoothstep(0.0, 0.12, length(c + vec2(0.12, -0.12)));
  vec3 col = uColor * (0.75 + 0.25 * core) + vec3(1.0) * hl * 0.5;
  float a = disc * uOpacity * vAlpha;
  if (a < 0.01) discard;
  gl_FragColor = vec4(col, a);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;
