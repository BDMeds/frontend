import TableComponent from "@/components/Common/Table";
import columns from "./columns";
import { HeartMetrics } from "@/lib/types/reports";
import { getRandomFloat, getRandomNumber } from "@/lib/helpers/numbers";
import { useQuery } from "@tanstack/react-query";
import { DepartmentsEnum } from "@/lib/enums";
import { getReports } from "@/lib/services/report.service";
import Loader from "@/components/Common/Loaders";

const CardiologyReport = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["getReports", DepartmentsEnum.CARDIOLOGY],
    queryFn: getReports<HeartMetrics>(DepartmentsEnum.CARDIOLOGY),
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <TableComponent columns={columns} data={data || []} />
    </div>
  );
};

export default CardiologyReport;
