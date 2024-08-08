import React, { useEffect, useRef } from "react";
import { Text } from "@react-three/drei";
import { TweenMax } from "gsap";

export default function Projects() {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      TweenMax.to(ref.current.material, 4, { opacity: 1 });
    }
  }, []);

  return (
    <Text
      ref={ref}
      position={[0, -20, -10]}
      fontSize={2}
      color="white"
      material-transparent
      material-opacity={0}
      anchorX="center"
      anchorY="middle"
    >
      Projects
    </Text>
  );
}
