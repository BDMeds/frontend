"use client";
import { useGlobalStore } from "@/lib/store/global.store";
import DNavbar from "./Navbar";
import Sidebar from "./Sidebar";

type Props = { children: Readonly<React.ReactNode> };

const DashboardWrapper = ({ children }: Props) => {
  const { sidebarOpen } = useGlobalStore();

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
