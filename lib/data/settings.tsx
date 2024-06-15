import { CgBell } from "react-icons/cg";
import { CiSettings, CiWallet } from "react-icons/ci";
import { FaUserDoctor } from "react-icons/fa6";

export type Tab = "general" | "profile" | "doctors" | "payments" | "notifications";

type Side = {
  name: string;
  tab: Tab;
  icon: JSX.Element;
};

export const settingSideData: Side[] = [
  {
    name: "General",
    tab: "general",
    icon: <CiSettings />,
  },
  // {
  //   name: "Account",
  //   tab: "profile",
  //   icon: <CgUser />,
  // },
  {
    name: "Notifications",
    tab: "notifications",
    icon: <CgBell />,
  },
  {
    name: "Payments",
    tab: "payments",
    icon: <CiWallet />,
  },
  {
    name: "Doctors",
    tab: "doctors",
    icon: <FaUserDoctor />,
  },
];
