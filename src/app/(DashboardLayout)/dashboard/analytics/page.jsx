"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { PlaneTakeoff } from "lucide-react";

const COLORS = [
  "#0EA5A4",
  "#3B82F6",
  "#8B5CF6",
  "#EC4899",
  "#F59E0B",
  "#10B981",
  "#6366F1",
  "#F43F5E",
  "#06B6D4",
  "#84CC16",
];

const dummyChartData = [
  { name: "Sun", revenue: 400 },
  { name: "Mon", revenue: 800 },
  { name: "Tue", revenue: 600 },
  { name: "Wed", revenue: 1100 },
  { name: "Thu", revenue: 900 },
  { name: "Fri", revenue: 1400 },
  { name: "Sat", revenue: 1200 },
];

const dummyPieData = [
  { name: "USA", value: 40 },
  { name: "Bangladesh", value: 30 },
  { name: "UK", value: 20 },
  { name: "Others", value: 10 },
];

const AnalyticsPage = ({
  totalTrips = 10,
  chartData = dummyChartData,
  pieData = dummyPieData,
}) => {
  if (typeof window === "undefined") return null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Overview */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-left">
          <h3 className="font-bold text-lg text-gray-800 mb-6">
            Revenue Overview (Weekly)
          </h3>
          <div className="h-[300px] w-full" style={{ minHeight: "300px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0EA5A4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#0EA5A4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E5E7EB"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#0EA5A4"
                  strokeWidth={3}
                  fill="url(#colorRev)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Destination Share */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-left">
          <h3 className="font-bold text-lg mb-6 text-gray-800">
            Destination Share
          </h3>
          <div className="h-[250px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-x-2 gap-y-2">
            {pieData.slice(0, 10).map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: COLORS[i % COLORS.length] }}
                />
                <span className="text-[10px] text-gray-500 truncate w-16">
                  {item.name}
                </span>
                <span className="text-[10px] font-bold ml-auto">
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm text-left">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-[#0EA5A4]/10 rounded-xl text-[#0EA5A4]">
            <PlaneTakeoff size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase font-bold tracking-tighter">
              Performance Index
            </p>
            <h4 className="text-xl font-black">
              {totalTrips} Total Trips Recorded
            </h4>
          </div>
        </div>
        <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden flex">
          <div
            className="bg-[#0EA5A4] h-full"
            style={{ width: totalTrips > 0 ? "65%" : "1%" }}
          />
          <div
            className="bg-[#34D399] h-full"
            style={{ width: totalTrips > 0 ? "25%" : "0%" }}
          />
          <div
            className="bg-[#82e9d3] h-full"
            style={{ width: totalTrips > 0 ? "10%" : "0%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
