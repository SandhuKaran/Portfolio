import React, { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  OrbitControls,
  ScrollControls,
  Scroll,
} from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { useThree } from "@react-three/fiber";
import { Astronaut } from "./components/Astronaut";

import "./styles.css";
import Band from "./components/Band";
import WelcomeText from "./components/WelcomeText";
import Employment from "./components/Employment";
import Projects from "./components/Projects";
import Volunteering from "./components/Volunteering";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import StarsCanvas from "./components/StarsCanvas";
import { Earth } from "./components/Earth";
import { Planet } from "./components/Planet";

export default function App() {
  return (
    <Canvas camera={{ position: [0, 0, 13], fov: 25 }}>
      {/* <OrbitControls /> */}
      <ScrollControls pages={14} drag={0.1} damping={0.3}>
        <Scroll>
          <ambientLight intensity={Math.PI - 2} />
          <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
            <Band />
          </Physics>
          <Environment background blur={0.75}>
            <color attach="background" args={["black"]} />
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
          <Earth position={[30, -30, -100]} />
          <Planet position={[-30, -50, -100]} />
          <Astronaut position={[-8, -3, -20]} />
          <StarsCanvas />
          <WelcomeText />
          <Employment />
          <Contact />

          <Projects />
          <Volunteering />

          <Skills />
        </Scroll>
      </ScrollControls>
    </Canvas>
  );
}
