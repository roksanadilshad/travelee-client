"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
// FIX 1: Import useSearchParams
import { useSearchParams } from "next/navigation"; 
import { FaMapMarkerAlt, FaTrashAlt, FaExternalLinkAlt, FaSuitcase } from "react-icons/fa";
import Link from "next/link";
import Swal from "sweetalert2";
import MyTrip from "@/components/MyTrips/MyTrips";

export default function MyTrips() {
  const { data: session } = useSession();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // FIX 2: Initialize search params
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://travelee-server.vercel.app";

  useEffect(() => {
    if (session?.user?.email) {
      fetchTrips();
    }
  }, [session]);

  const fetchTrips = async () => {
    try {
      const res = await fetch(`${API_URL}/itineraries/user/${session.user.email}`);
      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      const data = await res.json();
      setTrips(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching trips:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTrip = async (id) => {
    const result = await Swal.fire({
      title: "Delete this trip?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`${API_URL}/itineraries/${id}`, { method: "DELETE" });
        if (res.ok) {
          setTrips(trips.filter((t) => t._id !== id));
          Swal.fire("Deleted!", "Your trip has been removed.", "success");
        }
      } catch (e) {
        Swal.fire("Error", "Could not delete trip", "error");
      }
    }
  };

  // FIX 3: Filtering logic
  const filteredTrips = trips.filter(trip => 
    trip.destination?.toLowerCase().includes(query) || 
    trip.status?.toLowerCase().includes(query)
  );

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-500 font-medium">Loading your adventures...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-12 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">My Adventures</h1>
            <p className="text-gray-500 mt-2 font-medium">
              {filteredTrips.length === 0 && query 
                ? "No matches found for your search" 
                : `Showing ${filteredTrips.length} itineraries`}
            </p>
          </div>
          <Link 
            href="/destinations" 
            className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all text-center"
          >
            + Plan New Trip
          </Link>
        </div>

        {filteredTrips.length === 0 ? (
          <div className="bg-white rounded-3xl p-20 text-center border border-dashed border-gray-300">
            <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaSuitcase className="text-gray-300 text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">No trips found</h3>
            <p className="text-gray-500 mt-2">Start your journey by creating your first itinerary.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* FIX 4: Map over filteredTrips instead of trips */}
            {filteredTrips.map((trip) => (
              <div key={trip._id} className="group bg-white rounded-[32px] p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative">
                <div className="absolute top-6 right-6">
                  <span className="bg-green-100 text-green-700 text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-wider">
                    {trip.status || 'Saved'}
                  </span>
                </div>

                <div className="flex flex-col h-full">
                  <div className="mb-6">
                    <div className="flex items-center gap-2 text-blue-600 mb-2">
                      <FaMapMarkerAlt size={14} className="text-blue-500"/>
                      <span className="text-xs font-bold uppercase tracking-widest">Destination</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate pr-16">
                      {trip.destination}
                    </h2>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-8 bg-gray-50 rounded-2xl p-4">
                    <div className="border-r border-gray-200">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Total Days</p>
                      <p className="text-lg font-black text-gray-800">{trip.days?.length || 0} Days</p>
                    </div>
                    <div className="pl-2">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Est. Budget</p>
                      <p className="text-lg font-black text-green-600">${trip.totalCost || 0}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-auto">
                    <Link 
                      href={`/itinerary/${trip._id}`}
                      className="flex-1 bg-gray-900 text-white text-center py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-black transition-all"
                    >
                      <FaExternalLinkAlt size={12} /> View Details
                    </Link>
                    <button 
                      onClick={() => deleteTrip(trip._id)}
                      className="bg-red-50 text-red-500 p-3.5 rounded-xl hover:bg-red-500 hover:text-white transition-all border border-red-100"
                    >
                      <FaTrashAlt size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bookings Section Separator */}
        <hr className="my-16 border-gray-100" />

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">My Bookings</h1>
          <Link 
            href="/destinations" 
            className="bg-gray-100 text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-all text-center"
          >
            + Book New Trip
          </Link>
        </div>
        
        {/* Your separate MyTrip component for actual flight/hotel bookings */}
        <MyTrip />
      </div>
    </div>
  );
}