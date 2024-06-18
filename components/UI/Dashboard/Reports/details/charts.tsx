import { useMemo } from "react";
import { LineChart, Line, ResponsiveContainer, AreaChart, XAxis, YAxis, CartesianGrid, Area, Tooltip } from "recharts";

export const DummyChart1 = () => {
  const d = useMemo(
    () => [
      { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
      { name: "Page A", uv: 600, pv: 2400, amt: 2400 },
      { name: "Page A", uv: 420, pv: 2400, amt: 2400 },
      { name: "Page A", uv: 420, pv: 2400, amt: 2400 },
      { name: "Page A", uv: 10, pv: 2400, amt: 2400 },
      { name: "Page A", uv: 340, pv: 2400, amt: 2400 },
      { name: "Page A", uv: 100, pv: 2400, amt: 2400 },
      { name: "Page A", uv: 40, pv: 2400, amt: 2400 },
      { name: "Page A", uv: 140, pv: 2400, amt: 2400 },
      { name: "Page A", uv: 420, pv: 2400, amt: 2400 },
    ],
    []
  );

  return (
    <ResponsiveContainer width={"100%"} height={"100%"}>
      <LineChart width={400} height={400} data={d}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export const DumChart2 = () => {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <ResponsiveContainer width={"100%"} height={"100%"}>
      <AreaChart width={730} height={250} data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" tick={false} display={0} />
        <YAxis tick={false} display={0} />
        {/* <Tooltip /> */}
        <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
        <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
      </AreaChart>
    </ResponsiveContainer>
  );
};
