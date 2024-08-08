// WelcomeText.js
import React, { useRef, useEffect } from "react";
import { Text } from "@react-three/drei";
import { gsap } from "gsap";

export default function WelcomeText() {
  const refs = useRef([]);

  useEffect(() => {
    // Animate each line with a delay
    refs.current.forEach((ref, index) => {
      if (ref) {
        gsap.to(ref.material, {
          opacity: 1,
          duration: 1,
          delay: index * 0.5,
        });
      }
    });
  }, []);

  const texts = ["WELCOME", "TO", "MY", "PORTFOLIO"];

  return (
    <group position={[-9, 3.8, -10]}>
      {texts.map((text, index) => (
        <Text
          key={index}
          ref={(el) => (refs.current[index] = el)}
          position={[0, -index * 2.3, 0]}
          fontSize={2.3}
          color="white"
          material-transparent
          material-opacity={0} // Initial opacity
          anchorX="left"
          anchorY="middle"
        >
          {text}
        </Text>
      ))}
    </group>
  );
}
