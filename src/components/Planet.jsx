/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.0 public/models/Planet.glb -o src/components/Planet.jsx -k -K -r public 
*/

//Planet by Quaternius (https://poly.pizza/m/9g1aIbfR9Y)

import { React, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export function Planet(props) {
  const { nodes, materials } = useGLTF("/models/Planet.glb");
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01; // Rotate around Y-axis
      groupRef.current.rotation.x += 0; // Optional: Rotate around X-axis
    }
  });

  return (
    <group {...props} ref={groupRef} dispose={null}>
      <group name="Root_Scene">
        <group name="RootNode">
          <mesh
            name="Planet_7"
            geometry={nodes.Planet_7.geometry}
            material={materials.Atlas}
            scale={100}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/Planet.glb");
