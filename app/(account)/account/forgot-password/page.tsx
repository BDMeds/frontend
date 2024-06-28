"use client";

import Button from "@/components/Common/Button";
import Loader from "@/components/Common/Loaders";
import { forgotPassword } from "@/lib/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

const ForgotPasswordModal = () => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<{ email: string }>();

  const { isPending: loading, mutate } = useMutation({ mutationFn: forgotPassword });

  const submit: SubmitHandler<{ email: string }> = ({ email }) => {
    mutate(email);
  };

  return (
    <main className="min-h-screen w-full grid place-content-center">
      <div className="sm:min-w-[30rem] w-full relative bg-white dark:bg-white/10 border rounded-xl p-8 mx-auto">
        {loading && <Loader />}

        <form onSubmit={handleSubmit(submit)} noValidate>
          <div className="space-y-3">
            <p className={`font-bold text-primary uppercase text-xl`}>Forgot Password</p>

            <div className="space-y-1">
              <label>Email</label>
              <input
                type="text"
                className={`w-full p-3 bg-transparent border ${
                  !errors.email ? "border-black/30 rounded focus:border-primary/80" : "border-red-500"
                } duration-200`}
                placeholder="Enter you email"
                {...register("email", { required: true })}
              />
            </div>

            <Button text="Send Reset Link" fullWidth variant="filled" loading={loading} disabled={loading} />

            <p className="text-primary text-center">
              <Link href="/account/login">Back to Login</Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
};

export default ForgotPasswordModal;
