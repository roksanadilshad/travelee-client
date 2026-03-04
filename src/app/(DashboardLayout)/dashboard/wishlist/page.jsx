"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Star, Trash2, Heart, ChevronRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "react-toastify";

const SERVER_URL = "https://travelee-server.vercel.app";

const WishlistPage = () => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    if (!user?.email) return;
    try {
      const res = await fetch(`${SERVER_URL}/wishlists/${user.email}`);
      const data = await res.json();
      setWishlist(data);
    } catch (err) {
      toast.error("Wishlist load failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [user?.email]);

  const handleRemove = async (destination_id) => {
    try {
      await fetch(`${SERVER_URL}/wishlists`, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          destination_id,
          userEmail: user.email,
        }),
      });

      setWishlist((prev) =>
        prev.filter((item) => item.destination_id !== destination_id)
      );

      toast.info("Removed from wishlist 💔");
    } catch (err) {
      toast.error("Remove failed");
    }
  };

  if (loading) return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-80 bg-white rounded-[2.5rem] shadow-sm" />
      ))}
    </div>
  );

  return (
    <div className="pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-50 text-red-500 rounded-xl">
               <Heart size={20} fill="currentColor" />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Saved Places</h1>
          </div>
          <p className="text-sm text-slate-400 font-medium">Manage your dream destinations and upcoming trips</p>
        </div>
        <div className="bg-white px-5 py-2.5 rounded-2xl shadow-sm border border-slate-50 text-xs font-bold text-slate-500">
          {wishlist.length} Items Saved
        </div>
      </div>

      {wishlist.length === 0 ? (
        <div className="bg-white rounded-[3rem] p-20 flex flex-col items-center text-center border border-slate-50 shadow-sm">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
             <Heart size={32} className="text-slate-200" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Your wishlist is empty</h3>
          <p className="text-slate-400 max-w-xs mb-8">Start exploring the world and save your favorite places here.</p>
          <Link href="/dashboard" className="bg-[#0A1D1A] text-white px-8 py-3.5 rounded-2xl font-bold shadow-lg shadow-emerald-900/20 hover:scale-[1.02] transition-all">
             Explore Destinations
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {wishlist.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white rounded-[2.5rem] p-4 shadow-sm border border-slate-50 hover:shadow-xl hover:shadow-slate-200/50 transition-all"
              >
                {/* Image Container */}
                <div className="relative h-56 rounded-[1.8rem] overflow-hidden mb-5">
                  <Image
                    src={item.media?.cover_image || "/default-placeholder.png"}
                    alt={item.city}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Rating Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-black shadow-sm">
                    <Star size={12} className="text-yellow-500 fill-yellow-500" />
                    {item.popularityScore || "8.5"}
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleRemove(item.destination_id);
                    }}
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2.5 rounded-xl text-slate-400 hover:text-red-500 hover:bg-white transition-all shadow-sm"
                  >
                    <Trash2 size={18} />
                  </button>

                  <div className="absolute bottom-4 left-4">
                     <span className="bg-[#0A1D1A] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-lg">
                        {item.avgBudget || "$$$"}
                     </span>
                  </div>
                </div>

                {/* Content */}
                <div className="px-2 pb-2">
                  <div className="flex items-center gap-1.5 text-emerald-500 mb-1">
                    <MapPin size={12} />
                    <span className="text-[10px] font-black uppercase tracking-widest">{item.country}</span>
                  </div>
                  
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">{item.city}</h3>
                    <Link href={`/destinations/${item.destinationMongoId}`}>
                      <button className="p-2 bg-slate-50 rounded-xl hover:bg-[#0A1D1A] hover:text-white transition-all">
                        <ChevronRight size={16} />
                      </button>
                    </Link>
                  </div>

                  <p className="text-sm text-slate-400 font-medium line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;