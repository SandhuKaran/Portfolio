import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { flightPath, stations } from "../data/stations";
import { journey } from "../lib/journey";

const LAST = stations.length - 1;

/**
 * Flies the camera along a Catmull-Rom curve fitted through every station.
 *
 * The damping is applied to the *scalar* position along the curve rather than
 * to the camera's xyz. That matters: damping xyz lets the camera cut corners
 * and drift off the route when you scroll fast, whereas damping the parameter
 * keeps it pinned to the path and simply makes it accelerate and coast.
 */
export default function CameraRig({ mobile, reducedMotion, parallax }) {
  const { camera, size } = useThree();

  const curves = useMemo(() => {
    const { positions, targets } = flightPath(mobile);
    const toCurve = (pts) =>
      new THREE.CatmullRomCurve3(
        pts.map((p) => new THREE.Vector3(...p)),
        false,
        "catmullrom",
        0.4
      );
    return { pos: toCurve(positions), look: toCurve(targets) };
  }, [mobile]);

  const scratch = useRef({
    pos: new THREE.Vector3(),
    look: new THREE.Vector3(),
    tan: new THREE.Vector3(),
    ptr: new THREE.Vector2(),
  }).current;

  useFrame((state, delta) => {
    const dt = Math.min(delta, 1 / 20);
    const prev = journey.t;

    journey.t = reducedMotion
      ? journey.target
      : THREE.MathUtils.damp(journey.t, journey.target, 4.5, dt);

    const instant = (journey.t - prev) / Math.max(dt, 1e-4);
    journey.velocity = THREE.MathUtils.damp(journey.velocity, instant, 5, dt);

    const u = THREE.MathUtils.clamp(journey.t / LAST, 0, 1);
    curves.pos.getPoint(u, scratch.pos);
    curves.look.getPoint(u, scratch.look);

    if (!reducedMotion) {
      // Slow idle drift so the camera never feels locked to a rail.
      const time = state.clock.elapsedTime;
      scratch.pos.x += Math.sin(time * 0.21) * 0.22;
      scratch.pos.y += Math.cos(time * 0.17) * 0.18;

      if (parallax) {
        scratch.ptr.lerp(state.pointer, 1 - Math.pow(0.001, dt));
        scratch.pos.x += scratch.ptr.x * 0.5;
        scratch.pos.y += scratch.ptr.y * 0.35;
        scratch.look.x -= scratch.ptr.x * 0.25;
        scratch.look.y -= scratch.ptr.y * 0.18;
      }
    }

    camera.position.copy(scratch.pos);
    camera.lookAt(scratch.look);

    if (!reducedMotion) {
      // Bank into the turns — the path weaves side to side, so rolling with
      // the tangent reads as flying rather than sliding.
      curves.pos.getTangent(u, scratch.tan);
      camera.rotateZ(-scratch.tan.x * 0.2);
    }

    // Widen the lens as speed picks up: a cheap, readable sense of thrust.
    const aspect = size.width / size.height;
    const base = aspect < 1 ? 52 : aspect < 1.5 ? 44 : 38;
    const speed = Math.min(Math.abs(journey.velocity), 3);
    const fov = base + (reducedMotion ? 0 : speed * 3.2);
    if (Math.abs(camera.fov - fov) > 0.01) {
      camera.fov = THREE.MathUtils.damp(camera.fov, fov, 6, dt);
      camera.updateProjectionMatrix();
    }
  });

  return null;
}
