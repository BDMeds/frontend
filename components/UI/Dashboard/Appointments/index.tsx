"use client";

import Loader from "@/components/Common/Loaders";
import dynamic from "next/dynamic";
import { format } from "date-fns";

const BigCalendar = dynamic(() => import("./calender"), {
  ssr: false,
  loading: () => (
    <div className="grid place-content-center min-h-[10rem] text-center">
      <div className="space-y-2">
        <div className="grid place-content-center">
          <Loader />
        </div>

        <p className="text-sm">Calendar loading...</p>
      </div>
    </div>
  ),
});

const Appointment = () => {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border p-5 flex items-center justify-between">
        <p>{format(new Date(), "MMMM, dd")}</p>

        <button className="text-primary border text-sm border-primary duration-300 hover:bg-primary/10 rounded-xl px-4 py-[6px] font-semibold">
          Add new schedule
        </button>
      </div>

      <div className="">
        <BigCalendar />
      </div>
    </div>
  );
};

export default Appointment;
