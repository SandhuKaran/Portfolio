// WelcomeText.js
import React, { useRef, useEffect } from "react";
import { Text, MeshReflectorMaterial } from "@react-three/drei";
import { gsap } from "gsap";
import { degToRad } from "three/src/math/MathUtils.js";

export default function WelcomeText() {
  const refs = useRef([]);

  useEffect(() => {
    // Animate each line with a delay
    refs.current.forEach((ref, index) => {
      if (ref) {
        gsap.to(ref.material, {
          opacity: 1,
          duration: 1,
          delay: 0.8 + index * 0.8,
        });
      }
    });
  }, []);

  const texts = ["BEYOND", "LIMITS"];

  return (
    <group position={[-10.4, 2, -15]}>
      {texts.map((text, index) => (
        <Text
          key={index}
          ref={(el) => (refs.current[index] = el)}
          position={[0, -index * 1.9, 0]}
          fontSize={2.4}
          font={"Raleway/static/Raleway-ExtraBold.ttf"}
          color="white"
          material-transparent
          material-opacity={0} // Initial opacity
          anchorX="left"
          anchorY="middle"
        >
          {text}
        </Text>
      ))}
      <mesh position={(0, 0, 5)}>
        <planeGeometry args={[100, 200]} />
        <MeshReflectorMaterial
          blur={[50, 50]}
          resolution={512}
          mixBlur={1}
          mixStrength={15}
          roughness={1}
          depthScale={1}
          opacity={0.3}
          transparent
          minDepthThreshold={0.3}
          maxDepthThreshold={0.5}
          color="#333"
          metalness={1}
        />
      </mesh>
    </group>
  );
}
