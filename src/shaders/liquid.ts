import { simplex3, lightingHelpers } from "./noise";

/** Liquid top surface: animated noise displacement, saffron/cream colour mixing, fresnel gloss. */
export const liquidSurfaceVertex = /* glsl */ `
uniform float uTime;
uniform float uAgitation;
varying vec3 vWorldPos;
varying vec3 vNormalW;
varying vec2 vUv;
varying float vHeight;
${simplex3}
void main() {
  vUv = uv;
  vec3 pos = position;
  float r = length(pos.xy);
  float edge = smoothstep(1.0, 0.75, r); // calm near the glass wall
  float n = snoise(vec3(pos.xy * 3.0, uTime * 0.6)) * 0.55 + snoise(vec3(pos.xy * 7.0, uTime * 1.1)) * 0.2;
  float h = n * (0.012 + uAgitation * 0.05) * edge;
  pos.z += h;
  vHeight = h;
  // derive normal from finite differences
  float e = 0.02;
  float nx = snoise(vec3((pos.xy + vec2(e, 0.0)) * 3.0, uTime * 0.6)) * 0.55;
  float ny = snoise(vec3((pos.xy + vec2(0.0, e)) * 3.0, uTime * 0.6)) * 0.55;
  vec3 nrm = normalize(vec3(-(nx - n) * (0.012 + uAgitation * 0.05) * 30.0, -(ny - n) * (0.012 + uAgitation * 0.05) * 30.0, 1.0));
  vec4 wp = modelMatrix * vec4(pos, 1.0);
  vWorldPos = wp.xyz;
  vNormalW = normalize(mat3(modelMatrix) * nrm);
  gl_Position = projectionMatrix * viewMatrix * wp;
}
`;

export const liquidSurfaceFragment = /* glsl */ `
precision highp float;
uniform float uTime;
uniform vec3 uColorA;   // saffron gold
uniform vec3 uColorB;   // cream
uniform vec3 uColorC;   // deep amber
uniform vec3 uKeyDir;
uniform float uOpacity;
varying vec3 vWorldPos;
varying vec3 vNormalW;
varying vec2 vUv;
varying float vHeight;
${simplex3}
${lightingHelpers}
void main() {
  vec3 n = normalize(vNormalW);
  vec3 v = normalize(cameraPosition - vWorldPos);
  vec3 l = normalize(uKeyDir);
  // saffron swirls
  float swirl = fbm(vec3(vUv * 4.0, uTime * 0.12));
  float strands = smoothstep(0.55, 0.8, snoise(vec3(vUv * 18.0, uTime * 0.05)));
  vec3 col = mix(uColorA, uColorB, swirl * 0.5 + 0.5);
  col = mix(col, uColorC, strands * 0.35);
  float ndl = max(dot(n, l), 0.0) * 0.6 + 0.4;
  col *= ndl;
  float spec = specular(n, v, l, 120.0);
  float rim = fresnel(n, v, 3.0);
  col += vec3(1.0, 0.95, 0.85) * spec * 0.9;
  col += uColorB * rim * 0.25;
  // rim meniscus darkening
  float r = length(vUv - 0.5) * 2.0;
  col *= 1.0 - smoothstep(0.86, 1.0, r) * 0.35;
  gl_FragColor = vec4(col, uOpacity);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;
