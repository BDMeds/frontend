import { useRef, useState } from "react";
import { toastError } from "../utils/toast";
import { FaEdit, FaUpload } from "react-icons/fa";
import { heightOpenVariant } from "../utils/variants";
import Image from "next/image";
import { motion } from "framer-motion";

const useProof = () => {
  const [attachment, setAttachment] = useState<File | null>(null);
  const [blob, setBlob] = useState("");

  const ref = useRef<HTMLInputElement>(null);

  const pickFile = () => {
    if (!ref.current) return;
    ref.current.click();
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      toastError("No file selected", { id: "no-file" });
      return;
    }

    const file = e.target.files?.[0];
    if (!file) {
      toastError("No file selected", { id: "no-file" });
      return;
    }

    // if file size is greater than 500kb return
    if (file.size > (1024 * 1024) / 2) {
      toastError("File size too large", { id: "file-size" });
      return;
    }

    // if file type is not image or pdf return
    if (!file.type.includes("image") && !file.type.includes("pdf")) {
      toastError("Invalid file type", { id: "file-type" });
      return;
    }

    const blob = URL.createObjectURL(file);
    if (file.type.includes("image")) {
      setBlob(blob);
    } else {
      setBlob("");
    }

    setAttachment(file);
  };

  const fileContent = () => (
    <div>
      <div className="flex items-center justify-between">
        <p className="font-bold">Proof</p>
        <button
          className="dark:text-primary-base text-secondary-500 flex items-center gap-1 py-1 px-3 text-sm"
          onClick={pickFile}
        >
          {!attachment ? (
            <>
              <span>Choose File</span>
              <FaUpload />
            </>
          ) : (
            <>
              <span>Replace File</span>
              <FaEdit />
            </>
          )}
        </button>

        <input
          type="file"
          accept="image/png,image/jpg,application/pdf"
          className="hidden"
          ref={ref}
          onChange={onFileChange}
        />
      </div>

      <div>
        {attachment && (
          <motion.div {...heightOpenVariant} className="overflow-hidden">
            {blob ? (
              <div className="min-h-[10rem] relative overflow-hidden rounded-md">
                <Image
                  src={blob}
                  alt="proof"
                  width={300}
                  height={300}
                  className="w-full h-full object-cover absolute top-0 left-0"
                />
              </div>
            ) : (
              <div className="min-h-[5rem] grid place-content-center dark:text-zinc-300 font-bold">
                <p>{attachment.name}</p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );

  return { content: fileContent, proof: attachment };
};

export default useProof;
