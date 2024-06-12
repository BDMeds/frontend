"use client";

import Button from "@/components/Common/Button";
import { dataMutate } from "@/lib/services/dummy";
import { toastError, toastSuccess } from "@/lib/utils/toast";
import { ILoginData } from "@/lib/utils/types";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { GiMedicines } from "react-icons/gi";

const Login = () => {
  const { handleSubmit, register } = useForm<ILoginData>();

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: dataMutate,
    onSuccess: () => (toastSuccess("login successful"), router.replace("/dashboard")),
  });

  const submit: SubmitHandler<ILoginData> = async (data) => {
    // if (data.emailOrPhone.includes("@")) {
    //   mutate({ email: data.emailOrPhone, password: data.password });
    // }

    // mutate({ phone: data.emailOrPhone, password: data.password });
    try {
      setLoading(true);
      const res = await signIn("credentials", { email: data.emailOrPhone, password: data.password, redirect: false });
      if (res?.ok) {
        toastSuccess("Login successful.");
        window.location.href = "/dashboard";
      } else {
        toastError("Login failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center">
      <div className="grid md:grid-cols-2 gap-10 w-full container items-center">
        <div className="hidden place-content-center sm:grid">
          <Image src={"/login.svg"} alt="login" width={400} height={400} />
        </div>

        <div className="space-y-6 sm:px-20 px-5">
          <div className="flex items-center gap-2 text-3xl">
            {/* <GiMedicines /> */}
            <span className="font-bold">Login</span>
          </div>

          <form onSubmit={handleSubmit(submit)} className="sm:min-w-[30rem] mx-auto">
            <div className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="email">Email or Phone</label>
                <input
                  type="email"
                  {...register("emailOrPhone", { required: true })}
                  className="w-full bg-transparent p-2 border rounded-lg bg-white"
                  placeholder="Phone or email"
                />
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

              <Button variant="filled" fullWidth text="Login" disabled={loading} loading={loading} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
