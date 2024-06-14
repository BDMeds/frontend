"use client";
import { useOnboardStore } from "@/lib/store/global.store";
import Image from "next/image";
import { useRouter } from "next/navigation";

const EmailConfirm = () => {
  const { hasRegistered } = useOnboardStore();

  const router = useRouter();

  if (!hasRegistered) {
    router.replace("/account/register");
    return null;
  }

  return (
    <main className="min-w-full min-h-screen grid place-content-center">
      <div className="space-y-4 text-center">
        <div className="grid place-content-center">
          <Image src={"/svgs/email-confirm.svg"} alt="confirm email illustration" width={300} height={300} />
        </div>

        <p className="text-center">A verification link has been sent to you email.</p>
      </div>
    </main>
  );
};

export default EmailConfirm;
