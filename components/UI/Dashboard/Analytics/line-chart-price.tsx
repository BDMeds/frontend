import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  {
    name: "Month A",
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Month B",
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Month C",
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Month D",
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Month E",
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Month F",
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Month G",
    pv: 4300,
    amt: 2100,
  },
];

const LineChartPrice = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={300} height={100} data={data}>
        <Line type="natural" dataKey="pv" stroke="#45e394" strokeWidth={0.5} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartPrice;
