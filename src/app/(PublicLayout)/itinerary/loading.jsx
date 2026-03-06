"use client";
import React from 'react';
import { motion } from 'framer-motion';

const TacticalLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-slate-950 flex flex-col items-center justify-center overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#0EA5A4_1px,transparent_1px)] [background-size:30px_30px]" />

      <div className="relative flex flex-col items-center">
        
        {/* MAIN RADAR SPINNER */}
        <div className="relative w-40 h-40">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Concentric Rings */}
            <circle cx="50" cy="50" r="48" fill="none" className="stroke-slate-900" strokeWidth="1" />
            <circle cx="50" cy="50" r="35" fill="none" className="stroke-slate-900" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="50" cy="50" r="20" fill="none" className="stroke-slate-900" strokeWidth="1" />

            {/* The Scanning Beam */}
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              style={{ originX: "50px", originY: "50px" }}
            >
              <defs>
                <linearGradient id="beamGradient" x1="50%" y1="0%" x2="50%" y2="100%">
                  <stop offset="0%" stopColor="#0EA5A4" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#0EA5A4" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* The "Sweep" Triangle */}
              <path d="M50 50 L50 2 L65 10 Z" fill="url(#beamGradient)" className="opacity-40" />
              {/* Leading Edge Line */}
              <line x1="50" y1="50" x2="50" y2="2" stroke="#0EA5A4" strokeWidth="1.5" strokeLinecap="round" className="drop-shadow-[0_0_8px_#0EA5A4]" />
            </motion.g>

            {/* Static Axis Lines */}
            <line x1="50" y1="2" x2="50" y2="98" className="stroke-slate-900" strokeWidth="0.5" />
            <line x1="2" y1="50" x2="98" y2="50" className="stroke-slate-900" strokeWidth="0.5" />
          </svg>

          {/* THE PLANE: Banking in a circle */}
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <motion.div 
                className="absolute top-8 left-1/2 -translate-x-1/2"
                animate={{ rotate: [0, -10, 0] }} // Subtle wing banking
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" className="text-[#FF6B6B] drop-shadow-[0_0_10px_#FF6B6B] rotate-[-45deg]">
                <path fill="currentColor" d="M21,16 L21,14 L13,9 L13,3.5 C13,2.67 12.33,2 11.5,2 C10.67,2 10,2.67 10,3.5 L10,9 L2,14 L2,16 L10,13.5 L10,19 L8,20.5 L8,22 L11.5,21 L15,22 L15,20.5 L13,19 L13,13.5 L21,16 Z" />
              </svg>
            </motion.div>
          </motion.div>
        </div>

        {/* LOADING TEXT & STATUS */}
        <div className="mt-12 text-center space-y-3">
          <div className="flex items-center justify-center gap-3">
            <span className="text-white font-black tracking-[0.4em] text-xl uppercase animate-pulse">
              Travelee<span className="text-[#0EA5A4]">.</span>
            </span>
          </div>
          
          <div className="flex flex-col items-center">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, times: [0, 0.5, 1] }}
              className="text-[#0EA5A4] text-[10px] font-black uppercase tracking-[0.3em]"
            >
              Syncing Global Intel
            </motion.p>
            
            {/* Progress Bar Container */}
            <div className="w-48 h-[2px] bg-slate-900 mt-4 rounded-full overflow-hidden relative">
                <motion.div 
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0EA5A4] to-transparent"
                />
            </div>
          </div>
        </div>

        {/* BOTTOM METADATA (Industrial Look) */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full text-center">
            <p className="text-slate-700 text-[8px] font-black uppercase tracking-[0.5em]">
                Secure Connection Established // Sector 7G
            </p>
        </div>
      </div>
    </div>
  );
};

export default TacticalLoader;