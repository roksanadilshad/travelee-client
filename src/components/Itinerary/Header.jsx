"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { FaSuitcaseRolling } from "react-icons/fa";
import { setTripDetails } from "@/lib/redux/itinerarySlice";

export default function Header({ destination, onSave }) {
  const dispatch = useDispatch();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30 px-8 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          {/* Logo/Icon Box */}
          <div className="bg-white p-3 rounded-xl text-primary shadow-lg shadow-blue-100">
            <FaSuitcaseRolling size={20} />
          </div>
          
          <div>
            <input
              className="text-xl font-bold text-gray-900 bg-transparent outline-none border-b border-transparent focus:border-blue-500 transition-all w-full md:w-64"
              placeholder="Name your adventure..."
              value={destination || ""}
              onChange={(e) => dispatch(setTripDetails({ destination: e.target.value }))}
            />
            <p className="text-xs text-gray-400 font-medium uppercase tracking-widest mt-1">
              Travel Itinerary Builder
            </p>
          </div>
        </div>

        <button 
          onClick={onSave} 
          className="bg-gray-900 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-black transition-all shadow-sm"
        >
          Save Trip
        </button>
      </div>
    </header>
  );
}