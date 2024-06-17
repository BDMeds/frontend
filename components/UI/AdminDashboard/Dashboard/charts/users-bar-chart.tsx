"use client";
import { usersDataBar } from "@/lib/data/admin-dashboard";
import { formatDefault } from "@/lib/helpers/numbers";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const UsersBarChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart width={500} height={300} data={usersDataBar}>
        <XAxis dataKey="month" fontSize={12} />
        <YAxis fontSize={12} tickFormatter={(value: number) => formatDefault(value)} />
        <Tooltip />
        <Legend />
        <Bar dataKey="patients" fill="#5e2bff" radius={[4, 4, 0, 0]} />
        <Bar dataKey="doctors" fill="#82ca9d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default UsersBarChart;
