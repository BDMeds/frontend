"use client";
import { cards } from "@/lib/data/dashboard";
import OverviewCard from "./card";
import BarChart from "./Charts/bar-chart";
import Appointments from "./Sections/appointments";
import useUserInfo from "@/lib/hooks/useUserInfo";

const Dashboard = () => {
  const {} = useUserInfo();

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-4 gap-6">
        {cards.map((card, id) => (
          <OverviewCard key={id} {...card} />
        ))}
      </div>

      <div className="grid-cols-3 grid gap-5">
        <div className="col-span-2 border space-y-4 rounded-lg bg-white dark:bg-white/10 px-4 py-6">
          <p className="text-lg font-semibold text-gray-600 px-4">Consultations</p>
          <BarChart />
        </div>
        <div className="border min-h-[20rem] rounded-lg bg-white dark:bg-white/10">
          <Appointments />
        </div>
      </div>

      {/* <div className="grid-cols-3 grid gap-5">
        {Array.from({ length: 3 }).map((_, id) => (
          <div className="border min-h-[20rem] rounded-lg bg-white dark:bg-white/10" key={id}></div>
        ))}
      </div> */}
    </div>
  );
};

export default Dashboard;
