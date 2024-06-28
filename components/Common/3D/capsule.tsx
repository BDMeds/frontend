"use client";

import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF, OrthographicCamera, useTexture, Text, MeshTransmissionMaterial } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useControls } from "leva";
import { TextureLoader } from "three";

const Capsule = (props: JSX.IntrinsicElements["group"]) => {
  const { nodes, scene } = useGLTF("models/capsule/capsule.gltf");

  const { viewport } = useThree();

  const ref = useRef<THREE.Group<THREE.Object3DEventMap>>(null);

  const { x, y, z, scale, rotationX, rotationY, rotationZ, rotationSpeed } = useControls({
    x: 0,
    y: -1.11,
    z: 0,
    scale: {
      step: 0.25,
      value: 1,
      min: 1,
    },
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

      {/* 
      <Text fontSize={1.5} position={[0, 0, -1]} color="#5E2BFF" fontWeight={800} anchorX="center" anchorY="middle">
        All-In-One
      </Text> */}

      <group rotation={[rotationX, rotationY, rotationZ]} position={[x, y, z]} ref={ref} scale={scale}>
        {/* <primitive object={scene} /> */}
        <mesh {...nodes.Capsule}>
          <MeshTransmissionMaterial {...materialProps} />
        </mesh>
      </group>
    </group>
  );
};

export default Capsule;
