import React, { useEffect, useRef } from "react";
import { Text } from "@react-three/drei";
import { TweenMax } from "gsap";

export default function Skills() {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      TweenMax.to(ref.current.material, 4, { opacity: 1 });
    }
  }, []);

  return (
    <Text
      ref={ref}
      position={[0, -54, -10]}
      fontSize={2}
      color="white"
      material-transparent
      material-opacity={0}
      anchorX="center"
      anchorY="middle"
    >
      Skills
    </Text>
  );
}
