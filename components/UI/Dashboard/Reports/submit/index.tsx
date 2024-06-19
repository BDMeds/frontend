"use client";

import Button from "@/components/Common/Button";
import Loader from "@/components/Common/Loaders";
import { DepartmentsEnum } from "@/lib/enums";
import { getSingleAppointment } from "@/lib/services/appointment.service";
import { getAppointmentReport } from "@/lib/services/report.service";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import Default from "./default";
import Cardiology from "./cardiology";
import Dentistry from "./dentistry";
import Dermatology from "./dermatology";
import Nephrology from "./nephrology";
import Hepatology from "./hepatology";
import Neurology from "./neurology";
import Optometry from "./optometry";
import Orthopedic from "./orthopedics";

const SubmitReport = () => {
  const { id: appointmentId } = useParams<{ id: string }>();
  const { push } = useRouter();

  const { data: appointment, isLoading: appointmentsLoading } = useQuery({
    queryKey: ["getAppointment"],
    queryFn: getSingleAppointment(appointmentId),
  });

  const {
    data: report,
    isLoading: reportsLoading,
    refetch: refetchReport,
  } = useQuery({
    queryKey: ["getAppointmentReport"],
    queryFn: getAppointmentReport(appointmentId),
  });

  if (reportsLoading || appointmentsLoading) {
    return (
      <div className="mx-auto max-w-fit">
        <Loader />
      </div>
    );
  }

  if (!reportsLoading && !appointmentsLoading && report) {
    return (
      <div className="flex flex-col space-y-2 justify-center items-center min-h-[70vh]">
        <FaCheckCircle size={45} color="green" />

        <h1>You have already submitted a report for this appointment</h1>

        <Button
          text="View Report"
          variant="filled"
          onClick={() =>
            push(
              `/reports/${report!._id}?department=${appointment?.department}`
            )
          }
        />
      </div>
    );
  }

  if (!reportsLoading && !appointmentsLoading && !report) {
    let component;
    switch (appointment?.department) {
      case DepartmentsEnum.CARDIOLOGY:
        component = <Cardiology refetchReport={refetchReport} />;
        break;
      case DepartmentsEnum.DENTISTRY:
        component = <Dentistry refetchReport={refetchReport} />;
        break;
      case DepartmentsEnum.DERMATOLOGY:
        component = <Dermatology refetchReport={refetchReport} />;
        break;
      case DepartmentsEnum.HEPATOLOGY:
        component = <Hepatology refetchReport={refetchReport} />;
        break;
      case DepartmentsEnum.NEPHROLOGY:
        component = <Nephrology refetchReport={refetchReport} />;
        break;
      case DepartmentsEnum.NEUROLOGY:
        component = <Neurology refetchReport={refetchReport} />;
        break;
      case DepartmentsEnum.OPTOMETRY:
        component = <Optometry refetchReport={refetchReport} />;
        break;
      case DepartmentsEnum.ORTHOPEDICS:
        component = <Orthopedic refetchReport={refetchReport} />;
        break;
      default:
        component = <></>;
    }

    return (
      <>
        <Default appointment={appointment!} />
        {component}
      </>
    );
  }
};

export default SubmitReport;
