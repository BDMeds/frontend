import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Capsule from "@/components/Common/3D/capsule";

const CapsuleModel = () => {
  return (
    <Canvas className="bg-transparent" style={{ height: "100vh" }}>
      <directionalLight intensity={2} position={[0, 2, 3]} />
      <Environment preset="city" />

      <OrbitControls enablePan={false} enableDamping={false} enableZoom={false} enableRotate={false} />
      <Capsule />
    </Canvas>
  );
};

export default CapsuleModel;
