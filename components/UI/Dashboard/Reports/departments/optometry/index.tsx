import TableComponent from "@/components/Common/Table";
import columns from "./columns";
import { EyesMetrics, HeartMetrics } from "@/lib/types/reports";
import { getRandomFloat, getRandomNumber } from "@/lib/helpers/numbers";
import { useQuery } from "@tanstack/react-query";
import { DepartmentsEnum } from "@/lib/enums";
import { getReports } from "@/lib/services/report.service";

const OptometryReport = () => {
  const { data } = useQuery({
    queryKey: ["getReports", DepartmentsEnum.OPTOMETRY],
    queryFn: getReports<EyesMetrics>(DepartmentsEnum.OPTOMETRY),
  });

  return (
    <div>
      <TableComponent columns={columns} data={data || []} />
    </div>
  );
};

export default OptometryReport;
