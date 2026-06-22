"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment } from "@react-three/drei";
import * as THREE from "three";

import { DeskModel } from "@/components/three/desk-model";
import { AnimatedCamera } from "@/components/three/animated-camera";

const DESK_POSITION: [number, number, number] = [0.9, 0, -0.4];
const DESK_ROTATION_Y = THREE.MathUtils.degToRad(-28);
const CAMERA_TARGET: [number, number, number] = [0.7, 0.6, -0.2];

export function DeskScene() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      gl={{ antialias: true }}
      camera={{ fov: 32, position: [5.5, 2.8, 4.5] }}
    >
      <color attach="background" args={["#0a0a0a"]} />
      <fog attach="fog" args={["#0a0a0a", 7, 15]} />

      <ambientLight intensity={0.4} />
      <directionalLight
        castShadow
        position={[3, 6, 2]}
        intensity={1.5}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={15}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
      />
      <pointLight position={[-3, 2.2, 2]} intensity={6} color="#ffffff" />
      <pointLight position={[3, 1.5, -3]} intensity={3} color="#cfcfd6" />

      <Suspense fallback={null}>
        <DeskModel position={DESK_POSITION} rotationY={DESK_ROTATION_Y} />
        <Environment preset="studio" environmentIntensity={0.4} />
      </Suspense>

      <ContactShadows
        position={[DESK_POSITION[0], -0.02, DESK_POSITION[2]]}
        opacity={0.55}
        scale={9}
        blur={2.2}
        far={4}
      />

      <AnimatedCamera target={CAMERA_TARGET} radius={5.8} height={2.6} />
    </Canvas>
  );
}
