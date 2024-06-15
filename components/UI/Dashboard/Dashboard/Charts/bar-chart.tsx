"use client";
import { useMemo } from "react";
import { Bar, ResponsiveContainer } from "recharts";
import { BarChart as BarGraph, XAxis, YAxis } from "recharts";

type Props = {};

export default function BarChart({}: Props) {
  const data = useMemo(
    () => [
      {
        month: "Jan",
        total: Math.floor(Math.random() * 50) + 10,
      },
      {
        month: "Feb",
        total: Math.floor(Math.random() * 50) + 10,
      },
      {
        month: "Mar",
        total: Math.floor(Math.random() * 50) + 10,
      },
      {
        month: "Apr",
        total: Math.floor(Math.random() * 50) + 10,
      },
      {
        month: "Jul",
        total: Math.floor(Math.random() * 50) + 10,
      },
      {
        month: "Aug",
        total: Math.floor(Math.random() * 50) + 10,
      },
      {
        month: "Sep",
        total: Math.floor(Math.random() * 50) + 10,
      },
      {
        month: "Oct",
        total: Math.floor(Math.random() * 50) + 10,
      },
      {
        month: "Nov",
        total: Math.floor(Math.random() * 50) + 10,
      },
      {
        month: "Dec",
        total: Math.floor(Math.random() * 50) + 10,
      },
    ],
    []
  );

  return (
    <ResponsiveContainer width={"100%"} height={400}>
      <BarGraph data={data}>
        <XAxis dataKey={"month"} tickLine={false} axisLine={false} stroke={false ? "#fff" : "#000"} fontSize={12} />
        <YAxis
          tickLine={false}
          axisLine={false}
          stroke={false ? "#fff" : "#000"}
          fontSize={12}
          // tickFormatter={(value: number) => `₦${abbreviateBigNumbers(value)}`}
        />
        <Bar dataKey={"total"} radius={[4, 4, 0, 0]} fill="#5e2bff" />
      </BarGraph>
    </ResponsiveContainer>
  );
}
