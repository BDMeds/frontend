"use client";
import { useGlobalStore } from "@/lib/store/global.store";
import { RxHamburgerMenu } from "react-icons/rx";

const DNavbar = () => {
  const { toggleSidebar } = useGlobalStore();

  return (
    <nav className="bg-white w-full p-[0.7rem] border-b flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="size-8 grid place-content-center cursor-pointer duration-200 hover:bg-primary hover:text-white rounded-full border">
          <RxHamburgerMenu onClick={toggleSidebar} />
        </div>
      </div>
    </nav>
  );
};

export default DNavbar;
