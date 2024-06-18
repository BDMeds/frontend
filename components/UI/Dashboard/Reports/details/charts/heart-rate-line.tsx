import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Day 1", heartRate: 75 },
  { name: "Day 2", heartRate: 78 },
  { name: "Day 3", heartRate: 80 },
  { name: "Day 4", heartRate: 76 },
  { name: "Day 5", heartRate: 77 },
];

const HeartRateLineChart = () => {
  return (
    <ResponsiveContainer>
      <LineChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" fontSize={12} />
        <YAxis fontSize={12} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="heartRate" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default HeartRateLineChart;
