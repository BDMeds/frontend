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
};

const useEventsStore = create<EventStore>((set) => ({
  events: [],
  addToEvents: (event) =>
    set((state) => ({ ...state, events: [...state.events, event] })),
  setEvents: (event) => set((state) => ({ ...state, event })),
}));

export default useEventsStore;
