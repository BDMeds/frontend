import useDropDown from "@/lib/hooks/useDropDown";
import { fadeToBottomVariant } from "@/lib/utils/variants";
import { AnimatePresence, motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CgProfile } from "react-icons/cg";
import { CiSettings } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";

const ProfileDrop = () => {
  const { dropdownRef: ref, isOpen, toggleDropdown } = useDropDown();
  const router = useRouter();

  const { data: session } = useSession();

  return (
    <div className="relative">
      <div
        className="size-8 rounded-full border grid place-content-center ring-[2px] hover:ring-primary ring-transparent duration-300 cursor-pointer relative overflow-hidden"
        ref={ref}
        onClick={toggleDropdown}
      >
        <Image
          src={`${session?.user.profilePicture}`}
          width={100}
          height={100}
          alt="profile"
          className="w-full h-full object-cover absolute top-0 left-0"
        />
      </div>

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            {...fadeToBottomVariant}
            ref={ref}
            className="absolute top-12 right-0 min-w-60 bg-white shadow-2xl rounded-md pt-5 overflow-hidden space-y-4"
          >
            <div className="grid place-content-center text-center space-y-2">
              <div className="size-20 rounded-full overflow-hidden mx-auto relative">
                <Image
                  src={`${session?.user.profilePicture}`}
                  width={100}
                  height={100}
                  alt="profile"
                  className="w-full h-full object-cover absolute top-0 left-0"
                />
              </div>

              <p className="text-xs text-gray-500">{session?.user.email}</p>
            </div>

            <ul className="grid grid-cols-2 border-t">
              <li
                className="py-2 cursor-pointer duration-300 hover:bg-gray-100 flex items-center gap-1 justify-center text-gray-500 text-center border-r"
                onClick={() => (router.push("/settings?tab=profile"), toggleDropdown())}
              >
                <span>Profile</span>
                <CgProfile />
              </li>
              <div>
                <li
                  className="py-2 cursor-pointer duration-300 hover:bg-gray-100 flex items-center gap-1 justify-center text-gray-500 text-center"
                  onClick={() => (router.push("/settings"), toggleDropdown())}
                >
                  <span>Settings</span>
                  <CiSettings />
                </li>
              </div>
              <li
                className="py-2 cursor-pointer duration-300 hover:bg-gray-100 flex items-center gap-1 justify-center text-gray-500 text-center col-span-2 border-t"
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
