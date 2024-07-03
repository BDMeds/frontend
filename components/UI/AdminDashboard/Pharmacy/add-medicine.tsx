"use client";

import Button from "@/components/Common/Button";
import useFilePicker from "@/lib/hooks/useFile";
import { CreateMedicine, Visibility } from "@/lib/types";
import { toastError } from "@/lib/utils/toast";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ImImage } from "react-icons/im";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const visibilities: Visibility[] = ["published", "scheduled", "hidden"];

const AddMedicine = () => {
  const [selectedVisibility, setSelectedVisibility] = useState<Visibility | undefined>();

  const { register, handleSubmit } = useForm<CreateMedicine>();
  const { blob, onFileChange, pickFile, file, ref } = useFilePicker();

  const submit: SubmitHandler<CreateMedicine> = (data) => {
    if (!selectedVisibility || !file) {
      toastError("Invalid data");
      return;
    }
  };
  return (
    <div className="space-y-4">
      <h1 className="font-semibold text-xl">Add Medicine</h1>

      {/* form */}
      <div className="space-y-4 border dark:border-white/10 bg-white dark:bg-[#1c1c1c] rounded-xl p-4 mb-4">
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="space-y-3">
              <p className="text-xl font-medium">Basic Information</p>

              <div className="space-y-1">
                <p>
                  Medicine Name <span className="text-primary">*</span>
                </p>
                <input type="text" className="dark:bg-[#282828] bg-gray-100 w-full p-2 rounded-lg" placeholder="Name" />
              </div>

              <div className="space-y-1">
                <p>
                  Descriptions <span className="text-primary">*</span>
                </p>
                <textarea
                  rows={8}
                  className="dark:bg-[#282828] bg-gray-100 resize-none w-full p-2 rounded-lg"
                  placeholder="Descriptions"
                />
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xl font-medium">Stock & Pricing</p>

              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-1">
                  <p>
                    Stock <span className="text-primary">*</span>
                  </p>
                  <input
                    type="text"
                    className="dark:bg-[#282828] bg-gray-100 w-full p-2 rounded-lg"
                    placeholder="Stock"
                  />
                </div>
                <div className="space-y-1">
                  <p>
                    Price <span className="text-primary">*</span>
                  </p>
                  <input
                    type="text"
                    className="dark:bg-[#282828] bg-gray-100 w-full p-2 rounded-lg"
                    placeholder="Price"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-3">
              <p className="text-xl font-medium">Product Image</p>

              <div className="space-y-1">
                <p>
                  Set Image <span className="text-primary">*</span>
                </p>

                <input type="file" className="hidden" accept="image/png,image/jpg" ref={ref} onChange={onFileChange} />

                <div
                  className={`min-h-[15rem] rounded-xl select-none ${
                    blob && file ? "" : "cursor-pointer border"
                  } dark:border-white/10 flex items-center justify-center text-center`}
                  onClick={!(blob && file) ? pickFile : () => {}}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {blob && file ? (
                      <div className="space-y-4">
                        <div className="size-64 ring dark:ring-white/10 rounded-full overflow-hidden relative mx-auto">
                          <Image
                            src={blob}
                            alt="medicine preview"
                            width={400}
                            height={400}
                            className="object-cover absolute top-0 left-0 w-full h-full"
                          />
                        </div>

                        <Button role="button" text="Change" onClick={pickFile} variant="filled" className="mx-auto" />
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <ImImage className="mx-auto" />
                        <div className="text-sm">
                          <p className="font-medium">Upload your product image.</p>
                          <p className="text-gray-500 dark:text-gray-400">Only PNG, JPG allowed, </p>
                          <p className="text-gray-500 dark:text-gray-400">500x500 pixels are recommended</p>
                        </div>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="space-y-1">
                <p>
                  Visibility <span className="text-primary">*</span>
                </p>

                <div className="space-y-2">
                  {visibilities.map((v, id) => (
                    <div
                      key={id}
                      className={`border dark:border-white/10 rounded-xl duration-300 p-3 cursor-pointer flex items-center justify-between ${
                        selectedVisibility === v ? "bg-primary text-white" : ""
                      }`}
                      onClick={() => setSelectedVisibility(v)}
                    >
                      <p className="capitalize text-sm">{v}</p>
                      <div className="size-4 rounded-full border"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-4">
          <Button text="Add Medicine" variant="filled" />
          <Button text="Cancel" variant="outline" role="button" />
        </div>
      </div>
    </div>
  );
};

export default AddMedicine;