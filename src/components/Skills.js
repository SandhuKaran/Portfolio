// Skills.js
import React, { useEffect, useRef } from "react";
import { Text } from "@react-three/drei";
import { TweenMax } from "gsap";
import { Monitor } from "./Monitor";

const skills1 = [
  {
    title: "JavaScript",
    description:
      "Experienced in building web \napplications using JavaScript, including ES6+ \nfeatures and frameworks like React.",
  },
  {
    title: "Python",
    description:
      "Proficient in Python for \nscripting, data analysis, and web \ndevelopment with Django and Flask.",
  },
  {
    title: "CSS",
    description:
      "Skilled in styling web \npages using CSS, including preprocessors like \nSASS and frameworks like Bootstrap.",
  },
  {
    title: "JavaScript",
    description:
      "Experienced in building web \napplications using JavaScript, including ES6+ \nfeatures and frameworks like React.",
  },
];

const skills2 = [
  {
    title: "python, java, c",
    description:
      "Experienced in building web \napplications using JavaScript, including ES6+ \nfeatures and frameworks like React.",
  },
  {
    title: "Python",
    description:
      "Proficient in Python for \nscripting, data analysis, and web \ndevelopment with Django and Flask.",
  },
  {
    title: "CSS",
    description:
      "Skilled in styling web \npages using CSS, including preprocessors like \nSASS and frameworks like Bootstrap.",
  },
  {
    title: "JavaScript",
    description:
      "Experienced in building web \napplications using JavaScript, including ES6+ \nfeatures and frameworks like React.",
  },
];

export default function Skills() {
  const ref = useRef();
  const leftRefs = useRef([]);
  const rightRefs = useRef([]);

  useEffect(() => {
    if (ref.current) {
      TweenMax.to(ref.current.material, 4, { opacity: 1 });
    }

    leftRefs.current.forEach((item, index) => {
      if (item) {
        TweenMax.to(item.position, 4, { x: 0, opacity: 1, delay: index * 0.5 });
      }
    });

    rightRefs.current.forEach((item, index) => {
      if (item) {
        TweenMax.to(item.position, 4, { x: 0, opacity: 1, delay: index * 0.5 });
      }
    });
  }, []);

  return (
    <>
      <Text
        ref={ref}
        position={[0, -56, -15]} // Adjust the position as needed
        fontSize={1.6}
        font={"Raleway/static/Raleway-ExtraBold.ttf"}
        color="white"
        material-transparent
        material-opacity={0}
        anchorX="center"
        anchorY="middle"
      >
        SKILLS
      </Text>
      <Monitor position={[0, -60, -12]} />
      <group position={[0, -58, 0]}>
        {skills1.map((skill, index) => (
          <React.Fragment key={index}>
            <group position={[5, -index * 2, 0]}>
              <Text
                ref={(el) => (leftRefs.current[index] = el)}
                position={[0, 0, 0]}
                fontSize={0.3}
                font={"Raleway/static/Raleway-ExtraBold.ttf"}
                color="white"
                material-transparent
                material-opacity={1}
                anchorX="right"
                anchorY="middle"
              >
                {skill.title}
              </Text>
              <Text
                position={[0, -0.6, 0]}
                fontSize={0.2}
                font={"Raleway/static/Raleway-Light.ttf"}
                color="white"
                material-transparent
                material-opacity={1}
                anchorX="right"
                anchorY="middle"
              >
                {skill.description}
              </Text>
            </group>
          </React.Fragment>
        ))}
      </group>
      <group position={[0, -58, 0]}>
        {skills2.map((skill, index) => (
          <React.Fragment key={index}>
            <group position={[-5, -index * 2, 0]}>
              <Text
                ref={(el) => (rightRefs.current[index] = el)}
                position={[0, 0, 0]}
                fontSize={0.3}
                font={"Raleway/static/Raleway-ExtraBold.ttf"}
                color="white"
                material-transparent
                material-opacity={1}
                anchorX="left"
                anchorY="middle"
              >
                {skill.title}
              </Text>
              <Text
                position={[0, -0.6, 0]}
                fontSize={0.2}
                font={"Raleway/static/Raleway-Light.ttf"}
                color="white"
                material-transparent
                material-opacity={1}
                anchorX="left"
                anchorY="middle"
              >
                {skill.description}
              </Text>
            </group>
          </React.Fragment>
        ))}
      </group>
    </>
  );
}
