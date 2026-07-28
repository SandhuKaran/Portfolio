import { lazy, Suspense, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, Lightformer, useGLTF } from "@react-three/drei";
import { stations } from "../data/stations";
import CameraRig from "./CameraRig";
import Starfield from "./Starfield";
import Nebula from "./Nebula";
import Landmark from "./Landmark";
import StaticLanyard from "./StaticLanyard";

// Rapier compiles to ~1 MB gzipped of inlined wasm. It's the single heaviest
// thing on the page, so it streams in behind a static badge instead of holding
// up first paint — and devices flagged low-end never fetch it at all.
const PhysicsLanyard = lazy(() => import("./PhysicsLanyard"));

/**
 * How each station's landmark is dressed. `size` is the model's largest
 * dimension in world units (Landmark normalises whatever the GLB ships with),
 * and `offset` pushes it back from the station anchor — that's how the two
 * planets end up reading as distant worlds rather than desk ornaments.
 */
const LANDMARKS = {
  earth: { url: "/models/Earth.glb", size: 11, offset: [2, 0, -12], spin: 0.1, bob: 0 },
  suitcase: { url: "/models/Simple-suitcase.glb", size: 4.4, spin: 0.22, tilt: [0.1, 0, 0.05] },
  telescope: { url: "/models/Telescope.glb", size: 5.2, spin: 0.18, tilt: [0.08, 0, -0.06] },
  // The iMac is a flat panel — spinning it shows the blank back half the time.
  monitor: { url: "/models/Monitor.glb", size: 4.4, sway: 0.6, tilt: [0.05, 0, 0.04] },
  houseplant: { url: "/models/Houseplant.glb", size: 4.4, spin: 0.16, tilt: [0.04, 0, -0.04] },
  planet: { url: "/models/Planet.glb", size: 16, offset: [-2, -2, -16], spin: 0.05, bob: 0 },
};

Object.values(LANDMARKS).forEach((l) => useGLTF.preload(l.url));
useGLTF.preload("/models/Astronaut.glb");
useGLTF.preload("/models/Github.glb");
useGLTF.preload("/models/Linkedin.glb");

const add = (a, b = [0, 0, 0]) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];

function LinkModel({ url, href, size, strip, ...props }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef();

  useFrame((_, delta) => {
    if (!ref.current) return;
    const target = hovered ? 1.15 : 1;
    ref.current.scale.lerp({ x: target, y: target, z: target }, Math.min(delta * 8, 1));
  });

  return (
    <group
      ref={ref}
      onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        window.open(href, "_blank", "noopener,noreferrer");
      }}
      {...props}
    >
      {/* These are one-sided icons — a full spin would show their blank backs,
          so they swing to catch the light instead. */}
      <Landmark url={url} size={size} sway={0.5} bob={0.1} strip={strip} />
    </group>
  );
}

/** Contact station: the two social badges, clickable in 3D. */
function ContactLinks({ anchor, mobile }) {
  const gap = mobile ? 1.4 : 1.9;
  const size = mobile ? 2 : 2.3;
  return (
    <group position={anchor}>
      <LinkModel
        url="/models/Github.glb"
        href="https://github.com/sandhukaran"
        size={size}
        strip={["Curve011"]}
        position={[-gap, 0, 0]}
      />
      <LinkModel
        url="/models/Linkedin.glb"
        href="https://www.linkedin.com/in/sandhukaran"
        size={size}
        position={[gap, 0, 0]}
      />
    </group>
  );
}

export default function Scene({ mobile, reducedMotion, parallax, tier, onGrabCard }) {
  const heroAnchor = mobile ? [0.15, 4.8, 0] : [3, 4.2, 0];
  const usePhysics = !reducedMotion && tier !== "low";
  const starCount = tier === "low" ? 1400 : tier === "mid" ? 2400 : 3400;

  return (
    <>
      <CameraRig mobile={mobile} reducedMotion={reducedMotion} parallax={parallax} />

      {/* Without this every station is visible down the corridor at once and the
          journey reads as one long room. The haze hides anything more than a
          stop ahead, so arriving somewhere actually feels like arriving. The
          starfield and nebulae use raw shaders, so they stay clear through it. */}
      <fog attach="fog" args={["#070a16", 32, 96]} />

      <ambientLight intensity={1.1} />
      <directionalLight position={[6, 8, 10]} intensity={2.4} />
      <directionalLight position={[-8, -4, -6]} intensity={1.1} color="#7aa2ff" />

      <Suspense fallback={null}>
        {/* Reflections for the card's clearcoat — baked once, never a background. */}
        <Environment resolution={192} frames={1}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>

        <Starfield count={starCount} />
        {tier !== "low" && <Nebula />}

        {usePhysics ? (
          <Suspense fallback={<StaticLanyard anchor={heroAnchor} />}>
            <PhysicsLanyard anchor={heroAnchor} onGrab={onGrabCard} />
          </Suspense>
        ) : (
          <StaticLanyard anchor={heroAnchor} animate={!reducedMotion} />
        )}

        {/* Drifting astronaut between the launch and about stations. */}
        <Landmark
          url="/models/Astronaut.glb"
          size={3.6}
          spin={0.14}
          bob={0.3}
          tilt={[0.4, 0.8, 0.2]}
          position={[-9, 3.4, -27]}
        />

        {stations.map((station) => {
          const config = LANDMARKS[station.landmark];
          if (!config) return null;
          const { url, offset, ...rest } = config;
          return (
            <Landmark key={station.id} url={url} {...rest} position={add(station.anchor, offset)} />
          );
        })}

        <ContactLinks
          anchor={stations.find((s) => s.id === "contact").anchor}
          mobile={mobile}
        />
      </Suspense>
    </>
  );
}
