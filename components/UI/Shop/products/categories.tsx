"use client";

import Image from "next/image";

type Category = {
  name: string;
  image: string;
};

const medicineCategories = [
  {
    name: "All",
  },
  {
    name: "Pain Relief",
  },
  {
    name: "Cold & Flu",
  },
  {
    name: "Vitamins",
  },
  {
    name: "Skin Care",
  },
  {
    name: "Hair Care",
  },
  {
    name: "Oral Care",
  },
  {
    name: "Eye Care",
  },
  {
    name: "Diabetes Care",
  },
  {
    name: "Weight Loss",
  },
];

const Categories = () => {
  return (
    <div className="flex items-center gap-5 whitespace-nowrap pb-5">
      {medicineCategories.map((cat, id) => (
        <div
          key={id}
          className="h-24 min-w-44 overflow-hidden border text-white dark:border-white/10 rounded-lg relative"
        >
          <Image
            src={`/images/shop/categories/cat${((id + 1) % 4) + 1}.jpg`}
            alt="cat"
            width={300}
            height={300}
            className="object-cover -z-10 absolute top-0 left-0 w-full h-full"
          />

          <div className="w-full h-full bg-black/40 grid place-content-center px-4">
            <p>{cat.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
