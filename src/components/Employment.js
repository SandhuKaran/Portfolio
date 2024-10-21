// Employment.js
import React, { useEffect, useRef } from "react";
import { OrbitControls, Text } from "@react-three/drei";
import { TweenMax } from "gsap";
import { Suitcase } from "./Suitcase";

const experiences = [
  {
    position: "Web Administrator \nand Operations Manager",
    company: "GNW Landscaping, Georgetown",
    description:
      "Supervised workers, optimized routing schedules, \nand enhanced operational efficiency.\n\nHandled client interactions, complaints, \nand account management for a sub‐branch",
  },
  {
    position: "Food Services Assistant",
    company: "McMaster University",
    description:
      "Communicated clearly and positively \nwith coworkers and management.\n\nMaintained high standards of customer service \nduring high‐volume, fast‐paced operations.",
  },
  {
    position: "Manager",
    company: "GNW Landscaping, Georgetown",
    description:
      "Supervised workers, optimized routing schedules, \nand enhanced operational efficiency.\n\nHandled client interactions, complaints, \nand account management for a sub‐branch",
  },
];

export default function Employment() {
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
        position={[6.4, -12, -15]} // Adjust the position as needed
        fontSize={1.6}
        font={"Raleway/static/Raleway-ExtraBold.ttf"}
        color="white"
        material-transparent
        material-opacity={0}
        anchorX="center"
        anchorY="middle"
      >
        EXPERIENCE
      </Text>

      <Suitcase position={[6.4, -15, -12]} />

      <group position={[-5, -13, 0]}>
        {experiences.map((exp, index) => (
          <group key={index} position={[0, -index * 2.6, 0]}>
            <Text
              ref={(el) => (refs.current[index] = el)}
              position={[0, 0, 0]}
              fontSize={0.4}
              font={"Raleway/static/Raleway-Bold.ttf"}
              color="white"
              material-transparent
              material-opacity={1}
              anchorX="left"
              anchorY="bottom"
            >
              {exp.position}
            </Text>
            <Text
              position={[0, -0.4, 0]}
              fontSize={0.3}
              font={"Raleway/static/Raleway-Medium.ttf"}
              color="white"
              material-transparent
              material-opacity={1}
              anchorX="left"
              anchorY="bottom"
            >
              {exp.company}
            </Text>
            <Text
              position={[0, -1.2, 0]}
              fontSize={0.2}
              font={"Raleway/static/Raleway-Light.ttf"}
              color="white"
              material-transparent
              material-opacity={1}
              anchorX="left"
              anchorY="middle"
            >
              {exp.description}
            </Text>
          </group>
        ))}
      </group>
    </>
  );
}
