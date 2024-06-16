import { CgBell } from "react-icons/cg";
import { CiSettings, CiWallet } from "react-icons/ci";
import { FaUserDoctor } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";

export type Tab = "general" | "account" | "doctors" | "payments" | "notifications" | "reviews";

type Side = {
  name: string;
  tab: Tab;
  icon: JSX.Element;
};

const baseSettings: Side[] = [
  {
    name: "General",
    tab: "general",
    icon: <CiSettings />,
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
];

export const patientsSettings: Side[] = [
  ...baseSettings,
  {
    name: "Doctors",
    tab: "doctors",
    icon: <FaUserDoctor />,
  },
];

export const doctorsSettings: Side[] = [
  ...baseSettings,
  {
    name: "Reviews",
    tab: "reviews",
    icon: <FaRegComment />,
  },
  {
    name: "Account",
    tab: "account",
    icon: <IoSettingsOutline />,
  },
];
