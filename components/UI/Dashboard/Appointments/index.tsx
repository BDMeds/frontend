"use client";

import Loader from "@/components/Common/Loaders";
import dynamic from "next/dynamic";
import { format } from "date-fns";
import { useModal } from "@/lib/providers/modal-provider";
import AppointmentModal from "./modal";
import { GoPlus } from "react-icons/go";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { getAppointments } from "@/lib/services/appointment.service";
import { useEffect } from "react";

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
  const { showModal } = useModal();
  const { data: session } = useSession();

  const { data: appointments, isPending: loading } = useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointments,
    enabled: Boolean(session?.user),
  });

  useEffect(() => {
    if (appointments && !loading) {
      console.log({ appointments });
    }
  }, [appointments, loading]);

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border p-5 flex items-center justify-between">
        <p>{format(new Date(), "MMMM, dd")}</p>

        {session?.user.role === "patient" && (
          <button
            className="text-primary border text-sm border-primary flex items-center gap-1 duration-300 hover:bg-primary/10 rounded-xl px-4 py-[6px] font-semibold"
            onClick={() => showModal(<AppointmentModal />)}
          >
            <span>Add Appointment</span>
            <GoPlus />
          </button>
        )}
      </div>

      <div className="">
        <BigCalendar />
      </div>
    </div>
  );
};

export default Appointment;
