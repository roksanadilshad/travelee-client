import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Calendar,
  Clock,
  Activity,
  Trash2,
  Loader2,
  GlobeIcon,
} from "lucide-react";
import Badge from "./Badge";
import { cardVariants } from "./tripVariants";
import { useRouter } from "next/navigation";

export default function TripCard({ trip, onDelete,onAddReview }) {
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this trip?")) return;
    setDeleting(true);
    await onDelete(trip._id);
  };

  return (
    <motion.div
      variants={cardVariants}
      layout
      className="relative rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col group"
      style={{ border: "1.5px solid rgba(115,200,210,0.25)" }}
    >
      {/* ── Image / Fallback ── */}
      <div className="relative h-44 sm:h-52 overflow-hidden bg-gradient-to-br from-[#73C8D2]/30 to-[#0046FF]/10">
        {trip.image ? (
          <>
            <img
              src={trip.image}
              alt={trip.country}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <GlobeIcon
              className="w-16 h-16 text-[#73C8D2]/60"
              strokeWidth={1}
            />
          </div>
        )}

        {/* Duration badge */}
        <div className="absolute top-3 right-3">
          <Badge color="white">
            <Clock className="w-3 h-3" />
            {trip.duration} Days
          </Badge>
        </div>

        {/* Destination overlay (only when image exists) */}
        {trip.image && (
          <div className="absolute bottom-3 flex gap-2 left-4">
            <span className="text-white text-sm font-bold drop-shadow flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {trip.city}
            </span>
            <span className="text-white text-sm font-bold drop-shadow flex items-center gap-1">
               
            , {trip.country}
            </span>
          </div>
        )}
      </div>

      {/* ── Card Body ── */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        {/* Trip Name */}
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 leading-tight mb-1 line-clamp-1">
          {trip.tripName}
        </h2>

        {/* Destination (fallback when no image) */}
        {!trip.image && (
          <p className="flex items-center gap-1.5 text-sm text-gray-500 mb-2">
            <MapPin className="w-4 h-4 text-[#0046FF]" />
            {trip.destination}
          </p>
        )}

        {/* Date range */}
        <div className="flex flex-wrap items-center gap-2 mt-1 mb-4">
          <Badge color="teal">
            <Calendar className="w-3 h-3" />
            {trip.startDate}
          </Badge>
          <span className="text-gray-300 text-xs">→</span>
          <Badge color="teal">{trip.endDate}</Badge>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
          
          <Badge color="blue">
            <Activity className="w-3 h-3" />
            {trip.destination_id} 
          </Badge>

        <div className="flex gap-2">
    {/* Complete Button */}
    <motion.button
      whileTap={{ scale: 0.92 }}
      onClick={() => router.push(`/dashboard/my-trips/Review?tripId=${trip.destination_id}`)}
      className="flex items-center gap-1.5 text-sm font-semibold px-4 py-1.5 rounded-xl text-white bg-emerald-500 hover:bg-emerald-600 transition-colors duration-200 shadow-sm hover:shadow"
    >
      Review
    </motion.button>

    {/* Delete Button */}
    <motion.button
      whileTap={{ scale: 0.92 }}
      onClick={handleDelete}
      disabled={deleting}
      className="flex items-center gap-1.5 text-sm font-semibold px-4 py-1.5 rounded-xl text-white bg-[#FF9013] hover:bg-[#e07d0a] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm hover:shadow"
    >
      {deleting ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Trash2 className="w-4 h-4" />
      )}
      {deleting ? "Deleting…" : "Delete"}
    </motion.button>
  </div>
        </div>
      </div>
    </motion.div>
  );
}