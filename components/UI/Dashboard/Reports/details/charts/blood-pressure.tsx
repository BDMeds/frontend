import React, { FC } from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";

type Props = {
  systolicLevel: number;
  diastolicLevel: number;
};

const COLORS = ["#c39bff", "#5001c8"];

const BloodPressurePieChart: FC<Props> = ({
  systolicLevel,
  diastolicLevel,
}) => {
  const data = [
    { name: "Systolic Level", value: systolicLevel },
    { name: "Diastolic Level", value: diastolicLevel },
  ];
  return (
    <ResponsiveContainer>
      <PieChart width={230} height={230}>
        <Pie
          data={data}
          cx={100}
          cy={70}
          outerRadius={40}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend iconSize={2} fontSize={7} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default BloodPressurePieChart;
