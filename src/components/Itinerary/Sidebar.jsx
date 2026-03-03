"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { FaCheckCircle } from "react-icons/fa";

// ADD THIS IMPORT FROM YOUR SLICE
import { addDay } from "@/lib/redux/itinerarySlice"; 

export function Sidebar({ days, selectedIdx, onSelect }) {
  const dispatch = useDispatch();

  return (
    <aside className="w-64 hidden lg:block">
      <h3 className="text-sm font-bold text-gray-400 uppercase mb-4 px-2">Timeline</h3>
      <nav className="space-y-2">
        {days.map((day, idx) => (
          <button
            key={day.id}
            onClick={() => onSelect(idx)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
              selectedIdx === idx 
                ? "bg-white shadow-md border border-gray-100 text-primary" 
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <span className="font-bold text-sm">Day {idx + 1}</span>
            {day.activities.length > 0 && <FaCheckCircle className="text-green-500" size={12} />}
          </button>
        ))}
        
        {/* This button now has access to the addDay action */}
        <button 
          onClick={() => dispatch(addDay())} 
          className="w-full border-2 border-dashed border-gray-200 p-3 rounded-xl text-xs font-bold text-gray-400 hover:text-primary hover:border-primary transition-all"
        >
          + Add Day
        </button>
      </nav>
    </aside>
  );
}