"use client";
import Sidebar from "./Sidebar";

type Props = { children: Readonly<React.ReactNode> };

const DashboardWrapper = ({ children }: Props) => {
  return (
    <main>
      <div className="flex">
        <Sidebar />
        <div className="flex-grow xl:ml-[280px] md:ml-[260px]">{children}</div>
      </div>
    </main>
  );
};

export default DashboardWrapper;
