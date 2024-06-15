import { CgBell, CgUser } from "react-icons/cg";
import { CiSettings, CiWallet } from "react-icons/ci";

export type Tab = "general" | "account" | "doctor" | "payments" | "notifications";

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
  {
    name: "Account",
    tab: "account",
    icon: <CgUser />,
  },
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
    name: "Doctor",
    tab: "doctor",
    icon: <CiSettings />,
  },
];
