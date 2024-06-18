import TableComponent from "@/components/Common/Table";
import columns from "./columns";
import { EyesMetrics, HeartMetrics } from "@/lib/types/reports";
import { getRandomFloat, getRandomNumber } from "@/lib/helpers/numbers";
import { useQuery } from "@tanstack/react-query";
import { DepartmentsEnum } from "@/lib/enums";
import { getReports } from "@/lib/services/report.service";
import Loader from "@/components/Common/Loaders";

const DentistryReport = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["getReports", DepartmentsEnum.DENTISTRY],
    queryFn: getReports<EyesMetrics>(DepartmentsEnum.DENTISTRY),
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

export default DentistryReport;
