"use client";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export const TripSidebar = ({
  destination,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  handleAddToMyTrips,
}) => {
  const { t } = useLanguage();
  const router = useRouter();

  // 1. States for Rooms and Travelers
  const [travelerCount, setTravelerCount] = useState(1);
  const [rooms, setRooms] = useState({ single: 0, double: 1, triple: 0 });

  // 2. Extract Base Price from Destination
  const destinationBasePrice = useMemo(() => {
    const priceStr = destination?.price?.split("-")[0] || "0";
    return parseFloat(priceStr.replace(/[^0-9.]/g, "")) || 0;
  }, [destination]);

  // 3. Calculate Total Days
  const totalDays = useMemo(() => {
    if (!startDate || !endDate) return 1;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffInMs = end.getTime() - start.getTime();
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    return diffInDays > 0 ? diffInDays : 1;
  }, [startDate, endDate]);

  // 4. Room Pricing Logic (Dynamic based on destination)
  const roomRates = useMemo(() => ({
    single: Math.round(destinationBasePrice * 0.8), 
    double: destinationBasePrice,                   
    triple: Math.round(destinationBasePrice * 1.3)  
  }), [destinationBasePrice]);

  // 5. Total Calculations
  const costPerNight = useMemo(() => {
    return (rooms.single * roomRates.single) + 
           (rooms.double * roomRates.double) + 
           (rooms.triple * roomRates.triple);
  }, [rooms, roomRates]);

  const finalTotalAmount = costPerNight * totalDays;
  const roomCapacity = (rooms.single * 1) + (rooms.double * 2) + (rooms.triple * 3);
  const isCapacityShort = travelerCount > roomCapacity;

  const updateRoom = (type, delta) => {
    setRooms((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + delta),
    }));
  };

  const handleStartPlanning = () => {
    const params = new URLSearchParams({
      name: destination?.city || "Trip",
      price: finalTotalAmount.toString(),
      startDate: startDate,
      endDate: endDate,
      days: totalDays.toString(),
      guests: travelerCount.toString(),
      rooms: JSON.stringify(rooms),
      cover_image: destination?.media?.cover_image || "",
      country: destination?.country || "",
      gallery: JSON.stringify(destination?.media?.gallery || []),
    });
    router.push(`/itinerary?${params.toString()}`);
  };
  

  return (
    <div className="lg:col-span-1 lg:space-y-6">
      <motion.div className="bg-white rounded-xl shadow-lg p-6 lg:sticky lg:top-24 border border-gray-100">
        
        {/* Header: Displays the Calculated Total */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm font-medium uppercase tracking-wider">
              Total Amount
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-primary">
                ${finalTotalAmount}
              </span>
              <span className="text-gray-500">
                / {totalDays} {totalDays > 1 ? "nights" : "night"}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              ${costPerNight} per night × {totalDays} days
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Dates Section */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-tighter">Check-In</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full border rounded-lg p-2 text-sm focus:border-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-tighter">Check-Out</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full border rounded-lg p-2 text-sm focus:border-primary outline-none"
              />
            </div>
          </div>

          {/* Traveler Selection */}
          <div className="pt-2">
            <label className="block text-xs font-bold text-gray-700 mb-2 uppercase">Travelers</label>
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-200">
              <span className="text-sm font-medium text-gray-600">Total People</span>
              <div className="flex items-center gap-4">
                <button type="button" onClick={() => setTravelerCount(Math.max(1, travelerCount - 1))} className="w-8 h-8 rounded-full bg-white border shadow-sm flex items-center justify-center">-</button>
                <span className="font-bold text-lg">{travelerCount}</span>
                <button type="button" onClick={() => setTravelerCount(travelerCount + 1)} className="w-8 h-8 rounded-full bg-white border shadow-sm flex items-center justify-center">+</button>
              </div>
            </div>
          </div>

          {/* Room Selection */}
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-bold text-gray-700 uppercase">Room Configuration</label>
            {Object.keys(roomRates).map((type) => (
              <div key={type} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100">
                <div className="capitalize">
                  <p className="text-sm font-semibold">{type} Room</p>
                  <p className="text-[10px] text-primary font-bold">
                    ${roomRates[type]}/night
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => updateRoom(type, -1)} className="text-gray-400 hover:text-black w-6 h-6 flex items-center justify-center">—</button>
                  <span className="text-sm font-bold w-4 text-center">{rooms[type]}</span>
                  <button type="button" onClick={() => updateRoom(type, 1)} className="text-gray-400 hover:text-black w-6 h-6 flex items-center justify-center">+</button>
                </div>
              </div>
            ))}
          </div>

          {/* Capacity Warning */}
          {isCapacityShort && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 bg-red-50 border border-red-100 rounded-lg">
              <p className="text-[11px] text-red-600 font-medium">
                ⚠️ Your selected rooms only fit {roomCapacity} people. You need more space for {travelerCount} travelers!
              </p>
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className="pt-4 space-y-3">
            <button
              type="button"
              disabled={isCapacityShort}
              onClick={handleStartPlanning}
              className={`w-full py-3 rounded-xl font-bold transition-all shadow-md ${isCapacityShort ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
            >
              Plan {totalDays} Day Trip
            </button>

            <form onSubmit={(e) => handleAddToMyTrips(e, {
    totalPrice: finalTotalAmount, 
    guests: travelerCount,
    days: totalDays,
    rooms: rooms
    })}>
              <button
                type="submit"
                disabled={isCapacityShort}
                className={`w-full py-3.5 rounded-xl font-bold transition-all ${isCapacityShort ? 'bg-gray-100 text-gray-300 cursor-not-allowed' : 'bg-primary text-white hover:opacity-90'}`}
              >
                Confirm & Book (${finalTotalAmount})
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};