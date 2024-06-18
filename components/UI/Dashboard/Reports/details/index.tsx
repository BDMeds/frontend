"use client";

import { parentVariant } from "@/lib/utils/variants";
import { motion } from "framer-motion";
import { DumChart2, DummyChart1 } from "./charts";
import Loader from "@/components/Common/Loaders";
import dynamic from "next/dynamic";
import BloodPressureBarChart from "./charts/blood-pressure";
import HeartRateLineChart from "./charts/heart-rate-line";

const HeartModel = dynamic(() => import("@/components/Common/3D/heart"), {
  ssr: false,
  loading: () => (
    <div className="grid place-content-center min-h-[10rem] text-center">
      <div className="space-y-2">
        <div className="grid place-content-center">
          <Loader />
        </div>

        <p className="text-sm">Calendar loading...</p>
      </div>
    </div>
  ),
});

const ReportsDetails = () => {
  return (
    <div className="grid md:grid-cols-2 gap-7 pb-8">
      <div className="border rounded-xl bg-white relative self-start">
        <div className="absolute top-2 p-5 left-0 space-y-1">
          <p>Evaluation:</p>
          <p className="text-4xl font-bold">Overall State of Health</p>
        </div>

        <HeartModel />
      </div>

      <motion.div {...parentVariant} animate="animate" className="grid gap-3">
        <div className="rounded-xl bg-white border py-4 space-y-5">
          <p className="font-bold px-5">Blood Pressure</p>
          <div className="h-[15rem]">
            <BloodPressureBarChart />
          </div>
        </div>
        <div className="rounded-xl bg-white border py-4 space-y-5">
          <p className="font-bold px-5">Heart Rate</p>
          <div className="h-[15rem]">
            <HeartRateLineChart />
          </div>
        </div>
      </motion.div>

      {/* <motion.div {...parentVariant} animate="animate" className="grid grid-cols-2 gap-5 row-span-5">
          {Array.from({ length: 2 }).map((_, id) => (
            <div className="rounded-xl bg-white border min-h-[18rem]" key={id}></div>
          ))}
        </motion.div> */}
    </div>
  );
};

export default ReportsDetails;
