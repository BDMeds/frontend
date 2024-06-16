"use client";

import { formatDollar } from "@/lib/helpers/numbers";
import LineChartPrice from "./line-chart-price";

const Analytics = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="border bg-white rounded-xl p-5 flex items-center gap-4 justify-between">
        <div className="space-y-1 flex-shrink-0">
          <p className="text-gray-500 text-lg">Money Spent</p>
          <p className="text-4xl font-extrabold">{formatDollar(50000)}</p>
        </div>

        <LineChartPrice />
      </div>
      <div className="border bg-white rounded-xl p-5 flex items-center gap-4 justify-between">
        <div className="space-y-1 flex-shrink-0 min-w-[6rem]">
          <p className="text-gray-500 text-lg">Successful Appointments</p>
          <p className="text-4xl font-extrabold">1.45k</p>
        </div>

        <div>
          <LineChartPrice />
        </div>
      </div>
      <div className="border bg-white rounded-xl p-5 flex items-center gap-4 justify-between">
        <div className="space-y-1 flex-shrink-0">
          <p className="text-gray-500 text-lg">Money Spent</p>
          <p className="text-4xl font-extrabold">{formatDollar(50000)}</p>
        </div>

        <LineChartPrice />
      </div>
    </div>
  );
};

export default Analytics;
