"use client";

import React, { useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { toastError } from "@/lib/utils/toast";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import { useModal } from "@/lib/providers/modal-provider";
import AppointmentModal from "./modal";
import useEventsStore, { EventType, useAppointment } from "@/lib/store/event.store";
import { useQuery } from "@tanstack/react-query";
import { getAppointments } from "@/lib/services/appointment.service";
import useUserInfo from "@/lib/hooks/useUserInfo";
import { mapAppointmentsToEvents } from "@/lib/helpers/fns";
import AppointmentInfoModal from "./modal/appointment-info";

const locales = { "en-US": enUS };

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

  const { update: updateAppointment } = useAppointment();

  const { user } = useUserInfo();

  const { data: appointments, refetch } = useQuery({
    queryKey: ["getAppointments"],
    queryFn: getAppointments,
  });

  useEffect(() => {
    if (appointments?.length! > 0) {
      const events = mapAppointmentsToEvents(appointments || [], user!);
      setEvents(events);
    }
  }, [appointments]);

  const handleSelect = ({ start, end }: { start: any; end: any }) => {
    // check if date selected is in the past
    const [now, startTime] = [new Date().getTime(), new Date(end).getTime()];

    const validTime = startTime > now;
    if (!validTime) {
      toastError("Invalid time/date range selected", { id: "invalid-time-range" });
      return;
    }

    updateAppointment({
      appointmentDate: new Date(start),
      startTime: start,
      endTime: end,
      mode: "online",
    });
    showModal(<AppointmentModal />);
  };

  const handleSelectEvent = (event: EventType) => {
    showModal(<AppointmentInfoModal event={event} refetchAppointments={refetch} />);
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
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelect}
      />
    </div>
  );
};

export default BigCalendar;
