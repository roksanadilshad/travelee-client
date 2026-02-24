"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Leaf, Diamond, Wallet, User, ArrowRight } from 'lucide-react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter, useSearchParams } from "next/navigation";
import DestinationsPagination from '../Share/DestinationsPagination';
import SkeletonGrid from '../loading/SkeletonGrid';
import { useLanguage } from '@/context/LanguageContext'; // IMPORT

const CategorizedExploration = () => {
  const { t } = useLanguage(); // INITIALIZE
  const router = useRouter();
  const searchParams = useSearchParams();

  // Updated CATEGORIES to use translation keys
  const CATEGORIES = [
    { id: 'all', labelKey: 'cat.all', icon: <Compass size={16} /> },
    { id: 'adventure', labelKey: 'cat.adventure', icon: <Leaf size={16} /> },
    { id: 'luxury', labelKey: 'cat.luxury', icon: <Diamond size={16} /> },
    { id: 'budget', labelKey: 'cat.budget', icon: <Wallet size={16} /> },
    { id: 'solo', labelKey: 'cat.solo', icon: <User size={16} /> },
  ];

  const currentPage = parseInt(searchParams.get("page")) || 1;
  const currentCity = searchParams.get("city") || "";

  const [activeTab, setActiveTab] = useState('all');
  const [items, setItems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [paginationData, setPaginationData] = useState({ totalPages: 1 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://travelee-server.vercel.app/destinations`, {
          params: { page: currentPage, city: currentCity, limit: 6 }
        });
        setItems(res.data.data);
        setPaginationData({ totalPages: res.data.totalPages });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [currentPage, currentCity]);

  useEffect(() => {
    if (activeTab === 'all') {
      setFiltered(items);
    } else {
      const filteredData = items.filter(item => {
        if (activeTab === 'budget') return item.price?.includes('$500') || item.price?.includes('$1200');
        if (activeTab === 'luxury') return item.popularityScore > 8.5 || item.avgBudget?.includes('$300');
        return true; 
      });
      setFiltered(filteredData);
    }
  }, [activeTab, items]);

  const handleCategoryClick = (catId) => {
    setActiveTab(catId);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    params.set("category", catId); 
    router.push(`/destinations?${params.toString()}`);
  };

  return (
    <section className="py-24 bg-white min-h-screen">
      <div className="container mx-auto px-6">
        
        {/* PILL NAVIGATION */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`relative px-8 py-3 rounded-full flex items-center gap-3 transition-all duration-500 group ${
                activeTab === cat.id ? 'text-white' : 'text-slate-500 bg-slate-100 hover:bg-slate-200'
              }`}
            >
              <span className="relative z-10">{cat.icon}</span>
              <span className="relative z-10 font-black uppercase tracking-widest text-[11px]">
                {t(cat.labelKey)}
              </span>
              
              {activeTab === cat.id && (
                <motion.div 
                  layoutId="activePill"
                  className="absolute inset-0 bg-[#0EA5A4] rounded-full shadow-[0_10px_20px_rgba(14,165,164,0.3)]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* MASONRY-STYLE GRID */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {loading ? (
              <SkeletonGrid count={6}/>
            ) : (
              filtered.map((item) => (
                <motion.div
                  layout
                  key={item._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group relative bg-slate-900 rounded-[2.5rem] overflow-hidden h-[450px] shadow-xl border border-slate-100"
                >
                  <Link href={`/destinations/${item._id}`}>
                    <div className="h-full w-full relative">
                      <img 
                        src={item.media?.cover_image} 
                        className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                        alt={item.city}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B] via-transparent to-transparent" />
                      <div className="absolute bottom-8 left-8 right-8 text-white">
                          <p className="text-[#0EA5A4] font-black text-[10px] tracking-[0.4em] uppercase mb-2">
                              {t(item.country)}
                          </p>
                          <h3 className="text-3xl font-black mb-4 tracking-tighter uppercase leading-none">
                            {t(item.city)}
                          </h3>
                          <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <span className="font-bold text-xs">
                                {t("cat.starting")} {item.avgBudget}
                              </span>
                              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#1E293B]">
                                  <ArrowRight size={18} />
                              </div>
                          </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>

        {/* PAGINATION COMPONENT */}
        <DestinationsPagination 
          totalPages={paginationData.totalPages} 
          page={currentPage} 
          city={currentCity}
        />
      </div>
    </section>
  );
};

export default CategorizedExploration;