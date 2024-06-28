"use client";

import Capsule from "@/components/Common/3D/capsule";
import Button from "@/components/Common/Button";
import { montserrat } from "@/lib/utils/fonts";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";

const FModel = () => {
  return (
    <div className="sm:min-h-screen md:mt-4 mt-10 grid md:grid-cols-2 gap-8 md:gap-0 container">
      <div className="flex items-center h-screen sm:h-auto">
        <div className="space-y-7">
          <p className={`lg:text-7xl leading-[1.1] sm:leading-normal ${montserrat.className} text-6xl font-extrabold`}>
            Find The Best <span className="text-primary">Medical</span> Service for you
            <span className="text-primary">.</span>
          </p>

          <div className="w-fit">
            <Link href={"/account/register"}>
              <Button text="Get Started" icon={<LuChevronRight />} variant="filled" size="medium" />
            </Link>
          </div>
        </div>
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
