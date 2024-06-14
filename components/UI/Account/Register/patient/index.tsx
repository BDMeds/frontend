import Button from "@/components/Common/Button";
import { dataMutate } from "@/lib/services/dummy";
import { IPatientRegister } from "@/lib/utils/types";
import { opacityVariant } from "@/lib/utils/variants";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Image from "next/image";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdMale, MdFemale } from "react-icons/md";
import { Tag } from "..";
import { FaChevronLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useOnboardStore } from "@/lib/store/global.store";
import { userRegister } from "@/lib/services/user.service";

type Props = {
  updateTag: (tag: Tag | null) => void;
};

const genders: { name: string; icon: JSX.Element }[] = [
  { name: "Male", icon: <MdMale /> },
  { name: "Female", icon: <MdFemale /> },
];

const PatientRegister: FC<Props> = ({ updateTag }) => {
  const { register, handleSubmit, reset } = useForm<IPatientRegister>();
  const [gender, setGender] = useState("Male");

  const router = useRouter();

  const { hasRegisteredOn } = useOnboardStore();

  const { mutate, isPending: loading } = useMutation({
    mutationFn: userRegister,
    onSuccess: () => {
      hasRegisteredOn();
      router.replace("/account/confirm-email");
    },
  });

  const submit: SubmitHandler<IPatientRegister> = async (data) =>
    mutate({ data: { ...data, gender: gender.toLowerCase() }, type: "patient" });

  return (
    <motion.div {...opacityVariant} className="min-h-screen w-full flex items-center">
      <div className="grid grid-cols-2 items-center gap-8 container">
        <div className="min-h-[40rem] rounded-xl overflow-hidden relative">
          <Image
            src={"/images/account/patient.jpg"}
            alt="patient"
            width={400}
            height={800}
            className="w-full h-full object-cover absolute top-0 left-0"
          />

          <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-t from-black/40 p-5">
            <div className="cursor-pointer flex items-center gap-2 text-white" onClick={() => updateTag(null)}>
              <FaChevronLeft />
              <p>Back</p>
            </div>
          </div>
        </div>

        <div className="px-10 space-y-8">
          <div className="max-w-md">
            <h2 className="text-3xl font-bold">Create a Patient Account</h2>
            <p className="text-gray-500">
              By clicking <span className="font-semibold">continue</span>, you agree to our{" "}
              <span className="text-primary border-b">Terms</span> and <span className="text-primary">Conditions</span>
            </p>
          </div>

          <div>
            <form onSubmit={handleSubmit(submit)}>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      className="w-full bg-transparent p-2 border rounded-lg bg-white"
                      placeholder="Jon"
                      {...register("firstName", { required: true })}
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      {...register("lastName", { required: true })}
                      className="w-full bg-transparent p-2 border rounded-lg bg-white"
                      placeholder="Simon"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      {...register("email", { required: true })}
                      className="w-full bg-transparent p-2 border rounded-lg bg-white"
                      placeholder="jonsimon@domain.com"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                      type="text"
                      {...register("phoneNumber", { required: true })}
                      className="w-full bg-transparent p-2 border rounded-lg bg-white"
                      placeholder="+234..."
                    />
                  </div>
                  <div className="space-y-1 col-span-2">
                    <p>Gender</p>
                    <div className="grid grid-cols-2 gap-3">
                      {genders.map((gen, id) => (
                        <div
                          key={id}
                          onClick={() => setGender(gen.name)}
                          className={`p-2 rounded-lg flex items-center gap-2 duration-300 cursor-pointer ${
                            gen.name === gender ? "bg-primary text-white" : "bg-white border border-gray-200"
                          }`}
                        >
                          {gen.icon}
                          <p>{gen.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-1 col-span-2">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      {...register("password", { required: true })}
                      className="w-full bg-transparent p-2 border rounded-lg bg-white"
                      placeholder="***************"
                    />
                  </div>
                </div>
                <Button variant="filled" fullWidth text="Continue" disabled={loading} loading={loading} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PatientRegister;
