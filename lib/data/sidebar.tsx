import { MdDashboard, MdOutlineDashboard, MdOutlineAnalytics, MdAnalytics, MdCreate, MdReport } from "react-icons/md";
import { MdOutlineCurrencyExchange } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { MdOutlineReport } from "react-icons/md";
import { FaShoppingBasket } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { AiOutlineMedicineBox, AiFillMedicineBox } from "react-icons/ai";
import { TbMedicineSyrup } from "react-icons/tb";
import { GiDoctorFace } from "react-icons/gi";

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

export const sidebarLinks: SidebarLink[] = [
  {
    heading: "Main",
    links: [
      {
        iconOutlined: <MdOutlineDashboard />,
        iconFilled: <MdDashboard />,
        text: "Dashboard",
        path: "/dashboard",
      },
      {
        iconOutlined: <GiDoctorFace />,
        iconFilled: <GiDoctorFace />,
        text: "Doctors",
        path: "/doctors",
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

export const adminSidebarLinks: SidebarLink[] = [
  {
    heading: "Main",
    links: [
      {
        iconOutlined: <MdOutlineDashboard />,
        iconFilled: <MdDashboard />,
        text: "Overview",
        path: "/a/dashboard",
      },
      {
        iconOutlined: <FaShoppingBasket />,
        iconFilled: <FaShoppingBasket />,
        text: "Orders",
        path: "/a/orders",
      },
      {
        iconOutlined: <MdCreate />,
        iconFilled: <MdCreate />,
        text: "Manage",
        path: "/a/create",
      },
      {
        iconOutlined: <MdOutlineReport />,
        iconFilled: <MdReport />,
        text: "Reports",
        path: "/a/reports",
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
