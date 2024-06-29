import { create } from "zustand";
import { persist } from "zustand/middleware";

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

// -------------------------
// THEME
// -------------------------
type ThemeStoreState = {
  isDark: boolean;
};

type ThemeStoreActions = {
  updateDarkMode: (state: boolean) => void;
};

type ThemeStore = ThemeStoreState & ThemeStoreActions;

export const useTheme = create<ThemeStore>()(
  persist(
    (set) => ({
      isDark: true,
      updateDarkMode: (newState) => set((state) => ({ ...state, isDark: newState })),
    }),
    { name: "theme" }
  )
);

// -------------------------
// ONBOARDING
// -------------------------

type OnboardStoreState = {
  hasRegistered: boolean;
};

type OnboardStoreActions = {
  hasRegisteredOn: () => void;
};

type OnboardStore = OnboardStoreState & OnboardStoreActions;

export const useOnboardStore = create<OnboardStore>((set) => ({
  hasRegistered: false,
  hasRegisteredOn: () => set((state) => ({ ...state, hasRegistered: true })),
}));
