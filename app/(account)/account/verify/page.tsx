"use client";
import Button from "@/components/Common/Button";
import { handleAxiosErrorWithToast } from "@/lib/config/axios-error";
import { publicApi } from "@/lib/config/axios-instance";
import { toastError, toastSuccess } from "@/lib/utils/toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { MdErrorOutline } from "react-icons/md";
import { RiLoader4Fill } from "react-icons/ri";

const Page = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!token) return;

    const verify = async () => {
      try {
        const { data } = await publicApi.post("/auth/verify", { token, email });
        toastSuccess("Verification successful");
        return data;
      } catch (err) {
        setError(true);
        handleAxiosErrorWithToast(err);
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [token]);

  if (!token) {
    toastError("Verification error: invalid verification URL", { id: "invalid" });
    return router.replace("/account/register");
  }

  return (
    <div>
      {loading ? (
        <div className="min-h-[20rem] grid place-content-center text-center space-y-3">
          <RiLoader4Fill size={50} className="mx-auto animate-spin" />

          <p className="text-sm">Verifying</p>
        </div>
      ) : (
        <>
          {error ? (
            <div className="space-y-10 min-h-[20rem] grid place-content-center capitalize text-center">
              <div className="space-y-3">
                <MdErrorOutline size={50} className="mx-auto text-red-500" />
                <p className="text-sm">Sorry, account verification failed</p>
              </div>

              <div className="flex items-center justify-center gap-4">
                <Button text="Go Home" onClick={() => router.replace("/")} />
              </div>
            </div>
          ) : (
            <div className="space-y-10 min-h-[20rem] grid place-content-center capitalize text-center">
              <div className="space-y-3">
                <FaCheckCircle size={50} className="mx-auto text-green-500" />
                <p className="text-sm">account verified successfully</p>
              </div>

              <div className="flex items-center justify-center gap-4">
                <Button text="Go Home" onClick={() => router.replace("/")} />
                <Button
                  text="Login"
                  variant="filled"
                  icon={<FiLogIn />}
                  onClick={() => router.replace("/account/login")}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Page;
