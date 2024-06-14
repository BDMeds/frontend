"use client";

import Button from "@/components/Common/Button";
import Loader from "@/components/Common/Loaders";
import { forgotPassword } from "@/lib/services/auth.service";
import { useMutation } from "@tanstack/react-query";
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
      <div className="sm:min-w-[30rem] w-full relative bg-white border rounded-xl p-8 mx-auto">
        {loading && <Loader />}

        <form onSubmit={handleSubmit(submit)} noValidate>
          <div className="space-y-3">
            <p className={`font-bold text-primary-base uppercase text-xl`}>Forgot Password</p>

            <div className="space-y-1">
              <label>Email</label>
              <input
                type="text"
                className={`w-full p-3 bg-transparent border ${
                  !errors.email ? "border-black/30 rounded focus:border-primary-base/80" : "border-red-500"
                } duration-200`}
                placeholder="Enter you email"
                {...register("email", { required: true })}
              />
            </div>

            <Button text="Send Reset Link" fullWidth variant="filled" loading={loading} disabled={loading} />
          </div>
        </form>
      </div>
    </main>
  );
};

export default ForgotPasswordModal;
