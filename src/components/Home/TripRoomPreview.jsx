"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaUsers, FaLink, FaUnlockAlt, FaCircle } from 'react-icons/fa';
import { useLanguage } from '@/context/LanguageContext'; // IMPORT

const TripRoomPreview = () => {
  const { t } = useLanguage(); // INITIALIZE

  const activePlanners = [
    { id: 1, name: "Marcus", img: "https://i.pravatar.cc/150?u=1", status: "online" },
    { id: 2, name: "Elena", img: "https://i.pravatar.cc/150?u=2", status: "online" },
    { id: 3, name: "Julian", img: "https://i.pravatar.cc/150?u=3", status: "away" },
    { id: 4, name: "Sasha", img: "https://i.pravatar.cc/150?u=4", status: "online" },
  ];

  return (
    <section className="py-24 bg-[#F8FAFC]">
      <div className="container mx-auto px-6">
        <div className="relative bg-slate-900 rounded-[4rem] p-8 md:p-16 overflow-hidden border border-slate-800 shadow-2xl">
          
          {/* AMBIENT BACKGROUND GLOW */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#0EA5A4] opacity-10 blur-[120px] rounded-full" />
          
          <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
            
            {/* LEFT: THE INTERACTIVE UI MOCKUP */}
            <div className="relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="bg-slate-800/40 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-8 shadow-2xl"
              >
                {/* TOOLBAR */}
                <div className="flex justify-between items-center mb-12 border-b border-white/5 pb-6">
                  <div>
                    <p className="text-[#0EA5A4] font-black text-[10px] uppercase tracking-[0.3em] mb-1">
                      {t('room.badge_mockup')}
                    </p>
                    <h3 className="text-white text-2xl font-black tracking-tighter">
                      {t('room.expedition')}: TOKYO 2026
                    </h3>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-[#0EA5A4] cursor-pointer transition-colors">
                      <FaLink size={14} />
                    </div>
                  </div>
                </div>

                {/* THE AVATAR SYSTEM */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
                  <div className="flex items-center -space-x-4">
                    {activePlanners.map((user, idx) => (
                      <div key={user.id} className="relative group cursor-help">
                        <motion.div
                          initial={{ x: -20, opacity: 0 }}
                          whileInView={{ x: 0, opacity: 1 }}
                          transition={{ delay: idx * 0.1 }}
                        >
                          <img 
                            src={user.img} 
                            className={`w-16 h-16 rounded-full border-[6px] border-slate-900 object-cover ring-1 ring-white/10 transition-transform group-hover:scale-110 group-hover:z-30`}
                            alt={user.name}
                          />
                          {user.status === 'online' && (
                            <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-4 border-slate-900 rounded-full animate-pulse" />
                          )}
                        </motion.div>
                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-slate-900 text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none uppercase tracking-widest">
                          {user.name}
                        </span>
                      </div>
                    ))}
                    <button className="w-16 h-16 rounded-full border-[6px] border-slate-900 bg-slate-700 flex items-center justify-center text-white hover:bg-[#0EA5A4] transition-all group">
                      <FaPlus className="group-hover:rotate-90 transition-transform" />
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">
                      {t('room.status_label')}
                    </p>
                    <div className="flex items-center gap-2 text-emerald-400 font-black text-xs uppercase tracking-widest bg-emerald-500/10 px-4 py-2 rounded-full">
                      <FaCircle className="text-[6px] animate-ping" /> {t('room.sync')}
                    </div>
                  </div>
                </div>

                {/* PROGRESS MONITOR */}
                <div className="bg-black/20 rounded-2xl p-6 border border-white/5">
                  <div className="flex justify-between mb-4">
                    <span className="text-white/60 text-[10px] font-black uppercase tracking-widest">
                      {t('room.density')}
                    </span>
                    <span className="text-[#0EA5A4] text-[10px] font-black uppercase tracking-widest">84%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "84%" }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-[#0EA5A4] to-emerald-400"
                    />
                  </div>
                </div>
              </motion.div>

              {/* FLOATING DECORATIVE ELEMENT */}
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-2xl hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#0EA5A4]/10 rounded-xl flex items-center justify-center text-[#0EA5A4]">
                    <FaUsers />
                  </div>
                  <div>
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
                      {t('room.active_planners')}
                    </p>
                    <p className="text-sm font-black text-slate-900 uppercase tracking-tight">
                      {t('room.planners_count')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: CONTENT */}
            <div className="space-y-10">
              <div className="space-y-4">
                <span className="bg-[#0EA5A4] text-white text-[10px] font-black px-3 py-1 rounded uppercase tracking-[0.2em]">
                  {t('room.main_badge')}
                </span>
                <h2 className="text-5xl md:text-6xl font-black text-white leading-[0.9] tracking-tighter uppercase">
                  {t('room.title_main')} <br />
                  <span className="text-slate-500 italic font-serif lowercase">
                    {t('room.title_sub')}
                  </span> {t('room.title_end')}
                </h2>
                <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-md">
                  {t('room.description')}
                </p>
              </div>

              <div className="flex flex-wrap gap-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-[#0EA5A4] border border-white/10">
                    <FaUnlockAlt size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-black text-[11px] uppercase tracking-widest">
                      {t('room.feature_title')}
                    </h4>
                    <p className="text-slate-500 text-[10px]">
                      {t('room.feature_sub')}
                    </p>
                  </div>
                </div>
              </div>

              <button className="relative group overflow-hidden bg-white text-slate-900 px-12 py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] hover:text-white transition-colors duration-300">
                <span className="relative z-10">{t('room.cta')}</span>
                <div className="absolute inset-0 bg-[#0EA5A4] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default TripRoomPreview;