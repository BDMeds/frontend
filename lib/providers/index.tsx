"use client";

import { ReactNode, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster as SonnerToaster } from "sonner";
import AuthProvider from "./auth-provider";
import { SessionProvider } from "next-auth/react";
import { ModalProvider } from "./modal-provider";
import { useTheme } from "../store/global.store";
import Lenis from "lenis";
import { Leva } from "leva";

export const queryClient = new QueryClient();

const isProduction = process.env.NODE_ENV === "production";

const Providers = ({ children }: { children: ReactNode }) => {
  const { isDark: isDarkMode } = useTheme();

  useEffect(() => {
    // SMOOTH SCROLL
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // DARK MODE
    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    // updateDarkMode(darkModeMediaQuery.matches);

    const darkModeListener = (event: MediaQueryListEvent) => {
      // if (
      //   localStorage.theme === "dark" ||
      //   (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
      // ) {
      //   document.documentElement.classList.add("dark");
      // } else {
      //   document.documentElement.classList.remove("dark");
      // }
      // // Whenever the user explicitly chooses light mode
      // localStorage.theme = "light";
      // // Whenever the user explicitly chooses dark mode
      // localStorage.theme = "dark";
      // // Whenever the user explicitly chooses to respect the OS preference
      // localStorage.removeItem("theme");
      // updateDarkMode(event.matches);
    };

    // darkModeMediaQuery.addEventListener("change", darkModeListener);

    // return () => {
    //   darkModeMediaQuery.removeEventListener("change", darkModeListener);
    // };
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <SonnerToaster
          toastOptions={{
            style: {
              backgroundColor: "#fff",
              color: "black",
              fontSize: "14px",
              borderColor: "#686868",
            },
          }}
        />
        <AuthProvider>
          <Leva hidden={isProduction} />
          <ModalProvider>{children}</ModalProvider>
        </AuthProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default Providers;
