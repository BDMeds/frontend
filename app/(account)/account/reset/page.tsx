"use client";

import Button from "@/components/Common/Button";
import Loader from "@/components/Common/Loaders";
import { resetPassword } from "@/lib/services/auth.service";
import { toastError } from "@/lib/utils/toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  prevPassword: string;
  newPassword: string;
};

const Page = () => {
  const token = useSearchParams().get("t");

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const router = useRouter();

  const { isPending: loading, mutate } = useMutation({ mutationFn: resetPassword });

  const submit: SubmitHandler<Inputs> = (data) =>
    mutate({ token: `${token}`, ...data }, { onSuccess: () => (reset(), router.push("/account/login")) });

  useEffect(() => {
    if (token) return;

    toastError("Token not found");
    router.replace("/account/login");
  }, [token]);

  return (
    <div className="container min-h-screen flex items-center sm:justify-center md:py-20 py-14">
      <div className="max-w-[40rem] sm:min-w-[30rem] bg-white min-w-full border relative p-5 rounded">
        {loading && (
          <div className="absolute top-0 left-0 w-full h-full grid place-content-center backdrop-blur-sm">
            <Loader />
          </div>
        )}

        <div className="space-y-7">
          <div className="space-y-1">
            <h1 className={`font-extrabold text-3xl`}>Reset Password</h1>
          </div>

          <form onSubmit={handleSubmit(submit)} noValidate>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="font-semibold uppercase">Old Password</label>
                <div>
                  <input
                    type="password"
                    className={`w-full p-3 bg-transparent border ${
                      !errors.prevPassword ? "focus:border-primary/80" : "border-red-500"
                    } duration-200`}
                    placeholder="***************"
                    {...register("prevPassword", {
                      required: {
                        value: true,
                        message: "Previous password is required",
                      },
                    })}
                  />
                  {errors.prevPassword && <p className="text-sm text-red-500">{errors.prevPassword.message}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <label className="font-semibold dark:text-secondary-200 uppercase">Password</label>
                <div>
                  <input
                    type="password"
                    className={`w-full p-3 bg-transparent border ${
                      !errors.newPassword ? "focus:border-primary/80" : "border-red-500"
                    } duration-200`}
                    placeholder="***************"
                    {...register("newPassword", {
                      required: {
                        value: true,
                        message: "New password is required",
                      },
                      minLength: {
                        value: 8,
                        message: "Must be greater than 7 characters",
                      },
                    })}
                  />
                  {errors.newPassword && <p className="text-sm text-red-500">{errors.newPassword.message}</p>}
                </div>
              </div>
              <Button
                text="Reset Password"
                fullWidth
                rounded="none"
                variant="filled"
                loading={loading}
                disabled={loading}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
