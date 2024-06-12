"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster as SonnerToaster } from "sonner";
import AuthProvider from "./auth-provider";
import { SessionProvider } from "next-auth/react";

const queryClient = new QueryClient();

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
      <SonnerToaster
        toastOptions={{
          style: {
            backgroundColor: "#131921",
            color: "white",
            fontSize: "14px",
            borderColor: "#181f29",
          },
        }}
      />
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
    </SessionProvider>
  );
};

export default Providers;
