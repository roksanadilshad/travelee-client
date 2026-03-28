"use client";

import React, { useEffect, useState } from "react";
import {
  Star, MapPin, TrendingUp, Sparkles, 
  Pencil, Trash2, Loader2
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Swal from "sweetalert2";


import AnalyticsPage from "../analytics/page"; 

const SERVER_URL = process.env.NEXT_PUBLIC_API_URL || "https://travelee-server.vercel.app";

const BrowsePage = () => {
  const { user } = useAuth();
  const { data: session } = useSession();
  const [trending, setTrending] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = true || session?.user?.role === "admin" || user?.role === "admin";

  const fetchData = async () => {
    try {
      setLoading(true);
      const trendingRes = await fetch(`${SERVER_URL}/destinations/trending`);
      const trendingData = await trendingRes.json();
      setTrending(Array.isArray(trendingData) ? trendingData : trendingData.destinations || []);

      let recUrl = `${SERVER_URL}/destinations`;
      if (user?.email) recUrl = `${SERVER_URL}/destinations/recommendations/${user.email}`;

      const recRes = await fetch(recUrl);
      const recData = await recRes.json();
      setRecommendations(Array.isArray(recData) ? recData : recData.destinations || recData.data || []);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user?.email]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this trip!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
      background: "#fff",
      borderRadius: "24px"
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`${SERVER_URL}/destinations/${id}`, { method: "DELETE" });
        if (res.ok) {
          Swal.fire({
            title: "Deleted!",
            text: "Destination has been removed.",
            icon: "success",
            confirmButtonColor: "#10b981"
          });
          fetchData(); 
        }
      } catch (error) {
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center">
      <Loader2 className="animate-spin text-emerald-500" size={40} />
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">
      
     {isAdmin &&(
      
      <section className="mt-4">
        <AnalyticsPage />
      </section>
     )}

      {/* Admin Header */}
      {isAdmin && (
        <div className="flex items-center justify-between bg-white p-6 rounded-[2.5rem] border-2 border-emerald-100 shadow-xl shadow-emerald-50">
          <div>
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
              Admin Control Panel
            </h3>
            <p className="text-xs text-slate-400 font-bold">Manage all trips directly from the cards below.</p>
          </div>
          <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest">
            Admin Access: ON
          </div>
        </div>
      )}

      {/* Trending Section */}
      <section>
        <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
          Trending Now <TrendingUp className="text-emerald-500" size={24} />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trending.map((dest, idx) => (
            <DestinationCard 
              key={dest._id} 
              dest={dest} 
              index={idx} 
              isAdmin={isAdmin} 
              onDelete={() => handleDelete(dest._id)} 
            />
          ))}
        </div>
      </section>

      {/* Recommendations */}
      <section className="bg-white rounded-[4rem] p-10 border border-slate-100 shadow-sm">
        <h2 className="text-2xl font-black text-slate-900 mb-10 flex items-center gap-3">
          <span className="p-2 bg-amber-50 rounded-lg">
            <Sparkles className="text-amber-500 fill-amber-500" size={24} />
          </span> 
          Recommended for You
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recommendations.slice(0, 3).map((dest, idx) => (
            <DestinationCard 
              key={dest._id} 
              dest={dest} 
              index={idx} 
              isAdmin={isAdmin} 
              onDelete={() => handleDelete(dest._id)} 
            />
          ))}
        </div>
      </section>
    </div>
  );
};

/* --- CARD COMPONENT --- */
const DestinationCard = ({ dest, index, isAdmin, onDelete }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="relative group bg-white rounded-[2.5rem] p-4 shadow-sm border border-slate-100 h-full flex flex-col hover:shadow-2xl hover:border-emerald-200 transition-all duration-500"
  >
    {isAdmin && (
      <div className="absolute top-8 left-8 z-40 flex gap-2">
        <Link href={`/admin/edit/${dest._id}`}>
          <div title="Edit" className="bg-white/95 backdrop-blur-md text-slate-900 p-3 rounded-2xl shadow-xl hover:bg-emerald-500 hover:text-white transition-all transform hover:scale-110">
            <Pencil size={18} />
          </div>
        </Link>
        <button 
          onClick={(e) => { e.preventDefault(); onDelete(); }}
          title="Delete" 
          className="bg-white/95 backdrop-blur-md text-red-500 p-3 rounded-2xl shadow-xl hover:bg-red-600 hover:text-white transition-all transform hover:scale-110"
        >
          <Trash2 size={18} />
        </button>
      </div>
    )}

    <Link href={`/destinations/${dest._id}`}>
      <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden mb-5">
        <img
          src={dest.media?.cover_image || "https://images.unsplash.com/photo-1506744038136-46273834b3fb"}
          alt={dest.city}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
        />
        <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-xl p-4 rounded-[1.5rem] flex items-center justify-between shadow-lg">
          <div>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Budget</p>
            <p className="text-lg font-black text-slate-900">{dest.avgBudget || "$500"}</p>
          </div>
          <div className="flex items-center gap-1.5 bg-emerald-500 text-white px-3 py-1.5 rounded-xl text-[11px] font-black">
            <Star size={12} fill="currentColor" /> {dest.popularityScore || "4.8"}
          </div>
        </div>
      </div>
      
      <div className="px-3 pb-2">
        <h4 className="font-black text-slate-900 text-xl group-hover:text-emerald-600 transition-colors mb-1">
          {dest.city}, {dest.country}
        </h4>
        <div className="flex items-center gap-2 text-slate-400">
          <MapPin size={14} className="text-emerald-500" />
          <span className="text-xs font-bold uppercase tracking-wider">{dest.continent}</span>
        </div>
      </div>
    </Link>
  </motion.div>
);

export default BrowsePage;