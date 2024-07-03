"use client";

import { montserrat } from "@/lib/utils/fonts";
import { CgSearch } from "react-icons/cg";

const Hero = () => {
  return (
    <header className="h-[35rem] flex items-center">
      <div className="grid md:grid-cols-2 gap-10 container items-center">
        <div className="space-y-4">
          <h1
            className={`font-extrabold text-5xl ${montserrat.className} dark:bg-clip-text dark:text-transparent text-black bg-gradient-to-t dark:to-gray-100 dark:from-black`}
          >
            BDShop
          </h1>
          <p>
            The internet&apos;s source for visuals. <br /> Powered by creators everywhere.
          </p>

          <div className="flex items-center gap-3 border bg-gray-100 dark:bg-[#282828] px-3 dark:border-white/10 rounded-md">
            <CgSearch />
            <input type="text" className="bg-transparent py-3 flex-grow" placeholder="Search medicines..." />
          </div>
        </div>

        <div className="grid place-content-center">
          <div className="size-80 border dark:border-white/10 rounded-md p-3 grid grid-cols-2 gap-3">
            <div className="aspect-square border dark:border-white/10 rounded-md"></div>
            <div className="aspect-square border dark:border-white/10 rounded-md"></div>
            <div className="aspect-square border dark:border-white/10 rounded-md"></div>
            <div className="aspect-square border dark:border-white/10 rounded-md"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
