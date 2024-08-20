/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.0 public/models/Houseplant.glb -o src/components/Houseplant.jsx -k -K -r public 
*/

//Houseplant by jeremy [CC-BY] (https://creativecommons.org/licenses/by/3.0/)
//via Poly Pizza (https://poly.pizza/m/e9oRt-Ct6js)

import { React, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

export function Houseplant(props) {
  const { nodes, materials } = useGLTF("/models/Houseplant.glb");
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.004; // Rotate around Y-axis
      groupRef.current.rotation.x += 0; // Optional: Rotate around X-axis
    }
  });

  return (
    <group
      {...props}
      ref={groupRef}
      scale={[0.025, 0.025, 0.025]}
      dispose={null}
    >
      <group>
        <group name="plant_01_Cube006">
          <mesh
            name="plant_01_Cube006-Mesh"
            geometry={nodes["plant_01_Cube006-Mesh"].geometry}
            material={materials["795548"]}
          />
          <mesh
            name="plant_01_Cube006-Mesh_1"
            geometry={nodes["plant_01_Cube006-Mesh_1"].geometry}
            material={materials["8BC34A"]}
          />
          <mesh
            name="plant_01_Cube006-Mesh_2"
            geometry={nodes["plant_01_Cube006-Mesh_2"].geometry}
            material={materials.F8BBD0}
          />
          <mesh
            name="plant_01_Cube006-Mesh_3"
            geometry={nodes["plant_01_Cube006-Mesh_3"].geometry}
            material={materials["455A64"]}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/Houseplant.glb");
