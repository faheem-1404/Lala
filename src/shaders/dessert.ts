import { simplex3, lightingHelpers } from "./noise";

/** Layered dessert liquid (falooda / rose milk / badam / shake): height-based colour bands + noise. */
export const dessertVertex = /* glsl */ `
varying vec3 vWorldPos;
varying vec3 vNormalW;
varying vec3 vLocal;
void main() {
  vLocal = position;
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWorldPos = wp.xyz;
  vNormalW = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * viewMatrix * wp;
}
`;

export const dessertFragment = /* glsl */ `
precision highp float;
uniform float uTime;
uniform vec3 uLayer0;  // bottom
uniform vec3 uLayer1;  // middle
uniform vec3 uLayer2;  // top
uniform float uSplit0; // y where layer0 → layer1
uniform float uSplit1; // y where layer1 → layer2
uniform float uHeight; // total liquid height
uniform float uBottom; // local y of the liquid bottom
uniform float uNoise;  // marbling amount
uniform float uVermicelli; // 0/1 stringy pattern
uniform vec3 uKeyDir;
uniform float uOpacity;
varying vec3 vWorldPos;
varying vec3 vNormalW;
varying vec3 vLocal;
${simplex3}
${lightingHelpers}
void main() {
  float y = (vLocal.y - uBottom) / uHeight;
  float n = snoise(vec3(vLocal.xz * 3.0, vLocal.y * 2.0 + uTime * 0.15)) * uNoise;
  float s0 = smoothstep(uSplit0 - 0.08, uSplit0 + 0.08, y + n * 0.12);
  float s1 = smoothstep(uSplit1 - 0.06, uSplit1 + 0.06, y + n * 0.1);
  vec3 col = mix(uLayer0, uLayer1, s0);
  col = mix(col, uLayer2, s1);
  // vermicelli strands in the middle band
  float strands = smoothstep(0.6, 0.9, snoise(vec3(vLocal.x * 30.0, vLocal.y * 4.0, vLocal.z * 30.0)));
  col = mix(col, vec3(0.98, 0.94, 0.88), strands * uVermicelli * s0 * (1.0 - s1) * 0.6);
  vec3 nrm = normalize(vNormalW);
  vec3 v = normalize(cameraPosition - vWorldPos);
  vec3 l = normalize(uKeyDir);
  float ndl = max(dot(nrm, l), 0.0) * 0.55 + 0.45;
  col *= ndl;
  col += vec3(1.0, 0.96, 0.9) * specular(nrm, v, l, 60.0) * 0.35;
  col += col * fresnel(nrm, v, 3.0) * 0.35;
  gl_FragColor = vec4(col, uOpacity);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;
