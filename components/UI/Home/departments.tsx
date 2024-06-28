"use client";

import { departments } from "@/lib/data/home";
import Image from "next/image";
import { useRef } from "react";
import { CgChevronUp, CgChevronDown } from "react-icons/cg";

const Departments = () => {
  const scrollableRef = useRef<HTMLDivElement>(null);

  const scrollUp = () => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollBy({
        top: -500,
        behavior: "smooth",
      });
    }
  };

  const scrollDown = () => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollBy({
        top: 500,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="my-20 grid md:grid-cols-2 gap-10 container">
      <div className="flex items-center justify-center md:justify-start">
        <div className="space-y-4 text-center md:text-start">
          <p className="font-semibold uppercase">Supported Departments</p>
          <h3 className="font-extrabold text-5xl text-primary text-center md:text-start">For Your Health</h3>
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <div className="space-y-1">
          <div
            className="sm:p-2 p-1 border dark:border-white/10 rounded-xl hover:text-primary cursor-pointer"
            onClick={scrollUp}
          >
            <CgChevronUp size={28} />
          </div>
          <div
            className="sm:p-2 p-1 border dark:border-white/10 rounded-xl hover:text-primary cursor-pointer"
            onClick={scrollDown}
          >
            <CgChevronDown size={28} />
          </div>
        </div>
        <div className="flex-grow relative after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-[100px] after:bg-gradient-to-b after:from-[#f8f8f8] dark:after:from-black before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-[100px] before:bg-gradient-to-b before:to-[#f8f8f8] dark:before:to-black before:from-transparent">
          <div
            className="grid grid-cols-2 gap-4 py-10 max-h-[30rem] overflow-y-auto hide-scroll scroll-smooth"
            ref={scrollableRef}
          >
            {departments.map(({ image, name }, id) => (
              <div key={id} className="bg-white dark:bg-white/10 shadow-lg rounded-xl text-center p-10 space-y-2">
                <div className="grid place-content-center">
                  <Image src={`/images/departments/${image}`} alt="department" width={100} height={100} />
                </div>

                <p className="font-semibold">{name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Departments;
