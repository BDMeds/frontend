import { MdDashboard, MdOutlineDashboard, MdOutlineAnalytics, MdAnalytics, MdCreate, MdReport } from "react-icons/md";
import { HiOutlineUserCircle } from "react-icons/hi";
import { HiMiniUserCircle } from "react-icons/hi2";
import { MdOutlineCurrencyExchange } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { MdOutlineReport } from "react-icons/md";
import { FaShoppingBasket } from "react-icons/fa";

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
        text: "Overview",
        path: "/dashboard",
      },
      {
        iconOutlined: <MdOutlineCurrencyExchange />,
        iconFilled: <MdOutlineCurrencyExchange />,
        text: "Trade",
        path: "/trade",
      },
      {
        iconOutlined: <MdOutlineAnalytics />,
        iconFilled: <MdAnalytics />,
        text: "Orders",
        path: "/orders",
      },
      {
        iconOutlined: <HiOutlineUserCircle />,
        iconFilled: <HiMiniUserCircle />,
        text: "Analytics",
        path: "/analytics",
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
        path: "/settings",
      },
    ],
  },
];
