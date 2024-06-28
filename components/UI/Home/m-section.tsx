"use client";

import Capsule from "@/components/Common/3D/capsule";
import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const FModel = () => {
  return (
    <div>
      {/* className="min-h-screen md:mt-4 mt-10 flex flex-col-reverse md:grid grid-cols-2 gap-8 container" */}
      <div className="min-h-screen">
        <Canvas style={{ backgroundColor: "transparent", width: "100%", height: "100vh" }}>
          <directionalLight intensity={0.7} rotation={[-0.616, 0.76, 0.799]} scale={0.01} />

          <OrbitControls enablePan={false} enableDamping={false} enableZoom={false} enableRotate={false} />
          <Capsule />
        </Canvas>
      </div>
      <div className="flex items-center">
        <p className="lg:text-8xl md:text-7xl text-4xl font-extrabold text-center">
          Find The Best <span className="text-primary">Medical Service</span> you won&apos;t find anywhere else
          <span className="text-primary">.</span>
        </p>
      </div>
    </div>
  );
};

export default FModel;
