"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import BookingsList from "@/components/MyTrips/BookingsList";
import { useAuth } from "@/hooks/useAuth";

export default function MyTripsPage() {
  const { data: session } = useSession();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://travelee-server.vercel.app";
  const {token} = useAuth()

  useEffect(() => {
    if (session?.user?.email) {
      fetchTrips();
    }
  }, [session]);

  const fetchTrips = async () => {
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

  const deleteTrip = async (id) => {
    const result = await Swal.fire({
      title: "Delete this itinerary?",
      text: "This will remove your planned schedule.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0A1D1A",
      cancelButtonColor: "#f1f5f9",
      confirmButtonText: "Yes, delete",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`${API_URL}/itineraries/${id}`, { method: "DELETE" });
        if (res.ok) {
          setTrips(trips.filter((t) => t._id !== id));
          Swal.fire("Deleted!", "Itinerary removed.", "success");
        }
      } catch (e) {
        Swal.fire("Error", "Could not delete", "error");
      }
    }
  };

  const filteredTrips = trips.filter(trip => 
    trip.destination?.toLowerCase().includes(query) || 
    trip.status?.toLowerCase().includes(query)
  );

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="w-10 h-10 border-4 border-[#0A1D1A] border-t-transparent rounded-full animate-spin"></div>
      <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Syncing Adventures...</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6">
    <div className="flex gap-4 mb-8">
    </div>
      <BookingsList />
  </div>
  );
}

