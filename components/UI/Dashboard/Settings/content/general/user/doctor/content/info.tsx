import Button from "@/components/Common/Button";
import { useDoctorInfo } from "@/lib/hooks/useUserInfo";
import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { motion } from "framer-motion";
import { opacityVariant } from "@/lib/utils/variants";

const DoctorInfo = () => {
  const { doctor, loading } = useDoctorInfo();

  return (
    <motion.div {...opacityVariant}>
      <div className="p-5 space-y-5">
        <div>
          <p className="font-bold">Qualifications:</p>
        </div>

        <div className="space-y-2">
          <p className="font-bold">Socials:</p>
          {doctor?.socials ? (
            <>
              <div className="space-y-2">
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
            </>
          ) : (
            <div>
              {/* <p className="text-gray-500">No socials</p> */}
              <Button text="Add Social" size="extra-small" variant="filled" />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default DoctorInfo;
