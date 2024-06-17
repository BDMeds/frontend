import { FC } from "react";
import { FaCalendarCheck, FaFileMedical, FaUser, FaUserMd } from "react-icons/fa";

type Card = {
  title: string;
  value: string;
  icon: JSX.Element;
};

const cardsData: Card[] = [
  {
    title: "Total Users",
    value: "100",
    icon: <FaUser />,
  },
  {
    title: "Total Doctors",
    value: "50",
    icon: <FaUserMd />,
  },
  {
    title: "Total Patients",
    value: "50",
    icon: <FaUser />,
  },
  {
    title: "Total Appointments",
    value: "200",
    icon: <FaCalendarCheck />,
  },
  {
    title: "Total Reports",
    value: "100",
    icon: <FaFileMedical />,
  },
];

const AdminCards = () => {
  return (
    <div className="">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {cardsData.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

const Card: FC<Card> = ({ title, value, icon }) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-md flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-lg font-bold">{value}</p>
      </div>
      <div className="bg-gray-100 p-3 rounded-full">{icon}</div>
    </div>
  );
};

export default AdminCards;
