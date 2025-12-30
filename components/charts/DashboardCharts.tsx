"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

type DashboardChartsProps = {
  data?: any[];
};

const COLORS = ["#0ea5e9", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

export default function DashboardCharts({ data }: DashboardChartsProps) {
  const categoryValueData = data?.reduce((acc: any[], item) => {
    const existing = acc.find((c) => c.name === item.category);
    const totalValue = item.price * item.stock;
    if (existing) {
      existing.value += totalValue;
    } else {
      acc.push({ name: item.category, value: totalValue });
    }
    return acc;
  }, []) || [];

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-xl border border-gray-400 shadow-sm min-h-[350px]">
        <h3 className="text-lg font-bold mb-6 text-gray-900">
          Stock Levels by Product
        </h3>

        {data && data.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              />
              <Bar
                dataKey="stock"
                fill="#0ea5e9"
                radius={[4, 4, 0, 0]}
                barSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-48 items-center justify-center text-gray-400">
            No stock data to display
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-400 shadow-sm min-h-[350px]">
        <h3 className="text-lg font-bold mb-6 text-gray-900">
          Inventory Value by Category (₹)
        </h3>

        {categoryValueData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryValueData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={(entry: any) => `${entry.name} ${(entry.percent * 100).toFixed(0)}%`}
              >
                {categoryValueData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: any) => `₹${Number(value).toLocaleString()}`}
                contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
              />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-48 items-center justify-center text-gray-400">
            No category data to display
          </div>
        )}
      </div>
    </div>
  );
}