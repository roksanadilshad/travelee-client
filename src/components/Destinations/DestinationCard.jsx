"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { Clock3, MapPin, ThermometerSun, Star, ShieldCheck, Zap } from "lucide-react";

// RENAMED PROP TO 'data' TO MATCH YOUR HUB, OR ALIASED AS 'destination'
const DestinationCard = ({ data: destination, index }) => {
  if (!destination) return null;

  // Logic for "Optimal Time" indicator
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const isOptimal = destination.best_time_to_visit?.includes(currentMonth);

  // Logic for Budget Indicator ($ to $$$)
  const getBudgetLevel = (budgetStr) => {
    const value = parseInt(budgetStr?.replace(/[^0-9]/g, "") || "0");
    if (value > 200) return "$$$";
    if (value > 100) return "$$";
    return "$";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group relative bg-white dark:bg-zinc-900 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
    >
      {/* 1. TOP METRIC BADGE (Popularity Score) */}
      <div className="absolute top-4 right-4 z-20">
        <div className="bg-black/60 backdrop-blur-md border border-white/20 text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-xl">
          <Zap className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          <span className="text-[11px] font-black tracking-tighter">{destination.popularityScore}</span>
        </div>
      </div>

      {/* 2. OPTIMAL TIME INDICATOR */}
      {isOptimal && (
        <div className="absolute top-4 left-4 z-20">
          <div className="bg-emerald-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full flex items-center gap-2 shadow-lg">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            <span className="text-[9px] font-bold uppercase tracking-widest">Optimal Now</span>
          </div>
        </div>
      )}

      {/* 3. IMAGE WITH ZOOM EFFECT */}
      <div className="relative w-full h-64 overflow-hidden">
        {destination.media?.cover_image ? (
          <Image
            src={destination.media.cover_image}
            alt={destination.city}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-zinc-100 flex items-center justify-center">
            <MapPin className="text-zinc-300 w-12 h-12" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
        
        {/* Hover Gallery Peek (Overlay Bottom) */}
        <div className="absolute bottom-4 left-4 right-4 translate-y-12 group-hover:translate-y-0 transition-transform duration-500">
           <div className="flex gap-2 p-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
              {destination.media?.gallery?.slice(0, 3).map((img, i) => (
                <div key={i} className="relative w-12 h-12 rounded-lg overflow-hidden border border-white/20">
                  <Image src={img} alt="gallery" fill className="object-cover" />
                </div>
              ))}
              <div className="flex-1 flex items-center justify-end pr-2">
                 <span className="text-[10px] text-white font-bold">+ {destination.media?.gallery?.length - 3}</span>
              </div>
           </div>
        </div>
      </div>

      {/* 4. CONTENT AREA */}
      <div className="p-6">
        <Link href={`/destinations/${destination._id}`}>
          <div className="space-y-4">
            {/* Header */}
            <div>
              <div className="flex items-center gap-1 text-blue-500 mb-1">
                <MapPin className="w-3 h-3" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{destination.country}</span>
              </div>
              <h3 className="text-2xl font-black text-zinc-900 dark:text-white uppercase italic tracking-tighter leading-none">
                {destination.city}
              </h3>
            </div>

            {/* Tactical Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <MetricBox 
                icon={<ShieldCheck className="w-3 h-3 text-emerald-500" />} 
                label="Safety Index" 
                value={`${destination.safety_index}/10`} 
              />
              <MetricBox 
                icon={<ThermometerSun className="w-3 h-3 text-orange-500" />} 
                label="Climate" 
                value={`${destination.climate?.avg_temp_c}°C`} 
              />
              <MetricBox 
                icon={<Clock3 className="w-3 h-3 text-blue-500" />} 
                label="Duration" 
                value={destination.duration} 
              />
              <MetricBox 
                icon={<Star className="w-3 h-3 text-yellow-500" />} 
                label="Budget Tier" 
                value={getBudgetLevel(destination.avgBudget)} 
              />
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center pt-4 mt-2 border-t border-zinc-100 dark:border-zinc-800">
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Est. Daily</span>
                <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 italic">{destination.avgBudget}</span>
              </div>
              <div className="h-10 w-10 rounded-full bg-zinc-900 dark:bg-white flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                <span className="text-white dark:text-zinc-900 group-hover:text-white font-bold">→</span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </motion.div>
  );
};

// Reusable Sub-component for clean look
const MetricBox = ({ icon, label, value }) => (
  <div className="bg-zinc-50 dark:bg-zinc-800/50 p-2 rounded-xl border border-zinc-100 dark:border-zinc-800 flex items-center gap-2">
    <div className="p-1.5 bg-white dark:bg-zinc-900 rounded-lg shadow-sm">
      {icon}
    </div>
    <div className="flex flex-col">
      <span className="text-[8px] font-bold text-zinc-400 uppercase leading-none">{label}</span>
      <span className="text-[10px] font-black text-zinc-800 dark:text-zinc-200 uppercase">{value}</span>
    </div>
  </div>
);

export default DestinationCard;