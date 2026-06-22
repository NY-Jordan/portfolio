"use client";

import { useMemo } from "react";
import { useFBX, Center } from "@react-three/drei";
import * as THREE from "three";

const MODEL_PATH = "/images/NeatFreakDesk.fbx";
const TARGET_SIZE = 4;

interface DeskModelProps {
  position?: [number, number, number];
  rotationY?: number;
}

export function DeskModel({
  position = [0, 0, 0],
  rotationY = 0,
}: DeskModelProps) {
  const fbx = useFBX(MODEL_PATH);

  const { model, scale } = useMemo(() => {
    const clone = fbx.clone(true);

    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        const material = child.material;
        if (Array.isArray(material)) {
          material.forEach((mat) => {
            if (mat instanceof THREE.MeshPhongMaterial) mat.shininess = 12;
          });
        } else if (material instanceof THREE.MeshPhongMaterial) {
          material.shininess = 12;
        }
      }
    });

    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const maxDimension = Math.max(size.x, size.y, size.z) || 1;

    return { model: clone, scale: TARGET_SIZE / maxDimension };
  }, [fbx]);

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <Center>
        <primitive object={model} scale={scale} />
      </Center>
    </group>
  );
}

useFBX.preload(MODEL_PATH);
