"use client";
import React from 'react';
import Link from "next/link";
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin, Send, Activity } from "lucide-react";
import { useLanguage } from '@/context/LanguageContext';
import Logo from "./Logo";
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  const { t } = useLanguage();

  const socialLinks = [
    { Icon: Facebook, color: 'hover:text-[#1877F2]', hoverBg: 'hover:bg-[#1877F2]/10', href: '#' },
    { Icon: FaXTwitter, color: 'hover:text-[#1DA1F2]', hoverBg: 'hover:bg-[#1DA1F2]/10', href: '#' },
    { Icon: Instagram, color: 'hover:text-[#E4405F]', hoverBg: 'hover:bg-[#E4405F]/10', href: '#' },
    { Icon: Linkedin, color: 'hover:text-[#0A66C2]', hoverBg: 'hover:bg-[#0A66C2]/10', href: '#' },
  ];

  const footerSections = {
    company: ["About Us", "Careers", "Blog", "Press"],
    destinations: ["Asia", "Europe", "Americas", "Oceania"],
    resources: ["Travel Guides", "API Room", "Help Center", "Privacy"],
  };

  return (
    <footer className="bg-slate-950 pt-24 pb-12 border-t border-slate-900 overflow-hidden relative">
      {/* Background Intelligence Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#0EA5A4] to-transparent opacity-50" />
      
      <div className="container mx-auto px-6">
        
        {/* NEWSLETTER ISLAND */}
        <div className="bg-[#0EA5A4] rounded-2xl p-8 md:p-14 mb-10 flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden shadow-2xl shadow-[#0ea5a41a]">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
          
          <div className="relative z-10 max-w-xl text-center lg:text-left">
            <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-white text-[10px] font-black uppercase tracking-widest mb-4">
              Weekly Intel
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase leading-[0.9] mb-4">
              {t('footer.news_title')}
            </h2>
            <p className="text-white/90 font-medium text-lg leading-relaxed max-w-md">
              {t('footer.news_sub')}
            </p>
          </div>

          <div className="relative z-10 w-full lg:w-auto">
            <form className="flex flex-col sm:flex-row gap-3 p-2 bg-slate-950/20 backdrop-blur-2xl rounded-[2rem] border border-white/20">
              <input 
                type="email" 
                placeholder={t('footer.placeholder')}
                className="bg-transparent px-6 py-4 text-white placeholder:text-white/60 outline-none w-full lg:w-80 font-bold"
              />
              <button className="bg-white text-[#0EA5A4] px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-slate-900 hover:text-white transition-all duration-300 shadow-xl active:scale-95">
                {t('footer.subscribe')} <Send size={14} />
              </button>
            </form>
          </div>
        </div>

        {/* 4-COLUMN LINKS SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5  gap-12 mb-24">
          <div className='pr-10 pt-10 '>

          <Logo variant="footer" />
          </div>
          {Object.entries(footerSections).map(([key, links]) => (
            <div key={key} className="space-y-8 ">
              <h4 className="text-gray-400 font-black uppercase tracking-[0.3em] text-[10px] flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#0EA5A4] rounded-full" /> {t(`footer.${key}`)}
              </h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-slate-500 hover:text-[#0EA5A4] text-sm font-bold transition-all duration-300 hover:translate-x-1 inline-block">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* STATUS & INTEL COLUMN */}
          <div className="">
           <h4 className="text-gray-300 font-black uppercase tracking-[0.3em] text-[10px]">{t('footer.status_header')}</h4>
            <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </div>
                <span className="text-emerald-400 font-black text-[10px] uppercase tracking-widest">{t('footer.status')}</span>
              </div>
              <p suppressHydrationWarning className="text-slate-600 text-[10px] leading-relaxed font-bold uppercase tracking-tight">
                Last Sync: {new Date().toLocaleTimeString()} UTC
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM BRANDING BAR (Left Logo, Right Socials) */}
        <div className="pt-12 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-10">
          
          {/* LEFT: LOGO & COPYRIGHT */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#0EA5A4] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#0ea5a433]">
                <Activity size={20} />
              </div>
              <span className="text-white font-black tracking-tighter text-3xl uppercase">
                Travelee<span className="text-[#0EA5A4]">.</span>
              </span>
            </div> */}
            <div className="h-px w-8 bg-slate-800 hidden md:block" />
            <p className="text-slate-600 text-[10px] font-black py-4 uppercase tracking-[0.2em] text-center md:text-left">
              © {new Date().getFullYear()} Travelee. {t('footer.rights')}
            </p>
          </div>

          {/* RIGHT: SOCIALS */}
          <div className="flex py-2 items-center gap-3">
            <span className="text-primary-700 text-[9px] font-black uppercase tracking-[0.3em] mr-2 hidden lg:block">Command Centers</span>
            {socialLinks.map(({ Icon, color, hoverBg, href }, idx) => (
              <motion.a
                key={idx}
                href={href}
                whileHover={{ y: -5, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className={`w-12 h-12 rounded-2xl border-primary hover:bg-primary hover:text-white text-primary border  flex items-center justify-center  transition-all duration-300 shadow-sm ${color} ${hoverBg}`}
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;