import TextSkeleton from "@/components/Common/Skeleton/text";
import { useDoctorInfo } from "@/lib/hooks/useUserInfo";
import { opacityVariant } from "@/lib/utils/variants";
import { motion } from "framer-motion";
import Image from "next/image";

const DoctorGeneral = () => {
  const { doctor, loading } = useDoctorInfo();

  return (
    <motion.div {...opacityVariant}>
      <div className="h-[6rem] w-full bg-gradient-to-r from-primary to-purple-600"></div>
      <div className="-mt-10 flex gap-4 items-center">
        <div
          className={`size-28 border ${loading ? "animate-skeleton" : ""} relative overflow-hidden rounded-full ml-5`}
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
    </motion.div>
  );
};

export default DoctorGeneral;
