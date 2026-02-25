"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Flame, Shield, DollarSign, Thermometer } from "lucide-react";
import DestinationCard from "@/components/Share/cards/DestinationCard";

export default function DestinationsClientHub({ initialData, cityQuery }) {
  const [search, setSearch] = useState(cityQuery);
  const [activeSort, setActiveSort] = useState("popularity");
  const [filters, setFilters] = useState({ budget: 'All', climate: 'All', safety: 'All' });

  // Tactical Filtering Logic
  const filtered = useMemo(() => {
    return initialData
      .filter(dest => dest.city.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        if (activeSort === "popularity") return b.popularityScore - a.popularityScore;
        if (activeSort === "safety") return b.safety_index - a.safety_index;
        return 0;
      });
  }, [search, activeSort, initialData]);

  return (
    <div className="relative">
      {/* GLASSMORPHIC STICKY HEADER */}
      <div className="sticky top-20 z-30 py-4 mb-8 bg-background/50 backdrop-blur-xl border-b border-border/40">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="relative w-full lg:w-1/3 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Enter coordinates (City, Country)..."
              className="w-full bg-muted/20 border-none rounded-2xl py-3 pl-12 pr-4 focus:ring-2 ring-primary/20 font-bold tracking-tight"
            />
          </div>

          {/* VISUAL SORTING SYSTEM */}
          <div className="flex items-center gap-6 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto">
            <SortBtn active={activeSort === 'popularity'} onClick={() => setActiveSort('popularity')} icon={<Flame size={14}/>} label="Popularity" />
            <SortBtn active={activeSort === 'safety'} onClick={() => setActiveSort('safety')} icon={<Shield size={14}/>} label="Safety" />
            <SortBtn active={activeSort === 'price'} onClick={() => setActiveSort('price')} icon={<DollarSign size={14}/>} label="Budget" />
            <SortBtn active={activeSort === 'temp'} onClick={() => setActiveSort('temp')} icon={<Thermometer size={14}/>} label="Climate" />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* FIVE PILLAR SIDEBAR */}
        <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-44 space-y-8">
                <IntelligencePillar label="Budget Tier" options={['Value', 'Standard', 'Luxury']} />
                <IntelligencePillar label="Climate Sync" options={['Tropical', 'Mild', 'Cool']} />
                <IntelligencePillar label="Safety Index" options={['Secure', 'Standard']} />
            </div>
        </aside>

        {/* DATA GRID WITH MOTION */}
        <div className="flex-1">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence>
              {filtered.map((dest, idx) => (
                <DestinationCard key={dest._id} data={dest} index={idx} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function SortBtn({ active, onClick, icon, label }) {
  return (
    <button onClick={onClick} className={`flex items-center gap-2 whitespace-nowrap text-[11px] font-black uppercase tracking-tighter transition-all ${active ? "text-primary scale-105" : "text-muted-foreground hover:text-foreground"}`}>
      {icon} {label}
      {active && <motion.div layoutId="activeSort" className="h-0.5 w-full bg-primary absolute -bottom-2" />}
    </button>
  );
}

function IntelligencePillar({ label, options }) {
    return (
        <div className="space-y-3">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">{label}</h4>
            <div className="flex flex-wrap gap-2">
                {options.map(opt => (
                    <button key={opt} className="px-3 py-1.5 rounded-lg border border-border/60 text-[10px] font-bold hover:border-primary transition-colors">
                        {opt}
                    </button>
                ))}
            </div>
        </div>
    )
}