import Button from "@/components/Common/Button";
import { useModal } from "@/lib/providers/modal-provider";
import { IDoctor } from "@/lib/types";
import { ColumnDef, Row } from "@tanstack/react-table";
import Image from "next/image";
import DoctorProfileModal from "./doctor-profile-modal";

const ViewButton = (row: Row<IDoctor>) => {
  const { showModal } = useModal();

  return (
    <Button
      variant="filled"
      size="extra-small"
      text="View"
      className="group-hover:opacity-100 opacity-0"
      onClick={() => showModal(<DoctorProfileModal {...row.original} />)}
    />
  );
};

const columns: ColumnDef<IDoctor>[] = [
  {
    accessorKey: "name",
    header: "Info",
    cell: ({ row }) => {
      const {
        user: { firstName, lastName, profilePicture },
        speciality,
      } = row.original;

      return (
        <div className="flex items-center gap-3">
          <div className="relative size-8 rounded-full overflow-hidden">
            <Image
              src={profilePicture}
              alt={`Dr. ${firstName} ${lastName}`}
              width={100}
              height={100}
              className="absolute top-0 left-0 w-full h-full"
            />
          </div>
          <div className="leading-tight">
            <p className="font-bold">
              {firstName} {lastName}
            </p>
            <p className="dark:text-gray-400 text-gray-500 capitalize">{speciality}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => `${row.original.department}`,
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => <p className="capitalize">{row.original.user.gender}</p>,
  },
  {
    accessorKey: "yearsOfExperience",
    header: "Experience (Years)",
    cell: ({ row }) => row.original.yearsOfExperience,
  },
  {
    accessorKey: "isAvailable",
    header: "Available",
    cell: ({ row }) => (
      <div className={`size-4 rounded-full ${row.original.isAvailable ? "bg-green-500" : "bg-red-500"}`}></div>
    ),
  },
  {
    accessorKey: "kycVerified",
    header: "Verified",
    cell: ({ row }) => (
      <div className={`size-4 rounded-full ${row.original.kycVerified ? "bg-green-500" : "bg-red-500"}`}></div>
    ),
  },
  {
    accessorKey: "action",
    header: () => <></>,
    cell: ({ row }) => <ViewButton {...row} />,
  },
];

export default columns;
