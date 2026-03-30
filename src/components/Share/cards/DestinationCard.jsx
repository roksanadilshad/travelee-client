"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock3, MapPin, Tag, Star, Heart, CheckCircle2, Info, XCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// Backend URL configuration
const SERVER_URL = process.env.NEXT_PUBLIC_API_URL || "https://travelee-server.vercel.app";

const DestinationCard = ({ destination }) => {
  const { t } = useLanguage();
  const { user, token } = useAuth();

  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✨ Professional Alert Helper Function
  const showAlert = {
    success: (msg) => toast.success(msg, {
      icon: <CheckCircle2 className="text-emerald-500" size={20} />,
      className: "rounded-2xl border border-emerald-100 bg-white/90 backdrop-blur-lg shadow-xl font-bold text-slate-800",
      progressClassName: "bg-emerald-500",
    }),
    info: (msg) => toast.info(msg, {
      icon: <Heart className="text-rose-500 fill-rose-500" size={20} />,
      className: "rounded-2xl border border-rose-100 bg-white/90 backdrop-blur-lg shadow-xl font-bold text-slate-800",
      progressClassName: "bg-rose-500",
    }),
    error: (msg) => toast.error(msg, {
      icon: <XCircle className="text-red-500" size={20} />,
      className: "rounded-2xl border border-red-100 bg-white/90 backdrop-blur-lg shadow-xl font-bold text-slate-800",
      progressClassName: "bg-red-500",
    })
  };

  useEffect(() => {
    const checkWishlist = async () => {
      if (!user?.email || !destination?.destination_id) return;
      try {
        const res = await fetch(`${SERVER_URL}/api/wishlist/${user.email}`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (!res.ok) return;
        const data = await res.json();
        const found = data.find((item) => item.destination_id === destination.destination_id);
        if (found) setLiked(true);
      } catch (err) {
        console.error("Wishlist fetch error:", err);
      }
    };
    checkWishlist();
  }, [user?.email, destination?.destination_id, token]);

  const handleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user?.email) {
      return showAlert.info("Login to save your dream! ❤️");
    }

    if (loading) return;
    setLoading(true);

    try {
      if (!liked) {
        const payload = {
          destination_id: destination.destination_id,
          destinationMongoId: destination._id,
          city: destination.city,
          country: destination.country,
          region: destination.region,
          media: { cover_image: destination.media?.cover_image },
          description: destination.description,
          duration: destination.duration,
          best_time_to_visit: destination.best_time_to_visit,
          avgBudget: destination.avgBudget,
          popularityScore: destination.popularityScore,
          userName: user?.displayName || user?.name || "Explorer",
          userEmail: user.email,
        };

        const res = await fetch(`${SERVER_URL}/api/wishlist`, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
          },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error();
        setLiked(true);
        showAlert.success(`Saved ${destination.city} to vault! `);
      } else {
        const res = await fetch(`${SERVER_URL}/api/wishlist`, {
          method: "DELETE",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
          },
          body: JSON.stringify({
            destination_id: destination.destination_id,
            userEmail: user.email,
          }),
        });

        if (!res.ok) throw new Error();
        setLiked(false);
        showAlert.info("Removed from your dreams ");
      }
    } catch (err) {
      showAlert.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Link href={`/destinations/${destination._id}`} className="block h-full">
      <motion.div
        whileHover={{ y: -8 }}
        className="group bg-white border border-[#CBD5E1] rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
      >
        {/* Visual Header */}
        <div className="relative w-full h-64 overflow-hidden">
          <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 border border-[#CBD5E1]">
            <Star className="w-3.5 h-3.5 text-[#FF6B6B] fill-[#FF6B6B]" />
            <span className="text-[10px] font-black text-[#1E293B]">
              {destination.popularityScore || "8.5"}
            </span>
          </div>

          <button
            onClick={handleWishlist}
            className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-md p-2 rounded-full border border-[#CBD5E1] hover:scale-110 transition active:scale-95"
            disabled={loading}
          >
            <Heart
              className={`w-4 h-4 transition-colors duration-300 ${
                liked ? "text-red-500 fill-red-500" : "text-gray-400"
              }`}
            />
          </button>

          <Image
            src={destination.media?.cover_image || "/default-placeholder.png"}
            alt={destination.city}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70" />

          <div className="absolute bottom-4 left-4 text-white">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0EA5A4] flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {destination.country}
            </p>
            <h3 className="text-2xl font-black italic uppercase tracking-tighter leading-none mt-1">
              {destination.city}
            </h3>
          </div>
        </div>

        {/* Content Info */}
        <div className="p-5 flex flex-col flex-1 space-y-4">
          <p className="text-gray-500 text-xs font-medium leading-relaxed line-clamp-2 italic">
            {destination.description}
          </p>

          <div className="grid grid-cols-2 gap-y-1 gap-x-2 border-y border-[#E2E8F0] py-3">
            <div className="space-y-1">
              <span className="text-[9px] font-black uppercase text-[#64748B] flex items-center gap-1">
                <Clock3 className="w-3 h-3 text-[#0EA5A4]" /> {t("card.duration_label")}
              </span>
              <p className="text-xs font-bold text-gray-500">{destination.duration}</p>
            </div>

            <div className="space-y-1">
              <span className="text-[9px] font-black uppercase text-[#64748B] flex items-center gap-1">
                <Tag className="w-3 h-3 text-[#0EA5A4]" /> {t("card.best_time")}
              </span>
              <p className="text-[9px] font-bold text-[#FF6B6B] uppercase">{destination.best_time_to_visit}</p>
            </div>
          </div>

          <div className="flex items-center justify-between mt-auto">
            <div>
              <span className="text-[8px] font-black uppercase text-[#64748B] block">
                {t("card.budget_label")}
              </span>
              <span className="text-sm font-black italic text-[#0EA5A4]">
                {destination.avgBudget}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default DestinationCard;