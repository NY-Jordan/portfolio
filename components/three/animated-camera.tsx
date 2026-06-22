"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface AnimatedCameraProps {
  target?: [number, number, number];
  radius?: number;
  height?: number;
  baseAngle?: number;
}

export function AnimatedCamera({
  target = [0.8, 0.5, 0],
  radius = 6.2,
  height = 2.6,
  baseAngle = Math.PI / 4.2,
}: AnimatedCameraProps) {
  const { camera, pointer } = useThree();
  const elapsed = useRef(0);
  const lookAtTarget = useRef(new THREE.Vector3(...target));

  useFrame((_, delta) => {
    elapsed.current += delta;
    const t = elapsed.current;

    const angle = baseAngle + Math.sin(t * 0.06) * 0.08;

    const targetX = target[0] + Math.sin(angle) * radius + pointer.x * 0.25;
    const targetY = height + Math.sin(t * 0.12) * 0.08 - pointer.y * 0.12;
    const targetZ = target[2] + Math.cos(angle) * radius;

    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 2, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 2, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 2, delta);

    camera.lookAt(lookAtTarget.current);
  });

  return null;
}
