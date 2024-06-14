"use client";

import Button from "@/components/Common/Button";
import { dataMutate } from "@/lib/services/dummy";
import { toastError, toastSuccess } from "@/lib/utils/toast";
import { ILoginData } from "@/lib/utils/types";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { GiMedicines } from "react-icons/gi";

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ILoginData>();

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
      <div className="container items-center grid place-content-center space-y-4">
        <div className="grid place-content-center">
          <Link href={"/"} className="text-2xl font-bold">
            <div className="flex items-center gap-2">
              <GiMedicines />
              <span>BDMeds</span>
            </div>
          </Link>
        </div>

        <div className="space-y-6 p-5 min-w-96 max-w-xl bg-white rounded-xl border mx-auto">
          <div className="flex items-center gap-2 text-3xl">
            {/* <GiMedicines /> */}
            <span className="font-bold">Login</span>
          </div>

          <form onSubmit={handleSubmit(submit)} className="mx-auto">
            <div className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="email">Email or Phone</label>
                <input
                  type="email"
                  {...register("emailOrPhone", { required: true })}
                  className={`w-full bg-transparent p-2 border rounded-lg bg-white ${
                    errors.emailOrPhone ? "border-red-500/50" : ""
                  }`}
                  placeholder="Phone or email"
                />
              </div>

              <div className="space-y-1 col-span-2">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  {...register("password", { required: true })}
                  className={`w-full bg-transparent p-2 border rounded-lg bg-white ${
                    errors.password ? "border-red-500/50" : ""
                  }`}
                  placeholder="***************"
                />
              </div>

              <Button variant="filled" fullWidth text="Login" disabled={loading} loading={loading} />

              <div className="text-sm text-center text-gray-500">
                <p>
                  Don&apos;t have an account?{" "}
                  <Link href={"/account/register"} className="text-primary border-b border-primary">
                    Register
                  </Link>
                </p>
                <p>
                  Forgot password? Click{" "}
                  <Link href={"/account/forgot-password"} className="text-primary border-b border-primary">
                    Here
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
