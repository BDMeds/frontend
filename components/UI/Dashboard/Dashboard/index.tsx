import { cards } from "@/lib/data/dashboard";
import OverviewCard from "./card";

const Dashboard = () => {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-4 gap-6">
        {cards.map((card, id) => (
          <OverviewCard key={id} {...card} />
        ))}
      </div>

      <div className="grid-cols-3 grid gap-5">
        <div className="col-span-2 border border-white min-h-[20rem] rounded-lg bg-white"></div>
        <div className="border border-white min-h-[20rem] rounded-lg bg-white"></div>
      </div>

      <div className="grid-cols-3 grid gap-5">
        {Array.from({ length: 3 }).map((_, id) => (
          <div className="border border-white min-h-[20rem] rounded-lg bg-white" key={id}></div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
