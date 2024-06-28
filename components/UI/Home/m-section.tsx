"use client";

import Capsule from "@/components/Common/3D/capsule";
import { montserrat } from "@/lib/utils/fonts";
import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const FModel = () => {
  return (
    <div className="sm:min-h-screen md:mt-4 mt-10 grid md:grid-cols-2 gap-8 md:gap-0 container">
      <div className="flex items-center mt-44 md:mt-0">
        <p className={`lg:text-8xl ${montserrat.className} text-6xl font-extrabold md:px-6`}>
          Find The Best <span className="text-primary">Medical</span> Service for you
          <span className="text-primary">.</span>
        </p>
      </div>

      <div className="hidden sm:block">
        <Canvas className="bg-transparent" style={{ height: "100vh" }}>
          <directionalLight intensity={2} position={[0, 2, 3]} />
          {/* <Environment preset="city" /> */}

          <OrbitControls enablePan={false} enableDamping={false} enableZoom={false} enableRotate={false} />
          <Capsule />
        </Canvas>
      </div>
    </div>
  );
};

export default FModel;
