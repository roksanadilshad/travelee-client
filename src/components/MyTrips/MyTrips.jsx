"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Trash2 } from "lucide-react";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TripHeader from "./TripHeader";
import TripCard from "./TripCard";
import SkeletonCard from "./SkeletonCard";
import EmptyState from "./EmptyState";
import { containerVariants } from "./tripVariants";

export default function MyTrips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ── Fetch trips ── */
  const fetchTrips = async () => {
    try {
      const res = await fetch("http://localhost:500/my-trips");
      const data = await res.json();
      setTrips(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load trips. Please try again.", {
        icon: <AlertCircle className="w-5 h-5" />,
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  /* ── Delete a trip ── */
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:500/my-trips/${id}`, { method: "DELETE" });
      setTrips((prev) => prev.filter((trip) => trip._id !== id));
      toast.success("Trip deleted successfully!", {
        icon: <Trash2 className="w-5 h-5" />,
      });
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete trip. Please try again.", {
        icon: <AlertCircle className="w-5 h-5" />,
      });
    }
  };

  return (
    <>
 
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        transition={Bounce}
        toastClassName="!rounded-xl !font-semibold !text-sm !shadow-lg"
        progressStyle={{ background: "#0046FF" }}
      />

 
      <div className="min-h-screen w-full" style={{ background: "#F5F1DC" }}>
    
        <div className="h-1.5 w-full bg-gradient-to-r from-[#0046FF] via-[#73C8D2] to-[#FF9013]" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
          <TripHeader tripCount={trips.length} />

     
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
              {[...Array(3)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : trips.length === 0 ? (
          
            <EmptyState />
          ) : (
      
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6"
            >
              <AnimatePresence mode="popLayout">
                {trips.map((trip, index) => (
                  <TripCard
                    key={trip._id}
                    trip={trip}
                    index={index}
                    onDelete={handleDelete}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}