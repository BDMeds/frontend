import { create } from "zustand";

type GlobalStoreState = {
  sidebarOpen: boolean;
};

type GlobalStoreActions = {
  toggleSidebar: () => void;
  closeSidebar: () => void;
  openSidebar: () => void;
};

type GlobalStore = GlobalStoreState & GlobalStoreActions;

export const useGlobalStore = create<GlobalStore>((set) => ({
  sidebarOpen: true,

  toggleSidebar: () => set((state) => ({ ...state, sidebarOpen: !state.sidebarOpen })),

  closeSidebar: () => set((state) => ({ ...state, sidebarOpen: false })),

  openSidebar: () => set((state) => ({ ...state, sidebarOpen: true })),
}));
