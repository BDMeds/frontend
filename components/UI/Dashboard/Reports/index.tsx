"use client";

import { departments } from "@/lib/data/dashboard";
import { Department } from "@/lib/types";
import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { fadeToTopVariant, opacityVariant } from "@/lib/utils/variants";
import CardiologyReport from "./departments/cardiology";
import { CgChevronLeft } from "react-icons/cg";
import DermatologyReport from "./departments/dermatology";
import HepatologyReport from "./departments/hepatology";
import DentistryReport from "./departments/dentistry";
import NephrologyReport from "./departments/nephrology";
import NeurologyReport from "./departments/neurology";
import OptometryReport from "./departments/optometry";
import OrthopedicReport from "./departments/orthopedics";

const Reports = () => {
  const [department, setDepartment] = useState<Department | undefined>();

  const renderTable = () => {
    switch (department) {
      case "Cardiology (Heart)":
        return <CardiologyReport />;
      case "Dentistry (Teeth and Oral Health)":
        return <DentistryReport />;
      case "Dermatology (Skin)":
        return <DermatologyReport />;
      case "Hepatology (Liver)":
        return <HepatologyReport />;
      case "Nephrology (Kidneys)":
        return <NephrologyReport />;
      case "Neurology (Nervous System)":
        return <NeurologyReport />;
      case "Optometry (Eye and Vision Care)":
        return <OptometryReport />;
      case "Orthopedics (Musculoskeletal System)":
        return <OrthopedicReport />;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence mode="wait">
      {!department ? (
        <motion.div {...opacityVariant} key="init" className="space-y-4">
          <p className="font-medium">Select Department</p>

          <motion.div className="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-4">
            {departments.map(({ dept, icon }, id) => (
              <motion.div
                key={id}
                variants={fadeToTopVariant}
                onClick={() => setDepartment(dept)}
                className="bg-white dark:bg-white/10 border duration-300 hover:shadow-xl hover:border-transparent rounded-lg p-3 cursor-pointer"
              >
                <div className="space-y-5">
                  <div className="size-12 text-primary bg-primary/10 rounded-xl grid place-content-center">{icon}</div>
                  <p className="font-semibold">{dept}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      ) : (
        <div className="space-y-1">
          <div
            className="flex text-primary items-center gap-2 select-none cursor-pointer"
            onClick={() => setDepartment(undefined)}
          >
            <CgChevronLeft />
            <p>Back</p>
          </div>
          {renderTable()}
        </div>
      )}
    </AnimatePresence>
  );
};

export default Reports;
