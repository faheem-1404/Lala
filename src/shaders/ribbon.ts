import { simplex3, lightingHelpers } from "./noise";

/**
 * Milk ribbon material: tube geometry displaced along its length with travelling waves,
 * and an "unwind" parameter that pushes the spiral outward into open arcs (the explosion).
 * Lighting is computed in-shader (warm key + gold rim + cream base) for full control.
 */
export const ribbonVertex = /* glsl */ `
uniform float uTime;
uniform float uUnwind;     // 0 = wrapped spiral, 1 = flung outward
uniform float uAmp;        // wave amplitude
uniform float uFlatten;    // squash tube into ribbon
varying vec3 vNormal;
varying vec3 vWorldPos;
varying vec3 vViewDir;
varying float vAlong;
varying float vThick;
${simplex3}
void main() {
  // uv.x runs along the tube length
  vAlong = uv.x;
  vec3 pos = position;
  vec3 nor = normal;

  // flatten: compress radially along local "up" (approximate using normal.y)
  pos -= nor * (nor.y * nor.y) * uFlatten * 0.12;

  // travelling waves + noise ripple along the length
  float wave = sin(uv.x * 40.0 - uTime * 2.2) * 0.5 + 0.5;
  float n = snoise(vec3(pos.xz * 1.4, uv.x * 6.0 + uTime * 0.35));
  float thick = 0.6 + 0.4 * wave + 0.25 * n;
  vThick = thick;
  pos += nor * (thick - 1.0) * uAmp;

  // explosion: push radially away from the axis, more at the ends, with a swirl
  vec2 radial = normalize(pos.xz + vec2(1e-4));
  float t = uUnwind;
  float lift = (uv.x - 0.5) * 2.0;
  float swirl = t * 1.6;
  float cs = cos(swirl * lift), sn = sin(swirl * lift);
  vec2 rot = mat2(cs, -sn, sn, cs) * pos.xz;
  pos.xz = mix(pos.xz, rot + radial * t * (2.6 + 1.4 * abs(lift)), t);
  pos.y += t * lift * 1.8 + t * n * 0.6;

  vec4 wp = modelMatrix * vec4(pos, 1.0);
  vWorldPos = wp.xyz;
  vNormal = normalize(mat3(modelMatrix) * nor);
  vViewDir = normalize(cameraPosition - wp.xyz);
  gl_Position = projectionMatrix * viewMatrix * wp;
}
`;

export const ribbonFragment = /* glsl */ `
precision highp float;
uniform float uTime;
uniform float uOpacity;
uniform vec3 uColor;      // cream
uniform vec3 uShadow;     // warm shadow tint
uniform vec3 uRim;        // gold rim
uniform vec3 uKeyDir;
varying vec3 vNormal;
varying vec3 vWorldPos;
varying vec3 vViewDir;
varying float vAlong;
varying float vThick;
${simplex3}
${lightingHelpers}
void main() {
  vec3 n = normalize(vNormal);
  vec3 v = normalize(vViewDir);
  vec3 l = normalize(uKeyDir);
  float ndl = dot(n, l) * 0.5 + 0.5;           // half-lambert, soft like milk
  float sss = pow(ndl, 1.4);
  float spec = specular(n, v, l, 90.0) * 0.9 + specular(n, v, l, 14.0) * 0.18;
  float rim = fresnel(n, v, 2.6);
  // gloss breakup so highlights feel liquid, not plastic
  float gloss = 0.7 + 0.3 * snoise(vec3(vWorldPos * 2.5 + uTime * 0.2));
  vec3 base = mix(uShadow, uColor, sss);
  base += uColor * spec * gloss;
  base += uRim * rim * 0.55;
  // subtle translucency on thin parts
  base = mix(base, uColor * 1.05, (1.0 - vThick) * 0.25);
  float alpha = uOpacity * (0.92 + 0.08 * rim);
  gl_FragColor = vec4(base, alpha);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;
