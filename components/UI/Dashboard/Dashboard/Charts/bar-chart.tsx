"use client";
import { useGlobalStore } from "@/lib/store/global.store";
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

  const { isDarkMode } = useGlobalStore();

  return (
    <ResponsiveContainer width={"100%"} height={400}>
      <BarGraph data={data}>
        <XAxis
          dataKey={"month"}
          tickLine={false}
          axisLine={false}
          stroke={isDarkMode ? "#fff" : "#000"}
          fontSize={12}
        />
        <YAxis tickLine={false} axisLine={false} stroke={isDarkMode ? "#fff" : "#000"} fontSize={12} />
        <Bar dataKey={"total"} radius={[4, 4, 0, 0]} fill="#5e2bff" />
      </BarGraph>
    </ResponsiveContainer>
  );
}
