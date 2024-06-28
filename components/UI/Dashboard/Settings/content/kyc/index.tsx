import Select from "@/components/Common/Inputs/select";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDoctorInfo } from "@/lib/hooks/useUserInfo";
import { getKycId, uploadKyc } from "@/lib/services/doctor.service";
import { KycID } from "@/lib/types";
import { opacityVariant } from "@/lib/utils/variants";
import { useMutation, useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { IoShieldCheckmark } from "react-icons/io5";
import Button from "@/components/Common/Button";
import { toastError, toastSuccess } from "@/lib/utils/toast";
import { getBase64 } from "@/lib/helpers/fns";
import { queryClient } from "@/lib/providers";
import { FiX } from "react-icons/fi";
import { useGlobalStore } from "@/lib/store/global.store";

const Kyc = () => {
  const { doctor, loading } = useDoctorInfo();

  const { data: kycIDs, isPending: kycIdLoading } = useQuery({ queryKey: ["kyc-id"], queryFn: getKycId });

  const [kycId, setKycId] = useState<KycID | undefined>();

  const [idDoc, setIdDoc] = useState("");
  const [professionalCert, setProfessionalCert] = useState("");

  const [idDocFile, setIdDocFile] = useState<File | undefined>();
  const [idProCert, setProCert] = useState<File | undefined>();

  const onKycIdChange = (value: KycID) => setKycId(value);

  const { mutate, isPending: uploading } = useMutation({ mutationFn: uploadKyc });

  const idDocRef = useRef<HTMLInputElement>(null);
  const certRef = useRef<HTMLInputElement>(null);

  const { isDarkMode } = useGlobalStore();

  const pickIdDoc = () => {
    if (!idDocRef.current) return;
    idDocRef.current.click();
  };

  const pickCert = () => {
    if (!certRef.current) return;
    certRef.current.click();
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>, type: "id-doc" | "cert") => {
    if (!e.target.files) {
      toastError("No file selected", { id: "no-file" });
      return;
    }

    const file = e.target.files?.[0];
    if (!file) {
      toastError("No file selected", { id: "no-file" });
      return;
    }

    if (type === "cert") {
      setProfessionalCert((await getBase64(file)) as string);
      setProCert(file);
    } else {
      setIdDoc((await getBase64(file)) as string);
      setIdDocFile(file);
    }
  };

  const submit = () => {
    if (!kycId || !idDoc || !professionalCert) {
      toastSuccess("Incomplete data, please fill/select necessary fields.", { id: "invalid" });
      return;
    }

    mutate(
      {
        idType: kycId,
        idDoc,
        professionalCert,
      },
      { onSuccess: () => queryClient.invalidateQueries({ queryKey: ["doctor", "info"] }) }
    );
  };

  return (
    <motion.div {...opacityVariant} className="space-y-4 p-4">
      {!doctor?.kycDetails && (
        <p className="font-bold text-lg uppercase">
          Kyc Verification{" "}
          {doctor?.kycVerified ? (
            <span className="text-green-500 text-sm lowercase">(verified)</span>
          ) : (
            <span className="text-red-500 text-sm lowercase">
              {doctor?.kycDetails?.status === "failed" ? "(rejected)" : "(Not verified)"}
            </span>
          )}
        </p>
      )}

      {loading ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length }).map((_, id) => (
              <div
                key={id}
                className={`h-[4rem] rounded-lg border dark:border-white/10 ${
                  !isDarkMode ? "animate-skeleton" : "animate-skeleton-dark"
                }`}
              ></div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          {doctor && (
            <div className="min-h-[20rem]">
              {!doctor.kycDetails ? (
                <div className="grid md:grid-cols-2 items-center gap-5">
                  <Select
                    label="Select ID Type"
                    onValueChange={onKycIdChange}
                    options={kycIDs ? kycIDs.map((id) => ({ value: id, label: id })) : []}
                    loading={kycIdLoading}
                  />

                  <div className="space-y-1">
                    <p className="font-semibold">ID Document</p>
                    <div
                      className="flex py-2 px-4 border dark:border-white/10 rounded-lg items-center cursor-pointer text-gray-400 gap-2 justify-between duration-300 hover:bg-gray-100"
                      onClick={pickIdDoc}
                    >
                      <span>{!idDocFile ? "Select Document" : idDocFile.name}</span>
                      <IoCloudUploadOutline />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold">Professional Certificate</label>
                    <div
                      className="flex py-2 px-4 border dark:border-white/10 rounded-lg items-center cursor-pointer text-gray-400 gap-2 justify-between duration-300 hover:bg-gray-100"
                      onClick={pickCert}
                    >
                      <span>{!idProCert ? "Upload Certificate" : idProCert.name}</span>
                      <IoCloudUploadOutline />
                    </div>
                  </div>

                  <input
                    type="file"
                    accept="image/png,image/jpg"
                    className="hidden"
                    ref={idDocRef}
                    onChange={(e) => onFileChange(e, "id-doc")}
                  />

                  <input
                    type="file"
                    accept="image/png,image/jpg"
                    className="hidden"
                    ref={certRef}
                    onChange={(e) => onFileChange(e, "cert")}
                  />

                  <div></div>

                  <Button text="Continue" variant="filled" onClick={submit} loading={uploading} />
                </div>
              ) : (
                <div className="grid place-content-center space-y-4 text-center min-h-[20rem]">
                  {doctor.kycDetails.status !== "failed" && (
                    <>
                      <IoShieldCheckmark size={60} className={`text-green-500 mx-auto`} />
                      <p className="max-w-sm mx-auto">
                        {doctor.kycVerified
                          ? "You are verified!"
                          : "Documents is under review... We'll notify you as soon as it's approved"}
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default Kyc;
