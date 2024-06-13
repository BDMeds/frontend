import Image from "next/image";

const Construction = () => {
  return (
    <div className="min-h-screen grid place-content-center">
      <div className="space-y-4">
        <div className="grid place-content-center">
          <Image src={"/images/construction.svg"} alt="construction" width={500} height={500} />
        </div>
        <div className="space-y-2 text-center">
          <p className="text-3xl font-bold">Under Construction</p>
          <p className="text-lg text-zinc-500">We are working on this page, check back later</p>
        </div>
      </div>
    </div>
  );
};

export default Construction;
