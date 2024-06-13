import { cards } from "@/lib/data/dashboard";
import OverviewCard from "./card";

const Dashboard = () => {
  return (
    <div>
      <div className="grid grid-cols-4 gap-6">
        {cards.map((card, id) => (
          <OverviewCard key={id} {...card} />
        ))}
      </div>

      <div className="h-[140rem]"></div>
    </div>
  );
};

export default Dashboard;
