"use client";
import TableComponent from "@/components/Common/Table";
import columns from "./table/columns";

const Bills = () => {
  return (
    <div>
      <TableComponent columns={columns} data={[]} />
    </div>
  );
};

export default Bills;
