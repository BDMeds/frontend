import TextSkeleton from "@/components/Common/Skeleton/text";
import { useDoctorInfo } from "@/lib/hooks/useUserInfo";
import { opacityVariant } from "@/lib/utils/variants";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import DoctorInfo from "./content/info";
import ReviewInfo from "./content/reviews";
import SettingsDoctor from "./content/settings";
import { defaultImageUrl } from "@/lib/data/dashboard";
import Button from "@/components/Common/Button";
import { useModal } from "@/lib/providers/modal-provider";
import ProfileImageModal from "../../../../modals/profile-image-modal";

type Tab = "info" | "reviews" | "settings";

const tabs: { name: string; tab: Tab }[] = [
  { name: "General", tab: "info" },
  { name: "Reviews", tab: "reviews" },
  { name: "Settings", tab: "settings" },
];

const DoctorGeneral = () => {
  const { doctor, loading } = useDoctorInfo();

  const [curTab, setCurTab] = useState<Tab>("info");
  const { showModal } = useModal();

  const renderContent = () => {
    switch (curTab) {
      case "info":
        return <DoctorInfo key="doctor" />;
      case "reviews":
        return <ReviewInfo key="reviews" />;
      case "settings":
        return <SettingsDoctor key="settings" />;
      default:
        return null;
    }
  };

  return (
    <motion.div {...opacityVariant}>
      <div className="h-[6rem] w-full bg-gradient-to-r from-primary to-purple-600"></div>
      <div className="flex items-center justify-between pr-4">
        <div className="-mt-10 flex gap-4 items-center">
          <div
            className={`size-28 border ${
              loading ? "animate-skeleton" : ""
            } backdrop-blur-xl relative overflow-hidden rounded-full ml-5`}
          >
            {doctor && (
              <Image
                src={`${doctor?.user.profilePicture}`}
                width={100}
                height={100}
                alt="profile"
                className="w-full h-full object-cover absolute top-0 left-0"
              />
            )}
          </div>

          <div className="mt-7">
            {loading ? (
              <>
                <TextSkeleton size="medium" width="30" />
                <TextSkeleton />
              </>
            ) : (
              <>
                {doctor && (
                  <>
                    <p className="font-bold">
                      {doctor.user.firstName} {doctor.user.lastName}
                    </p>
                    <p className="capitalize text-gray-500">{doctor.speciality}</p>
                  </>
                )}
              </>
            )}
          </div>
        </div>

        {doctor?.user.profilePicture === defaultImageUrl && (
          <Button
            size="extra-small"
            text="Upload Picture"
            variant="filled"
            onClick={() => showModal(<ProfileImageModal />)}
          />
        )}
      </div>

      {doctor && (
        <div className="p-5 space-y-5">
          <p className="text-gray-500 text-sm line-clamp-3">{doctor.bio ?? "No bio"}</p>

          <div className={`grid grid-cols-3 divide-x`}>
            {tabs.map((tab, id) => (
              <div
                key={id}
                onClick={() => setCurTab(tab.tab)}
                className={` py-2 cursor-pointer text-center duration-300 ${
                  tab.tab === curTab ? "bg-primary text-white" : "bg-gray-100"
                }`}
              >
                {tab.name}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait" initial={false}>
            {renderContent()}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
};

export default DoctorGeneral;
