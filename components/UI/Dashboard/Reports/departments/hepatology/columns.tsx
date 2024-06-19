import Button from "@/components/Common/Button";
import { defaultImageUrl } from "@/lib/data/dashboard";
import { DepartmentsEnum } from "@/lib/enums";
import { HeartMetrics } from "@/lib/types/reports";
import { faker } from "@faker-js/faker";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";

const columns: ColumnDef<HeartMetrics>[] = [
  {
    accessorKey: "doctor",
    header: () => "Doctor",
    cell: ({ row }) => {
      const doctor = row.original.consultation?.appointment.doctor!;
      return (
        <div className="flex items-center gap-2 min-w-[15rem]">
          <div className="size-10 rounded-full border relative overflow-hidden">
            <Image
              src={doctor.user.profilePicture!}
              alt="profile-pic"
              width={100}
              height={100}
              className="w-full h-full absolute top-0 left-0"
            />
          </div>

          <div className="text-sm">
            <p className="font-bold">
              {doctor.user.firstName} {doctor.user.lastName}
            </p>
            <p className="text-xs text-gray-400">{doctor.department}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "altLevel",
    header: () => "ALT Level (U/L)",
  },
  {
    accessorKey: "astLevel",
    header: () => "AST Level (U/L)",
  },
  {
    accessorKey: "bilirubin",
    header: () => "Bilirubin (mg/dL)",
  },
  {
    accessorKey: "fibriosisScore",
    header: () => "Fibriosis Score",
  },
  {
    accessorKey: "actions",
    header: () => "Action",
    cell: ({ row }) => {
      return (
        <Link
          href={`/reports/${row.original._id}?department=${DepartmentsEnum.HEPATOLOGY}`}
        >
          <Button text="View Report" size="extra-small" />
        </Link>
      );
    },
  },
];

export default columns;
