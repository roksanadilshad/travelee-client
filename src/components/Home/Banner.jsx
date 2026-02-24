"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Plane, Wallet, Users } from "lucide-react";
import Search from '../Share/Search';
import TrainProgress from './TrainProgress';
import { useLanguage } from '@/context/LanguageContext';

const Banner = () => {
    const { t, lang } = useLanguage(); // Pull lang to trigger updates
    const [index, setIndex] = useState(0);
    const [isSearching, setIsSearching] = useState(false);

    // FIX: Memoize slide data so it updates when 'lang' or 't' changes
    const SLIDE_DATA = useMemo(() => [
        {
            id: 1,
            tag: t("banner.tag1"),
            title: t("banner.title1"),
            highlight: t("banner.high1"),
            desc: t("banner.desc1"),
            img: "https://i.pinimg.com/736x/1f/03/2d/1f032d2b0c99fd6a557cbd5f544b28fe.jpg",
            icon: <Plane className="w-4 h-4" />
        },
        {
            id: 2,
            tag: t("banner.tag2"),
            title: t("banner.title2"),
            highlight: t("banner.high2"),
            desc: t("banner.desc2"),
            img: "https://i.pinimg.com/736x/df/2f/e4/df2fe47e52d97de344bcf19b45be34ec.jpg",
            icon: <Wallet className="w-4 h-4" />
        },
        {
            id: 3,
            tag: t("banner.tag3"),
            title: t("banner.title3"),
            highlight: t("banner.high3"),
            desc: t("banner.desc3"),
            img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1350&q=80",
            icon: <Users className="w-4 h-4" />
        },
        {
            id: 4,
            tag: t("banner.tag3"), // Reusing tag3/desc3 keys as per your original logic
            title: t("banner.title3"),
            highlight: t("banner.high3"),
            desc: t("banner.desc3"),
            img: "https://i.pinimg.com/1200x/02/16/6c/02166ccb651bd36ee400d44f030fb78a.jpg",
            icon: <Users className="w-4 h-4" />
        },
    ], [t, lang]);

    // Mouse Parallax Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useSpring(x, { stiffness: 50, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 50, damping: 20 });

    const bgX = useTransform(mouseX, [-500, 500], [20, -20]);
    const bgY = useTransform(mouseY, [-500, 500], [20, -20]);

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        x.set(clientX - innerWidth / 2);
        y.set(clientY - innerHeight / 2);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            if (!isSearching) {
                setIndex((prev) => (prev + 1) % SLIDE_DATA.length);
            }
        }, 6000);
        return () => clearInterval(timer);
    }, [isSearching, SLIDE_DATA.length]);

    return (
        <section 
            onMouseMove={handleMouseMove}
            className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden bg-black"
        >
            {/* 1. IMMERSIVE BACKGROUND LAYER */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    style={{ x: bgX, y: bgY, scale: 1.1 }}
                    initial={{ opacity: 0, filter: "brightness(0.2) blur(10px)" }}
                    animate={{ 
                        opacity: 1, 
                        filter: isSearching 
                            ? "brightness(0.3) blur(15px)"
                            : "brightness(0.5) blur(0px)"
                    }}
                    exit={{ opacity: 0, filter: "blur(20px)" }}
                    transition={{ duration: 1.2 }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src={SLIDE_DATA[index].img}
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
                </motion.div>
            </AnimatePresence>

            {/* 2. CONTENT LAYER */}
            <div className="relative z-10 w-11/12 max-w-5xl mx-auto text-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        // FIX: Key includes 'lang' so text refreshes on toggle
                        key={`${index}-${lang}`}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col items-center space-y-6"
                    >
                        {/* Glass Badge */}
                        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-[10px] uppercase tracking-[0.3em]">
                            {SLIDE_DATA[index].icon}
                            {SLIDE_DATA[index].tag}
                        </div>

                        {/* Immersive Typography */}
                        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none">
                            {SLIDE_DATA[index].title} <br />
                            <span className="text-[#0EA5A4] drop-shadow-[0_0_30px_rgba(14,165,164,0.5)]">
                                {SLIDE_DATA[index].highlight}
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-white/70 max-w-2xl font-medium leading-relaxed">
                            {SLIDE_DATA[index].desc}
                        </p>
                    </motion.div>
                </AnimatePresence>

                {/* 3. FLOATING GLASS SEARCH BAR */}
                <motion.div 
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    onFocusCapture={() => setIsSearching(true)}
                    onBlurCapture={() => setIsSearching(false)}
                    className="mt-12 w-full max-w-3xl mx-auto drop-shadow-2xl"
                >
                    <div className="bg-white/5 backdrop-blur-2xl p-2 rounded-[2.5rem] border border-white/10 shadow-2xl">
                        <Search />
                    </div>
                </motion.div>
            </div>

            {/* 4. INDUSTRIAL PROGRESS TRACKER */}
            <div className="absolute bottom-10 left-0 w-full px-10">
                <TrainProgress index={index} duration={6}/>
            </div>

            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.8)] z-0" />
        </section>
    );
};

export default Banner;