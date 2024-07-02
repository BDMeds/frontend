"use client";

import { departments } from "@/lib/data/dashboard";
import { departments as depWithImage } from "@/lib/data/home";
import useSlider from "@/lib/hooks/useSlider2";
import useUserInfo from "@/lib/hooks/useUserInfo";
import { getDoctors } from "@/lib/services/doctor.service";
import { Department } from "@/lib/types";
import { montserrat } from "@/lib/utils/fonts";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CgCalendar } from "react-icons/cg";
import { IoHeartOutline } from "react-icons/io5";

const Type1DoctorsPage = () => {
  const { user } = useUserInfo();

  const [depName, setDepName] = useState(depWithImage[0].name);
  const [allDepartments, setDepartments] = useState(depWithImage);
  const [search, setSearch] = useState("");

  const [department, setDepartment] = useState<Department>(departments[0].dept);

  const { containerRef, scroll } = useSlider();

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
    <div className="flex">
      <div className="space-y-5 flex-grow -mt-4">
        <div className="flex items-center justify-between">
          <div>
            <p className={`font-semibold text-2xl ${montserrat.className}`}>Welcome {user?.firstName}!</p>
            <p className="text-gray-600 dark:text-gray-200">
              In this section, you can find doctors under any category.
            </p>
          </div>

          <p className="border rounded-full flex text-sm items-center gap-1 py-1 px-2 font-semibold border-gray-400/50 dark:border-white/10">
            <CgCalendar className="text-primary" />
            <span>{format(new Date(), "MMMM dd, yyyy")}</span>
          </p>
        </div>

        <div className="flex w-full gap-6 text-center" ref={containerRef}>
          {allDepartments.map((deps, index) => (
            <div
              className={`flex-shrink-0 border duration-300 select-none cursor-pointer min-h-24 px-5 grid place-content-center rounded-md whitespace-nowrap ${
                deps.name === depName ? "bg-primary/10 border-transparent" : "bg-white"
              }`}
              onClick={() => setDepName(deps.name)}
              key={index}
            >
              <div className="space-y-1">
                <div className="grid place-content-center">
                  <Image src={`/images/departments/${deps.image}`} alt={deps.name} width={40} height={40} />
                </div>
                <p>{deps.name}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <p className="font-bold">
            Recommended <span className="capitalize">{depName}</span>
          </p>

          <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 gap-3">
            {Array.from({ length: 10 }).map((_, id) => (
              <div className="min-h-[14rem] border rounded-md bg-white p-1" key={id}>
                <div className="h-[60%] bg-gray-300 flex items-end justify-center rounded-md">
                  <Image src={`/images/doctors/main_doc${((id + 1) % 3) + 1}.png`} alt="doc" width={100} height={100} />
                </div>
                <div className="h-[40%] px-2 flex items-center justify-between">
                  <div className="space-y-2">
                    <div>
                      <p className="font-bold">Dr. Kenny Jim</p>
                      <p className="text-sm">Cardiologist</p>
                    </div>

                    <p className="font-bold text-primary">$24/session</p>
                  </div>
                  <IoHeartOutline className="cursor-pointer" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`duration-300 md:min-w-[30rem]`}></div>
    </div>
  );
};

export default Type1DoctorsPage;
