import Button from "@/components/Common/Button";
import ProfileImageModal from "@/components/UI/Dashboard/Settings/modals/profile-image-modal";
import { useDoctorInfo } from "@/lib/hooks/useUserInfo";
import { queryClient } from "@/lib/providers";
import { useModal } from "@/lib/providers/modal-provider";
import { updateData } from "@/lib/services/doctor.service";
import { IDoctor } from "@/lib/utils/types";
import { opacityVariant } from "@/lib/utils/variants";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import PasswordChange from "./password";

const SettingsDoctor = () => {
  const { doctor, loading: doctorLoading } = useDoctorInfo();
  const { showModal } = useModal();

  const { handleSubmit, register, reset } = useForm<IDoctor>();

  useEffect(() => {
    reset(doctor);
  }, []);

  const { mutate, isPending: loading } = useMutation({ mutationFn: updateData });

  const submitInfo: SubmitHandler<IDoctor> = (data) => {
    const {
      speciality,
      user: { gender, email },
      availableDays,
      kycDetails,
      kycVerified,
      _id,
      socials,
      ...rest
    } = data;

    mutate(rest, {
      onSuccess: () => queryClient.invalidateQueries({ predicate: (query) => query.queryKey.includes("doctor") }),
    });
  };

  return (
    <motion.div {...opacityVariant} className="grid lg:grid-cols-2 gap-5">
      <div className="border rounded-xl p-4 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex gap-4 items-center">
            <div
              className={`size-16 border ${
                doctorLoading ? "animate-skeleton" : ""
              } backdrop-blur-xl relative overflow-hidden rounded-full`}
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

            <div className="">
              <p className="font-bold text-sm">Upload your profile picture</p>
              <p className="text-xs text-gray-500">
                For best results, use an image at least 256px by 256px in either .jpg or .png format
              </p>
            </div>
          </div>

          <div className="space-y-1">
            <Button
              size="extra-small"
              text="Upload"
              variant="filled"
              onClick={() => showModal(<ProfileImageModal />)}
            />

            <Button size="extra-small" text="Remove" variant="destructive" />
          </div>
        </div>

        <form onSubmit={handleSubmit(submitInfo)}>
          <div className="space-y-3">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className="w-full bg-transparent p-2 border rounded-lg bg-white disabled:bg-gray-200 disabled:cursor-not-allowed disabled:select-none"
                  placeholder="Jon"
                  {...register("user.firstName", { required: true })}
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  {...register("user.lastName", { required: true })}
                  className="w-full bg-transparent p-2 border rounded-lg bg-white disabled:bg-gray-200 disabled:cursor-not-allowed disabled:select-none"
                  placeholder="Simon"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  {...register("user.email", { required: true })}
                  className="w-full bg-transparent p-2 border rounded-lg bg-white disabled:bg-gray-200 disabled:cursor-not-allowed disabled:select-none"
                  placeholder="jonsimon@domain.com"
                  disabled
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="text"
                  {...register("user.phoneNumber", { required: true })}
                  className="w-full bg-transparent p-2 border rounded-lg bg-white disabled:bg-gray-200 disabled:cursor-not-allowed disabled:select-none"
                  placeholder="+234..."
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="phoneNumber">Specialization</label>
                <input
                  type="text"
                  {...register("speciality", { required: true })}
                  className="w-full bg-transparent p-2 border rounded-lg bg-white disabled:bg-gray-200 disabled:cursor-not-allowed disabled:select-none"
                  disabled
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="specialization">Experience (Years)</label>
                <input
                  type="text"
                  {...register("yearsOfExperience", { required: true })}
                  className="w-full bg-transparent p-2 border rounded-lg bg-white disabled:bg-gray-200 disabled:cursor-not-allowed disabled:select-none"
                  placeholder="e.g 5"
                />
              </div>
              <div className="space-y-1 md:col-span-2">
                <p>Gender</p>

                <input
                  type="text"
                  {...register("user.gender", { required: true })}
                  className="w-full bg-transparent p-2 border rounded-lg capitalize bg-white disabled:bg-gray-200 disabled:cursor-not-allowed disabled:select-none"
                  disabled
                />
              </div>
              <div className="space-y-1 md:col-span-2">
                <p>Bio</p>

                <textarea
                  {...register("bio", { required: true })}
                  className="w-full bg-transparent p-2 border rounded-lg bg-white disabled:bg-gray-200 disabled:cursor-not-allowed disabled:select-none"
                  rows={6}
                />
              </div>
            </div>
            <Button variant="filled" fullWidth text="Update" loading={loading} />
          </div>
        </form>
      </div>
      <div className="self-start grid gap-5">
        <PasswordChange />
      </div>
    </motion.div>
  );
};

export default SettingsDoctor;
