"use client";
import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

const LanguageToggle = () => {
  const { lang, toggleLanguage } = useLanguage();
  

  return (
    <div className="relative bg-white/5 backdrop-blur-md p-1 rounded-xl flex items-center w-40 border border-white/10 shadow-inner">
      {/* Sliding Background Indicator */}
      <motion.div
        className="absolute h-[calc(100%-8px)] bg-[#0EA5A4] rounded-lg shadow-lg z-0"
        initial={false}
        animate={{ 
          // 4px for the left padding, ~100% for the right side
          x: lang === "EN" ? 0 : "98%" 
        }}
        transition={{ type: "spring", stiffness: 400, damping: 35 }}
        style={{ width: "calc(50% - 4px)" }}
      />

      {/* English Button */}
      <button
        onClick={() => toggleLanguage("EN")}
        className={`relative z-10 flex-1 py-1.5 text-[10px] font-black tracking-[0.2em] transition-colors duration-300 ${
          lang === "EN" ? "text-white bg-primary rounded-2xl" : "text-primary hover:text-white/70"
        }`}
      >
        EN
      </button>

      {/* Bangla Button */}
      <button
        onClick={() => toggleLanguage("BN")}
        className={`relative z-10 flex-1 py-1.5 text-[10px] font-black tracking-[0.2em] transition-colors duration-300 ${
          lang === "BN" ? "text-white bg-primary rounded-2xl" : "text-primary hover:text-white/70"
        }`}
      >
        BN
      </button>
    </div>
  );
};

export default LanguageToggle;