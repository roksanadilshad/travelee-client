"use client";

import React from "react";
import { PlaneTakeoff, Info } from "lucide-react";
import BookedTrips from "@/components/MyTrips/BookedTrips";

const BookingsList = () => {
  return (
    <div className="space-y-6">
      {/* Optional: Add a summary or info bar for bookings */}
      <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex items-center gap-4 text-emerald-800">
        <div className="bg-white p-2 rounded-lg shadow-sm">
          <Info size={16} />
        </div>
        <p className="text-xs font-bold uppercase tracking-wide">
          Manage your active flight and hotel reservations below.
        </p>
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 border border-slate-50 shadow-sm relative overflow-hidden">
        {/* Subtle background element */}
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] rotate-12">
          <PlaneTakeoff size={200} />
        </div>
        
        <div className="relative z-10">
          <BookedTrips />
        </div>
      </div>
    </div>
  );
};

export default BookingsList;