"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Star, Trash2, Heart, Sparkles, Navigation, Banknote } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "react-toastify";

const SERVER_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

const WishlistPage = () => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!user?.email) return;
    try {
      const resWishlist = await fetch(`${SERVER_URL}/wishlists/${user.email}`);
      const dataWishlist = await resWishlist.json();
      setWishlist(dataWishlist);
    } catch (err) {
      toast.error("Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
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

      setWishlist((prev) => prev.filter((item) => item.destination_id !== destination_id));
      toast.info("Removed from your dream list 💔");
    } catch (err) {
      toast.error("Remove failed");
    }
  };

  if (loading) return (
    <div className="min-h-screen p-4 sm:p-8 mt-20 max-w-7xl mx-auto space-y-10">
      <div className="h-10 w-48 sm:w-64 bg-slate-100 rounded-2xl animate-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-[400px] sm:h-[500px] bg-slate-50 rounded-[2.5rem] sm:rounded-[3rem] animate-pulse" />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFDFD] max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 mt-16 sm:mt-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 sm:mb-16">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2.5 sm:p-3 bg-red-50 rounded-xl sm:rounded-2xl">
              <Heart className="text-red-500 fill-red-500 w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight italic">My Dreams</h1>
          </div>
          <p className="text-slate-400 text-sm sm:text-base font-medium ml-1">
            You have {wishlist.length} destinations waiting for you
          </p>
        </div>

        {wishlist.length > 0 && (
          <Link href="/destinations" className="flex items-center justify-center gap-2 px-5 py-3 bg-slate-900 text-white rounded-xl sm:rounded-2xl font-bold hover:bg-emerald-600 transition-all text-sm sm:text-base w-full sm:w-auto shadow-lg shadow-slate-200">
            <Sparkles size={18} /> Add More
          </Link>
        )}
      </div>

      {wishlist.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20 sm:py-32 bg-white rounded-[2.5rem] sm:rounded-[4rem] border border-slate-100 shadow-2xl shadow-slate-200/50 px-4"
        >
          <div className="w-16 h-16 sm:w-24 sm:h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Navigation className="text-slate-300 w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <p className="text-slate-400 text-lg sm:text-xl font-semibold">Your dream list is empty.</p>
          <p className="text-slate-300 text-sm sm:text-base mb-8">Start adding places you want to visit!</p>
          <Link href="/destinations" className="inline-block px-8 sm:px-10 py-3 sm:py-4 bg-emerald-500 text-white rounded-xl sm:rounded-2xl font-black hover:scale-105 transition-all shadow-xl shadow-emerald-500/30 text-sm sm:text-base">
            Explore Destinations
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 lg:gap-12">
          <AnimatePresence mode="popLayout">
            {wishlist.map((item, idx) => (
              <motion.div
                key={item._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group h-full"
              >
                <Link href={`/destinations/${item.destinationMongoId}`} className="h-full flex flex-col">
                  <div className="bg-white rounded-[2rem] sm:rounded-[3rem] overflow-hidden border border-slate-50 shadow-sm group-hover:shadow-2xl group-hover:shadow-slate-200 transition-all duration-500 h-full flex flex-col p-3 sm:p-4 cursor-pointer relative">
                    
                    {/* Image Area */}
                    <div className="relative aspect-[11/12] sm:aspect-[1.2/1] rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden shrink-0">
                      <Image
                        src={item.media?.cover_image || "/default-placeholder.png"}
                        alt={item.city}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-[1.2s] ease-out"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      
                      {/* Floating Rating Overlay */}
                      <div className="absolute top-3 sm:top-5 left-3 sm:left-5 right-3 sm:right-5 flex justify-between items-center z-20">
                        <div className="bg-white/90 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl flex items-center gap-1.5 sm:gap-2 shadow-lg border border-white/20">
                          <Star className="text-amber-400 fill-amber-400 w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          <span className="text-slate-900 font-black text-xs sm:text-sm">{item.popularityScore || "8.5"}</span>
                        </div>
                        
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleRemove(item.destination_id);
                          }}
                          className="p-2.5 sm:p-3 bg-white/90 backdrop-blur-md text-slate-400 hover:text-red-500 rounded-xl sm:rounded-2xl transition-all shadow-xl active:scale-90 z-30 border border-white/20"
                        >
                          <Trash2 className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                        </button>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="pt-5 sm:pt-6 pb-2 px-2 sm:px-4 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 text-emerald-600 mb-1.5 sm:mb-2">
                        <MapPin size={14} className="sm:w-4 sm:h-4" strokeWidth={3} />
                        <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.15em] leading-none">{item.country}</span>
                      </div>
                      
                      <h4 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3 sm:mb-4 tracking-tight leading-tight group-hover:text-emerald-600 transition-colors">
                        {item.city}
                      </h4>
                      
                      <p className="text-slate-400 text-xs sm:text-sm font-medium line-clamp-2 sm:line-clamp-3 italic leading-relaxed mb-6">
                        {item.description}
                      </p>

                      {/* Updated Budget Area - Bottom of description */}
                      <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-widest"> Budget</span>
                          <div className="flex items-baseline gap-1">
                            <span className="text-emerald-500 font-black text-lg sm:text-2xl">{item.avgBudget}</span>
                             
                          </div>
                        </div>
                        
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-emerald-50 transition-colors">
                          <Navigation className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;