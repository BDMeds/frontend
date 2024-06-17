import { defaultImageUrl } from "@/lib/data/dashboard";
import { Kyc } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { faker } from "@faker-js/faker";
import ViewKycButton from "./view-kyc-button";

const columns: ColumnDef<Kyc>[] = [
  {
    accessorKey: "doctor",
    header: "Doctor",
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
  { accessorKey: "idType", header: "ID Type" },
  { accessorKey: "idDoc", header: "ID Document" },
  { accessorKey: "professionalCert", header: "Professional Certificate" },
  { accessorKey: "more", header: "", cell: ({ row }) => <ViewKycButton {...row.original} /> },
];

export default columns;
