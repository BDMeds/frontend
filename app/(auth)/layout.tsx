import DashboardWrapper from "@/components/Layout/Dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  // prevent robots from indexing protected pages
  robots: {
    index: false,
    nocache: true,
    follow: false,
    noarchive: true,
  },
  title: {
    default: "Admin Dashboard",
    template: `%s | DisuEx`,
  },
};

const Layout = ({ children }: { children: Readonly<React.ReactNode> }) => {
  return <DashboardWrapper>{children}</DashboardWrapper>;
};

export default Layout;
