"use client";

import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import events from "./events";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { toastSuccess } from "@/lib/utils/toast";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";

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
  const [eventsData, setEventsData] = useState<any>(events);

  const handleSelect = ({ start, end }: { start: any; end: any }) => {
    toastSuccess(`Event from ${new Date(start).toLocaleString()} to ${new Date(end).toLocaleString()}`);
  };

  return (
    <div className="">
      <Calendar
        views={["day", "agenda", "work_week", "month"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={eventsData}
        style={{ height: "100vh" }}
        // onSelectEvent={(event) => alert(event.title)}
        onSelectSlot={handleSelect}
      />
    </div>
  );
};

export default BigCalendar;
