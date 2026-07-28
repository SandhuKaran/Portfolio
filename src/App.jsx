import { useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "./scene/Scene";
import { deviceTier, useCoarsePointer, useMobileFraming, useReducedMotion } from "./lib/env";
import Nav from "./ui/Nav";
import StationRail from "./ui/StationRail";
import Loader from "./ui/Loader";
import Hero from "./ui/Hero";
import Footer from "./ui/Footer";
import {
  About,
  Community,
  Contact,
  Education,
  Experience,
  Projects,
  Skills,
} from "./ui/Sections";

/**
 * Two layers, one page:
 *
 *  · a fixed WebGL canvas that flies a camera between stations in deep space
 *  · a normal scrolling HTML document on top of it
 *
 * Keeping the copy in the DOM is what makes the site responsive, selectable,
 * indexable and readable by screen readers — the 3D is scenery, not content.
 * The overlay is pointer-transparent by default so the scene stays grabbable
 * everywhere except behind the text panels themselves.
 */
export default function App() {
  const mobile = useMobileFraming();
  const reducedMotion = useReducedMotion();
  const coarse = useCoarsePointer();
  const tier = useMemo(deviceTier, []);
  const [cardGrabbed, setCardGrabbed] = useState(false);

  const maxDpr = tier === "low" ? 1.25 : tier === "mid" ? 1.6 : 1.9;

  return (
    <>
      <div className="fixed inset-0 z-0" aria-hidden>
        <Canvas
          dpr={[1, maxDpr]}
          gl={{
            alpha: true,
            antialias: tier !== "low",
            powerPreference: "high-performance",
          }}
          // `far` deliberately sits just past where the scene fog goes opaque
          // (see Scene.jsx). Anything beyond is fully fogged, and on a
          // transparent canvas a fully-fogged object isn't invisible — it's a
          // flat grey silhouette pasted over the page gradient. Clipping it
          // instead removes the smudge and skips the draw call.
          camera={{ position: [0, 0.4, 9.5], fov: 38, near: 0.5, far: 105 }}
          fallback={null}
        >
          <Scene
            mobile={mobile}
            reducedMotion={reducedMotion}
            parallax={!coarse}
            tier={tier}
            onGrabCard={() => setCardGrabbed(true)}
          />
        </Canvas>
      </div>

      <Loader />

      <div className="pointer-events-none relative z-10">
        <Nav />
        <StationRail />
        <main>
          <Hero cardGrabbed={cardGrabbed} />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Community />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
