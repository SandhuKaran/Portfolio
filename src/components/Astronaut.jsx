/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.0 public/models/Astronaut.glb -o src/components/Astronaut.jsx -k -K -r public 
*/

import { React, useRef, useState, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { easeQuadOut } from "d3-ease";

export function Astronaut(props) {
  const { nodes, materials } = useGLTF("/models/Astronaut.glb");
  const groupRef = useRef();
  const [startTime] = useState(Date.now);

  const duration = 6000;

  useFrame(() => {
    const elapsedTime = Date.now() - startTime;

    if (elapsedTime < duration) {
      const t = easeQuadOut(elapsedTime / duration);
      groupRef.current.position.x = -27 + 20 * t;
    } else {
      groupRef.current.position.x = -7;
    }

    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
      groupRef.current.rotation.x += 0.007;
    }
  });
  return (
    <group
      {...props}
      rotation-y={1}
      rotation-x={4}
      scale={(4, 4, 4)}
      ref={groupRef}
      dispose={null}
    >
      <group>
        <mesh
          name="group1167641645"
          geometry={nodes.group1167641645.geometry}
          material={materials.mat15}
        />
        <mesh
          name="group1707873932"
          geometry={nodes.group1707873932.geometry}
          material={materials.mat15}
        />
        <mesh
          name="group1907831520"
          geometry={nodes.group1907831520.geometry}
          material={materials.mat15}
        />
        <mesh
          name="group666895494"
          geometry={nodes.group666895494.geometry}
          material={materials.mat15}
        />
        <mesh
          name="group1098147410"
          geometry={nodes.group1098147410.geometry}
          material={materials.mat16}
        />
        <mesh
          name="group282412729"
          geometry={nodes.group282412729.geometry}
          material={materials.mat15}
        />
        <mesh
          name="group139908371"
          geometry={nodes.group139908371.geometry}
          material={materials.mat15}
        />
        <mesh
          name="group1506934965"
          geometry={nodes.group1506934965.geometry}
          material={materials.mat15}
        />
        <mesh
          name="group1753656922"
          geometry={nodes.group1753656922.geometry}
          material={materials.mat5}
        />
        <mesh
          name="group549386394"
          geometry={nodes.group549386394.geometry}
          material={materials.mat16}
        />
        <mesh
          name="group1621723427"
          geometry={nodes.group1621723427.geometry}
          material={materials.mat15}
        />
        <mesh
          name="group332686008"
          geometry={nodes.group332686008.geometry}
          material={materials.mat15}
        />
        <mesh
          name="group1203591074"
          geometry={nodes.group1203591074.geometry}
          material={materials.mat15}
        />
        <mesh
          name="group1138436095"
          geometry={nodes.group1138436095.geometry}
          material={materials.mat15}
        />
        <mesh
          name="group505957385"
          geometry={nodes.group505957385.geometry}
          material={materials.mat16}
        />
        <mesh
          name="group279303741"
          geometry={nodes.group279303741.geometry}
          material={materials.mat16}
        />
        <mesh
          name="group2056735301"
          geometry={nodes.group2056735301.geometry}
          material={materials.mat16}
        />
        <mesh
          name="group1015039822"
          geometry={nodes.group1015039822.geometry}
          material={materials.mat16}
        />
        <mesh
          name="group276692338"
          geometry={nodes.group276692338.geometry}
          material={materials.mat16}
        />
        <mesh
          name="group1437890092"
          geometry={nodes.group1437890092.geometry}
          material={materials.mat21}
        />
        <mesh
          name="group790332696"
          geometry={nodes.group790332696.geometry}
          material={materials.mat21}
        />
        <mesh
          name="group654761556"
          geometry={nodes.group654761556.geometry}
          material={materials.mat21}
        />
        <mesh
          name="group1852607879"
          geometry={nodes.group1852607879.geometry}
          material={materials.mat21}
        />
        <mesh
          name="group2057329393"
          geometry={nodes.group2057329393.geometry}
          material={materials.mat21}
        />
        <mesh
          name="group2143627782"
          geometry={nodes.group2143627782.geometry}
          material={materials.mat16}
        />
        <mesh
          name="group1564631837"
          geometry={nodes.group1564631837.geometry}
          material={materials.mat5}
        />
        <mesh
          name="group925645544"
          geometry={nodes.group925645544.geometry}
          material={materials.mat21}
        />
        <mesh
          name="group734772326"
          geometry={nodes.group734772326.geometry}
          material={materials.mat16}
        />
        <mesh
          name="group1934812181"
          geometry={nodes.group1934812181.geometry}
          material={materials.mat16}
        />
        <mesh
          name="group2060591166"
          geometry={nodes.group2060591166.geometry}
          material={materials.mat16}
        />
        <mesh
          name="group1167954657"
          geometry={nodes.group1167954657.geometry}
          material={materials.mat5}
        />
        <mesh
          name="group1042580755"
          geometry={nodes.group1042580755.geometry}
          material={materials.mat16}
        />
        <mesh
          name="group1572698854"
          geometry={nodes.group1572698854.geometry}
          material={materials.mat16}
        />
        <mesh
          name="group104451256"
          geometry={nodes.group104451256.geometry}
          material={materials.mat21}
        />
        <mesh
          name="group1188494358"
          geometry={nodes.group1188494358.geometry}
          material={materials.mat21}
        />
        <mesh
          name="group1217407763"
          geometry={nodes.group1217407763.geometry}
          material={materials.mat21}
        />
        <mesh
          name="group828877529"
          geometry={nodes.group828877529.geometry}
          material={materials.mat16}
        />
        <mesh
          name="group1423311402"
          geometry={nodes.group1423311402.geometry}
          material={materials.mat21}
        />
        <mesh
          name="group762855551"
          geometry={nodes.group762855551.geometry}
          material={materials.mat21}
        />
        <mesh
          name="group1514672780"
          geometry={nodes.group1514672780.geometry}
          material={materials.mat21}
        />
        <mesh
          name="group1310595050"
          geometry={nodes.group1310595050.geometry}
          material={materials.mat21}
        />
        <mesh
          name="group1369611446"
          geometry={nodes.group1369611446.geometry}
          material={materials.mat15}
        />
        <mesh
          name="group450518597"
          geometry={nodes.group450518597.geometry}
          material={materials.mat21}
        />
        <mesh
          name="group745840913"
          geometry={nodes.group745840913.geometry}
          material={materials.mat5}
        />
        <mesh
          name="group42438703"
          geometry={nodes.group42438703.geometry}
          material={materials.mat21}
        />
        <mesh
          name="group503988050"
          geometry={nodes.group503988050.geometry}
          material={materials.mat15}
        />
        <mesh
          name="group1602554113"
          geometry={nodes.group1602554113.geometry}
          material={materials.mat15}
        />
        <mesh
          name="group887420200"
          geometry={nodes.group887420200.geometry}
          material={materials.mat15}
        />
        <mesh
          name="group1440063915"
          geometry={nodes.group1440063915.geometry}
          material={materials.mat21}
        />
        <mesh
          name="group247475039"
          geometry={nodes.group247475039.geometry}
          material={materials.mat15}
        />
        <mesh
          name="group456781955"
          geometry={nodes.group456781955.geometry}
          material={materials.mat15}
        />
        <mesh
          name="group724382726"
          geometry={nodes.group724382726.geometry}
          material={materials.mat15}
        />
        <mesh
          name="group1277767469"
          geometry={nodes.group1277767469.geometry}
          material={materials.mat17}
        />
        <mesh
          name="group954316612"
          geometry={nodes.group954316612.geometry}
          material={materials.mat16}
        />
        <mesh
          name="group989277149"
          geometry={nodes.group989277149.geometry}
          material={materials.mat17}
        />
        <mesh
          name="group797940765"
          geometry={nodes.group797940765.geometry}
          material={materials.mat21}
        />
        <mesh
          name="group1808813520"
          geometry={nodes.group1808813520.geometry}
          material={materials.mat17}
        />
        <mesh
          name="group255140077"
          geometry={nodes.group255140077.geometry}
          material={materials.mat5}
        />
        <mesh
          name="group524469484"
          geometry={nodes.group524469484.geometry}
          material={materials.mat5}
        />
        <mesh
          name="group279101508"
          geometry={nodes.group279101508.geometry}
          material={materials.mat21}
        />
        <mesh
          name="group1596727529"
          geometry={nodes.group1596727529.geometry}
          material={materials.mat17}
        />
        <mesh
          name="group2129567275"
          geometry={nodes.group2129567275.geometry}
          material={materials.mat17}
        />
        <mesh
          name="group373555577"
          geometry={nodes.group373555577.geometry}
          material={materials.mat5}
        />
        <mesh
          name="group314405485"
          geometry={nodes.group314405485.geometry}
          material={materials.mat21}
        />
        <mesh
          name="group991616414"
          geometry={nodes.group991616414.geometry}
          material={materials.mat15}
        />
        <mesh
          name="group1896148415"
          geometry={nodes.group1896148415.geometry}
          material={materials.mat5}
        />
        <mesh
          name="group1481515652"
          geometry={nodes.group1481515652.geometry}
          material={materials.mat17}
        />
        <mesh
          name="group781958242"
          geometry={nodes.group781958242.geometry}
          material={materials.mat17}
        />
        <mesh
          name="group1830018461"
          geometry={nodes.group1830018461.geometry}
          material={materials.mat21}
        />
        <mesh
          name="group1307457211"
          geometry={nodes.group1307457211.geometry}
          material={materials.mat16}
        />
        <mesh
          name="group638132290"
          geometry={nodes.group638132290.geometry}
          material={materials.mat23}
        />
        <mesh
          name="group1181203045"
          geometry={nodes.group1181203045.geometry}
          material={materials.mat16}
        />
        <mesh
          name="group157177855"
          geometry={nodes.group157177855.geometry}
          material={materials.mat16}
        />
        <mesh
          name="group1453338879"
          geometry={nodes.group1453338879.geometry}
          material={materials.mat18}
        />
        <mesh
          name="group282641779"
          geometry={nodes.group282641779.geometry}
          material={materials.mat18}
        />
        <mesh
          name="group1884950168"
          geometry={nodes.group1884950168.geometry}
          material={materials.mat17}
        />
        <mesh
          name="group657325723"
          geometry={nodes.group657325723.geometry}
          material={materials.mat17}
        />
        <mesh
          name="group1943308988"
          geometry={nodes.group1943308988.geometry}
          material={materials.mat13}
        />
        <mesh
          name="group530823911"
          geometry={nodes.group530823911.geometry}
          material={materials.mat13}
        />
        <mesh
          name="group1585682906"
          geometry={nodes.group1585682906.geometry}
          material={materials.mat16}
        />
        <mesh
          name="group986243464"
          geometry={nodes.group986243464.geometry}
          material={materials.mat16}
        />
        <mesh
          name="group456711604"
          geometry={nodes.group456711604.geometry}
          material={materials.mat16}
        />
        <mesh
          name="group1614853819"
          geometry={nodes.group1614853819.geometry}
          material={materials.mat16}
        />
        <mesh
          name="group332540088"
          geometry={nodes.group332540088.geometry}
          material={materials.mat16}
        />
        <mesh
          name="group1163682321"
          geometry={nodes.group1163682321.geometry}
          material={materials.mat16}
        />
        <mesh
          name="group1921399779"
          geometry={nodes.group1921399779.geometry}
          material={materials.mat16}
        />
        <mesh
          name="group584895319"
          geometry={nodes.group584895319.geometry}
          material={materials.mat16}
        />
        <mesh
          name="group1679735649"
          geometry={nodes.group1679735649.geometry}
          material={materials.mat16}
        />
        <mesh
          name="group11481041"
          geometry={nodes.group11481041.geometry}
          material={materials.mat16}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/Astronaut.glb");
