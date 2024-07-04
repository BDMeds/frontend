import { useRef, useState } from "react";
import { toastError } from "../utils/toast";

const useFilePicker = () => {
  const [file, setFile] = useState<File | null>(null);
  const [blob, setBlob] = useState("");

  const reset = () => {
    setFile(null), setBlob("");
  };

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
    if (file.size > 1024 * 1024) {
      toastError("File size too large, Max: 1MB", { id: "file-size" });
      return;
    }

    // if file type is not image or pdf return
    if (!file.type.includes("image")) {
      toastError("Invalid file type", { id: "file-type" });
      return;
    }

    const blob = URL.createObjectURL(file);
    if (file.type.includes("image")) {
      setBlob(blob);
    } else {
      setBlob("");
    }

    setFile(file);
  };

  return { file, blob, pickFile, onFileChange, ref, reset };
};

export default useFilePicker;
