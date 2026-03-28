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
  Legend,
} from "recharts";
import { Users, CreditCard, CalendarCheck, PlaneTakeoff } from "lucide-react";

// স্ট্যাটিক ডাটা (পরবর্তীতে ব্যাকএন্ড থেকে আসবে)
const revenueData = [
  { name: "Sun", revenue: 400 },
  { name: "Mon", revenue: 300 },
  { name: "Tue", revenue: 500 },
  { name: "Wed", revenue: 635 },
  { name: "Thu", revenue: 450 },
  { name: "Fri", revenue: 600 },
  { name: "Sat", revenue: 550 },
];

const destinationData = [
  { name: "Tokyo, Japan", value: 35, color: "#3B82F6" },
  { name: "Sydney, Australia", value: 28, color: "#60A5FA" },
  { name: "Paris, France", value: 22, color: "#93C5FD" },
  { name: "Venice, Italy", value: 15, color: "#BFDBFE" },
];

const StatCard = ({ title, value, change, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
    <div className="flex justify-between items-start">
      <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
        <Icon className={`w-6 h-6 ${color.replace("bg-", "text-")}`} />
      </div>
      <span
        className={`text-xs font-medium px-2 py-1 rounded-full ${change.includes("+") ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}
      >
        {change}
      </span>
    </div>
    <div className="mt-4">
      <p className="text-gray-500 text-sm font-medium">{title}</p>
      <h3 className="text-2xl font-bold mt-1">{value}</h3>
    </div>
  </div>
);

export default function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6 bg-[#F9FAFB] min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Booking"
          value="1,200"
          change="+2.98%"
          icon={CalendarCheck}
          color="bg-blue-500"
        />
        <StatCard
          title="Total New Customers"
          value="2,845"
          change="-1.45%"
          icon={Users}
          color="bg-sky-400"
        />
        <StatCard
          title="Total Earnings"
          value="$12,890"
          change="+3.75%"
          icon={CreditCard}
          color="bg-indigo-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Overview */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg">Revenue Overview</h3>
            <select className="text-sm border-none bg-blue-50 text-blue-600 rounded-lg px-3 py-1 outline-none">
              <option>Weekly</option>
            </select>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#F3F4F6"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRev)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Destinations */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-lg mb-6">Top Destinations</h3>
          <div className="h-[250px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={destinationData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {destinationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-3">
            {destinationData.map((item) => (
              <div
                key={item.name}
                className="flex justify-between items-center text-sm"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-sm"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-gray-600">{item.name}</span>
                </div>
                <span className="font-bold">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Progress Bar Section */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-blue-50 rounded-xl text-blue-500">
            <PlaneTakeoff />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Trips</p>
            <h4 className="text-xl font-bold">1,200</h4>
          </div>
        </div>
        <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden flex">
          <div className="bg-blue-500 h-full" style={{ width: "50%" }} />
          <div className="bg-blue-300 h-full" style={{ width: "35%" }} />
          <div className="bg-blue-100 h-full" style={{ width: "15%" }} />
        </div>
        <div className="flex gap-6 mt-4 text-xs font-medium text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500" /> Done: 620
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-300" /> Booked: 465
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-100" /> Canceled: 115
          </div>
        </div>
      </div>
    </div>
  );
}
