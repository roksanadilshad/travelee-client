"use client";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
// 1. Fixed Import: Changed from 'next/router' to 'next/navigation'
import { useRouter } from "next/navigation"; 

export const TripSidebar = ({ destination, startDate, setStartDate, endDate, setEndDate, handleAddToMyTrips }) => {
  const { t } = useLanguage();
  const router = useRouter();
  //console.log(destination);

  const displayPrice = destination?.price?.split("-")[0] || "$0";
  const numericPriceForURL = displayPrice.replace(/[^0-9.]/g, '');
  

  return (
    <div className="lg:col-span-1 lg:space-y-6">
      <motion.div className="bg-white rounded-xl shadow-lg p-6 lg:sticky lg:top-24">
        <div className="mb-6 pb-6 border-b border-gray-200">
          <div className="flex items-baseline mb-1">
            {/* Added optional chaining to prevent crash if destination.price is missing */}
            <span className="text-4xl font-bold text-primary">
              {destination?.price?.split("-")[0] || "$0"}
            </span>
            <span className="text-gray-500 ml-2">/ {t("person")}</span>
          </div>
        </div>

        <form onSubmit={handleAddToMyTrips} className="space-y-4">
          <h4 className="font-semibold text-gray-900">{t("save_trip_title")}</h4>
          <div>
            <label className="block text-sm font-medium mb-1">{t("check_in")}</label>
            <input 
              type="date" 
              value={startDate} 
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 text-sm" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t("check_out")}</label>
            <input 
              type="date" 
              value={endDate} 
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 text-sm" 
            />
          </div>

          {/* 2. Fixed Button: Added type="button" to prevent form submission */}
          <button 
            type="button" 
            onClick={() => router.push(`/itinerary?name=${encodeURIComponent(destination.city)}&price=${numericPriceForURL}&id=${destination._id}`)}
            className="w-full bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            Start Planning This Trip
          </button>
          
          <button 
            type="submit" 
            className="w-full bg-primary text-white py-3.5 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
          Book Now
          </button>
        </form>
      </motion.div>
    </div>
  );
};