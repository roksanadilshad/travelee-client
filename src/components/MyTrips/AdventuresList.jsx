"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, Calendar, ChevronRight, MapPin, Trash2, Wallet } from "lucide-react";
import { FaSuitcase } from "react-icons/fa6";

const AdventuresList = ({ trips, query, onDelete }) => {
  const filteredTrips = trips.filter(trip => 
    trip.destination?.toLowerCase().includes(query) || 
    trip.status?.toLowerCase().includes(query)
  );

  if (filteredTrips.length === 0) {
    return (
      <div className="bg-white rounded-[3rem] p-16 text-center border border-slate-50 shadow-sm">
        <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaSuitcase className="text-slate-200" size={32} />
        </div>
        <h3 className="text-xl font-bold text-slate-900">No itineraries found</h3>
        <p className="text-slate-400 mt-2 max-w-xs mx-auto text-sm">
          {query ? `No results for "${query}"` : "Start planning your dream trip by creating a custom itinerary."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <AnimatePresence>
        {filteredTrips.map((trip, index) => (
          <motion.div
            key={trip._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white rounded-[2.5rem] p-6 border border-slate-50 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all flex flex-col relative overflow-hidden"
          >
            {/* Background Decoration */}
            <div className="absolute -top-6 -right-6 text-slate-50 opacity-10 group-hover:scale-110 transition-transform">
              <Bookmark size={120} />
            </div>

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-2 text-emerald-500">
                  <MapPin size={14} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Destination</span>
                </div>
                <span className="bg-emerald-50 text-emerald-700 text-[9px] font-black uppercase px-3 py-1.5 rounded-xl tracking-wider">
                  {trip.status || 'Planned'}
                </span>
              </div>

              <h2 className="text-2xl font-black text-slate-900 group-hover:text-emerald-600 transition-colors mb-6 leading-tight truncate pr-4">
                {trip.destination}
              </h2>

              <div className="grid grid-cols-2 gap-3 mb-8 bg-[#F4F7FE] rounded-2xl p-4">
                <div className="border-r border-slate-200">
                  <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-1">Duration</p>
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
                    <Calendar size={14} className="text-slate-400" />
                    {trip.days?.length || 0} Days
                  </div>
                </div>
                <div className="pl-2">
                  <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-1">Budget</p>
                  <div className="flex items-center gap-1.5 font-bold text-emerald-600 text-sm">
                    <Wallet size={14} />
                    ${trip.totalCost || 0}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-auto">
                <Link 
                  href={`/itinerary/${trip._id}`}
                  className="flex-1 bg-[#0A1D1A] text-white text-center py-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-black transition-all shadow-md"
                >
                  View Plan <ChevronRight size={14} />
                </Link>
                <button 
                  onClick={() => onDelete(trip._id)}
                  className="bg-red-50 text-red-500 p-3.5 rounded-xl hover:bg-red-500 hover:text-white transition-all border border-red-100"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default AdventuresList;