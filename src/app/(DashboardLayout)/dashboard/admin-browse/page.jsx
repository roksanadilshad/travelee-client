"use client";

import React, { useEffect, useState } from "react";
import {
  Star, MapPin, TrendingUp, Sparkles, 
  Pencil, Trash2, Loader2
} from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import { useSession } from "next-auth/react";



import AnalyticsPage from "../analytics/page"; 

const SERVER_URL = process.env.NEXT_PUBLIC_API_URL || "https://travelee-server.vercel.app";

const AdminBrowse = () => {
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


      

    
    </div>
  );
};


export default AdminBrowse;