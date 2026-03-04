"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";

export default function Calendar() {
  // 1. Set state to the current date
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());

  // 2. Calendar Logic
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  // Get total days in current month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  // Navigation handlers
  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  return (
    <div className="w-full lg:w-80 shrink-0">
      <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-50">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 px-2">
          <h3 className="font-black text-slate-900 text-lg">
            {monthName} {year}
          </h3>
          <div className="flex gap-1">
            <button onClick={prevMonth} className="p-1.5 text-slate-400 hover:text-slate-900 transition-colors">
              <ChevronLeft size={18}/>
            </button>
            <button onClick={nextMonth} className="p-1.5 text-slate-400 hover:text-slate-900 transition-colors">
              <ChevronRight size={18}/>
            </button>
          </div>
        </div>

        {/* Week Days Header */}
        <div className="grid grid-cols-7 gap-1 mb-4 text-center">
          {['S','M','T','W','T','F','S'].map((day, index) => (
            <span key={`${day}-${index}`} className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
              {day}
            </span>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-2">
          {/* 3. Empty slots for previous month's trailing days */}
          {[...Array(firstDayOfMonth)].map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}

          {/* 4. Actual days of the month */}
          {[...Array(daysInMonth)].map((_, i) => {
            const day = i + 1;
            const isToday = day === new Date().getDate() && 
                            month === new Date().getMonth() && 
                            year === new Date().getFullYear();

            return (
              <button 
                key={day} 
                onClick={() => setSelectedDay(day)}
                className={`aspect-square flex items-center justify-center rounded-xl text-xs font-bold transition-all ${
                  selectedDay === day 
                    ? "bg-[#0A1D1A] text-white shadow-lg" 
                    : isToday 
                    ? "bg-emerald-50 text-emerald-600" 
                    : "text-slate-400 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      {/* Action Card */}
      <div className="mt-6 bg-[#F4F7FE] p-6 rounded-[2rem] border border-slate-100 group">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white rounded-2xl text-emerald-500 shadow-sm group-hover:scale-110 transition-transform">
            <Info size={20} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</p>
            <p className="text-sm font-bold text-slate-700">All Systems Syncing</p>
          </div>
        </div>
      </div>
    </div>
  );
}