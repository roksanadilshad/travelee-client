"use client";
import { BarChart3, Users, DollarSign, TrendingUp } from "lucide-react";

export default function Analytics() {
  return (
    <div className="space-y-8 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Total Users" val="1.2k" icon={<Users/>} color="bg-blue-500" />
        <StatCard label="Revenue" val="$14,500" icon={<DollarSign/>} color="bg-emerald-500" />
        <StatCard label="Bookings" val="452" icon={<TrendingUp/>} color="bg-purple-500" />
      </div>
      <div className="h-80 bg-white rounded-[2.5rem] border border-slate-100 flex items-center justify-center text-slate-300 italic font-bold">
        User Growth Chart Visualization
      </div>
    </div>
  );
}

const StatCard = ({ label, val, icon, color }) => (
  <div className="bg-white p-6 rounded-[2rem] border border-slate-50 flex items-center gap-4 shadow-sm">
    <div className={`${color} p-4 rounded-2xl text-white`}>{icon}</div>
    <div>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</p>
      <h3 className="text-2xl font-black text-slate-900">{val}</h3>
    </div>
  </div>
);