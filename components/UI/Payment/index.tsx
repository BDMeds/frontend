"use client";

import Loader from "@/components/Common/Loaders";
import { verifyPayment } from "@/lib/services/patient.service";
import { toastError } from "@/lib/utils/toast";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

const Payment = ({ trxref }: { trxref: string | null }) => {
  const router = useRouter();

  const { data, isPending: loading } = useQuery({
    queryFn: () => verifyPayment(`${trxref}`),
    queryKey: ["verify-payment", trxref],
    enabled: Boolean(trxref),
  });

  if (!trxref) {
    toastError("Invalid transaction reference.");
    router.replace("/");
  } else
    return (
      <div className="h-screen flex items-center justify-center">
        <div>
          {data && (
            <div className="size-80 border dark:border-white/10 rounded-2xl flex items-center justify-center text-center">
              {data.status === "successful" ? (
                <div>
                  <FaCheckCircle size={50} className="mx-auto text-green-400" />
                  <p className="opacity-80">Transaction successful</p>
                </div>
              ) : data.status.toLowerCase() === "pending" ? (
                <Loader />
              ) : (
                <div>
                  <FaX size={50} className="mx-auto text-red-400" />
                  <p className="opacity-80">Transaction failed</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
};

export default Payment;
