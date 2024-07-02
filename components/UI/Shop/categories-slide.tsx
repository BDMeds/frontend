"use client";

import { medicineCategories } from "@/lib/data/shop";
import React, { useRef } from "react";

const MedicineCategories: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="px-5">
      <div className="relative flex items-center w-full overflow-hidden px-5">
        <button className="absolute -left-2 p-2 rounded-md z-10" onClick={() => scroll("left")}>
          {"<"}
        </button>
        <div className="flex overflow-x-auto hide-scroll scroll-smooth w-full" ref={containerRef}>
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
