"use client";

import { useQuery } from "@tanstack/react-query";
import Product from "./product";
import { getMedicines } from "@/lib/services/medicine.service";

const MedicinesDisplay = () => {
  const { data: medicines, isPending: loading } = useQuery({ queryFn: getMedicines, queryKey: ["medicines"] });

  return (
    <div className="container grid grid-cols-5 gap-4">
      {loading ? (
        <>
          {Array.from({ length: 8 }).map((_, id) => (
            <div
              key={id}
              className="p-10 border animate-skeleton dark:border-transparent min-h-[18rem] rounded-lg dark:hover:rounded-b-none duration-300 relative m-over overflow-hidden"
            ></div>
          ))}
        </>
      ) : (
        <>
          {medicines && medicines.length > 0 ? (
            <>
              {medicines.map((medicine, id) => (
                <Product key={id} {...medicine} />
              ))}
            </>
          ) : (
            <div className="text-center p-10">
              <p>No product for now. Please visit later.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MedicinesDisplay;
