import { create } from "zustand";

export type EventType = {
  id: string;
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

  updateData: <K extends keyof EventType>(key: K, value: EventType[K]) => void;
};

const useEventsStore = create<EventStore>((set) => ({
  events: [],

  addToEvents: (event) => set((state) => ({ ...state, events: [...state.events, event] })),
  setEvents: (events) => set((state) => ({ ...state, events })),

  updateData: (key, value) => set((state) => ({ ...state, [key]: value })),
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
