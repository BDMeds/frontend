"use client";
import { useGlobalStore } from "@/lib/store/global.store";
import DNavbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toastError } from "@/lib/utils/toast";
import { useEffect } from "react";

type Props = { children: Readonly<React.ReactNode> };

const AdminDashboardWrapper = ({ children }: Props) => {
  const { sidebarOpen } = useGlobalStore();

  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      toastError("You need to login to access this page", { id: "unauthorized-login" });
      router.push("/account/login");
    }

    if (status === "authenticated" && !session?.user?.role.includes("admin")) {
      toastError("You are not authorized to access this page", { id: "unauthorized" });
      router.push("/");
    }
  }, [session, status]);

  return (
    <main>
      <div className="flex">
        <Sidebar />
        <div className={`duration-300 flex-grow relative ${sidebarOpen ? "xl:ml-[280px] md:ml-[260px]" : "ml-[60px]"}`}>
          <DNavbar />
          <div className="mt-[2.5rem] px-5">{children}</div>
        </div>
      </div>
    </main>
  );
};

export default AdminDashboardWrapper;
