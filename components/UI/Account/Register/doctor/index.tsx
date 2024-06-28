import { opacityVariant } from "@/lib/utils/variants";
import { motion } from "framer-motion";
import { FC, useState } from "react";
import { Tag } from "..";
import Image from "next/image";
import { FaChevronLeft } from "react-icons/fa";
import Button from "@/components/Common/Button";
import { IDoctorRegister } from "@/lib/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { MdFemale, MdMale } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useOnboardStore } from "@/lib/store/global.store";
import { userRegister } from "@/lib/services/auth.service";
import Select from "@/components/Common/Inputs/select";
// import { specializations } from "@/lib/data/account";
import { toastError } from "@/lib/utils/toast";
import { getSpecializations } from "@/lib/services/doctor.service";

type Props = {
  updateTag: (tag: Tag | null) => void;
};

const genders: { name: string; icon: JSX.Element }[] = [
  { name: "Male", icon: <MdMale /> },
  { name: "Female", icon: <MdFemale /> },
];

const DoctorRegister: FC<Props> = ({ updateTag }) => {
  const { register, handleSubmit } = useForm<IDoctorRegister>();
  const [gender, setGender] = useState("Male");
  const [specialization, setSpecialization] = useState("");

  const updateSpecialization = (value: string) => setSpecialization(value);

  const { data: specializations, isPending: specializationLoading } = useQuery({
    queryKey: ["specializations"],
    queryFn: getSpecializations,
  });

  const router = useRouter();

  const { hasRegisteredOn } = useOnboardStore();

  const { mutate, isPending: loading } = useMutation({
    mutationFn: userRegister,
    onSuccess: () => {
      hasRegisteredOn();
      router.replace("/account/confirm-email");
    },
  });

  const submit: SubmitHandler<IDoctorRegister> = async (data) => {
    if (!specialization) {
      toastError("Please selected a specialization");
      return;
    }

    mutate({
      data: {
        ...data,
        gender: gender.toLowerCase(),
        speciality: specialization,
        yearsOfExperience: data.yearsOfExperience.toString(),
      },
      type: "doctor",
    });
  };

  return (
    <motion.div {...opacityVariant} className="min-h-screen w-full flex items-center">
      <div className="grid grid-cols-2 items-center gap-8 container">
        <div className="min-h-[40rem] rounded-xl dark:rounded-t-xl dark:rounded-b-none overflow-hidden relative">
          <Image
            src={"/images/account/doc.jpg"}
            alt="patient"
            width={400}
            height={800}
            className="w-full h-full object-cover absolute top-0 left-0"
          />

          <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-t from-black/80 dark:from-black to-black/10 p-5">
            <div className="cursor-pointer flex items-center gap-2 text-white" onClick={() => updateTag(null)}>
              <FaChevronLeft />
              <p>Back</p>
            </div>
          </div>
        </div>

        <div className="px-10 space-y-8">
          <div className="max-w-md">
            <h2 className="text-3xl font-bold">Create a Doc Account</h2>
            <p className="text-gray-500">
              By clicking <span className="font-semibold">continue</span>, you agree to our{" "}
              <span className="text-primary border-b dark:border-white/10">Terms</span> and{" "}
              <span className="text-primary">Conditions</span>
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
                      className="w-full bg-transparent p-2 border dark:border-white/10 rounded-lg bg-white dark:bg-white/10 dark:placeholder:text-gray-600"
                      placeholder="Jon"
                      {...register("firstName", { required: true })}
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      {...register("lastName", { required: true })}
                      className="w-full bg-transparent p-2 border dark:border-white/10 rounded-lg bg-white dark:bg-white/10 dark:placeholder:text-gray-600"
                      placeholder="Simon"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      {...register("email", { required: true })}
                      className="w-full bg-transparent p-2 border dark:border-white/10 rounded-lg bg-white dark:bg-white/10 dark:placeholder:text-gray-600"
                      placeholder="jonsimon@domain.com"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                      type="text"
                      {...register("phoneNumber", { required: true })}
                      className="w-full bg-transparent p-2 border dark:border-white/10 rounded-lg bg-white dark:bg-white/10 dark:placeholder:text-gray-600"
                      placeholder="+234..."
                    />
                  </div>
                  <div className="space-y-1">
                    <Select
                      label="Specialization"
                      onValueChange={updateSpecialization}
                      options={specializations?.map((name) => ({ value: name, label: name })) ?? []}
                      placeholder="Select specialization"
                      loading={specializationLoading}
                    />

                    {/* <input
                      type="text"
                      {...register("specialization", { required: true })}
                      className="w-full bg-transparent p-2 border dark:border-white/10 rounded-lg bg-white dark:bg-white/10 dark:placeholder:text-gray-600"
                      placeholder="e.g Dentistry"
                    /> */}
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="specialization">Experience (Years)</label>
                    <input
                      type="text"
                      {...register("yearsOfExperience", { required: true })}
                      className="w-full bg-transparent p-2 border dark:border-white/10 rounded-lg bg-white dark:bg-white/10 dark:placeholder:text-gray-600"
                      placeholder="e.g 5"
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
                            gen.name === gender
                              ? "bg-primary text-white"
                              : "bg-white dark:bg-white/10 dark:placeholder:text-gray-600 border border-gray-200 dark:border-white/10"
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
                      className="w-full bg-transparent p-2 border dark:border-white/10 rounded-lg bg-white dark:bg-white/10 dark:placeholder:text-gray-600"
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

export default DoctorRegister;
