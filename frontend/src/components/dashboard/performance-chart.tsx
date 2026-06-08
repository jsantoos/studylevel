"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    day: "Seg",
    score: 65,
  },
  {
    day: "Ter",
    score: 72,
  },
  {
    day: "Qua",
    score: 81,
  },
  {
    day: "Qui",
    score: 78,
  },
  {
    day: "Sex",
    score: 88,
  },
  {
    day: "Sáb",
    score: 92,
  },
];

export function PerformanceChart() {
  return (
    <ResponsiveContainer
      width="100%"
      height={320}
    >
      <LineChart data={data}>
        <XAxis dataKey="day" />

        <YAxis />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="score"
          stroke="#000"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}