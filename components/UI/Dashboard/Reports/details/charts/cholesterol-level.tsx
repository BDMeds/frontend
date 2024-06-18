import React from "react";
import { PieChart, Pie, Tooltip, Legend, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "LDL", value: 100 },
  { name: "HDL", value: 60 },
  { name: "Triglycerides", value: 150 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const CholesterolPieChart = () => {
  return (
    <ResponsiveContainer>
      <PieChart width={400} height={400}>
        <Pie data={data} cx={200} cy={200} outerRadius={150} fill="#8884d8" dataKey="value" label>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CholesterolPieChart;
