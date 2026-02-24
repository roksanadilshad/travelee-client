"use client";
import React, { useState, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Wallet, Info, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext'; // IMPORT

const BudgetEstimator = () => {
  const { t, language } = useLanguage(); // INITIALIZE
  const [days, setDays] = useState(5);
  const [baseDailyRate, setBaseDailyRate] = useState(150); 
  
  const totalCost = days * baseDailyRate;

  const count = useSpring(0, { stiffness: 50, damping: 20 });
  
  // Format numerals based on locale
  const displayTotal = useTransform(count, (latest) => 
    Math.round(latest).toLocaleString(language === 'BN' ? 'bn-BD' : 'en-US')
  );

  useEffect(() => {
    count.set(totalCost);
  }, [totalCost, count]);

  // Data with translated names
  const data = [
    { name: t('budget.cat_stay'), value: totalCost * 0.5, color: '#0EA5A4' },
    { name: t('budget.cat_food'), value: totalCost * 0.3, color: '#FF6B6B' },
    { name: t('budget.cat_transport'), value: totalCost * 0.2, color: '#1E293B' },
  ];

  return (
    <section className="py-24 bg-[#f8fafc]">
      <div className="container mx-auto px-6">
        <div className="bg-white rounded-[3rem] p-12 shadow-2xl border border-slate-100 flex flex-col lg:flex-row items-center gap-16">
          
          {/* LEFT: INPUTS & ODOMETER */}
          <div className="w-full lg:w-1/2 space-y-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-[2px] bg-[#0EA5A4]"></span>
                <span className="text-[#0EA5A4] font-black uppercase tracking-widest text-xs">
                  {t('budget.badge')}
                </span>
              </div>
              <h2 className="text-5xl font-black text-[#1E293B] tracking-tighter leading-tight">
                {t('budget.title')} <br/> 
                <span className="text-slate-400 italic font-serif lowercase">
                  {t('budget.subtitle')}
                </span>
              </h2>
            </div>

            <div className="space-y-8">
              {/* SLIDER BLOCK */}
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                <div className="flex justify-between items-end mb-6">
                  <span className="text-sm font-black text-slate-500 uppercase tracking-widest">
                    {t('budget.duration_label')}
                  </span>
                  <span className="text-3xl font-black text-[#1E293B]">
                    {days.toLocaleString(language === 'BN' ? 'bn-BD' : 'en-US')} 
                    <span className="text-sm text-slate-400 ml-2">{t('budget.days_unit')}</span>
                  </span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="30" 
                  value={days} 
                  onChange={(e) => setDays(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0EA5A4]"
                />
              </div>

              {/* ODOMETER DISPLAY */}
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-[#0EA5A4] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#0ea5a444]">
                  <Wallet size={28} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">
                    {t('budget.total_label')}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-black text-[#1E293B] tracking-tighter">$</span>
                    <motion.span className="text-6xl font-black text-[#1E293B] tracking-tighter tabular-nums">
                      {displayTotal}
                    </motion.span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: DONUT CHART BREAKDOWN */}
          <div className="w-full lg:w-1/2 relative h-[400px] bg-slate-50 rounded-[2.5rem] border border-slate-100 p-8 flex flex-col items-center">
            <div className="absolute top-8 left-8 z-20">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Info size={14} className="text-[#0EA5A4]" /> {t('budget.allocation_title')}
                </h4>
            </div>

            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ 
                    borderRadius: '15px', 
                    border: 'none', 
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    backgroundColor: '#fff',
                    padding: '10px 15px'
                  }}
                  itemStyle={{ fontWeight: '900', fontSize: '12px', color: '#1E293B' }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* CHART LEGEND */}
            <div className="flex flex-wrap justify-center gap-6 mb-4 relative z-20">
                {data.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                          {item.name}
                        </span>
                    </div>
                ))}
            </div>
            
            <button className="absolute bottom-8 right-8 w-12 h-12 bg-[#1E293B] text-white rounded-full flex items-center justify-center hover:bg-[#0EA5A4] transition-all duration-300 shadow-xl group">
                <ArrowUpRight size={20} className="group-hover:rotate-45 transition-transform" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BudgetEstimator;