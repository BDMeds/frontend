"use client";

import { montserrat } from "@/lib/utils/fonts";
import { CgSearch } from "react-icons/cg";

const Hero = () => {
  return (
    <header className="h-[35rem] flex items-center">
      <div className="grid md:grid-cols-2 gap-10 container items-center">
        <div className="space-y-4">
          <h1
            className={`font-extrabold text-5xl ${montserrat.className} bg-clip-text bg-transparent bg-gradient-to-t from-gray-100 to-gray-800`}
          >
            BDShop
          </h1>
          <p>
            The internet&apos;s source for visuals. <br /> Powered by creators everywhere.
          </p>

          <div className="flex items-center gap-3 border bg-gray-100 px-3 rounded-md">
            <CgSearch />
            <input type="text" className="bg-transparent py-3 flex-grow" placeholder="Search medicines..." />
          </div>
        </div>

        <div className="grid place-content-center">
          <div className="size-80 border rounded-md p-3 grid grid-cols-2 gap-3">
            <div className="aspect-square border rounded-md"></div>
            <div className="aspect-square border rounded-md"></div>
            <div className="aspect-square border rounded-md"></div>
            <div className="aspect-square border rounded-md"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
