import { create } from "zustand";

type GlobalStoreState = {
  isDarkMode: boolean;
  sidebarOpen: boolean;
};

type GlobalStoreActions = {
  toggleSidebar: () => void;
  closeSidebar: () => void;
  openSidebar: () => void;

  updateDarkMode: (state: boolean) => void;
};

type GlobalStore = GlobalStoreState & GlobalStoreActions;

type OnboardStoreState = {
  hasRegistered: boolean;
};

type OnboardStoreActions = {
  hasRegisteredOn: () => void;
};

type OnboardStore = OnboardStoreState & OnboardStoreActions;

export const useGlobalStore = create<GlobalStore>((set) => ({
  isDarkMode: true,

  sidebarOpen: true,

  toggleSidebar: () => set((state) => ({ ...state, sidebarOpen: !state.sidebarOpen })),

  closeSidebar: () => set((state) => ({ ...state, sidebarOpen: false })),

  openSidebar: () => set((state) => ({ ...state, sidebarOpen: true })),

  updateDarkMode: (newState) => set((state) => ({ ...state, isDarkMode: newState })),
}));

export const useOnboardStore = create<OnboardStore>((set) => ({
  hasRegistered: false,
  hasRegisteredOn: () => set((state) => ({ ...state, hasRegistered: true })),
}));
