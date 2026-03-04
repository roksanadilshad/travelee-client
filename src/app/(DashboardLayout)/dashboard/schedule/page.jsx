"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import { Clock, ExternalLink, Hotel, MapPin, MoreHorizontal, Plane, Plus, Utensils } from "lucide-react";
import Link from "next/link";
import Swal from "sweetalert2";
import { FaSuitcase } from "react-icons/fa6";
import Calendar from "@/components/dashboard/Calendar"; // Ensure this matches your file name
import AdventuresList from "@/components/MyTrips/AdventuresList";
import { useSearchParams } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://travelee-server.vercel.app";

const iconMap = {
  Flight: { icon: Plane, color: "bg-blue-500", label: "FLIGHT" },
  CheckIn: { icon: Hotel, color: "bg-emerald-500", label: "HOTEL" },
  Dinner: { icon: Utensils, color: "bg-orange-500", label: "DINNER" },
  Activity: { icon: FaSuitcase, color: "bg-purple-500", label: "ACTIVITY" },
};

export default function SchedulePage() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";

  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Unified Fetch Logic
  const fetchTrips = async () => {
    if (!session?.user?.email) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/itineraries/user/${session.user.email}`);
      const data = await res.json();
      setTrips(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching trips:", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Fetch on Mount & Session Change
  useEffect(() => {
    fetchTrips();
  }, [session?.user?.email]); // FIX: Dependency array prevents infinite loops

  // 3. Filtered Data for Timeline vs AdventuresList
  const dailyActivities = useMemo(() => {
    return trips.filter(trip => 
      trip.status?.toLowerCase() !== "deleted" &&
      (trip.destination?.toLowerCase().includes(query) || trip.status?.toLowerCase().includes(query))
    );
  }, [trips, query]);

  const deleteTrip = async (id) => {
    const result = await Swal.fire({
      title: "Delete this itinerary?",
      text: "This will remove your planned schedule.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0A1D1A",
      confirmButtonText: "Yes, delete",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`${API_URL}/itineraries/${id}`, { method: "DELETE" });
        if (res.ok) {
          setTrips(prev => prev.filter((t) => t._id !== id));
          Swal.fire("Deleted!", "Itinerary removed.", "success");
        }
      } catch (e) {
        Swal.fire("Error", "Could not delete", "error");
      }
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-40 gap-4">
      <div className="w-10 h-10 border-4 border-[#0A1D1A] border-t-transparent rounded-full animate-spin"></div>
      <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Syncing Adventures...</p>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-4 lg:p-8">
      
      {/* LEFT COLUMN: Mini Calendar */}
      {/* <div className="w-full lg:w-80 shrink-0">
        <Calendar selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
      </div> */}

      {/* RIGHT COLUMN: Timeline */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">My Adventures Planning</h1>
            <p className="text-sm text-slate-400 font-medium">{new Date().toLocaleTimeString()}</p>
          </div>
          <Link href='/destinations' className="bg-[#0A1D1A] text-white px-6 py-3 rounded-2xl text-xs font-black shadow-lg hover:scale-105 transition-all flex items-center gap-2">
            <Plus size={16} /> Add Event
          </Link>
        </div>

        {dailyActivities.length === 0 ? (
          <div className="bg-white rounded-[3rem] p-20 text-center border border-dashed border-slate-200">
            <FaSuitcase className="mx-auto text-slate-200 mb-4" size={48} />
            <p className="text-slate-400 font-bold">No activities found matching your search.</p>
          </div>
        ) : (
         <div className="mt-12">
           <AdventuresList trips={trips} query={query} onDelete={deleteTrip} />
        </div>
        )}

        
      </div>
    </div>
  );
}