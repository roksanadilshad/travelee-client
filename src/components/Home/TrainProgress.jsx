"use client";
import React from 'react';
import { motion } from "framer-motion";

const TrainProgress = ({ index, duration = 5 }) => {
    return (
        <div className="absolute bottom-0 left-0 w-full h-6 z-30 pointer-events-none">
            {/* THE TRACK: Industrial Steel Look */}
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-muted/20">
                <div className="absolute inset-0 flex justify-around px-2">
                    {[...Array(40)].map((_, i) => (
                        <div key={i} className="w-[2px] h-full bg-muted-foreground/10" />
                    ))}
                </div>
            </div>

            {/* THE TRAIN BODY */}
            <motion.div 
                key={index}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: duration, ease: "linear" }}
                className="relative h-full flex items-end"
            >
                {/* LOCOMOTIVE ENGINE (The Front) */}
                <div className="absolute right-0 bottom-[1px] flex flex-col items-end">
                    {/* Steam Smoke Animation */}
                    <div className="flex gap-1 mb-[-4px] mr-4">
                        {[1, 2, 3].map((s) => (
                            <motion.div
                                key={s}
                                animate={{ 
                                    y: [0, -20], 
                                    x: [0, 10], 
                                    opacity: [0.6, 0], 
                                    scale: [0.5, 1.5] 
                                }}
                                transition={{ 
                                    duration: 15.5, 
                                    repeat: Infinity, 
                                    delay: s * 0.4 
                                }}
                                className="w-2 h-2 bg-gray-400 rounded-full blur-[2px]"
                            />
                        ))}
                    </div>

                    {/* Engine Head */}
                    <div className="relative w-10 h-4 bg-primary rounded-t-lg rounded-r-xl shadow-lg border-b-2 border-primary-foreground/20">
                        {/* Headlight */}
                        <div className="absolute right-1 top-1 w-2 h-2 bg-yellow-300 rounded-full shadow-[0_0_10px_#fde047]" />
                        {/* Cabin Window */}
                        <div className="absolute left-1 top-1 w-3 h-2 bg-blue-200/50 rounded-sm" />
                    </div>
                </div>

                {/* THE CARRIAGES (The Body) */}
                <div className="absolute inset-0 flex justify-end items-end pr-10">
                    {[...Array(12)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.2 }}
                            className="flex items-end"
                        >
                            {/* Carriage Box */}
                            <div 
                                className="w-5 h-3 bg-primary/80 mx-[1px] rounded-t-sm border-b-2 border-primary-foreground/20 relative"
                                style={{
                                    animation: `chugJump 0.4s infinite ease-in-out ${i * 0.05}s`
                                }}
                            >
                                {/* Window detail on carriage */}
                                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-3 h-1 bg-white/20 rounded-[1px]" />
                            </div>
                            {/* Connector Joint */}
                            <div className="w-[3px] h-[1.5px] bg-gray-500 mb-[1px]" />
                        </motion.div>
                    ))}
                </div>

                {/* Light Beam Effect */}
                <div className="absolute right-[-20px] bottom-0 w-32 h-16 bg-gradient-to-r from-yellow-400/20 to-transparent blur-2xl rounded-full" />
            </motion.div>

            <style jsx global>{`
                @keyframes chugJump {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-2px); }
                }
            `}</style>
        </div>
    );
};

export default TrainProgress;