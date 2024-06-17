import AdminKyc from "@/components/UI/AdminDashboard/Kyc";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: 'KYC',
}

const Page = () => {
  return <AdminKyc />;
};

export default Page;
