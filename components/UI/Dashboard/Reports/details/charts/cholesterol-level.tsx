import React, { FC, useMemo } from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

type Props = {
  LDL: number;
  HDL: number;
  Total: number;
};

const CholesterolPieChart: FC<Props> = ({ LDL = 0, HDL = 0, Total = 0 }) => {
  const data = useMemo(
    () => [
      { name: "LDL", value: LDL },
      { name: "HDL", value: HDL },
      { name: "Triglycerides", value: Total },
    ],
    [LDL, HDL, Total]
  );

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

export default CholesterolPieChart;
