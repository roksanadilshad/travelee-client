"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Lottie from 'lottie-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Search, Thermometer, Wind, Droplets } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const WeatherBlock = () => {
  const [city, setCity] = useState("Phuket");
  const [searchInput, setSearchInput] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Pull t and convertToEnglish from our custom context
  const { t, convertToEnglish } = useLanguage();

  const lottieUrls = {
    sun: "https://lottie.host/88029a73-311a-4f51-872e-33309990b795/vD60C14iBf.json",
    rain: "https://lottie.host/805167b0-8173-45c1-8408-0f04c7d020d5/rain.json",
    clouds: "https://lottie.host/4a58b29c-3644-482c-b24f-a931a7f05f88/clouds.json"
  };

  const fetchWeather = async (queryCity) => {
    setLoading(true);
    try {
      const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${queryCity}&units=metric&appid=${API_KEY}`
      );
      setWeather(res.data);
    } catch (err) {
      console.error("Fetch Error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchWeather(city); }, []);

  // src/components/Home/WeatherBlock.jsx

const handleSearch = (e) => {
  e.preventDefault();
  
  const trimmedInput = searchInput.trim();
  
  if (trimmedInput) {
    // 1. Convert Bangla to English
    const apiQuery = convertToEnglish(trimmedInput); 
    
    // 2. Simple Regex check: If the string still contains non-ASCII characters (Bangla), 
    // it means it's not in our map and the API will 404.
    const hasNonAscii = /[^\x00-\x7F]+/.test(apiQuery);
    
    if (hasNonAscii) {
      alert("Please search in English or use supported Bangla city names.");
      return;
    }

    setCity(apiQuery);
    fetchWeather(apiQuery);
    setSearchInput("");
  }
};

  const getDynamicStyles = () => {
    if (!weather) return { img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b", overlay: "bg-slate-900/60" };
    const temp = weather.main.temp;
    const condition = weather.weather[0].main;
    if (condition === "Rain") return { img: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17", overlay: "bg-blue-900/70" };
    if (temp > 30) return { img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e", overlay: "bg-orange-900/40" };
    return { img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb", overlay: "bg-slate-900/50" };
  };

  const styles = getDynamicStyles();

  // RECOMMENDED: Mapping the metrics to keep the JSX clean and easy to translate
  const metrics = weather ? [
    { icon: <Thermometer size={18}/>, label: t('feelsLike'), value: `${Math.round(weather.main.feels_like)}°C` },
    { icon: <Wind size={18}/>, label: t('windSpeed'), value: `${weather.wind.speed} m/s` },
    { icon: <Droplets size={18}/>, label: t('humidity'), value: `${weather.main.humidity}%` }
  ] : [];

  return (
    <section className="relative min-h-[600px] flex items-center justify-center py-20 overflow-hidden transition-all duration-1000">
      <div className="absolute inset-0 z-0" style={{ backgroundImage: `url('${styles.img}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <div className={`absolute inset-0 z-10 ${styles.overlay}`} />

      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-4xl mx-auto">
          
          <form onSubmit={handleSearch} className="mb-12 relative max-w-md mx-auto">
            <input 
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl py-4 px-6 text-white placeholder:text-white/50 focus:outline-none"
            />
            <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-[#0EA5A4] transition-colors">
              <Search size={20} />
            </button>
          </form>

          <AnimatePresence mode="wait">
            {!loading && weather && (
              <motion.div 
                key={weather.name}
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white/10 backdrop-blur-xl rounded-[3rem] p-8 md:p-12 border border-white/10 shadow-2xl"
              >
                <div className="text-center md:text-left border-b md:border-b-0 md:border-r border-white/10 pb-8 md:pb-0">
                  <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                    <MapPin className="text-[#0EA5A4]" size={24} />
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
                      {t(weather.name)}
                    </h2>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-6">
                    <h1 className="text-8xl font-black text-white tracking-tighter">{Math.round(weather.main.temp)}°</h1>
                    <div className="w-24 h-24">
                      <Lottie 
                        path={weather.weather[0].main === 'Clear' ? lottieUrls.sun : weather.weather[0].main === 'Rain' ? lottieUrls.rain : lottieUrls.clouds} 
                        loop={true} 
                      />
                    </div>
                  </div>
                  <p className="text-[#0EA5A4] font-bold uppercase tracking-[0.3em] text-xs mt-2">
                    {t(weather.weather[0].description)}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {/* Map over our metrics array */}
                  {metrics.map((m, idx) => (
                    <MetricCard key={idx} icon={m.icon} label={m.label} value={m.value} />
                  ))}
                  
                  {/* Status Card */}
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <div className="w-4 h-4 rounded-full bg-[#0EA5A4] animate-pulse mb-2" />
                    <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">{t('syncStatus')}</p>
                    <p className="text-xl font-black text-white uppercase">{t('live')}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

// Reusable Sub-component
const MetricCard = ({ icon, label, value }) => (
  <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-white">
    <div className="text-white/40 mb-2">{icon}</div>
    <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">{label}</p>
    <p className="text-xl font-black">{value}</p>
  </div>
);

export default WeatherBlock;