// Volunteering.js
import React, { useEffect, useRef } from "react";
import { Text } from "@react-three/drei";
import { TweenMax } from "gsap";
import { Houseplant } from "./Houseplant";

const volunteeringExperiences = [
  {
    position: "Linux Tutor",
    organization: "Private Tutoring",
    description:
      "Provide hands-on guidance in \nLinux command-line usage, system \nadministration, and shell scripting.",
  },
  {
    position: "McMaster Start Coding",
    organization: "McMaster University",
    description:
      "Taught functional programming \nusing visual tools to elementary \nschool kids.",
  },
  {
    position: "sciFUNdamentals",
    organization: "McMaster University",
    description:
      "Designed demo kits for volunteer \nteachers to present fun science \ndemos to elementary school kids",
  },
];

export default function Volunteering() {
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
        position={[5.2, -41, -15]} // Adjust the position as needed
        fontSize={1.6}
        font={"Raleway/static/Raleway-ExtraBold.ttf"}
        color="white"
        material-transparent
        material-opacity={0}
        anchorX="center"
        anchorY="middle"
      >
        VOLUNTEERING
      </Text>

      <Houseplant position={[5.2, -46.5, -12]} />
      <group position={[-5, -43, 0]}>
        {volunteeringExperiences.map((exp, index) => (
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
              anchorY="middle"
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
              anchorY="middle"
            >
              {exp.organization}
            </Text>
            <Text
              position={[0, -1.2, 0]}
              fontSize={0.3}
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
