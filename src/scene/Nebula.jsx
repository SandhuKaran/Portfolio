import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec2  vUv;
  varying float vDepth;
  void main() {
    vUv = uv;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vDepth = -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3  uColor;
  uniform float uTime;
  uniform float uSeed;
  uniform float uOpacity;
  varying vec2  vUv;
  varying float vDepth;

  // Cheap layered value noise — plenty for a soft gas cloud, and it keeps the
  // whole effect to a handful of instructions on mobile GPUs.
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x),
               mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
  }

  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.02; a *= 0.5; }
    return v;
  }

  void main() {
    vec2 uv = vUv - 0.5;
    float radial = smoothstep(0.5, 0.05, length(uv));
    float drift = uTime * 0.012;
    float cloud = fbm(uv * 3.2 + vec2(uSeed, uSeed * 0.7) + drift);
    cloud = smoothstep(0.25, 0.95, cloud);

    // These planes are far wider than the camera's far plane, so they'd be
    // sliced by it mid-cloud. Fading them out first hides the cut.
    float horizon = 1.0 - smoothstep(55.0, 95.0, vDepth);

    gl_FragColor = vec4(uColor, radial * cloud * uOpacity * horizon);
  }
`;

function Cloud({ color, seed, opacity = 0.5, ...props }) {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uColor: { value: new THREE.Color(color) },
          uTime: { value: 0 },
          uSeed: { value: seed },
          uOpacity: { value: opacity },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [color, seed, opacity]
  );

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <mesh material={material} {...props}>
      <planeGeometry args={[1, 1]} />
    </mesh>
  );
}

/** Distant gas clouds spaced down the corridor, giving depth to the flight. */
export default function Nebula() {
  return (
    <group>
      <Cloud color="#5b2ea8" seed={1.3} opacity={0.42} position={[26, 10, -50]} scale={95} />
      <Cloud color="#d2469a" seed={4.1} opacity={0.3} position={[-34, -8, -120]} scale={110} />
      <Cloud color="#1e5fb4" seed={7.7} opacity={0.36} position={[30, -14, -190]} scale={120} />
      <Cloud color="#7a3ad6" seed={2.9} opacity={0.34} position={[-28, 16, -262]} scale={105} />
      <Cloud color="#0f7fa8" seed={9.2} opacity={0.28} position={[10, 6, -350]} scale={130} />
    </group>
  );
}
