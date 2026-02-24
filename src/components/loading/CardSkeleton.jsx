"use client";
import React from 'react';

const CardSkeleton = () => {
  return (
    <div className="relative bg-slate-100 rounded-[2.5rem] overflow-hidden h-[450px] border border-slate-200 shadow-sm animate-pulse">
      {/* Ghost Image Area */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-200 via-slate-100 to-slate-200" />
      
      {/* Ghost Content Overlay */}
      <div className="absolute bottom-10 left-10 right-10 space-y-4">
        {/* Country Badge */}
        <div className="flex items-center gap-2">
          <div className="h-[2px] w-5 bg-slate-300" />
          <div className="h-3 w-20 bg-slate-300 rounded" />
        </div>
        
        {/* City Title */}
        <div className="h-10 w-3/4 bg-slate-300 rounded-lg" />

        {/* Bottom Details Row */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200 mt-4">
          <div className="space-y-2">
            <div className="h-2 w-12 bg-slate-200 rounded" />
            <div className="h-4 w-24 bg-slate-300 rounded" />
          </div>
          <div className="w-12 h-12 rounded-full bg-slate-300" />
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;