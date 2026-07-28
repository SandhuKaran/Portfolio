import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";
import { CardMeshes, STRAP_URL, Strap } from "./CardMeshes";
import { journey } from "../lib/journey";

const SEGMENT = {
  type: "dynamic",
  canSleep: true,
  colliders: false,
  angularDamping: 2,
  linearDamping: 2,
};

/**
 * The draggable badge: four rigid bodies roped together with the card swinging
 * off the end, and a textured meshline redrawn along the resulting curve.
 * Carried over from the original site — it's the bit people actually play with.
 */
function Rope({ anchor, maxSpeed = 50, minSpeed = 10, onGrab }) {
  const band = useRef();
  const fixed = useRef();
  const j1 = useRef();
  const j2 = useRef();
  const j3 = useRef();
  const card = useRef();

  const vec = useMemo(() => new THREE.Vector3(), []);
  const ang = useMemo(() => new THREE.Vector3(), []);
  const rot = useMemo(() => new THREE.Vector3(), []);
  const dir = useMemo(() => new THREE.Vector3(), []);

  const texture = useTexture(STRAP_URL);
  const curve = useMemo(() => {
    const c = new THREE.CatmullRomCurve3([
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
    ]);
    c.curveType = "chordal";
    return c;
  }, []);

  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);
  const [released, setReleased] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]); // prettier-ignore
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]); // prettier-ignore
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]); // prettier-ignore
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]); // prettier-ignore

  useEffect(() => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  }, [texture]);

  useEffect(() => {
    if (!hovered) return;
    document.body.style.cursor = dragged ? "grabbing" : "grab";
    return () => void (document.body.style.cursor = "auto");
  }, [hovered, dragged]);

  // Hold the card still for a beat, then let go — the drop and bounce is what
  // tells people it's a physical object worth grabbing.
  useEffect(() => {
    const timer = setTimeout(() => setReleased(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  // A touch drag gets stolen by the browser's scroll gesture, which fires
  // pointercancel rather than pointerup. Without this the card stays stuck.
  useEffect(() => {
    if (!dragged) return;
    const stop = () => drag(false);
    window.addEventListener("pointerup", stop);
    window.addEventListener("pointercancel", stop);
    return () => {
      window.removeEventListener("pointerup", stop);
      window.removeEventListener("pointercancel", stop);
    };
  }, [dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }

    if (!fixed.current || !band.current || !j1.current || !j2.current || !j3.current) return;

    // Damp the jitter that appears when the rope is over-extended.
    //
    // The lerp factor has to be clamped to 1. A single long frame — the lazy
    // physics chunk landing, a background tab waking up — makes `delta * 50`
    // wildly greater than 1, which overshoots instead of interpolating; two of
    // those in a row diverge to Infinity and then NaN, and the strap vanishes.
    [j1, j2].forEach((ref) => {
      if (!ref.current.lerped) {
        ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
      }
      const spread = Math.max(
        0.1,
        Math.min(1, ref.current.lerped.distanceTo(ref.current.translation()))
      );
      const alpha = Math.min(1, delta * (minSpeed + spread * (maxSpeed - minSpeed)));
      ref.current.lerped.lerp(ref.current.translation(), alpha);
    });

    curve.points[0].copy(j3.current.translation());
    curve.points[1].copy(j2.current.lerped);
    curve.points[2].copy(j1.current.lerped);
    curve.points[3].copy(fixed.current.translation());
    band.current.geometry.setPoints(curve.getPoints(32));

    // Nudge the card back towards the screen so it settles face-on.
    ang.copy(card.current.angvel());
    rot.copy(card.current.rotation());
    card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
  });

  return (
    <>
      <group position={anchor}>
        <RigidBody ref={fixed} {...SEGMENT} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...SEGMENT}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...SEGMENT}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...SEGMENT}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 1, 0]}
          ref={card}
          {...SEGMENT}
          type={released ? (dragged ? "kinematicPosition" : "dynamic") : "fixed"}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => {
              e.target?.releasePointerCapture?.(e.pointerId);
              drag(false);
            }}
            onPointerDown={(e) => {
              e.target?.setPointerCapture?.(e.pointerId);
              onGrab?.();
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
            }}
          >
            <CardMeshes />
          </group>
        </RigidBody>
      </group>

      {/* Outside the anchor group on purpose: the curve is fed world-space
          translations straight out of rapier, so any parent offset here would
          be applied a second time and tear the strap away from the card. */}
      <Strap meshRef={band} texture={texture} />
    </>
  );
}

/** Stops stepping the simulation once the flight has left the launch station. */
function Gate({ children }) {
  const [live, setLive] = useState(true);
  useFrame(() => {
    const near = journey.t < 1.6;
    if (near !== live) setLive(near);
  });
  return (
    <Physics paused={!live} interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
      {children}
    </Physics>
  );
}

export default function PhysicsLanyard({ anchor = [3, 4.2, 0], onGrab }) {
  return (
    <Gate>
      <Rope anchor={anchor} onGrab={onGrab} />
    </Gate>
  );
}
