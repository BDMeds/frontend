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
import useEventsStore from "@/lib/store/event.store";
import { mapAppointmentsToEvents } from "@/lib/helpers/fns";

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

  const { setEvents } = useEventsStore();

  useEffect(() => {
    if (appointments?.length! > 0) {
      const events = mapAppointmentsToEvents(appointments || [], session?.user!);

      const filteredEvents = events.filter((e) => e.end.getTime() > new Date().getTime());

      setEvents(filteredEvents);
    }
  }, [appointments]);

  return (
    <div className="space-y-4 bg-white text-black">
      <div className="bg-white dark:bg-white/10 rounded-2xl border dark:border-white/10 p-5 flex items-center justify-between">
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
