import AdminDashboardWrapper from "@/components/Layout/Dashboard/admin-index";
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
    default: "Super Admin Dashboard",
    template: `%s | BDMeds`,
  },
};

const Layout = ({ children }: { children: Readonly<React.ReactNode> }) => {
  return <AdminDashboardWrapper>{children}</AdminDashboardWrapper>;
};

export default Layout;
