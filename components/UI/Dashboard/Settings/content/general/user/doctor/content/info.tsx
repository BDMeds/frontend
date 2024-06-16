import Button from "@/components/Common/Button";
import { useDoctorInfo } from "@/lib/hooks/useUserInfo";
import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { motion } from "framer-motion";
import { opacityVariant } from "@/lib/utils/variants";
import { useModal } from "@/lib/providers/modal-provider";
import AddSocialModal from "../../../../../modals/add-social";
import { useMutation } from "@tanstack/react-query";
import { requestVerification } from "@/lib/services/auth.service";
import { toastSuccess } from "@/lib/utils/toast";

const DoctorInfo = () => {
  const { doctor } = useDoctorInfo();

  const { showModal } = useModal();

  const { mutate, isPending: verifyLoading } = useMutation({ mutationFn: requestVerification });

  return (
    <motion.div {...opacityVariant}>
      <div className="p-5 space-y-5">
        <div>
          {/* <p className="font-bold">Info:</p> */}
          <div>
            <div className="grid grid-cols-2 gap-4">
              <div className="py-2">
                <p className="font-bold">Name</p>
                <p className="text-gray-500">
                  {doctor?.user.firstName} {doctor?.user.lastName}
                </p>
              </div>

              <div className="py-2">
                <p className="font-bold">Contact</p>
                <div className="flex items-center gap-2">
                  <div className="text-gray-500 text-sm">
                    <div className="flex items-center gap-1">
                      <p>
                        {doctor?.user.email}{" "}
                        {!doctor?.user.emailVerified ? (
                          "(Not verified)"
                        ) : (
                          <span className="text-xs text-green-500">verified</span>
                        )}
                      </p>
                      {!doctor?.user.emailVerified && (
                        <Button
                          text="Verify"
                          variant="filled"
                          onClick={() =>
                            mutate(`${doctor?.user.email}`, { onSuccess: () => toastSuccess("Verification link sent") })
                          }
                          size="extra-small"
                          loading={verifyLoading}
                        />
                      )}
                    </div>
                    <p>{doctor?.user.phoneNumber}</p>
                  </div>
                </div>
              </div>

              <div className="py-2">
                <p className="font-bold">Years of experience</p>
                <p className="text-gray-500">{doctor?.yearsOfExperience}</p>
              </div>

              <div className="py-2">
                <p className="font-bold">Speciality</p>
                <p className="text-gray-500 capitalize">{doctor?.speciality}</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="font-bold">Socials:</p>
              {doctor?.socials ? (
                <div className="flex items-center gap-4">
                  {doctor?.socials?.facebook && (
                    <div>
                      <Link target="_blank" href={doctor?.socials.facebook}>
                        <FaFacebook className="text-[#1877F2]" size={26} />
                      </Link>
                    </div>
                  )}
                  {doctor?.socials?.linkedin && (
                    <div>
                      <Link target="_blank" href={doctor?.socials.facebook}>
                        <FaLinkedin className="text-[#0077b5]" size={26} />
                      </Link>
                    </div>
                  )}
                  {doctor?.socials?.twitter && (
                    <div>
                      <Link target="_blank" href={doctor?.socials.facebook}>
                        <FaXTwitter size={26} />
                      </Link>
                    </div>
                  )}
                  {doctor?.socials?.whatsapp && (
                    <div>
                      <Link target="_blank" href={doctor?.socials.facebook}>
                        <IoLogoWhatsapp className="text-[#25D366]" size={26} />
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <Button
                    text="Add Social"
                    size="extra-small"
                    variant="filled"
                    onClick={() => showModal(<AddSocialModal />)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DoctorInfo;
