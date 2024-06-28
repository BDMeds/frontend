import Loader from "@/components/Common/Loaders";
import { parentVariant } from "@/lib/utils/variants";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { HeartMetrics } from "@/lib/types/reports";
import { FC } from "react";
import CholesterolPieChart from "../charts/cholesterol-level";
import { TbHeartRateMonitor } from "react-icons/tb";
import { RiHeartAddLine, RiHeartPulseLine } from "react-icons/ri";
import BloodPressurePieChart from "../charts/blood-pressure";

type Props = {
  report?: HeartMetrics;
};

const HeartModel = dynamic(() => import("@/components/Common/3D/heart"), {
  ssr: false,
  loading: () => (
    <div className="grid place-content-center min-h-[10rem] text-center">
      <div className="space-y-2">
        <div className="grid place-content-center">
          <Loader />
        </div>

        <p className="text-sm">Heart loading...</p>
      </div>
    </div>
  ),
});

const HeartReportDetails: FC<Props> = ({ report }) => {
  return (
    <div className="grid md:grid-cols-2 gap-7 pb-8">
      <div className="border rounded-xl bg-white dark:bg-white/10 relative self-start">
        <div className="absolute top-2 p-5 left-0 space-y-1">
          <p>Evaluation:</p>
          <p className="text-4xl font-bold">Overall State of Health</p>
        </div>

        <HeartModel />
      </div>

      <motion.div {...parentVariant} animate="animate" className="grid gap-3 grid-cols-2 self-start">
        <div className="rounded-md bg-white dark:bg-white/10 border py-4 space-y-4 px-5 self-start">
          <p className="font-bold">
            <span className="inline-flex align-middle size-10 text-primary bg-primary/10 rounded-xl items-center justify-center mr-3">
              <TbHeartRateMonitor />
            </span>
            Heart Rate
          </p>
          <h1 className="text-[1.8rem] font-bold">{report?.heartRate} bpm</h1>
        </div>

        <div className="rounded-md bg-white dark:bg-white/10 border py-4 space-y-4 px-5 self-start">
          <p className="font-bold">
            <span className="inline-flex align-middle size-10 text-primary bg-primary/10 rounded-xl items-center justify-center mr-3">
              <RiHeartAddLine />
            </span>
            Oxygen Level
          </p>
          <h1 className="text-[1.8rem] font-bold">{report?.bloodOxygenLevel}%</h1>
        </div>

        <div className="rounded-md bg-white dark:bg-white/10 border py-4 space-y-4 px-5 self-start">
          <p className="font-bold">
            <span className="inline-flex align-middle size-10 text-primary bg-primary/10 rounded-xl items-center justify-center mr-3">
              <RiHeartPulseLine />
            </span>
            Cardiac Output
          </p>
          <h1 className="text-[1.8rem] font-bold">{report?.cardiacOutput} L/min</h1>
        </div>

        <div className="rounded-md bg-white dark:bg-white/10 border py-4 space-y-4 px-5 self-start">
          <p className="font-bold">
            <span className="inline-flex align-middle size-10 text-primary bg-primary/10 rounded-xl items-center justify-center mr-3">
              <RiHeartPulseLine />
            </span>
            Glucose Level
          </p>
          <h1 className="text-[1.8rem] font-bold">{report?.bloodGlucoseLevel} mg/dL</h1>
        </div>

        <div className="rounded-xl bg-white dark:bg-white/10 border py-4 space-y-3">
          <p className="font-bold px-5">Cholestrol Level (mg/dL)</p>
          <div className="">
            <CholesterolPieChart
              LDL={report?.cholesterolLDL!}
              HDL={report?.cholesterolHDL!}
              Total={report?.cholesterolTotal!}
            />
          </div>
        </div>

        <div className="rounded-xl bg-white dark:bg-white/10 border py-4 space-y-3">
          <p className="font-bold px-5">Blood Pressure (mmHg)</p>
          <div className="">
            <BloodPressurePieChart
              systolicLevel={report?.bloodPressureSystolic!}
              diastolicLevel={report?.bloodPressureDiastolic!}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeartReportDetails;
