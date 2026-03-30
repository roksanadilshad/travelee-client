"use client";

import React, { useEffect, useState, useCallback } from "react";
import { 
  Star, MapPin, Heart, ChevronRight, TrendingUp, Clock, Loader2, Sparkles, ChevronLeft
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

const SERVER_URL = process.env.NEXT_PUBLIC_API_URL || "https://travelee-server.vercel.app";

const BrowsePage = () => {
  const { user } = useAuth();
  const [trending, setTrending] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Slider State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const trendingRes = await fetch(`${SERVER_URL}/destinations/trending`);
        const trendingData = await trendingRes.json();
        const trendingArray = Array.isArray(trendingData) ? trendingData : (trendingData.destinations || []);
        setTrending(trendingArray.slice(0, 3));

        let recUrl = `${SERVER_URL}/destinations`;
        if (user?.email) {
          recUrl = `${SERVER_URL}/destinations/recommendations/${user.email}`;
        }

        const recRes = await fetch(recUrl);
        const recData = await recRes.json();
        const recArray = Array.isArray(recData) ? recData : (recData.destinations || recData.data || []);
        setRecommendations(recArray);

      } catch (error) {
        console.error("Error fetching destinations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.email]);

  // Next Slide Logic
  const nextSlide = useCallback(() => {
    if (recommendations.length === 0) return;
    setCurrentIndex((prevIndex) => 
      prevIndex + 3 < recommendations.length ? prevIndex + 3 : 0
    );
  }, [recommendations.length]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex - 3 >= 0 ? prevIndex - 3 : Math.max(0, recommendations.length - 3)
    );
  };

  // --- AUTO SLIDING LOGIC ---
  useEffect(() => {
    if (isPaused || recommendations.length <= 3) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 3000);  

    return () => clearInterval(interval);
  }, [nextSlide, isPaused, recommendations.length]);

  const lastMinuteDeal = recommendations.length > 0 ? recommendations[0] : trending[0];

  if (loading) return (
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="animate-spin text-emerald-500" size={40} />
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-16 mt-20">
      
      {/* 1. TRENDING SECTION */}
      <section>
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Trending Now</h2>
            <p className="text-slate-400 font-medium">Real-time popular spots</p>
          </div>
          <Link href="/destinations" className="text-xs font-bold text-emerald-600 flex items-center gap-1 hover:underline">
            View All <ChevronRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trending.map((dest, idx) => (
            <DestinationCard key={dest._id} dest={dest} index={idx} />
          ))}
        </div>
      </section>

      {/* 2. RECOMMENDED AUTO-SLIDER SECTION */}
      <section 
        className="bg-white rounded-[3rem] p-8 md:p-12 border border-slate-50 shadow-sm"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="flex justify-between items-center mb-10">
          <div>
            <h3 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <Sparkles size={24} className="text-amber-500 fill-amber-500" />
              {user ? "Recommended For You" : "Most Popular Spots"}
            </h3>
             
          </div>
          
          {recommendations.length > 3 && (
            <div className="flex gap-2">
              <button onClick={prevSlide} className="p-3 rounded-2xl bg-slate-100 hover:bg-emerald-500 hover:text-white transition-all shadow-sm">
                <ChevronLeft size={20} />
              </button>
              <button onClick={nextSlide} className="p-3 rounded-2xl bg-slate-100 hover:bg-emerald-500 hover:text-white transition-all shadow-sm">
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        <div className="relative overflow-hidden min-h-[450px]">
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentIndex}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {recommendations.slice(currentIndex, currentIndex + 3).map((dest, idx) => (
                  <DestinationCard key={dest._id} dest={dest} index={idx} />
                ))}
              </motion.div>
            </AnimatePresence>
        </div>
      </section>

      {/* 3. MIDDLE SECTION WITH DEAL */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
           <div className="h-full bg-emerald-50 rounded-[2.5rem] p-10 flex flex-col justify-center border border-emerald-100/50">
              <h3 className="text-2xl font-black text-emerald-900 mb-4">Explore Without Limits</h3>
              <p className="text-emerald-700/70 max-w-md">Discover hidden gems and personalized travel routes tailored just for your next adventure.</p>
           </div>
        </div>

        {lastMinuteDeal && (
          <div className="bg-[#0A1D1A] rounded-[2.5rem] p-8 text-white relative overflow-hidden flex flex-col justify-between shadow-xl min-h-[350px]">
             <div className="relative z-10">
                <Clock className="text-emerald-400 mb-4" size={24} />
                <h3 className="text-2xl font-bold mb-2 leading-tight">Deal in {lastMinuteDeal.city}!</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Exclusive price for {lastMinuteDeal.country}. Valid for the next 24 hours.
                </p>
                <div className="text-3xl font-black text-emerald-400">{lastMinuteDeal.avgBudget}</div>
             </div>
             <Link 
                href={`/destinations/${lastMinuteDeal._id}`}
                className="relative z-10 w-full bg-emerald-500 text-white text-center font-black py-4 rounded-2xl mt-6 hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20"
             >
                Claim {lastMinuteDeal.city} Deal
             </Link>
             <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
          </div>
        )}
      </div>
    </div>
  );
};

/* --- REUSABLE CARD COMPONENT WITH REDIRECT --- */
const DestinationCard = ({ dest, index }) => (
  <Link href={`/destinations/${dest._id}`} className="block h-full">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-[2rem] p-4 shadow-sm border border-slate-50 group hover:shadow-xl hover:border-emerald-100 transition-all h-full"
    >
      <div className="relative aspect-[4/5] rounded-[1.5rem] overflow-hidden mb-4">
        <img 
          src={dest.media?.cover_image} 
          alt={dest.city} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        />
        <div className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-xl text-slate-400 hover:text-red-500 transition-colors">
          <Heart size={16} />
        </div>
        <div className="absolute bottom-4 left-4 right-4">
           <div className="bg-white/90 backdrop-blur-md p-3 rounded-2xl flex items-center justify-between">
              <div>
                 <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Budget</p>
                 <p className="text-sm font-black text-slate-900">{dest.avgBudget}</p>
              </div>
              <div className="flex items-center gap-1 bg-emerald-500 text-white px-2 py-1 rounded-lg text-[10px] font-black shadow-sm">
                 <Star size={10} fill="currentColor" /> {dest.popularityScore}
              </div>
           </div>
        </div>
      </div>
      <div className="px-2">
        <h4 className="font-black text-slate-900 leading-tight text-lg group-hover:text-emerald-600 transition-colors">
          {dest.city}, {dest.country}
        </h4>
        <div className="flex items-center gap-1 text-slate-400 mt-1">
          <MapPin size={12} className="text-emerald-500" />
          <span className="text-[11px] font-medium">{dest.continent || "Worldwide"}</span>
        </div>
      </div>
    </motion.div>
  </Link>
);

export default BrowsePage;