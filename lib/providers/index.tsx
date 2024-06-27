"use client";

import { ReactNode, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster as SonnerToaster } from "sonner";
import AuthProvider from "./auth-provider";
import { SessionProvider } from "next-auth/react";
import { ModalProvider } from "./modal-provider";
import { useGlobalStore } from "../store/global.store";

export const queryClient = new QueryClient();

const Providers = ({ children }: { children: ReactNode }) => {
  const { updateDarkMode } = useGlobalStore();

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    updateDarkMode(darkModeMediaQuery.matches);

    const darkModeListener = (event: MediaQueryListEvent) => {
      // if (event.matches) {
      //   document.body.classList.add("dark");
      // } else {
      //   document.body.classList.remove("dark");
      // }

      updateDarkMode(event.matches);
    };

    darkModeMediaQuery.addEventListener("change", darkModeListener);

    return () => {
      darkModeMediaQuery.removeEventListener("change", darkModeListener);
    };
  }, []);

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
          <ModalProvider>{children}</ModalProvider>
        </AuthProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default Providers;
