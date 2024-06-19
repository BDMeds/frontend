"use client";

import { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { CameraControls, OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Mesh } from "three";

function MeshComponent() {
  const fileUrl = "/models/teeth/scene.gltf";
  const mesh = useRef<Mesh>(null!);
  const gltf = useLoader(GLTFLoader, fileUrl);

  return (
    <mesh ref={mesh}>
      <primitive object={gltf.scene} />
    </mesh>
  );
}

const TeethModel = () => {
  return (
    <div className="flex justify-center items-center h-screen mt-5">
      <Canvas
        className="h-2xl w-2xl"
        camera={{ position: [0, -30, 0], fov: 5 }}
      >
        <OrbitControls enablePan={false} />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <MeshComponent />
      </Canvas>
    </div>
  );
};

export default TeethModel;
