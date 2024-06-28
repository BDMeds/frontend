import { IoIosNotificationsOutline } from "react-icons/io";
import useDropDown from "@/lib/hooks/useDropDown";
import { fadeToBottomVariant } from "@/lib/utils/variants";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const NotificationDrop = () => {
  const { dropdownRef: ref, isOpen, toggleDropdown } = useDropDown();

  return (
    <div className="relative">
      <div
        ref={ref}
        onClick={toggleDropdown}
        className="size-8 rounded-full border dark:border-white/10 grid place-content-center hover:bg-primary hover:text-white duration-300 cursor-pointer"
      >
        <IoIosNotificationsOutline />
      </div>

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            {...fadeToBottomVariant}
            ref={ref}
            className="absolute top-12 right-0 min-w-52 text-center text-sm text-gray-500 bg-white dark:bg-[#282828] shadow-2xl rounded-md p-3 space-y-5"
          >
            <div className="grid place-content-center">
              <Image src="/svgs/empty.svg" width={100} height={100} alt="notifications" />
            </div>
            <p>No notifications</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationDrop;
