"use client";

import TableComponent from "@/components/Common/Table";
import columns from "./table/columns";
import { useQuery } from "@tanstack/react-query";
import { getKyc } from "@/lib/services/admin.service";

const AdminKyc = () => {
  const { data, isPending: loading } = useQuery({ queryKey: ["kyc-data"], queryFn: () => getKyc("pending") });

  return (
    <div>
      <TableComponent columns={columns} data={data || []} loading={loading} />
    </div>
  );
};

export default AdminKyc;
