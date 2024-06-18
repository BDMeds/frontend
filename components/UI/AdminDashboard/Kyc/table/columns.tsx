import { KycGet } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import ViewKycButton from "./view-kyc-button";
import ViewButton from "./view-btn";

import { parseISO, formatDistanceToNow } from "date-fns";

const getTimePast = (dateString: string) => {
  const givenDate = parseISO(dateString);
  return formatDistanceToNow(givenDate, { addSuffix: true });
};

const columns: ColumnDef<KycGet>[] = [
  {
    accessorKey: "doctor",
    header: "Doctor",
    cell: ({ row }) => {
      const { doctor } = row.original;

      return (
        <div className="flex items-center gap-2">
          <div className="size-10 rounded-full border relative overflow-hidden">
            {/* <Image
              src={`${doctor.user.profilePicture}`}
              alt="profile-pic"
              width={100}
              height={100}
              className="w-full h-full absolute top-0 left-0"
            /> */}
          </div>
        </div>
      );
    },
  },
  { accessorKey: "idType", header: "ID Type" },
  {
    accessorKey: "name",
    header: "Full Name",
    cell: ({ row }) => (
      <p>
        {row.original.doctor.user.firstName} {row.original.doctor.user.lastName}
      </p>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Time Uploaded",
    cell: ({ row }) => {
      const { createdAt: dateString } = row.original;

      return <p>{getTimePast(dateString)}</p>;
    },
  },
  { accessorKey: "more", header: "", cell: ({ row }) => <ViewKycButton {...row.original} /> },
];

export default columns;
