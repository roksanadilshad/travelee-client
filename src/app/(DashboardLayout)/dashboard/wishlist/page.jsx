"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, Star, Trash2, Heart, Sparkles, 
  Navigation, ArrowRight 
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Swal from "sweetalert2";  

const SERVER_URL = process.env.NEXT_PUBLIC_API_URL || "https://travelee-server.vercel.app";

const WishlistPage = () => {
  const { user, token } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

   
  const Toast = Swal.mixin({
    toast: true,
    position: "top",  
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    showClass: {
      popup: 'animate__animated animate__fadeInDown'  
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'  
    },
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  const fetchData = useCallback(async () => {
    if (!user?.email) return;
    try {
      const res = await fetch(`${SERVER_URL}/api/wishlist/${user.email}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setWishlist(data);
    } catch (err) {
      Toast.fire({
        icon: 'error',
        title: 'Connection error!',
        text: 'Failed to sync your dream list.',
        background: '#fff',
        color: '#1e293b'
      });
    } finally {
      setLoading(false);
    }
  }, [user?.email, token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

 
  const handleRemove = async (destination_id) => {
    
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to remove this from your dream list?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10b981",  
      cancelButtonColor: "#f43f5e",  
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "Keep it",
      background: "#ffffff",
      borderRadius: "24px",
      customClass: {
        title: 'font-black text-slate-900',
        popup: 'rounded-[2rem] border border-slate-100 shadow-2xl'
      }
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`${SERVER_URL}/api/wishlist`, {
          method: "DELETE",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
          },
          body: JSON.stringify({ destination_id, userEmail: user.email }),
        });

        if (!res.ok) throw new Error();

        setWishlist((prev) => prev.filter((item) => item.destination_id !== destination_id));
        
        
        Toast.fire({
          icon: "success",
          title: "Removed successfully",
          background: "#ffffff",
          padding: "1rem"
        });

      } catch (err) {
        Toast.fire({
          icon: "error",
          title: "Deletion failed!"
        });
      }
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 mt-24 max-w-7xl mx-auto space-y-10">
      <div className="h-12 w-56 bg-slate-200 rounded-2xl animate-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-80 bg-white rounded-3xl animate-pulse border border-slate-100" />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFDFD] max-w-7xl mx-auto px-5 py-12 mt-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 border-b border-slate-100 pb-10">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="px-4 py-1.5 bg-rose-50 text-rose-600 rounded-full text-xs font-bold tracking-widest uppercase">Vault</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight italic">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500">Dreams</span>
          </h1>
          <p className="text-slate-400 font-medium ml-1">
            You have <span className="text-slate-900 font-bold">{wishlist.length}</span> destinations curated
          </p>
        </div>

        {wishlist.length > 0 && (
          <Link href="/destinations" className="group inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-emerald-600 transition-all duration-300 shadow-xl shadow-slate-200">
            Add More <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>

      {wishlist.length === 0 ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-24 bg-slate-50/50 rounded-[3rem] border-2 border-dashed border-slate-200">
          <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center mx-auto mb-6">
            <Sparkles className="text-slate-300 w-10 h-10" />
          </div>
          <p className="text-slate-500 text-xl font-bold">Your vault is currently empty.</p>
          <Link href="/destinations" className="mt-6 inline-block px-8 py-4 bg-emerald-500 text-white rounded-2xl font-black hover:scale-105 transition-all shadow-lg shadow-emerald-500/20">
            Start Exploring
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {wishlist.map((item, idx) => (
              <motion.div
                key={item._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group relative bg-white rounded-[2rem] border border-slate-100 hover:border-emerald-100 shadow-sm hover:shadow-2xl hover:shadow-emerald-500/5 transition-all duration-500 p-2.5 flex flex-col h-full"
              >
                {/* Image Section */}
                <div className="relative aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image
                    src={item.media?.cover_image || "/default-placeholder.png"}
                    alt={item.city}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-xl flex items-center gap-1.5 shadow-sm border border-white/50">
                    <Star className="text-amber-400 fill-amber-400 w-3 h-3" />
                    <span className="text-slate-900 font-bold text-[11px]">{item.popularityScore || "8.5"}</span>
                  </div>
                  
                  <button
                    onClick={() => handleRemove(item.destination_id)}
                    className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-md text-slate-400 hover:text-rose-500 rounded-xl transition-all shadow-sm opacity-0 group-hover:opacity-100 border border-white/50"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* Content Section */}
                <div className="pt-4 pb-2 px-3 flex flex-col flex-1">
                  <div className="flex items-center gap-1.5 text-emerald-600 mb-1">
                    <MapPin size={12} strokeWidth={3} />
                    <span className="text-[10px] font-black uppercase tracking-[0.15em]">{item.country}</span>
                  </div>
                  
                  <Link href={`/destinations/${item.destinationMongoId}`}>
                    <h4 className="text-lg font-black text-slate-900 leading-tight mb-2 group-hover:text-emerald-600 transition-colors">
                      {item.city}
                    </h4>
                  </Link>

                  <p className="text-slate-400 text-[11px] font-medium line-clamp-2 italic mb-4 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-slate-300 font-bold uppercase tracking-widest">Budget</span>
                      <p className="text-slate-900 font-black text-base">{item.avgBudget}</p>
                    </div>
                    <Link href={`/destinations/${item.destinationMongoId}`} className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 text-slate-300">
                      <Navigation size={18} />
                    </Link>
                  </div>
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