import useDropDown from "@/lib/hooks/useDropDown";
import useUserInfo from "@/lib/hooks/useUserInfo";
import { useTheme } from "@/lib/store/global.store";
import { fadeToBottomVariant } from "@/lib/utils/variants";
import { AnimatePresence, motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CgHome, CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";

const ProfileDrop = () => {
  const { dropdownRef: ref, isOpen, toggleDropdown } = useDropDown();
  const router = useRouter();

  const { user, loading } = useUserInfo();

  const { isDark: isDarkMode } = useTheme();

  return (
    <div className="relative">
      <div
        className={`size-8 rounded-full dark:border-white/10 border grid place-content-center ring-[2px] hover:ring-primary ring-transparent duration-300 cursor-pointer relative overflow-hidden ${
          loading && !isDarkMode ? "animate-skeleton" : "animate-skeleton-dark"
        }`}
        ref={ref}
        onClick={toggleDropdown}
      >
        {user && (
          <Image
            src={`${user.profilePicture}`}
            width={100}
            height={100}
            alt="profile"
            className="w-full h-full object-cover absolute top-0 left-0"
          />
        )}
      </div>

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            {...fadeToBottomVariant}
            ref={ref}
            className="absolute top-12 right-0 min-w-60 bg-white dark:bg-[#282828] shadow-2xl rounded-md pt-5 overflow-hidden space-y-4"
          >
            <div className="grid place-content-center text-center space-y-2">
              <div
                className={`size-20 rounded-full overflow-hidden mx-auto relative ${
                  !isDarkMode ? "animate-skeleton" : "animate-skeleton-dark"
                }`}
              >
                {user && (
                  <Image
                    src={`${user?.profilePicture}`}
                    width={100}
                    height={100}
                    alt="profile"
                    className="w-full h-full object-cover absolute top-0 left-0"
                  />
                )}
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-200">{user?.email}</p>
            </div>

            <ul className="grid grid-cols-2 dark:border-white/10 border-t">
              <li
                className="py-2 cursor-pointer duration-300 hover:bg-gray-100 dark:hover:bg-[#3d3d3d] flex items-center gap-1 justify-center text-gray-500 dark:text-gray-200 text-center dark:border-white/10 border-r"
                onClick={() => (router.push("/settings?tab=general"), toggleDropdown())}
              >
                <span>Setting</span>
                <CgProfile />
              </li>
              <div>
                <li
                  className="py-2 cursor-pointer duration-300 hover:bg-gray-100 dark:hover:bg-[#3d3d3d] flex items-center gap-1 justify-center text-gray-500 dark:text-gray-200 text-center"
                  onClick={() => (router.push("/"), toggleDropdown())}
                >
                  <span>Home</span>
                  <CgHome />
                </li>
              </div>
              <li
                className="py-2 cursor-pointer duration-300 hover:bg-gray-100 dark:hover:bg-[#3d3d3d] flex items-center gap-1 justify-center text-gray-500 dark:text-gray-200 text-center col-span-2 dark:border-white/10 border-t"
                onClick={() => signOut()}
              >
                <span>Logout</span>
                <IoIosLogOut />
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileDrop;
