import { OverviewCard as Props } from "@/lib/data/dashboard";

const OverviewCard = ({ icon, title, isNumeric, value }: Props) => {
  return (
    <div className="p-4 border bg-white">
      {icon}
      <div>
        <p>{value}</p>
        <p>{title}</p>
      </div>
    </div>
  );
};

export default OverviewCard;
