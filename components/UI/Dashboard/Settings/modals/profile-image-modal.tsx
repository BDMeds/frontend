import Modal from "@/components/Common/Modal";
import { HiOutlineCloudUpload } from "react-icons/hi";
import { useModal } from "@/lib/providers/modal-provider";
import { toastError } from "@/lib/utils/toast";
import { useRef, useState } from "react";
import Button from "@/components/Common/Button";
import { FaUpload } from "react-icons/fa";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { uploadProfilePicture } from "@/lib/services/user.service";
import { FaRegImage } from "react-icons/fa";
import { queryClient } from "@/lib/providers";

const ProfileImageModal = () => {
  const { hideModal } = useModal();

  const [blob, setBlob] = useState("");
  const [b64, setB64] = useState("");

  const ref = useRef<HTMLInputElement>(null);

  const pickFile = () => {
    if (!ref.current) return;
    ref.current.click();
  };

  const { mutate, isPending: loading } = useMutation({ mutationFn: uploadProfilePicture });

  const getBase64 = (file: File) => {
    return new Promise((resolve) => {
      let baseURL = "";
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      reader.onload = () => {
        // @ts-ignore
        baseURL = reader.result;
        console.log({ baseURL });
        resolve(baseURL);
      };
    });
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      toastError("No image selected", { id: "no-image" });
      return;
    }

    const file = e.target.files?.[0];
    if (!file) {
      toastError("No image selected", { id: "no-image" });
      return;
    }

    setB64((await getBase64(file)) as string);

    // if image size is greater than 500kb return
    if (file.size > (1024 * 1024) / 2) {
      toastError("Image size too large", { id: "image-size" });
      return;
    }

    // if file type is not image or pdf return
    if (!file.type.includes("image")) {
      toastError("Invalid image type", { id: "file-type" });
      return;
    }

    const blob = URL.createObjectURL(file);
    if (file.type.includes("image")) {
      setBlob(blob);
    } else {
      setBlob("");
    }
  };

  const upload = () =>
    mutate(b64, {
      onSuccess: () => (queryClient.invalidateQueries({ predicate: (q) => q.queryKey.includes("user") }), hideModal()),
    });

  return (
    <Modal onClose={hideModal} className="p-20 bg-white rounded-xl shadow-2xl space-y-4">
      <div className="grid place-content-center text-center space-y-1">
        <div className={`size-28 rounded-full relative overflow-hidden border grid place-content-center mx-auto`}>
          <AnimatePresence mode="wait">
            {blob ? (
              <div className="left-0 w-full h-full object-cover">
                <Image src={blob} alt="profile" width={300} height={300} className="object-cover" />

                <div
                  className="absolute top-0 left-0 w-full h-full hover:bg-black/50 grid place-content-center duration-300 text-white cursor-pointer"
                  onClick={pickFile}
                >
                  <MdOutlineModeEditOutline size={30} />
                </div>
              </div>
            ) : (
              <HiOutlineCloudUpload size={30} className="text-black" />
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="grid place-content-center">
        {!blob ? (
          <Button text="Pick File" icon={<FaRegImage />} variant="filled" onClick={pickFile} />
        ) : (
          <Button
            text="Upload"
            icon={<FaUpload />}
            variant="filled"
            onClick={upload}
            loading={loading}
            disabled={loading}
          />
        )}
      </div>

      <input type="file" accept="image/png,image/jpg" className="hidden" ref={ref} onChange={onFileChange} />
    </Modal>
  );
};

export default ProfileImageModal;
