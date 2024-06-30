"use client";

import TableComponent from "@/components/Common/Table";
import React, { useEffect, useState } from "react";
import columns from "./Table/columns";
import { useQuery } from "@tanstack/react-query";
import { getDoctors } from "@/lib/services/doctor.service";
import { departments } from "@/lib/data/dashboard";
import { Department } from "@/lib/types";
import { FiFilter } from "react-icons/fi";
import Select from "@/components/Common/Inputs/select";

const DoctorsPage = () => {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState<Department>(departments[0].dept);

  const {
    isPending: loading,
    data: doctors,
    refetch,
  } = useQuery({
    queryFn: () => getDoctors({ search, department }),
    queryKey: ["doctors"],
  });

  useEffect(() => {
    refetch();
  }, [department]);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4">
        <div className="space-y-1">
          <p className="font-bold flex items-center gap-1">
            <span>Filter</span> <FiFilter />
          </p>
          <input
            type="text"
            className="border rounded-lg w-[300px] p-2 dark:bg-[#282828] dark:border-white/10"
            placeholder="Start typing..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="w-[300px]">
          <Select
            data={
              departments.find((dep) => dep.dept === department) ? { value: department, label: department } : undefined
            }
            label="Department"
            onValueChange={(val) => setDepartment(val)}
            options={
              departments?.map((dep) => ({
                value: dep.dept,
                label: dep.dept,
              })) ?? []
            }
            placeholder="Select department"
          />
        </div>
      </div>

      <TableComponent columns={columns} data={doctors || []} loading={loading} filterInput={search} />
    </div>
  );
};

export default DoctorsPage;
