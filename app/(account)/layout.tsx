import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return <main>{children}</main>;
};

export default Layout;
