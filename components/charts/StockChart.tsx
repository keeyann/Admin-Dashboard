"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function StockChart({ data }: { data: any[] }) {
  return (
    <div className="h-[300px] w-full bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-4">Stock Levels</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="stock" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}