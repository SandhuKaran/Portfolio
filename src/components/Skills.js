// Skills.js
import React, { useEffect, useRef } from "react";
import { Text } from "@react-three/drei";
import { TweenMax } from "gsap";
import { Monitor } from "./Monitor";

const skills1 = [
  {
    title: "JavaScript",
    description:
      "Experienced in building web applications \nusing JavaScript, including ES6+ features \nand frameworks like React.",
  },
  {
    title: "Git/GitHub",
    description:
      "Experienced in version control with Git, \nutilizing GitHub for collaborative projects, \ncode management, and open-source.",
  },
  {
    title: "MySQL, MongoDB",
    description:
      "Knowledgeable in both relational (MySQL) \nand NoSQL (MongoDB) databases for \ndata modeling and managemen.",
  },
  {
    title: "APIs and RESTful Services",
    description:
      "Proficiency in creating and consuming \nRESTful APIs or GraphQL for communication \nbetween frontend and backend services",
  },
  {
    title: "Agile/Scrum Methodologies",
    description:
      "Proficiency in Agile frameworks like Scrum \nwith a focus on iterative development, \ncontinuous feedback, and collaboration.",
  },
];

const skills2 = [
  {
    title: "Python, Java, C",
    description:
      "Proficient in Python for scripting and automation, \nJava for object-oriented programming, \nand C for system-level programming.",
  },
  {
    title: "React.js, Node.js, Three.js",
    description:
      "Developed web apps using React.js for frontend, \nNode.js for backend services, and \nThree.js for 3D graphics rendering and animations.",
  },
  {
    title: "Unix-like Systems, Shell Scripting",
    description:
      "Proficient in Unix-like environments, with \nexpertise in shell scripting for \nmanaging files, and system processes.",
  },

  {
    title: "C++, openGL",
    description:
      "Experienced in using OpenGL for rendering \n2D and 3D graphics. Familiarity with graphics \npipelines and real-time rendering techniques.",
  },
  {
    title: "CI/CD",
    description:
      "Familiarity with CI/CD pipelines (e.g. GitHub Actions) \nfor automating software builds, \ntesting, and deployment processes.",
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
