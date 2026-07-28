import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { CardMeshes, STRAP_URL, Strap } from "./CardMeshes";

/**
 * Physics-free badge.
 *
 * Shown while the rapier chunk streams in, and kept permanently for people on
 * reduced-motion, save-data, or hardware that shouldn't be asked to run a rope
 * simulation. It hangs on a fixed curve and sways instead of swinging.
 */
export default function StaticLanyard({ anchor = [3, 4.2, 0], animate = true }) {
  const card = useRef();
  const texture = useTexture(STRAP_URL);

  // Mirrors where the simulated rope actually comes to rest: three 1-unit rope
  // segments hanging straight down from the anchor, with the card slung 1.45
  // below the last one. Getting this wrong parks the badge somewhere the
  // physics version never goes — off the side of the screen, in this case.
  //
  // Sampled to 32 points through the same chordal curve the simulation feeds
  // the strap. MeshLine derives its texture counters from the point count, so
  // handing it the four control points directly squashes the printed lanyard
  // into a solid black band.
  const points = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0.04, -1, 0),
      new THREE.Vector3(0.02, -2, 0),
      new THREE.Vector3(0, -3, 0),
    ]);
    curve.curveType = "chordal";
    return curve.getPoints(32);
  }, []);

  useEffect(() => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  }, [texture]);

  useFrame((state) => {
    if (!animate || !card.current) return;
    const t = state.clock.elapsedTime;
    card.current.rotation.y = Math.sin(t * 0.5) * 0.3;
    card.current.rotation.z = Math.sin(t * 0.35) * 0.04;
  });

  return (
    <group position={anchor}>
      <Strap texture={texture} points={points} />
      <group ref={card} position={[0, -4.45, 0]}>
        <group scale={2.25} position={[0, -1.2, -0.05]}>
          <CardMeshes />
        </group>
      </group>
    </group>
  );
}
