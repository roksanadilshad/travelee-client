"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock3, MapPin, Tag, ThermometerSun, Star, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const DestinationCard = ({ destination }) => {
  const { t } = useLanguage();

  return (
    <Link href={`/destinations/${destination._id}`}>
    <motion.div
      whileHover={{ y: -8 }}
      className="group bg-white border border-[#CBD5E1] rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
    >
      {/* Visual Header */}
      <div className="relative w-full h-64 overflow-hidden">
        <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 border border-[#CBD5E1]">
          <Star className="w-3.5 h-3.5 text-[#FF6B6B] fill-[#FF6B6B]" />
          <span className="text-[10px] font-black text-[#1E293B]">{destination.popularityScore || "8.5"}</span>
        </div>

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

      {/* Intel Grid */}
      <div className="p-5 flex flex-col flex-1 space-y-4">
        <p className="text-[#64748B] text-xs font-medium leading-relaxed line-clamp-2 italic">
          "{destination.description}"
        </p>

        <div className="grid grid-cols-2 gap-y-1 gap-x-2  border-y border-[#E2E8F0]">
          <div className="space-y-1">
            <span className="text-[9px] font-black uppercase text-[#64748B] flex items-center gap-1">
              <Clock3 className="w-3 h-3 text-[#0EA5A4]" /> {t("card.duration_label")}
            </span>
            <p className="text-xs font-bold text-[#1E293B]">{destination.duration}</p>
          </div>
          {/* <div className="space-y-1">
            <span className="text-[9px] font-black uppercase text-[#64748B] flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#0EA5A4]" /> {t("card.safety_label")}
            </span>
            <p className="text-xs font-bold text-[#1E293B]">{destination.safety_index}/10</p>
          </div> */}
          {/* <div className="space-y-1">
            <span className="text-[9px] font-black uppercase text-[#64748B] flex items-center gap-1">
              <ThermometerSun className="w-3 h-3 text-[#0EA5A4]" /> {t("weather.intel")}
            </span>
            <p className="text-xs font-bold text-[#1E293B]">{destination.climate?.avg_temp_c}°C</p>
          </div> */}
          <div className="space-y-1">
            <span className="text-[9px] font-black uppercase text-[#64748B] flex items-center gap-1">
              <Tag className="w-3 h-3 text-[#0EA5A4]" /> {t("card.best_time")}
            </span>
            <p className="text-[9px] font-bold text-[#FF6B6B] uppercase">{destination.best_time_to_visit}</p>
          </div>
        </div>

        {/* Footer Action */}
        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-[8px] font-black uppercase text-[#64748B] block">{t("card.budget_label")}</span>
            <span className="text-sm font-black italic text-[#0EA5A4]">{destination.avgBudget}</span>
          </div>

           
        </div>
      </div>
    </motion.div>
    </Link>
  );
};

export default DestinationCard;