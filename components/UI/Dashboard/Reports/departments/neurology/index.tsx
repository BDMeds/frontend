import TableComponent from "@/components/Common/Table";
import columns from "./columns";
import { BrainMetrics, HeartMetrics } from "@/lib/types/reports";
import { getRandomFloat, getRandomNumber } from "@/lib/helpers/numbers";
import { useQuery } from "@tanstack/react-query";
import { DepartmentsEnum } from "@/lib/enums";
import { getReports } from "@/lib/services/report.service";

const NeurologyReport = () => {
  const { data } = useQuery({
    queryKey: ["getReports", DepartmentsEnum.NEUROLOGY],
    queryFn: getReports<BrainMetrics>(DepartmentsEnum.NEUROLOGY),
  });

  return (
    <div>
      <TableComponent columns={columns} data={data || []} />
    </div>
  );
};

export default NeurologyReport;
