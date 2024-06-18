import dummyEvents from "@/components/UI/Dashboard/Appointments/events";
import { create } from "zustand";

export type EventType = {
  id: number;
  title: string;
  description?: string;
  allDay?: boolean;
  start: Date;
  end: Date;
};

type EventStore = {
  events: EventType[];
  addToEvents: (event: EventType) => void;
  setEvents: (events: EventType[]) => void;
};

const useEventsStore = create<EventStore>((set) => ({
  events: dummyEvents,
  addToEvents: (event) => set((state) => ({ ...state, events: [...state.events, event] })),
  setEvents: (event) => set((state) => ({ ...state, event })),
}));

type Appointment = {
  appointmentDate: string | Date;
  startTime: string | Date;
  endTime: string | Date;
  mode: "online" | "physical";
} & {};

type AppointmentStore = {
  appointment: Appointment;

  update: (data: Appointment) => void;
};

export const useAppointment = create<AppointmentStore>((set) => ({
  appointment: {
    appointmentDate: "",
    startTime: "",
    endTime: "",
    mode: "online",
  },

  update: (appointment) => set({ appointment }),
}));

export default useEventsStore;
