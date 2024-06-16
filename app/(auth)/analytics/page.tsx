import Analytics from "@/components/UI/Dashboard/Analytics";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Analytics"
}


const Page = () => {
  return <Analytics />;
};

export default Page;
