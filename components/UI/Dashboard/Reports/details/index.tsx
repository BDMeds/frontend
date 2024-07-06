"use client";

import Loader from "@/components/Common/Loaders";
import HeartReportDetails from "./heart";
import TeethReportDetails from "./teeth";
import { useMemo } from "react";
import { DepartmentsEnum } from "@/lib/enums";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getReport } from "@/lib/services/report.service";
import SkinReportDetails from "./skin";
import LiverReportDetail from "./liver";
import KidneyReportDetail from "./kidney";
import BrainReportDetail from "./brain";
import EyeReportDetail from "./eyes";
import BoneReportDetail from "./skeleton";
import Button from "@/components/Common/Button";
import { useModal } from "@/lib/providers/modal-provider";
import PrescriptionModal from "./_modal/prescription-modal";

const ReportsDetails = () => {
  const { push } = useRouter();
  const { id: reportId } = useParams<{ id: string }>();
  const searchParams = useSearchParams();

  const department = searchParams.get("department");

  const isValid = useMemo(() => Object.values(DepartmentsEnum).includes(department as DepartmentsEnum), [department]);

  const { data: report, isPending: reportLoading } = useQuery({
    queryKey: ["getSingleReport", reportId],
    queryFn: getReport(reportId!, department as DepartmentsEnum),
  });

  const { showModal } = useModal();

  if (!isValid) {
    push("/not-found");
    return null;
  }

  if (reportLoading) {
    return (
      <div className="w-full h-full grid place-content-center">
        <Loader />
      </div>
    );
  }

  if (!reportLoading && report) {
    let component;
    switch (department) {
      case DepartmentsEnum.CARDIOLOGY:
        component = <HeartReportDetails report={report} />;
        break;
      case DepartmentsEnum.DENTISTRY:
        component = <TeethReportDetails report={report} />;
        break;
      case DepartmentsEnum.DERMATOLOGY:
        component = <SkinReportDetails report={report} />;
        break;
      case DepartmentsEnum.HEPATOLOGY:
        component = <LiverReportDetail report={report} />;
        break;
      case DepartmentsEnum.NEPHROLOGY:
        component = <KidneyReportDetail report={report} />;
        break;
      case DepartmentsEnum.NEUROLOGY:
        component = <BrainReportDetail report={report} />;
        break;
      case DepartmentsEnum.OPTOMETRY:
        component = <EyeReportDetail report={report} />;
        break;
      case DepartmentsEnum.ORTHOPEDICS:
        component = <BoneReportDetail report={report} />;
        break;
      default:
        component = <></>;
    }

    return (
      <>
        <div className="rounded-md bg-white dark:bg-white/10 border dark:border-white/10 p-2 px-3 mb-4 flex items-center justify-between">
          <p>
            <b>Consultation Note: </b>
            {report?.consultation?.consultationNote}
          </p>

          <Button
            text="View Prescriptions"
            variant="filled"
            size="extra-small"
            onClick={() => showModal(<PrescriptionModal />)}
            rounded="full"
          />
        </div>

        {component}
      </>
    );
  }
};

export default ReportsDetails;
