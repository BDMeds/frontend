import { Appointment } from "@/lib/types";
import Image from "next/image";
import React, { FC } from "react";
import { GiFemale, GiMale } from "react-icons/gi";

type Props = {
  appointment: Appointment;
};

const Default: FC<Props> = ({ appointment }) => {
  return (
    <header className="flex items-start space-y-3 space-x-5 md:flex-row flex-col mb-6">
      <div className="size-32 rounded-full overflow-hidden relative">
        <Image
          src={appointment?.patient?.user?.profilePicture!}
          alt={appointment?.patient?.user?.firstName!}
          width={300}
          height={300}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>

      <div className="">
        <h1 className="font-bold">
          {appointment?.patient?.user?.firstName} {appointment?.patient?.user?.lastName}
          <span className="inline-block align-middle ml-2">
            {appointment?.patient?.user?.gender === "male" ? <GiMale color="royalblue" /> : <GiFemale color="pink" />}
          </span>
        </h1>
      </div>
    </header>
  );
};

export default Default;
