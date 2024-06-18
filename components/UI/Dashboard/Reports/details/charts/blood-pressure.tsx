import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Day 1", systolic: 120, diastolic: 80 },
  { name: "Day 2", systolic: 125, diastolic: 82 },
  { name: "Day 3", systolic: 118, diastolic: 79 },
  { name: "Day 4", systolic: 122, diastolic: 81 },
  { name: "Day 5", systolic: 121, diastolic: 80 },
];

const BloodPressureBarChart = () => {
  return (
    <ResponsiveContainer>
      <BarChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" fontSize={12} />
        <YAxis fontSize={12} />
        <Tooltip />
        <Legend />
        <Bar dataKey="systolic" fill="#8884d8" />
        <Bar dataKey="diastolic" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BloodPressureBarChart;
