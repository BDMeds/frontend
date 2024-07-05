"use client";
import { useGlobalStore, useTheme } from "@/lib/store/global.store";
import { CiSearch } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import NotificationDrop from "./dropdowns/notification";
import ProfileDrop from "./dropdowns/profile";
import { useRouter } from "next/navigation";
import { useDoctorInfo } from "@/lib/hooks/useUserInfo";
import { CgMoon, CgSun } from "react-icons/cg";

const DNavbar = () => {
  const { toggleSidebar } = useGlobalStore();
  const { updateDarkMode, isDark: isDarkMode } = useTheme();

  const router = useRouter();

  const { doctor } = useDoctorInfo();

  return (
    <nav className="bg-white dark:bg-dark w-full p-[0.5rem] border-b dark:border-white/10 flex z-[1000] items-center justify-between sticky top-0 left-0">
      <div className="flex items-center gap-2">
        <div className="size-8 grid place-content-center cursor-pointer duration-200 hover:bg-primary hover:text-white rounded-full border dark:border-white/10">
          <RxHamburgerMenu onClick={toggleSidebar} />
        </div>
        <div className="min-w-[18rem] px-3 sm:flex hidden items-center justify-between border dark:border-white/10 rounded-full">
          <input type="text" className="flex-grow text-sm py-2 bg-transparent" placeholder="Type to search" />
          <CiSearch />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="size-8 rounded-full border dark:border-white/10 grid place-content-center hover:bg-gray-100 duration-300 cursor-pointer">
          <p className="text-xs text-gray-500">EN</p>
        </div>
        <NotificationDrop />
        <div className="size-8 border border-gray-500/40 rounded-full grid place-content-center duration-300 hover:bg-gray-300 dark:hover:bg-white/10">
          {isDarkMode ? (
            <CgSun
              className="cursor-pointer dark:text-white text-black duration-300"
              onClick={() => updateDarkMode(false)}
            />
          ) : (
            <CgMoon
              className="cursor-pointer dark:text-white text-black duration-300"
              onClick={() => updateDarkMode(true)}
            />
          )}
        </div>
        {doctor && !doctor.kycDetails && (
          <button
            className="text-red-500 text-xs rounded-full p-2 bg-red-200/20 cursor-pointer hover:bg-red-200/50 duration-300"
            onClick={() => router.push("/settings?tab=kyc-verification")}
          >
            Not verified
          </button>
        )}
        <ProfileDrop />
      </div>
    </nav>
  );
};

export default DNavbar;
