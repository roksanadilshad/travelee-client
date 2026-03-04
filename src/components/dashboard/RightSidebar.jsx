"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Play, ChevronRight } from "lucide-react";

export default function RightSidebar() {
  const { data: session } = useSession();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      // Ensure we have a user email and the API URL is defined
      if (!session?.user?.email || !process.env.NEXT_PUBLIC_API_URL) return;

      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/itineraries/user/${session.user.email}`);
        const data = await res.json();

        // FIX: Defensive check for .slice() - handles if data is { itineraries: [] } or just []
        const historyArray = Array.isArray(data) ? data : (data.itineraries || []);
        setHistory(historyArray.slice(0, 4));
        
      } catch (error) {
        console.error("Error fetching history:", error);
        setHistory([]); // Fallback to empty state on error
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [session]);
console.log(history);

  return (
    <div className="w-80 p-8 bg-white border-l border-slate-50 block">
      {/* Related Video Card */}
      <div className="relative h-48 rounded-[2rem] overflow-hidden mb-8 group cursor-pointer shadow-lg">
        <img 
          src='https://i.pinimg.com/736x/d9/23/b0/d923b0be1d7ff9ca3e729cf83a4e3a60.jpg' 
          alt="Travel Video" 
          className="w-full h-full object-cover transition-transform group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-white/90 p-4 rounded-full shadow-2xl">
            <Play size={20} className="text-[#0A1D1A]" fill="currentColor" />
          </div>
        </div>
        <div className="absolute bottom-4 left-4 text-white">
          <p className="text-[10px] font-black uppercase tracking-widest">Featured Story</p>
          <p className="text-xs font-bold">The Alps Expedition</p>
        </div>
      </div>

      {/* Previous Destinations History */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-black text-slate-900">Previous Trips</h3>
          <ChevronRight size={16} className="text-slate-400" />
        </div>
        
        <div className="space-y-4">
          {loading ? (
             <p className="text-xs text-slate-400 animate-pulse">Loading history...</p>
          ) : history.length > 0 ? (
            history.map((trip) => (
              /* FIX: Added h-16 flex-shrink-0 to ensure all history cards are identical in size */
              <div key={trip._id} className="flex items-center gap-4 p-2 h-16 rounded-2xl hover:bg-slate-50 transition-all cursor-pointer overflow-hidden">
                <img 
                  src={trip.cover_image || "https://i.pinimg.com/736x/85/c0/6e/85c06ea5e12d46d7543ff49adcb39324.jpg"} 
                  className="w-12 h-12 flex-shrink-0 rounded-xl object-cover aspect-square" 
                  alt={trip.destination} 
                />
                <div className="min-w-0"> {/* min-w-0 allows the truncate to work */}
                  <h4 className="text-xs font-black text-slate-800 truncate">{trip.destination}</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase truncate">{trip.status}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-400 font-medium italic">No previous adventures yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}