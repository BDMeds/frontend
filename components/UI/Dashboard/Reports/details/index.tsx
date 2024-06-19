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

const ReportsDetails = () => {
  return <TeethReportDetails />;
};

export default ReportsDetails;
