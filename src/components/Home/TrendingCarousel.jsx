"use client";
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Users, MapPin, Thermometer, Zap, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { useLanguage } from '@/context/LanguageContext'; // IMPORT THIS

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const TrendingNow = () => {
    const { t } = useLanguage(); // INITIALIZE TRANSLATOR
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/destinations/trending`);
                setDestinations(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Fetch error:", err);
                setLoading(false);
            }
        };
        fetchTrending();
    }, []);

    if (loading) return (
        <div className="h-[600px] flex items-center justify-center bg-[#fcfcfd]">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-[#0EA5A4]/20 border-t-[#0EA5A4] rounded-full animate-spin" />
                <span className="text-[10px] font-black tracking-[0.4em] text-slate-400 uppercase">
                    {t("trending.sync")}
                </span>
            </div>
        </div>
    );

    return (
        <section className="py-24 bg-[#fcfcfd] overflow-hidden">
            <div className="container mx-auto px-6">
                
                {/* INDUSTRIAL HEADER */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
                    <div className="relative">
                        <motion.div 
                            initial={{ width: 0 }} 
                            whileInView={{ width: "40px" }} 
                            className="h-[3px] bg-[#FF6B6B] mb-4" 
                        />
                        <h2 className="text-5xl md:text-7xl font-black text-[#1E293B] tracking-tighter leading-none uppercase">
                            {t("trending.title")} <span className="text-[#0EA5A4]">{t("trending.highlight")}</span>
                        </h2>
                        <p className="text-slate-500 font-bold mt-4 tracking-tight flex items-center gap-2">
                            <Zap size={16} className="text-[#0EA5A4]" /> 
                            {t("trending.metric_label")}
                        </p>
                    </div>
                    <div className="hidden lg:flex gap-4 border-l border-slate-200 pl-8">
                        <div className="text-right">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                {t("trending.active_sessions")}
                            </p>
                            <p className="text-2xl font-black text-[#1E293B]">14,282</p>
                        </div>
                    </div>
                </div>

                <Swiper
                    modules={[Autoplay, Pagination, Navigation]}
                    spaceBetween={30}
                    slidesPerView={1}
                    autoplay={{ delay: 6000 }}
                    pagination={{ clickable: true, dynamicBullets: true }}
                    breakpoints={{
                        768: { slidesPerView: 2 },
                        1280: { slidesPerView: 3 }
                    }}
                    className="!pb-20 industrial-swiper"
                >
                    {destinations.map((item) => {
                        const isHot = item.climate?.avg_temp_c > 25;
                        
                        return (
                            <SwiperSlide key={item._id}>
                                <motion.div 
                                    className="group relative h-[550px] bg-slate-200 rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)]"
                                >
                                    <img 
                                        src={item.media?.cover_image} 
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110" 
                                        alt={item.city}
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#1E293B]/90" />
                                    
                                    {/* TOP BADGES */}
                                    <div className="absolute top-8 left-8 right-8 flex justify-between items-start z-10">
                                        <div className="flex flex-col gap-2">
                                            <div className="px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-full flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 bg-[#0EA5A4] rounded-full animate-pulse" />
                                                <span className="text-white text-[9px] font-black tracking-widest uppercase">
                                                    {t("trending.pop_index")}: {item.popularityScore}
                                                </span>
                                            </div>
                                            <div className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-full flex items-center gap-2 text-white">
                                                <Thermometer size={12} className={isHot ? "text-orange-400" : "text-blue-400"} />
                                                <span className="text-[9px] font-black uppercase tracking-widest">{item.climate?.avg_temp_c}°C</span>
                                            </div>
                                        </div>
                                        
                                        <button className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-[#FF6B6B] transition-all duration-300 group/heart">
                                            <Heart size={20} className="group-hover/heart:fill-white" />
                                        </button>
                                    </div>

                                    {/* BOTTOM DATA BLOCK */}
                                    <div className="absolute bottom-10 left-10 right-10 z-10">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="h-px w-6 bg-[#0EA5A4]" />
                                            <span className="text-[#0EA5A4] text-[10px] font-black uppercase tracking-[0.3em]">
                                                {t(item.region)}
                                            </span>
                                        </div>
                                        <h3 className="text-4xl font-black text-white tracking-tighter uppercase mb-2">
                                            {t(item.city)}
                                        </h3>
                                        <div className="flex items-center gap-6 text-white/60 text-[11px] font-bold tracking-widest uppercase">
                                            <span className="flex items-center gap-1.5"><MapPin size={14} className="text-[#FF6B6B]" /> {t(item.country)}</span>
                                            <span className="flex items-center gap-1.5"><Users size={14} /> {item.duration}</span>
                                        </div>
                                    </div>

                                    {/* HOVER INTERACTIVE DRAWER */}
                                    <div className="absolute inset-0 bg-[#0EA5A4] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.22, 1, 0.36, 1] z-20 p-12 flex flex-col justify-between">
                                        <div className="space-y-6">
                                            <div className="flex justify-between items-start">
                                                <h4 className="text-5xl font-black text-white italic leading-none">
                                                    {t("trending.view_specs").split(' ')[0]} <br/> {t("trending.view_specs").split(' ')[1] || ""}
                                                </h4>
                                                <span className="text-white/40 font-mono text-xs">REF: {item.destination_id}</span>
                                            </div>
                                            <p className="text-white/80 font-medium text-lg leading-relaxed line-clamp-4">
                                                {item.description}
                                            </p>
                                            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/20">
                                                <div>
                                                    <p className="text-[9px] font-black text-white/50 uppercase tracking-widest mb-1">
                                                        {t("trending.avg_budget")}
                                                    </p>
                                                    <p className="text-white font-bold">{item.avgBudget}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[9px] font-black text-white/50 uppercase tracking-widest mb-1">
                                                        {t("trending.best_visit")}
                                                    </p>
                                                    <p className="text-white font-bold">{item.best_time_to_visit}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <motion.button 
                                            whileTap={{ scale: 0.95 }}
                                            className="w-full py-5 bg-[#1E293B] text-white font-black uppercase tracking-[0.2em] rounded-2xl flex items-center justify-center gap-3 hover:bg-black transition-colors shadow-2xl"
                                        >
                                            {t("trending.init_plan")} <ArrowRight size={18} />
                                        </motion.button>
                                    </div>
                                </motion.div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
            
            <style jsx global>{`
                .industrial-swiper .swiper-pagination-bullet {
                    background: #cbd5e1;
                    opacity: 1;
                    width: 12px;
                    border-radius: 2px;
                    transition: all 0.3s;
                }
                .industrial-swiper .swiper-pagination-bullet-active {
                    background: #0EA5A4;
                    width: 30px;
                }
            `}</style>
        </section>
    );
};

export default TrendingNow;