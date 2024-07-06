"use client";
import Payment from "@/components/UI/Payment";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const trxref = useSearchParams().get("trxref");

  return <Payment trxref={trxref} />;
};

export default Page;
