"use client";

import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import dummyEvents from "./events";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { toastSuccess } from "@/lib/utils/toast";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import { useModal } from "@/lib/providers/modal-provider";
import AppointmentModal from "./modal";
import useEventsStore, { EventType } from "@/lib/store/event.store";
import { useQuery } from "@tanstack/react-query";
import { getAppointments } from "@/lib/services/appointment.service";
import { AppointmentDocument, IUser } from "@/lib/types";
import useUserInfo from "@/lib/hooks/useUserInfo";
import { mapAppointmentsToEvents } from "@/lib/helpers/fns";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const BigCalendar = () => {
  const { showModal } = useModal();

  const { events, setEvents } = useEventsStore();

  const { user } = useUserInfo();

  const { data: appointments } = useQuery({
    queryKey: ["getAppoinments"],
    queryFn: getAppointments,
  });

  useEffect(() => {
    const events = mapAppointmentsToEvents(appointments || [], user!);
    setEvents(events);
  }, [appointments]);

  const handleSelect = ({ start, end }: { start: any; end: any }) => {
    toastSuccess(
      `Event from ${new Date(start).toLocaleString()} to ${new Date(
        end
      ).toLocaleString()}`
    );
    showModal(<AppointmentModal />);
  };

  return (
    <div className="">
      <Calendar
        views={["day", "agenda", "work_week", "month"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={events}
        style={{ height: "100vh" }}
        // onSelectEvent={(event) => alert(event.title)}
        onSelectSlot={handleSelect}
      />
    </div>
  );
};

export default BigCalendar;
