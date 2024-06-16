import { useModal } from "@/lib/providers/modal-provider";
import { opacityVariant } from "@/lib/utils/variants";
import { motion } from "framer-motion";
import Image from "next/image";
import { CiTrash } from "react-icons/ci";
import { HiOutlineUpload } from "react-icons/hi";
import useUserInfo from "@/lib/hooks/useUserInfo";
import { AiOutlineLogout } from "react-icons/ai";
import Button from "@/components/Common/Button";
import { signOut } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { requestVerification } from "@/lib/services/auth.service";
import ProfileImageModal from "../profile-image-modal";

const defImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1H81w4SmKH5DZmIbxU7EB0aMSkNQDoPQA1mRQxf2Y0wMF1NSa7vghbwwKASi1q4NPmNw&usqp=CAU";

const PatientGeneral = () => {
  const { showModal } = useModal();

  const { user, loading } = useUserInfo();
  const { mutate, isPending: verifyLoading } = useMutation({ mutationFn: requestVerification });

  return (
    <motion.div {...opacityVariant} className="divide-y">
      <div className="flex px-6 pt-10 pb-4 items-center justify-between">
        {loading ? (
          <>
            <div className="size-24 rounded-full border-2 border-white relative overflow-hidden animate-skeleton"></div>
          </>
        ) : (
          <>
            <div className="size-24 rounded-full border-2 border-white relative overflow-hidden">
              <Image
                src={`${user?.profilePicture}`}
                width={100}
                height={100}
                alt="profile"
                className="w-full h-full object-cover absolute top-0 left-0"
              />
            </div>

            <div className="flex items-center gap-3">
              <CiTrash
                className={`text-red-500 cursor-pointer ${
                  user?.profilePicture === defImage ? "opacity-50 cursor-not-allowed" : ""
                }`}
                size={25}
              />

              <div
                className="flex items-center gap-2 rounded-xl border px-3 py-2 cursor-pointer duration-300 hover:bg-gray-200"
                onClick={() => showModal(<ProfileImageModal />)}
              >
                <HiOutlineUpload />
                <p>Upload</p>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="py-3 px-5 flex items-center justify-between">
        <div className="">
          <p className="font-bold text-lg">Name</p>
          <p className="text-gray-500">
            {user?.firstName} {user?.lastName}
          </p>
        </div>

        <Button text="Edit" />
      </div>

      <div className="py-3 px-5 flex items-center justify-between">
        <div className="">
          <p className="font-bold text-lg">Contacts</p>
          <div className="text-gray-500">
            <p className="">Phone: {user?.phoneNumber}</p>
            <p className="">
              Email: {user?.email} {!user?.emailVerified && "(not verified)"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button text="Edit" />
          {!user?.emailVerified && (
            <Button text="Verify" variant="filled" onClick={() => mutate(`${user?.email}`)} loading={verifyLoading} />
          )}
        </div>
      </div>

      <div className="py-3 px-5 flex items-center justify-between">
        <div className="">
          <p className="font-bold text-lg">Language</p>
          <p className="text-gray-500">English</p>
        </div>

        <Button text="Edit" />
      </div>

      <div className="py-3 px-5 flex items-center justify-between">
        <Button text="Sign out" icon={<AiOutlineLogout />} variant="destructive" onClick={() => signOut()} />
      </div>
    </motion.div>
  );
};

export default PatientGeneral;