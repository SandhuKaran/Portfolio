// Projects.js
import React, { useEffect, useRef } from "react";
import { Text, Plane } from "@react-three/drei";
import { TweenMax } from "gsap";
import * as THREE from "three";
import { Telescope } from "./Telescope";

const projects = [
  {
    title: "Portfolio Website",
    description:
      "A personal portfolio website \nshowcasing my skills and projects, \nbuilt with React and Three.js.",
    image: "../../public/img/project1.jpg",
  },
  {
    title: "E-commerce Platform",
    description:
      "Developed an e-commerce \nplatform with a custom shopping \ncart and payment integration.",
    image: "path/to/image2.jpg",
  },
  {
    title: "Weather App",
    description:
      "A weather application \nproviding real-time weather updates \nand forecasts using a public API.",
    image: "path/to/image3.jpg",
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
            <Plane args={[3, 2]} position={[0, -0.5, 0]}>
              <meshBasicMaterial attach="material">
                <primitive
                  attach="map"
                  object={new THREE.TextureLoader().load(project.image)}
                />
              </meshBasicMaterial>
            </Plane>
          </group>
        ))}
      </group>
    </>
  );
}
