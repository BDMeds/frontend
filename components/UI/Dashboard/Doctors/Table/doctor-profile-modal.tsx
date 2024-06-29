import Modal from "@/components/Common/Modal";
import { useModal } from "@/lib/providers/modal-provider";
import { IDoctor } from "@/lib/types";
import Image from "next/image";
import { useState } from "react";
import { RiVerifiedBadgeFill } from "react-icons/ri";

const DoctorProfileModal = ({
  user: { firstName, lastName, profilePicture },
  department,
  isAvailable,
  availableDays,
  qualifications,
  speciality,
  createdAt,
  yearsOfExperience,
  address,
  bio,
  kycDetails,
  socials,
}: IDoctor) => {
  const { hideModal } = useModal();

  const [showFullBio, setShowFullBio] = useState(false);

  return (
    <Modal
      onClose={hideModal}
      className="bg-white dark:bg-[#282828] space-y-6 shadow-2xl rounded-xl min-w-[30rem] max-w-[35rem] p-4 max-h-[45rem] overflow-y-auto"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative size-14 rounded-full overflow-hidden">
              <Image
                src={profilePicture}
                alt={`Dr. ${firstName} ${lastName}`}
                width={100}
                height={100}
                className="absolute top-0 left-0 w-full h-full"
              />
            </div>

            <div className="leading-tight">
              <div className="flex items-center gap-2">
                <p>
                  {firstName} {lastName}
                </p>
                {kycDetails?.status === "successful" && <RiVerifiedBadgeFill className="text-[#1c96e8]" />}
              </div>
              <p className="dark:text-gray-400 text-gray-500 capitalize">{speciality}</p>
            </div>
          </div>

          <div className={`p-2 border animate-pulse text-sm dark:border-white/10 flex items-center gap-2 rounded-md`}>
            <div className={`size-3 rounded-full ${isAvailable ? "bg-green-500" : "bg-red-500"}`}></div>
            <p>{isAvailable ? "Available" : "Not available"}</p>
          </div>
        </div>

        {bio && (
          <div className="space-y-1">
            <p className="font-bold">Bio</p>
            <>
              <p className={`text-sm dark:text-gray-400 ${!showFullBio && bio.length > 240 ? "line-clamp-3" : ""}`}>
                {bio}
              </p>
              {!showFullBio && bio.length > 240 && (
                <span
                  className="text-primary text-sm cursor-pointer underline select-none"
                  onClick={() => setShowFullBio(true)}
                >
                  See more
                </span>
              )}
            </>
          </div>
        )}
      </div>

      <div className="space-y-4"></div>
    </Modal>
  );
};

export default DoctorProfileModal;
