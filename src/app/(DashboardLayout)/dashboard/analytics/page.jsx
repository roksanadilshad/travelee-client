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
            <select className="text-sm border-none bg-blue-50 text-[#0EA5A4] rounded-lg px-3 py-1 outline-none">
              <option>Weekly</option>
            </select>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0EA5A4" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#0EA5A4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#0EA5A4"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#0EA5A4", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#0EA5A4", fontSize: 12 }}
                />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#0EA5A4"
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
  <h3 className="font-bold text-lg mb-6 text-[#0A1D1A]">Top Destinations</h3>
  <div className="h-[250px] relative">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={destinationData}
          innerRadius={70} 
          outerRadius={90}
          paddingAngle={8} 
          dataKey="value"
          stroke="none" 
        >
          {destinationData.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              
              fill={[
                "#0EA5A4",    
                "#14B8B6",    
                "#2DD4BF",    
                "#99F6E4"     
              ][index % 4]} 
            />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
        />
      </PieChart>
    </ResponsiveContainer>
  
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Total</p>
      <p className="text-xl font-black text-slate-800">100%</p>
    </div>
  </div>

  <div className="mt-6 space-y-3">
    {destinationData.map((item, index) => (
      <div
        key={item.name}
        className="flex justify-between items-center text-sm p-2 hover:bg-slate-50 rounded-xl transition-all"
      >
        <div className="flex items-center gap-3">
          <div
            className="w-3 h-3 rounded-full" 
            style={{ 
              backgroundColor: [
                "#0EA5A4", 
                "#14B8B6", 
                "#2DD4BF", 
                "#99F6E4"
              ][index % 4] 
            }}
          />
          <span className="text-slate-600 font-medium">{item.name}</span>
        </div>
        <span className="font-bold text-slate-900">{item.value}%</span>
      </div>
    ))}
  </div>
</div>
      </div>

      {/* Bottom Progress Bar Section */}
     <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
  <div className="flex items-center gap-4 mb-6">
    <div className="p-4 bg-[#0EA5A4]/10 rounded-2xl text-[#0EA5A4]">
      <PlaneTakeoff size={24} />
    </div>
    <div>
      <p className="text-[11px] text-slate-400 font-black uppercase tracking-widest">Total Trips</p>
      <h4 className="text-2xl font-black text-slate-800">1,200</h4>
    </div>
  </div>

  
  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden flex shadow-inner">
    
    <div className="bg-[#0EA5A4] h-full" style={{ width: "50%" }} />
   
    <div className="bg-[#34D399] h-full" style={{ width: "35%" }} /> 
   
    <div className="bg-[#82e9d3] h-full" style={{ width: "15%" }} />
  </div>

  <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6 text-[11px] font-bold text-slate-500 uppercase tracking-tight">
    <div className="flex items-center gap-2">
      <div className="w-2.5 h-2.5 rounded-full bg-[#0EA5A4]" /> 
      <span>Done: <span className="text-slate-900">620</span></span>
    </div>
    <div className="flex items-center gap-2">
      <div className="w-2.5 h-2.5 rounded-full bg-[#34D399]" /> 
      <span>Booked: <span className="text-slate-900">465</span></span>
    </div>
    <div className="flex items-center gap-2">
      <div className="w-2.5 h-2.5 rounded-full bg-[#82e9d3]" /> 
      <span>Canceled: <span className="text-slate-900">115</span></span>
    </div>
  </div>
</div>
    </div>
  );
}
