"use client";

import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF, OrthographicCamera, Text, MeshTransmissionMaterial } from "@react-three/drei";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useControls } from "leva";

const Capsule = (props: JSX.IntrinsicElements["group"]) => {
  const { nodes: capsuleNodes } = useGLTF("models/capsule/capsule.glb");

  const { viewport } = useThree();

  const ref = useRef<THREE.Group<THREE.Object3DEventMap>>(null);

  const { x, y, z, scale, rotationX, rotationY, rotationZ, rotationSpeed } = useControls({
    x: 0,
    y: -1.11,
    z: 0,
    scale: 0.02,
    rotationX: -0.12,
    rotationY: 0,
    rotationZ: -0.32,
    rotationSpeed: {
      step: 0.01,
      value: 0.01,
      min: 0.01,
    },
  });

  const materialProps = useControls({
    thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },
    roughness: { value: 0, min: 0, max: 1, step: 0.1 },
    transmission: { value: 1, min: 0, max: 1, step: 0.1 },
    ior: { value: 1.2, min: 0, max: 3, step: 0.1 },
    chromaticAberration: { value: 0.02, min: 0, max: 1 },
    backside: { value: true },
  });

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <group {...props} dispose={null} scale={viewport.width / 7}>
      <OrthographicCamera
        makeDefault={false}
        far={100000}
        near={0}
        position={[3.733, -0.422, 8.4]}
        rotation={[0.175, 0.421, -0.072]}
        scale={0.01}
      />

      <Text fontSize={1.5} position={[0, 0, -1]} color="#5E2BFF" fontWeight={800} anchorX="center" anchorY="middle">
        All-In-One
      </Text>

      <group rotation={[rotationX, rotationY, rotationZ]} position={[x, y, z]} ref={ref} scale={scale}>
        <mesh {...capsuleNodes.Cube} position={[0, 35.053, 0]} scale={0.3}>
          <MeshTransmissionMaterial {...materialProps} />
        </mesh>
        <mesh {...capsuleNodes.Cube_2} rotation={[0, 0, Math.PI]} position={[0, -14.99, 0]} scale={0.3}>
          <MeshTransmissionMaterial {...materialProps} />
        </mesh>
      </group>
    </group>
  );
};

export default Capsule;
