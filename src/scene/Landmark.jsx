import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

/**
 * Drops a GLB into the scene at a predictable on-screen size.
 *
 * The source models come from a handful of different authors and are all in
 * different units, so rather than hand-tuning magic scale numbers we measure
 * the bounding box and normalise: `size` is the model's largest dimension in
 * world units, and the model is re-centred on its own bounds so it spins about
 * itself instead of drifting around some arbitrary origin.
 */
export default function Landmark({
  url,
  size = 4,
  spin = 0.15,
  /** Radians to swing back and forth instead of spinning — for one-sided models. */
  sway = 0,
  bob = 0.12,
  tilt = [0, 0, 0],
  strip,
  paused = false,
  ...props
}) {
  const { scene } = useGLTF(url);
  const inner = useRef();
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);
  const stripKey = strip?.join(",");

  const fit = useMemo(() => {
    // Drop unwanted nodes before measuring — a stray helper curve with a scale
    // of 500 would otherwise dominate the bounds and shrink the model to dust.
    if (strip?.length) {
      const doomed = [];
      scene.traverse((o) => strip.includes(o.name) && doomed.push(o));
      doomed.forEach((o) => o.removeFromParent());
    }
    const box = new THREE.Box3().setFromObject(scene);
    const dims = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const scale = size / (Math.max(dims.x, dims.y, dims.z) || 1);
    return { scale, offset: center.multiplyScalar(-scale).toArray() };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene, size, stripKey]);

  useFrame((state, delta) => {
    if (paused || !inner.current) return;
    const t = state.clock.elapsedTime;
    if (sway) inner.current.rotation.y = Math.sin(t * 0.5 + phase) * sway;
    else inner.current.rotation.y += spin * Math.min(delta, 0.1);
    inner.current.position.y = Math.sin(t * 0.6 + phase) * bob;
  });

  return (
    <group {...props}>
      <group ref={inner} rotation={tilt}>
        <primitive object={scene} scale={fit.scale} position={fit.offset} />
      </group>
    </group>
  );
}
