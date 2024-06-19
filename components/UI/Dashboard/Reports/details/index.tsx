"use client";

import { parentVariant } from "@/lib/utils/variants";
import { motion } from "framer-motion";
import { DumChart2, DummyChart1 } from "./charts";
import Loader from "@/components/Common/Loaders";
import dynamic from "next/dynamic";
import BloodPressureBarChart from "./charts/blood-pressure";
import HeartRateLineChart from "./charts/heart-rate-line";
import CholesterolPieChart from "./charts/cholesterol-level";
import { ResponsiveContainer } from "recharts";
import HeartReportDetails from "./heart";
import TeethReportDetails from "./teeth";
import { FC, useMemo } from "react";
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
import Image from "next/image";

const ReportsDetails = () => {
  const { push } = useRouter();
  const { id: reportId } = useParams<{ id: string }>();
  const searchParams = useSearchParams();

  const department = searchParams.get("department");

  const isValid = useMemo(
    () =>
      Object.values(DepartmentsEnum).includes(department as DepartmentsEnum),
    [department]
  );

  const { data: report, isLoading: reportLoading } = useQuery({
    queryKey: ["getSingleReport", reportId],
    queryFn: getReport(reportId!, department as DepartmentsEnum),
  });

  if (!isValid) {
    push("/not-found");
    return null;
  }

  if (reportLoading) {
    return <Loader />;
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
        <div className="rounded-md bg-white border p-2 space-y-4 px-3 mb-4">
          <b>Consultation Note: </b>
          {report?.consultation?.consultationNote}
        </div>

        {component}
      </>
    );
  }
};

export default ReportsDetails;
