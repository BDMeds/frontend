import { OverviewCard as Props } from "@/lib/data/dashboard";

const OverviewCard = ({ icon, title, isNumeric, value }: Props) => {
  return (
    <div className="p-5 rounded-lg border bg-white flex gap-4">
      <div className="size-12 grid place-content-center text-primary bg-primary/10 rounded">{icon}</div>
      <div>
        <p className="text-xl font-bold">{value}</p>
        <p>{title}</p>
      </div>
    </div>
  );
};

export default OverviewCard;
