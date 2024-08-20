import React, { useEffect, useRef } from "react";
import { OrbitControls, Text } from "@react-three/drei";
import { TweenMax } from "gsap";
import { Github } from "./Github";
import { Linkedin } from "./Linkedin";

export default function Contact() {
  const ref = useRef();
  const refs = useRef([]);

  useEffect(() => {
    if (ref.current) {
      TweenMax.to(ref.current.material, 4, { opacity: 1 });
    }

    refs.current.forEach((item, index) => {
      if (item) {
        TweenMax.to(item.position, 4, { x: 0, opacity: 1, delay: index * 0.5 });
      }
    });
  }, []);

  return (
    <>
      <Text
        ref={ref}
        position={[0, -70, -15]} // Adjust the position as needed
        fontSize={1.6}
        font={"Raleway/static/Raleway-ExtraBold.ttf"}
        color="white"
        material-transparent
        material-opacity={0}
        anchorX="center"
        anchorY="middle"
      >
        THANK YOU FOR VISITING!
      </Text>

      <Github position={[2, -75, 0]} />
      <Linkedin position={[-2, -75, 0]} />
    </>
  );
}
