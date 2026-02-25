"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const heroSlides = [
  {
    city: "Phuket",
    country: "Thailand",
    image: "https://i.pinimg.com/736x/47/dc/bf/47dcbf64ee9ceca1652be1d1f0e94b3f.jpg",
    tagline: "Turquoise waters & vibrant nights",
    price: "Starting at $1200"
  },
  {
    city: "Kyoto",
    country: "Japan",
    image: "https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tagline: "Tradition meets neon future",
    price: "Starting at $1500"
  },
  {
    city: "Santorini",
    country: "Greece",
    image: "https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tagline: "Sunsets over the Aegean blue",
    price: "Starting at $2200"
  }
];

export default function DestinationsHero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent(current === heroSlides.length - 1 ? 0 : current + 1);
  const prevSlide = () => setCurrent(current === 0 ? heroSlides.length - 1 : current - 1);

  return (
    <div className="relative h-[60vh] w-full overflow-hidden rounded-[2.5rem] mb-10 shadow-2xl border border-border/40">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroSlides[current].image})` }}
          />
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />

          {/* Text Content */}
          <div className="absolute inset-0 flex flex-col justify-center px-12 md:px-20">
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-4 max-w-lg"
            >
              <div className="flex items-center gap-2 text-primary">
                <MapPin className="w-4 h-4" />
                <span className="text-xs font-black uppercase tracking-[0.4em]">Featured Node</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none italic">
                {heroSlides[current].city}
              </h2>
              <p className="text-lg font-medium text-muted-foreground">
                {heroSlides[current].tagline}
              </p>
              <div className="flex items-center gap-6 pt-4">
                <Button className="rounded-full px-8 bg-primary text-white font-bold h-12">
                  View Details
                </Button>
                <span className="font-black text-xl tracking-tighter">{heroSlides[current].price}</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute bottom-10 right-10 flex gap-3">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={prevSlide}
          className="rounded-full bg-background/20 backdrop-blur-md border-white/10 hover:bg-background/40"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={nextSlide}
          className="rounded-full bg-background/20 backdrop-blur-md border-white/10 hover:bg-background/40"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </Button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
        {heroSlides.map((_, i) => (
          <div 
            key={i} 
            className={`h-1 rounded-full transition-all duration-500 ${
              current === i ? "w-8 bg-primary" : "w-2 bg-white/30"
            }`} 
          />
        ))}
      </div>
    </div>
  );
}