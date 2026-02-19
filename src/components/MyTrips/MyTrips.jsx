"use client";

import { useEffect, useState } from "react";
import TripCard from "./TripCard";
import TripReviewForm from "../Reviews/TripReviewForm";
import SkeletonCard from "./SkeletonCard";
import EmptyState from "./EmptyState";

export default function MyTrips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTrip, setSelectedTrip] = useState(null); // <-- new

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await fetch("http://localhost:500/my-trips");
        const data = await res.json();
        setTrips(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this trip?")) return;
    await fetch(`http://localhost:500/my-trips/${id}`, { method: "DELETE" });
    setTrips(trips.filter((trip) => trip._id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {[...Array(3)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : trips.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {trips.map((trip) => (
            <TripCard
              key={trip._id}
              trip={trip}
              onDelete={handleDelete}
              onAddReview={() => setSelectedTrip(trip)} // <-- new
            />
          ))}
        </div>
      )}

      {/* TripReviewForm modal */}
      {selectedTrip && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-3xl p-4 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setSelectedTrip(null)}
            >
              ✕
            </button>
            <TripReviewForm
              preselectedTrip={selectedTrip} // <-- send trip
              onReviewAdded={() => setSelectedTrip(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
