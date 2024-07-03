"use client";

import { medicineCategories } from "@/lib/data/shop";
import useSlider from "@/lib/hooks/useSlider2";
import React, { useRef } from "react";

const MedicineCategories: React.FC = () => {
  const { containerRef, scroll } = useSlider();

  return (
    <div className="px-5 bg-[#f8f8f8] dark:bg-black z-[100] sticky top-14">
      <div className="relative flex items-center w-full overflow-hidden px-5">
        <button className="absolute -left-2 p-2 rounded-md z-10" onClick={() => scroll("left")}>
          {"<"}
        </button>
        <div className="flex overflow-x-auto hide-scroll text-sm scroll-smooth w-full" ref={containerRef}>
          {medicineCategories.map((category, index) => (
            <div
              className="flex-shrink-0 p-2 m-2 bg-gray-100 dark:bg-[#282828] rounded-md whitespace-nowrap"
              key={index}
            >
              {category}
            </div>
          ))}
        </div>
        <button className="absolute -right-2 p-2 rounded-md z-10" onClick={() => scroll("right")}>
          {">"}
        </button>
      </div>
    </div>
  );
};

export default MedicineCategories;
