import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Day 1", stressLevel: 30 },
  { name: "Day 2", stressLevel: 45 },
  { name: "Day 3", stressLevel: 50 },
  { name: "Day 4", stressLevel: 40 },
  { name: "Day 5", stressLevel: 35 },
];

const StressLevelAreaChart = () => {
  return (
    <ResponsiveContainer>
      <AreaChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="stressLevel" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default StressLevelAreaChart;
