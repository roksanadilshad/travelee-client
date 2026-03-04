"use client";

import React, { useEffect, useState } from "react";
import { 
  Star, MapPin, Heart, ChevronRight, TrendingUp, Clock, Loader2
} from "lucide-react";
import { motion } from "framer-motion";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const BrowsePage = () => {
  const [destinations, setDestinations] = useState([]);
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);

      // 1. Fetch Trending
      const trendingRes = await fetch(`${API_URL}/destinations/trending`);
      const trendingData = await trendingRes.json();
      // Ensure it's an array before slicing
      const trendingArray = Array.isArray(trendingData) ? trendingData : (trendingData.destinations || []);
      setDestinations(trendingArray.slice(0, 3));

      // 2. Fetch Popular (FIXED: Added the missing fetch call)
      const popularRes = await fetch(`${API_URL}/destinations`);
      const popularData = await popularRes.json();
      
      // Defensive check: find the array within the response
      const popularArray = Array.isArray(popularData) 
        ? popularData 
        : (popularData.destinations || popularData.data || []);

      setPopular(popularArray.slice(0, 5));

    } catch (error) {
      console.error("Error fetching destinations:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

  // Dynamic Logic: Last minute deals from any destination with a lower budget
  const lastMinuteDeal = popular.find(d => d.avgBudget < 500) || destinations[0];

  if (loading) return (
    <div className="flex h-96 items-center justify-center">
      <Loader2 className="animate-spin text-emerald-500" size={40} />
    </div>
  );

  return (
    <div className="space-y-10">
      {/* 1. Top Section: Real Trending Data */}
      <section>
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Trending Now</h2>
            <p className="text-sm text-slate-400 font-medium">Real-time popular spots</p>
          </div>
          <button className="text-xs font-bold text-emerald-600 flex items-center gap-1 hover:underline">
            View All <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, idx) => (
            <DestinationCard key={dest._id} dest={dest} index={idx} />
          ))}
        </div>
      </section>

      {/* 2. Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Most Popular List from API */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 border border-slate-50 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-black text-slate-900 flex items-center gap-2">
              <TrendingUp size={18} className="text-emerald-500" /> Most Popular
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {destinations.map((item) => (
    /* 1. Flex col with h-full ensures all CARDS in a row match the tallest one */
    <div key={item._id} className="flex flex-col h-full bg-white rounded-[2.5rem] p-4 border border-slate-100">
      
      {/* 2. Image Wrapper: Fixed height and overflow-hidden is key */}
      <div className="relative h-64 w-full rounded-[2rem] overflow-hidden">
        <img 
          src={item.media?.cover_image} 
          alt={item.city}
          /* 3. object-cover fills the area without stretching the actual pixels */
          className="w-full h-full object-cover" 
        />
        
        {/* Your Floating Budget/Rating UI stays here */}
        <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md rounded-2xl p-3 flex justify-between items-center">
           {/* ... budget content ... */}
        </div>
      </div>

      {/* 4. Text Content: mt-auto keeps bottom spacing consistent */}
      <div className="mt-4 px-2 pb-2">
        <h4 className="font-bold text-xl text-slate-800">{item.city}</h4>
        <div className="flex items-center gap-1 text-slate-400">
          <MapPin size={14} />
          <span className="text-sm font-medium">{item.country || "Worldwide"}</span>
        </div>
      </div>
    </div>
  ))}
</div>
        </div>

        {/* Dynamic Last Minute Deal Card */}
        {lastMinuteDeal && (
          <div className="bg-[#0A1D1A] rounded-[2.5rem] p-8 text-white relative overflow-hidden flex flex-col justify-between shadow-xl">
             <div className="relative z-10">
                <Clock className="text-emerald-400 mb-4" size={24} />
                <h3 className="text-xl font-bold mb-2">Deal in {lastMinuteDeal.city}!</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Last minute opening in {lastMinuteDeal.country}. Book now for just ${lastMinuteDeal.avgBudget}.
                </p>
             </div>
             <button className="relative z-10 w-full bg-emerald-500 text-white font-black py-4 rounded-2xl mt-6 hover:bg-emerald-400 transition-colors">
                Claim {lastMinuteDeal.city} Deal
             </button>
             <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full" />
          </div>
        )}
      </div>
    </div>
  );
};

const DestinationCard = ({ dest, index }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="bg-white rounded-[2rem] p-4 shadow-sm border border-slate-50 group hover:shadow-xl transition-all"
  >
    <div className="relative aspect-[4/5] rounded-[1.5rem] overflow-hidden mb-4">
      <img 
        src={dest.media?.cover_image} 
        alt={dest.city} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
      />
      <div className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-xl text-slate-400">
        <Heart size={16} />
      </div>
      <div className="absolute bottom-4 left-4 right-4">
         <div className="bg-white/90 backdrop-blur-md p-3 rounded-2xl flex items-center justify-between">
            <div>
               <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Budget</p>
               <p className="text-sm font-black text-slate-900">${dest.avgBudget}</p>
            </div>
            <div className="flex items-center gap-1 bg-emerald-500 text-white px-2 py-1 rounded-lg text-[10px] font-black">
               <Star size={10} fill="currentColor" /> {dest.popularityScore}
            </div>
         </div>
      </div>
    </div>
    <div className="px-2">
      <h4 className="font-black text-slate-900 leading-tight">{dest.city}, {dest.country}</h4>
      <div className="flex items-center gap-1 text-slate-400 mt-1">
        <MapPin size={12} />
        <span className="text-[11px] font-medium">{dest.continent || "Worldwide"}</span>
      </div>
    </div>
  </motion.div>
);

export default BrowsePage;