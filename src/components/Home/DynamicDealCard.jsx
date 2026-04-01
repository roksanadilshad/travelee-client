"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

const DynamicDealCard = () => {
  const [deal, setDeal] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isClient, setIsClient] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/active-deal`)
      .then(res => res.json())
      .then(result => {
        if (result.success) setDeal(result.data);
      })
      .catch(err => console.error("Deal fetch error:", err));
  }, []);

  useEffect(() => {
    if (!deal) return;
    const timer = setInterval(() => {
      const difference = new Date(deal.expiryDate) - new Date();
      if (difference <= 0) {
        clearInterval(timer);
      } else {
        setTimeLeft({
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [deal]);

  if (!isClient || !deal) return null;

  const occupancyPercent = (deal.spotsTaken / deal.totalSpots) * 100;

const handleClaimDeal = async () => {
  setIsBooking(true);
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/claim-deal`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
   if (!response.ok) {
  const errorText = await response.text();
  console.error("Server Error:", errorText);
  return;
}
const result = await response.json();

    if (result.success) {
      // Create a deal object to save
      const userDeal = {
        discountType: "FLASH40",
        percentage: 40,
        expiry: deal.expiryDate, // From your backend
        destination: deal.destination,
        appliedAt: new Date().getTime()
      };

      // Save to LocalStorage
      localStorage.setItem('travelee_active_deal', JSON.stringify(userDeal));
      
      setIsBooked(true);
      
      // Optional: Show a "Discount Applied!" toast instead of immediate redirect
      setTimeout(() => {
        router.push('/destinations'); // Take them to see all trips
      }, 1500);
    }
  } catch (err) {
    console.error("Deal Save Error:", err);
  } finally {
    setIsBooking(false);
  }
};

  return (
    <section className="relative w-full py-16 px-4 flex justify-center overflow-hidden bg-background">
      {/* Dynamic Background Glows using your Primary/Accent colors */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-primary rounded-full mix-blend-multiply filter blur-[100px] opacity-10"></div>
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-accent rounded-full mix-blend-multiply filter blur-[100px] opacity-10"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative w-full max-w-5xl rounded-radius p-[1px] bg-gradient-to-br from-border to-transparent shadow-xl"
      >
        {/* Main Glass Container */}
        <div className="relative overflow-hidden bg-white/40 backdrop-blur-xl rounded-radius p-8 md:p-12 border border-white/20">
          
          {/* Framer Motion Shimmer */}
          <motion.div
            className="absolute inset-0 z-0 pointer-events-none"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ repeat: Infinity, duration: 6, ease: "linear", repeatDelay: 3 }}
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
              width: '40%',
            }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wider">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                Limited Deal
              </div>
              
              <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">
                Escape to <span className="text-primary">{deal.destination}</span>
              </h2>
              
              <p className="text-muted-foreground text-lg max-w-md mx-auto lg:mx-0">
                Exclusive <span className="font-bold text-foreground">{deal.discount} discount</span> for the next few hours. Experience luxury like never before.
              </p>

              {/* Progress Bar Component */}
              <div className="space-y-3 pt-4">
                <div className="flex justify-between text-sm font-semibold">
                  <span className="text-muted-foreground uppercase tracking-tighter">Availability</span>
                  <span className="text-accent">{deal.totalSpots - deal.spotsTaken} Spots Remaining</span>
                </div>
                <div className="w-full bg-muted h-3 rounded-full overflow-hidden border border-border">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${occupancyPercent}%` }}
                    transition={{ duration: 2, ease: "circOut" }}
                    className="h-full bg-primary"
                  />
                </div>
              </div>
            </div>

            {/* Right Content: Timer Box */}
            <div className="flex flex-col items-center lg:items-end justify-center">
              <div className="bg-foreground p-8 rounded-radius shadow-2xl transform lg:rotate-2 hover:rotate-0 transition-transform duration-500">
                <p className="text-muted-foreground text-center text-xs uppercase mb-4 tracking-[0.2em]">Ends In</p>
                <div className="flex gap-4">
                  {Object.entries(timeLeft).map(([label, value]) => (
                    <div key={label} className="text-center">
                      <div className="text-4xl md:text-5xl font-mono font-bold text-white tabular-nums">
                        {value.toString().padStart(2, '0')}
                      </div>
                      <div className="text-[10px] text-primary font-bold uppercase mt-1">{label}</div>
                    </div>
                  ))}
                </div>
                <button 
  onClick={handleClaimDeal}
  disabled={isBooking || isBooked}
  className={`w-full mt-8 py-4 px-6 font-bold rounded-xl transition-all duration-300 relative overflow-hidden flex items-center justify-center
    ${isBooked 
      ? 'bg-green-500 text-white cursor-default' 
      : 'bg-primary hover:bg-primary/90 text-primary-foreground active:scale-95 shadow-lg shadow-primary/20'
    } ${isBooking ? 'opacity-80 cursor-wait' : ''}`}
>
  <AnimatePresence mode="wait">
    {isBooking ? (
      <motion.div
        key="loading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex items-center gap-2"
      >
        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>Processing...</span>
      </motion.div>
    ) : isBooked ? (
      <motion.span
        key="success"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-2"
      >
        ✓ Deal Secured!
      </motion.span>
    ) : (
      <motion.span key="idle">Claim Deal Now</motion.span>
    )}
  </AnimatePresence>
</button>
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default DynamicDealCard;