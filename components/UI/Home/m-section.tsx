"use client";

import Capsule from "@/components/Common/3D/capsule";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const FModel = () => {
  return (
    <div className="h-screen grid grid-cols-2 gap-4">
      <div className="border-4 border-red-500"></div>
      <div className="border-4">
        <Canvas>
          <OrbitControls enablePan={false} enableDamping={false} enableZoom={false} />
          <Capsule />
        </Canvas>
      </div>
    </div>
  );
};

export default FModel;
