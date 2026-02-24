"use client";
import React, { useState, useEffect } from 'react';
import { Reorder, motion, AnimatePresence } from 'framer-motion';
import { GripVertical, Utensils, Camera, MapPin, Navigation, Clock } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const SmartBuilderTeaser = () => {
  const { t } = useLanguage();

  // We use translation keys as IDs or reference points
  const initialItems = [
    { id: 1, titleKey: "activity.sightseeing", type: "activity", time: "09:00 AM", icon: <Camera size={18} /> },
    { id: 2, titleKey: "activity.lunch", type: "food", time: "12:30 PM", icon: <Utensils size={18} /> },
    { id: 3, titleKey: "activity.walk", type: "activity", time: "04:00 PM", icon: <Navigation size={18} /> },
  ];

  const [items, setItems] = useState(initialItems);

  return (
    <section className="py-24 bg-[#1E293B] overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* LEFT SIDE: THE BUILDER UI */}
          <div className="w-full lg:w-1/2">
            <div className="mb-10">
              <span className="text-[#0EA5A4] font-black uppercase tracking-[0.3em] text-[11px]">
                {t("builder.badge")}
              </span>
              <h2 className="text-5xl font-black text-white tracking-tighter mt-2 uppercase">
                {t("builder.title").split(' ').map((word, i) => 
                  word.toLowerCase() === 'smart' ? <span key={i} className="italic text-slate-400"> {word} </span> : ` ${word} `
                )}
              </h2>
              <p className="text-slate-400 mt-4 font-medium">{t("builder.subtitle")}</p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#0EA5A4] rounded-xl flex items-center justify-center text-white font-bold">01</div>
                  <h3 className="text-white font-bold tracking-tight">{t("builder.day_title")}</h3>
                </div>
                <div className="text-[#FF6B6B] text-[10px] font-black tracking-widest uppercase">
                  {t("builder.stops_count")}
                </div>
              </div>

              <Reorder.Group axis="y" values={items} onReorder={setItems} className="space-y-4">
                {items.map((item) => (
                  <Reorder.Item 
                    key={item.id} 
                    value={item}
                    className="group"
                  >
                    <motion.div 
                      whileDrag={{ scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
                      className="bg-white/5 hover:bg-white/10 border border-white/5 p-5 rounded-2xl flex items-center gap-5 cursor-grab active:cursor-grabbing transition-colors"
                    >
                      <div className="text-slate-500 group-hover:text-[#0EA5A4] transition-colors">
                        <GripVertical size={20} />
                      </div>
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.type === 'food' ? 'bg-[#FF6B6B]/20 text-[#FF6B6B]' : 'bg-[#0EA5A4]/20 text-[#0EA5A4]'}`}>
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-bold text-sm tracking-tight">
                          {t(item.titleKey)}
                        </h4>
                        <div className="flex items-center gap-2 mt-1 text-slate-500 text-[11px] font-bold uppercase tracking-widest">
                          <Clock size={12} /> {item.time}
                        </div>
                      </div>
                    </motion.div>
                  </Reorder.Item>
                ))}
              </Reorder.Group>
            </div>
          </div>

          {/* RIGHT SIDE: THE VISUAL FEEDBACK */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative aspect-square rounded-[3rem] overflow-hidden border-[12px] border-white/5 shadow-3xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={items[0].id}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0"
                >
                    <img 
                        src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80" 
                        alt="Destination"
                        className="w-full h-full object-cover grayscale-[0.2]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#1E293B] via-transparent to-transparent opacity-60" />
                </motion.div>
              </AnimatePresence>

              {/* FLOATING MAP CARD */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-10 right-10 bg-white p-6 rounded-3xl shadow-2xl w-64 border border-slate-100"
              >
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-[#0EA5A4]/10 rounded-full flex items-center justify-center text-[#0EA5A4]">
                        <MapPin size={16} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          {t("builder.next_dest")}
                        </p>
                        <p className="text-sm font-bold text-[#1E293B]">
                          {/* Extracting city name from translated activity title */}
                          {t(items[0].titleKey).includes(':') ? t(items[0].titleKey).split(': ')[1] : t(items[0].titleKey)}
                        </p>
                    </div>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ width: "0%" }}
                        animate={{ width: "65%" }}
                        className="h-full bg-[#0EA5A4]" 
                    />
                </div>
              </motion.div>
            </div>

            {/* DECORATIVE INDUSTRIAL GRID */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 -z-10" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default SmartBuilderTeaser;