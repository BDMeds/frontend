import Bills from "@/components/UI/Dashboard/Bills";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Billing Records",
};

const Page = () => {
  return <Bills />;
};

export default Page;
