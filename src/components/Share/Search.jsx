"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
import { HiOutlineSparkles } from 'react-icons/hi';
import { useLanguage } from '@/context/LanguageContext';

export default function Search() {
    const { t } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const router = useRouter();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            router.push(`destinations?city=${searchTerm}`);
        }
    };

    return (
        <div className="w-full">
            <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className={`relative p-1.5 rounded-[2rem] transition-all duration-500 shadow-2xl ${
                    isFocused 
                    ? "bg-gradient-to-r from-[#0EA5A4] to-[#FF6B6B] shadow-[#0EA5A4]/20" 
                    : "bg-white/80 backdrop-blur-md border border-slate-200"
                }`}
            >
                <div className="bg-white rounded-[1.8rem] p-2">
                    <form onSubmit={handleSearch} className="flex flex-col md:flex-row md:items-center gap-2">
                        
                        <div className="flex items-center flex-1 px-4 group">
                            <div className={`p-2 rounded-xl transition-colors ${isFocused ? "text-[#0EA5A4] bg-[#0EA5A4]/10" : "text-slate-400 bg-slate-100"}`}>
                                <FaMapMarkerAlt className="text-lg" />
                            </div>
                            
                            <div className="flex flex-col flex-1 ml-4 text-left">
                                <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest leading-none mb-1">
                                    {t("search.label")}
                                </span>
                                <input
                                    type="text"
                                    placeholder={t("search.placeholder")}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="bg-transparent outline-none text-[#1E293B] font-bold placeholder:text-slate-300 placeholder:font-medium w-full"
                                />
                            </div>
                        </div>

                        <div className="hidden md:block w-px h-10 bg-slate-100 mx-2" />

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="relative overflow-hidden group w-full md:w-auto bg-[#FF6B6B] hover:bg-[#ff5252] text-white font-bold px-8 py-4 rounded-[1.5rem] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#FF6B6B]/30"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <FaSearch className="text-sm" />
                                {t("search.button")}
                            </span>
                            <HiOutlineSparkles className="absolute right-2 top-2 text-white/20 text-2xl group-hover:rotate-12 transition-transform" />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        </motion.button>
                    </form>
                </div>
            </motion.div>

            <div className="mt-4 flex items-center gap-4 px-4 overflow-x-auto no-scrollbar">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter whitespace-nowrap">
                    {t("search.popular")}
                </span>
                {['Bali', 'Paris', 'Tokyo', 'Swiss Alps'].map((city) => (
                    <button 
                        key={city}
                        onClick={() => router.push(`destinations?city=${city}`)}
                        className="text-xs font-semibold text-[#0EA5A4] hover:text-[#FF6B6B] transition-colors whitespace-nowrap"
                    >
                        {t(city)}
                    </button>
                ))}
            </div>
        </div>
    );
}