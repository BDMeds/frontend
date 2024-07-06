import TableComponent from "@/components/Common/Table";
import columns from "./columns";
import { BoneMetrics, HeartMetrics } from "@/lib/types/reports";
import { getRandomFloat, getRandomNumber } from "@/lib/helpers/numbers";
import { useQuery } from "@tanstack/react-query";
import { DepartmentsEnum } from "@/lib/enums";
import { getReports } from "@/lib/services/report.service";
import Loader from "@/components/Common/Loaders";

const OrthopedicReport = () => {
  const { data, isPending } = useQuery({
    queryKey: ["getReports", DepartmentsEnum.ORTHOPEDICS],
    queryFn: getReports<BoneMetrics>(DepartmentsEnum.ORTHOPEDICS),
  });

  if (isPending) {
    return (
      <div className="p-10 grid place-content-center">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <TableComponent columns={columns} data={data || []} />
    </div>
  );
};

export default OrthopedicReport;
