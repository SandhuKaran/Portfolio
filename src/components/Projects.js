// Projects.js
import React, { useEffect, useRef } from "react";
import { Text, Plane } from "@react-three/drei";
import { TweenMax } from "gsap";
import * as THREE from "three";
import { Telescope } from "./Telescope";

const projects = [
  {
    title: "TravelEase",
    description:
      "App to optimize employee schedules \nusing a Node.js, React.js and MapsAPI, \ncalculating the most efficient routes.",
  },
  {
    title: "GNW Website",
    description:
      "Responsive, user‐friendly website to \nshowcase services, improve customer \nengagement, streamline online presence",
  },

  {
    title: "LinearLab",
    description:
      "Interactive visual interface to understand \nthe concepts of linear algebra such as \nmatrix transformations, eigenvectors",
  },
];

export default function Projects() {
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
        position={[-6.3, -26, -15]} // Adjust the position as needed
        fontSize={2}
        font={"Raleway/static/Raleway-ExtraBold.ttf"}
        color="white"
        material-transparent
        material-opacity={0}
        anchorX="center"
        anchorY="middle"
      >
        PROJECTS
      </Text>
      <Telescope position={[-6.3, -30, -12]} />
      <group position={[0, -28, 0]}>
        {projects.map((project, index) => (
          <group key={index} position={[5, -index * 2.6, 0]}>
            <Text
              ref={(el) => (refs.current[index] = el)}
              position={[0, 0, 0]}
              fontSize={0.4}
              font={"Raleway/static/Raleway-ExtraBold.ttf"}
              color="white"
              material-transparent
              material-opacity={1}
              anchorX="right"
              anchorY="middle"
            >
              {project.title}
            </Text>
            <Text
              position={[0, -0.8, 0]}
              fontSize={0.3}
              font={"Raleway/static/Raleway-Light.ttf"}
              color="white"
              material-transparent
              material-opacity={1}
              anchorX="right"
              anchorY="middle"
            >
              {project.description}
            </Text>
          </group>
        ))}
      </group>
    </>
  );
}
