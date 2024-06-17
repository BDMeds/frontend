import Button from "@/components/Common/Button";
import { defaultImageUrl } from "@/lib/data/dashboard";
import { HeartMetrics } from "@/lib/types/reports";
import { faker } from "@faker-js/faker";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";

const columns: ColumnDef<HeartMetrics>[] = [
  {
    accessorKey: "doctor",
    header: () => "Doctor",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 min-w-[15rem]">
        <div className="size-10 rounded-full border relative overflow-hidden">
          <Image
            src={defaultImageUrl}
            alt="profile-pic"
            width={100}
            height={100}
            className="w-full h-full absolute top-0 left-0"
          />
        </div>

        <div className="text-sm">
          <p className="font-bold">{faker.person.fullName()}</p>
          <p className="text-xs text-gray-400">Neurologist</p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "heartRate",
    header: () => "Heart Rate",
  },
  {
    accessorKey: "bloodGlucoseLevel",
    header: () => "Glucose Level",
  },
  {
    accessorKey: "bloodOxygenLevel",
    header: () => "Blood Oxygen L",
  },
  {
    accessorKey: "bloodPressureDiastolic",
    header: () => "Blood Pressure",
  },
  {
    accessorKey: "actions",
    header: () => "Action",
    cell: ({ row }) => {
      return (
        <Link href={`/reports/${row.original.patient}`}>
          <Button text="View Report" size="extra-small" />
        </Link>
      );
    },
  },
];

export default columns;
