import { OverviewCard as Props } from "@/lib/data/dashboard";

const OverviewCard = ({ icon, title, value }: Props) => {
  return (
    <div className="p-5 rounded-lg border dark:border-white/10 bg-white dark:bg-white/10 flex gap-4">
      <div className="size-12 grid place-content-center text-primary bg-primary/10 rounded">{icon}</div>
      <div>
        <p className="text-xl font-bold">{value}</p>
        <p className="text-gray-500">{title}</p>
      </div>
    </div>
  );
};

export default OverviewCard;
