import { useCallback } from "react";
import * as THREE from "three";
import { extend, useThree } from "@react-three/fiber";
import { useGLTF, useTexture } from "@react-three/drei";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";

extend({ MeshLineGeometry, MeshLineMaterial });

export const CARD_URL = "/models/tag.glb";
export const STRAP_URL = "/img/1.png";

useGLTF.preload(CARD_URL);
useTexture.preload(STRAP_URL);

// A MeshLineGeometry with no points has an empty position attribute, which
// makes computeBoundingSphere produce NaN and spam the console. Seeding it with
// a degenerate line keeps three happy until the first real update lands.
const PLACEHOLDER = [
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0, -1, 0),
  new THREE.Vector3(0, -2, 0),
  new THREE.Vector3(0, -3, 0),
];

/** The badge itself: printed face, metal clip and clamp. */
export function CardMeshes() {
  const { nodes, materials } = useGLTF(CARD_URL);
  return (
    <>
      <mesh geometry={nodes.card.geometry}>
        <meshPhysicalMaterial
          map={materials.base.map}
          map-anisotropy={16}
          clearcoat={1}
          clearcoatRoughness={0.15}
          roughness={0.3}
          metalness={0.5}
        />
      </mesh>
      <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
      <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
    </>
  );
}

/**
 * The printed strap, drawn as a textured meshline.
 *
 * `frustumCulled` is off deliberately: the line's width is a screen-space
 * quantity and its points are rewritten every frame, so a cached bounding
 * sphere is both useless and a source of pop-out.
 */
export function Strap({ meshRef, texture, points }) {
  const { width, height } = useThree((s) => s.size);
  const seed = useCallback(
    (geometry) => geometry?.setPoints(points ?? PLACEHOLDER),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    // No raycast: the strap is decorative, and skipping it means three never
    // computes bounds on a geometry that's rewritten every frame (which was
    // producing NaN bounding-sphere warnings on the first frame).
    <mesh ref={meshRef} frustumCulled={false}>
      <meshLineGeometry ref={seed} />
      <meshLineMaterial
        color="white"
        depthTest={false}
        resolution={[width, height]}
        useMap
        map={texture}
        repeat={[-3, 1]}
        lineWidth={1}
      />
    </mesh>
  );
}
