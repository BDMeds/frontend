"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster as SonnerToaster } from "sonner";

const queryClient = new QueryClient();

const Providers = ({ children }: { children: ReactNode }) => {
  return (
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
      {children}
    </QueryClientProvider>
  );
};

export default Providers;
