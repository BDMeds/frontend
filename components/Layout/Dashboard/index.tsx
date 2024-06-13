"use client";
import { useGlobalStore } from "@/lib/store/global.store";
import DNavbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toastError } from "@/lib/utils/toast";
import { useEffect } from "react";

type Props = { children: Readonly<React.ReactNode> };

const DashboardWrapper = ({ children }: Props) => {
  const { sidebarOpen } = useGlobalStore();

  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      toastError("You need to login to access this page", { id: "unauthorized-login" });
      router.push("/account/login");
    }
  }, [session, status]);

  return (
    <main>
      <div className="flex">
        <Sidebar />
        <div className={`duration-300 flex-grow relative ${sidebarOpen ? "xl:ml-[280px] md:ml-[260px]" : "ml-[60px]"}`}>
          <DNavbar />
          {children}
        </div>
      </div>
    </main>
  );
};

export default DashboardWrapper;
