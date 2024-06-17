import { KycGet } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import ViewKycButton from "./view-kyc-button";
import ViewButton from "./view-btn";

import { parseISO, formatDistanceToNow } from "date-fns";
import { CgImage } from "react-icons/cg";

const columns: ColumnDef<KycGet>[] = [
  {
    accessorKey: "doctor",
    header: "Doctor",
    cell: ({ row }) => {
      const { doctor } = row.original;

      return (
        <div className="flex items-center gap-2">
          <div className="size-10 rounded-full border relative overflow-hidden">
            <Image
              src={`${doctor.user.profilePicture}`}
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
            <p className="text-xs text-gray-400">{doctor.speciality}</p>
          </div>
        </div>
      );
    },
  },
  { accessorKey: "idType", header: "ID Type" },
  {
    accessorKey: "idDoc",
    header: "ID Document",
    cell: ({ row }) => (
      <div>
        <ViewButton image={row.original.idDoc} />
      </div>
    ),
  },
  {
    accessorKey: "professionalCert",
    header: "Professional Certificate",
    cell: ({ row }) => (
      <div>
        <CgImage />

        {/* <ViewButton image={row.original.professionalCert} /> */}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const { createdAt: dateString } = row.original;

      const givenDate = parseISO(dateString);
      const timePast = formatDistanceToNow(givenDate, { addSuffix: true });

      return <p>{timePast}</p>;
    },
  },
  { accessorKey: "more", header: "", cell: ({ row }) => <ViewKycButton {...row.original} /> },
];

export default columns;
