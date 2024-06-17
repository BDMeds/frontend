"use client";

import { departments } from "@/lib/data/dashboard";
import { Department } from "@/lib/types";
import { useState } from "react";

const Reports = () => {
  const [department, setDepartment] = useState<Department | undefined>();

  return (
    <div className="space-y-4">
      <p className="font-medium">Select Department</p>

      <div className="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-4">
        {departments.map(({ dept, icon }, id) => (
          <div
            key={id}
            className="bg-white border duration-300 hover:shadow-xl hover:border-transparent rounded-lg p-3 cursor-pointer"
            onClick={() => setDepartment(dept)}
          >
            <div className="space-y-5">
              <div className="size-12 text-primary bg-primary/10 rounded-xl grid place-content-center">{icon}</div>
              <p className="font-semibold">{dept}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
