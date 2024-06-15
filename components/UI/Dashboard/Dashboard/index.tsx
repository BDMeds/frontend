import { cards } from "@/lib/data/dashboard";
import OverviewCard from "./card";
import BarChart from "./Charts/bar-chart";

const Dashboard = () => {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-4 gap-6">
        {cards.map((card, id) => (
          <OverviewCard key={id} {...card} />
        ))}
      </div>

      <div className="grid-cols-3 grid gap-5">
        <div className="col-span-2 border space-y-4 rounded-lg bg-white px-4 py-6">
          <p className="text-xl font-semibold text-gray-600 px-4">Consultations</p>
          <BarChart />
        </div>
        <div className="border min-h-[20rem] rounded-lg bg-white"></div>
      </div>

      <div className="grid-cols-3 grid gap-5">
        {Array.from({ length: 3 }).map((_, id) => (
          <div className="border min-h-[20rem] rounded-lg bg-white" key={id}></div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
