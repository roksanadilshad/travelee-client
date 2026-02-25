"use client";
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const TraveleeLogo = ({ variant = "nav" }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    const isFooter = variant === "footer";
    const textColor = isFooter ? "text-slate-900" : "text-white";
    const subTextColor = isFooter ? "text-slate-500" : "text-white/50";
    const radarBase = isFooter ? "stroke-slate-900/10" : "stroke-[#0EA5A4]/20";
    const gridColor = isFooter ? "stroke-slate-900/5" : "stroke-[#0EA5A4]/10";

    return (
        <div 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative flex items-center gap-5 cursor-pointer py-2 lg:px-5 group select-none transition-all duration-500"
        >
            {/* THE TACTICAL RADAR ICON */}
            <div className="relative w-4 h-4 lg:w-10 lg:h-10 shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                    {/* Outer Glow / Glass Frame */}
                    <circle cx="50" cy="50" r="48" fill="none" className={`${isFooter ? 'stroke-slate-200' : 'stroke-white/10'}`} strokeWidth="0.5" />
                    
                    {/* Concentric Depth Rings */}
                    <circle cx="50" cy="50" r="40" fill="none" className={radarBase} strokeWidth="1" />
                    <circle cx="50" cy="50" r="25" fill="none" className={radarBase} strokeWidth="1" strokeDasharray="2 4" />
                    <circle cx="50" cy="50" r="10" fill="none" className={radarBase} strokeWidth="1" />

                    {/* Crosshair / Axis Lines */}
                    <line x1="50" y1="10" x2="50" y2="90" className={gridColor} strokeWidth="1" />
                    <line x1="10" y1="50" x2="90" y2="50" className={gridColor} strokeWidth="1" />

                    {/* THE ROTATING SWEEP (The Phosphor Effect) */}
                    <motion.g
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        style={{ originX: "50px", originY: "50px" }}
                    >
                        <defs>
                            <conicGradient id="radarSweep" cx="50" cy="50">
                                <stop offset="0%" stopColor="#0EA5A4" stopOpacity="0.8" />
                                <stop offset="25%" stopColor="#0EA5A4" stopOpacity="0" />
                            </conicGradient>
                        </defs>
                        <circle cx="50" cy="50" r="40" fill="url(#radarSweep)" className="opacity-30" />
                        
                        {/* Leading Edge Beam */}
                        <line x1="50" y1="50" x2="50" y2="10" stroke="#0EA5A4" strokeWidth="1.5" strokeLinecap="round" className="drop-shadow-[0_0_5px_#0EA5A4]" />
                    </motion.g>

                    {/* RANDOMIZED PINGS (Blips appearing as the sweep hits them) */}
                    {[ {x:70, y:30}, {x:30, y:65}, {x:55, y:75} ].map((pos, i) => (
                        <motion.circle
                            key={i}
                            cx={pos.x} cy={pos.y} r="1.5"
                            fill="#0EA5A4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: i * 0.8,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                </svg>

                {/* THE PLANE: Infinite Glide */}
                <motion.div
                    className="absolute z-20 pointer-events-none"
                    style={{ top: '50%', left: '0' }}
                    animate={ {
                       x: [0, 20, 175],       // Moves from icon to the end of the text
                        y: [0, 10, 10],     // Swoops up and settles slightly higher
                        rotateZ: [45, 45, 55], // Banks wings and then levels out at an angle
                         scale: [1, 1.3, 1.3],
                    } }
                    transition={ {
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                        repeatDelay: 0.5
                    } }
                >
                    <svg width="22" height="22" viewBox="0 0 24 24" className="text-[#FF6B6B] drop-shadow-[0_0_10px_#FF6B6B]">
                        <path fill="currentColor" d="M21,16 L21,14 L13,9 L13,3.5 C13,2.67 12.33,2 11.5,2 C10.67,2 10,2.67 10,3.5 L10,9 L2,14 L2,16 L10,13.5 L10,19 L8,20.5 L8,22 L11.5,21 L15,22 L15,20.5 L13,19 L13,13.5 L21,16 Z" />
                    </svg>
                </motion.div>
            </div>

            {/* THE TEXT */}
            <div className="flex flex-col">
                <h1 className={`lg:text-3xl font-black ${textColor} tracking-[-0.06em] flex items-baseline leading-none`}>
                    TRAVELEE
                    <motion.span 
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-[#0EA5A4] ml-1"
                    >●</motion.span>
                </h1>
                <div className="flex items-center gap-2 mt-1">
                    <div className="h-[2px] w-5 bg-gradient-to-r from-[#FF6B6B] to-transparent" />
                    <span className={`text-[10px]  font-black uppercase tracking-[0.5em] ${subTextColor}`}>
                        Intelligence Unit
                    </span>
                </div>
            </div>
        </div>
    );
};

export default TraveleeLogo;