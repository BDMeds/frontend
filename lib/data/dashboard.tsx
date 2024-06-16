import { AiOutlineMedicineBox } from "react-icons/ai";
import { CiMoneyBill } from "react-icons/ci";
import { FaUserDoctor } from "react-icons/fa6";
import { FiMessageCircle } from "react-icons/fi";

export type OverviewCard = {
  title: string;
  isNumeric: boolean;
  value: string | number;
  icon: JSX.Element;
};

export const cards: OverviewCard[] = [
  { title: "Appointments", isNumeric: true, icon: <FaUserDoctor />, value: Math.floor(Math.random() * 100) + 50 },
  {
    title: "Consultations",
    isNumeric: true,
    icon: <AiOutlineMedicineBox />,
    value: Math.floor(Math.random() * 100) + 50,
  },
  { title: "Pending Bills", isNumeric: true, icon: <CiMoneyBill />, value: Math.floor(Math.random() * 100) + 50 },
  { title: "Messages", isNumeric: true, icon: <FiMessageCircle />, value: Math.floor(Math.random() * 100) + 50 },
];

export const defaultImageUrl =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1H81w4SmKH5DZmIbxU7EB0aMSkNQDoPQA1mRQxf2Y0wMF1NSa7vghbwwKASi1q4NPmNw&usqp=CAU";
