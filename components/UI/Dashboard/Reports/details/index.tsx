"use client";

import HeartModel from "@/components/Common/3D/heart";
import { parentVariant } from "@/lib/utils/variants";
import { motion } from "framer-motion";

const ReportsDetails = () => {
  return (
    <div className="grid grid-cols-2 gap-7 pb-8">
      <div className="border rounded-xl bg-white relative">
        <div className="absolute top-2 p-5 left-0 space-y-1">
          <p>Evaluation:</p>
          <p className="text-4xl font-bold">Overall State of Health</p>
        </div>

        <HeartModel />
      </div>

      <div className="grid grid-rows-7 space-y-7">
        <motion.div {...parentVariant} animate="animate" className="grid grid-cols-3 gap-5 row-span-2">
          {Array.from({ length: 3 }).map((_, id) => (
            <div className="rounded-xl bg-white border p-14" key={id}></div>
          ))}
        </motion.div>

        <motion.div {...parentVariant} animate="animate" className="grid grid-cols-2 gap-5 row-span-5">
          {Array.from({ length: 2 }).map((_, id) => (
            <div className="rounded-xl bg-white border min-h-[18rem]" key={id}></div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ReportsDetails;
