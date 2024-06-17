"use client";

import TableComponent from "@/components/Common/Table";
import columns from "./table/columns";
import dummyKycData from "./table/data";

const AdminKyc = () => {
  return (
    <div>
      <TableComponent columns={columns} data={dummyKycData} />
    </div>
  );
};

export default AdminKyc;
