import { MdDashboard, MdOutlineDashboard, MdOutlineAnalytics, MdAnalytics, MdCreate, MdReport } from "react-icons/md";
import { MdOutlineCurrencyExchange } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { MdOutlineReport } from "react-icons/md";
import { FaUserDoctor } from "react-icons/fa6";
import { AiOutlineMedicineBox, AiFillMedicineBox } from "react-icons/ai";
import { TbMedicineSyrup } from "react-icons/tb";
import { GiDoctorFace } from "react-icons/gi";
import { LuUsers } from "react-icons/lu";

type Link = {
  text: string;
  path: string;
  iconOutlined: JSX.Element;
  iconFilled: JSX.Element;
};

type SidebarLink = {
  heading: string;
  links: Link[];
};

const baseLinks: Link[] = [
  {
    iconOutlined: <MdOutlineDashboard />,
    iconFilled: <MdDashboard />,
    text: "Dashboard",
    path: "/dashboard",
  },
  {
    iconOutlined: <FaUserDoctor />,
    iconFilled: <FaUserDoctor />,
    text: "Appointments",
    path: "/appointments",
  },
  {
    iconOutlined: <AiOutlineMedicineBox />,
    iconFilled: <AiFillMedicineBox />,
    text: "Consultations",
    path: "/consultations",
  },
  {
    iconOutlined: <MdOutlineAnalytics />,
    iconFilled: <MdAnalytics />,
    text: "Analytics",
    path: "/analytics",
  },
  {
    iconOutlined: <TbMedicineSyrup />,
    iconFilled: <TbMedicineSyrup />,
    text: "Pharmacy",
    path: "/pharmacy",
  },
];

export const patientLinks: SidebarLink[] = [
  {
    heading: "Main",
    links: [
      ...baseLinks,
      {
        iconOutlined: <GiDoctorFace />,
        iconFilled: <GiDoctorFace />,
        text: "Doctors",
        path: "/doctors",
      },
      {
        iconOutlined: <MdOutlineCurrencyExchange />,
        iconFilled: <MdOutlineCurrencyExchange />,
        text: "Billing Records",
        path: "/bills",
      },
      {
        iconOutlined: <MdOutlineReport />,
        iconFilled: <MdReport />,
        text: "Report an issue",
        path: "/report",
      },
    ],
  },
];

export const doctorLinks: SidebarLink[] = [
  {
    heading: "Main",
    links: [
      ...baseLinks,
      {
        iconOutlined: <LuUsers />,
        iconFilled: <LuUsers />,
        text: "Patients",
        path: "/patients",
      },
      {
        iconOutlined: <MdOutlineCurrencyExchange />,
        iconFilled: <MdOutlineCurrencyExchange />,
        text: "Billings",
        path: "/bills",
      },
      {
        iconOutlined: <MdOutlineReport />,
        iconFilled: <MdReport />,
        text: "Report an issue",
        path: "/report",
      },
    ],
  },
];

export const adminLinks: SidebarLink[] = [
  {
    heading: "Main",
    links: [
      {
        iconOutlined: <MdOutlineDashboard />,
        iconFilled: <MdDashboard />,
        text: "Dashboard",
        path: "/s/dashboard",
      },
      {
        iconOutlined: <MdOutlineAnalytics />,
        iconFilled: <MdAnalytics />,
        text: "Analytics",
        path: "/s/analytics",
      },
      {
        iconOutlined: <MdOutlineReport />,
        iconFilled: <MdReport />,
        text: "Reports",
        path: "/s/reports",
      },
    ],
  },
];

export const bottomSidebarLinks: SidebarLink[] = [
  {
    heading: "others",
    links: [
      {
        iconOutlined: <CiSettings />,
        iconFilled: <CiSettings />,
        text: "Settings",
        path: "/settings?tab=general",
      },
    ],
  },
];
