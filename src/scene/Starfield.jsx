import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PALETTE = [
  new THREE.Color("#ffffff"),
  new THREE.Color("#cfe0ff"),
  new THREE.Color("#9fd8ff"),
  new THREE.Color("#f272c8"), // signature pink from the original site
  new THREE.Color("#b79bff"),
];

const vertexShader = /* glsl */ `
  uniform vec3  uCam;
  uniform float uBox;
  uniform float uFade;
  uniform float uTime;
  uniform float uScale;
  attribute float aSize;
  attribute float aPhase;
  attribute vec3  aColor;
  varying float vAlpha;
  varying vec3  vColor;

  void main() {
    // Wrap every star into a box centred on the camera, so the field is
    // effectively infinite no matter how far the flight path travels.
    vec3 rel = mod(position - uCam + uBox * 0.5, uBox) - uBox * 0.5;
    vec4 mv = modelViewMatrix * vec4(uCam + rel, 1.0);

    // Fade to nothing before the camera's far plane so stars dissolve rather
    // than getting sliced off by it.
    float dist = length(rel);
    float fade = smoothstep(uFade, uFade * 0.3, dist);
    float twinkle = 0.65 + 0.35 * sin(uTime * 1.6 + aPhase);

    vAlpha = fade * twinkle;
    vColor = aColor;
    gl_PointSize = aSize * uScale * (240.0 / max(-mv.z, 0.1));
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */ `
  varying float vAlpha;
  varying vec3  vColor;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = dot(c, c);
    if (d > 0.25) discard;
    float falloff = smoothstep(0.25, 0.0, d);
    gl_FragColor = vec4(vColor, falloff * vAlpha);
  }
`;

// The wrap box is sized to the visible range rather than the whole corridor:
// stars outside `FADE` are invisible anyway, so a bigger box would just be
// vertices that never light up.
const FADE = 98;

export default function Starfield({ count = 3200, box = 180 }) {
  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * box;
      positions[i * 3 + 1] = (Math.random() - 0.5) * box;
      positions[i * 3 + 2] = (Math.random() - 0.5) * box;

      // Weight towards white/blue, with a few coloured stars for character.
      const roll = Math.random();
      const c = PALETTE[roll < 0.55 ? 0 : roll < 0.75 ? 1 : roll < 0.88 ? 2 : roll < 0.96 ? 3 : 4];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      sizes[i] = 0.4 + Math.pow(Math.random(), 3) * 2.6;
      phases[i] = Math.random() * Math.PI * 2;
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
    g.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    g.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
    return g;
  }, [count, box]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uCam: { value: new THREE.Vector3() },
          uBox: { value: box },
          uFade: { value: FADE },
          uTime: { value: 0 },
          uScale: { value: 1 },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [box]
  );

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
    material.uniforms.uCam.value.copy(state.camera.position);
    // Keep points a sensible size across DPRs and window heights.
    material.uniforms.uScale.value = Math.min(state.size.height / 900, 1.4);
  });

  // The geometry's bounds describe the unwrapped box, so culling would be wrong.
  return <points geometry={geometry} material={material} frustumCulled={false} />;
}
