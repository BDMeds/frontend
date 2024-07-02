"use client";

import { ReactNode, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster as SonnerToaster } from "sonner";
import AuthProvider from "./auth-provider";
import { SessionProvider } from "next-auth/react";
import { ModalProvider } from "./modal-provider";
import { useTheme } from "../store/global.store";
import { Leva } from "leva";

export const queryClient = new QueryClient();

const isProduction = process.env.NODE_ENV === "production";

const Providers = ({ children }: { children: ReactNode }) => {
  const { isDark: isDarkMode } = useTheme();

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
