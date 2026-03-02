"use client";
import React from "react";

export default function FloatingStats({ basePrice, totalCost, onSave }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-8 py-4 rounded-full shadow-2xl z-50 flex items-center gap-6 border border-gray-700 backdrop-blur-sm bg-opacity-95">
      <div className="flex gap-4">
        {/* Base Price Section */}
        <div className="flex flex-col border-r border-gray-700 pr-4">
          <span className="text-[9px] text-gray-400 uppercase font-bold tracking-tighter">
            Base Package
          </span>
          <span className="text-sm font-bold text-white">
            ${basePrice || 0}
          </span>
        </div>

        {/* Dynamic Total Section */}
        <div className="flex flex-col">
          <span className="text-[9px] text-gray-400 uppercase font-bold tracking-tighter">
            Total Estimate
          </span>
          <span className="text-xl font-black text-green-400 leading-none drop-shadow-[0_0_8px_rgba(74,222,128,0.3)]">
            ${totalCost}
          </span>
        </div>
      </div>

      {/* Visual Separator */}
      <div className="h-8 w-[1px] bg-gray-700"></div>

      {/* Action Button */}
      <button 
        onClick={onSave} 
        className="bg-primary hover:bg-blue-700 px-6 py-2 rounded-xl text-sm font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-900/20"
      >
        Confirm Plan
      </button>
    </div>
  );
}