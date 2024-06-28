"use client";

import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF, OrthographicCamera } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useControls } from "leva";

type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.Mesh;
  };
  materials: {};
  // animations: GLTFAction[];
};

type ContextType = Record<string, React.ForwardRefExoticComponent<JSX.IntrinsicElements["mesh"]>>;

const Capsule = (props: JSX.IntrinsicElements["group"]) => {
  const ref = useRef<THREE.Group<THREE.Object3DEventMap>>(null);

  const { scene } = useGLTF("models/capsule/capsule.gltf");

  const { x, y, z, scale, rotationX, rotationY, rotationZ, rotateSpeed } = useControls({
    x: 0,
    y: -1.09,
    z: 0,
    scale: 1.6,
    rotationX: -0.12,
    rotationY: 0,
    rotationZ: -0.32,
    rotateSpeed: 0.05,
  });

  useFrame(() => {
    if (ref.current) ref.current.rotation.y += rotateSpeed;
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
        <primitive position={[x, y, z]} object={scene} scale={scale} />
      </group>
    </group>
  );
};

useGLTF.preload("models/capsule/capsule.gltf");

export default Capsule;
