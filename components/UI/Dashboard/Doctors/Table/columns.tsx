import { IDoctor } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";

const columns: ColumnDef<IDoctor>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => `${row.original.user.firstName} ${row.original.user.lastName}`,
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => `${row.original.department}`,
  },
  {
    accessorKey: "speciality",
    header: "Speciality",
    cell: ({ row }) => `${row.original.speciality}`,
  },
  {
    accessorKey: "kycVerified",
    header: "Verified",
    cell: ({ row }) => (
      <div className={`size-6 rounded-full ${row.original.kycVerified ? "bg-green-500" : "bg-red-500"}`}></div>
    ),
  },
];

export default columns;
