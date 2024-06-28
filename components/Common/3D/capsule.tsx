"use client";

import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF, OrthographicCamera, useTexture } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useControls } from "leva";
import { TextureLoader } from "three";

type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.Mesh;
  };
  materials: {};
  // animations: GLTFAction[];
};

const Capsule = (props: JSX.IntrinsicElements["group"]) => {
  const gltf = useLoader(GLTFLoader, "models/capsule/capsule.gltf");

  const ref = useRef<THREE.Group<THREE.Object3DEventMap>>(null);

  const [colorMap, displacementMap, normalMap, roughnessMap, aoMap] = useLoader(TextureLoader, [
    "textures/stone/PavingStones092_1K-JPG_Color.jpg",
    "textures/stone/PavingStones092_1K-JPG_Displacement.jpg",
    "textures/stone/PavingStones092_1K-JPG_NormalDX.jpg",
    "textures/stone/PavingStones092_1K-JPG_Roughness.jpg",
    "textures/stone/PavingStones092_1K-JPG_AmbientOcclusion.jpg",
  ]);

  const { x, y, z, scale, rotationX, rotationY, rotationZ, rotationSpeed } = useControls({
    x: 0,
    y: -1.09,
    z: 0,
    scale: 1.6,
    rotationX: -0.12,
    rotationY: 0,
    rotationZ: -0.32,
    rotationSpeed: {
      step: 0.01,
      value: 0.05,
      min: 0.01,
    },
  });

  gltf.scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material.map = colorMap;
      child.material.displacementMap = displacementMap;
      child.material.normalMap = normalMap;
      child.material.roughnessMap = roughnessMap;
      child.material.aoMap = aoMap;
      child.material.needsUpdate = true;
    }
  });

  useFrame(() => {
    if (ref.current) ref.current.rotation.y += rotationSpeed;
  });

  return (
    <group {...props} dispose={null}>
      <directionalLight intensity={0.7} rotation={[-0.616, 0.76, 0.799]} scale={0.01} />

      <OrthographicCamera
        makeDefault={false}
        far={100000}
        near={0}
        position={[3.733, -0.422, 8.4]}
        rotation={[0.175, 0.421, -0.072]}
        scale={0.01}
      />

      <group rotation={[rotationX, rotationY, rotationZ]} ref={ref}>
        <primitive position={[x, y, z]} object={gltf.scene} scale={scale} />
      </group>
    </group>
  );
};

useGLTF.preload("models/capsule/capsule.gltf");

export default Capsule;
