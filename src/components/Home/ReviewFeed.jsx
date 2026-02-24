"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaCheckCircle, FaQuoteLeft, FaClock } from 'react-icons/fa';
import axios from 'axios';
import { useLanguage } from '@/context/LanguageContext'; // IMPORT

const ReviewFeed = () => {
  const { t, language } = useLanguage(); // INITIALIZE
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get("http://localhost:500/reviews");
        setReviews(res.data);
      } catch (err) {
        console.error("Critical: Could not sync reviews", err);
      }
    };
    fetchReviews();
  }, []);

  return (
   <section className="py-24 bg-[#F8FAFC]">
      <div className="container mx-auto px-6">
        {/* SECTION HEADER */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-[#0EA5A4] font-black uppercase tracking-[0.4em] text-[10px] mb-2 block">
              {t('review.badge')}
            </span>
            <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">
              {t('review.title')} <span className="text-slate-400 italic">{t('review.subtitle')}</span>
            </h2>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
              {t('review.displaying')}
            </p>
            <p className="text-2xl font-black text-slate-900 tabular-nums">
              03 <span className="text-[#0EA5A4]">/ {reviews.length}</span>
            </p>
          </div>
        </div>

        {/* MASONRY GRID - LIMITED TO 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.slice(0, 3).map((review, idx) => (
            <motion.div
              key={review._id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm hover:shadow-xl transition-all duration-500 group flex flex-col"
            >
              {/* USER META */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img 
                      src={review.user?.avatar || `https://ui-avatars.com/api/?name=${review.user?.name}`} 
                      className="w-10 h-10 rounded-full object-cover border border-slate-100" 
                      alt="User" 
                    />
                    <FaCheckCircle className="absolute -bottom-1 -right-1 text-[#0EA5A4] bg-white rounded-full p-0.5" size={14} title={t('review.verified')} />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-tight">{review.user?.name}</h4>
                    <div className="flex gap-0.5">
                       {[...Array(5)].map((_, i) => (
                         <FaStar key={i} size={8} className={i < review.rating ? "text-[#0EA5A4]" : "text-slate-200"} />
                       ))}
                     </div>
                  </div>
                </div>
                <span className="text-[8px] font-mono text-slate-300">#{t('review.id_prefix')}-{idx + 102}</span>
              </div>

              {/* REVIEW TEXT */}
              <div className="relative mb-6 flex-grow">
                <FaQuoteLeft className="text-slate-50 absolute -top-3 -left-2 text-3xl -z-0" />
                <p className="relative z-10 text-slate-600 text-[13px] leading-relaxed italic line-clamp-4">
                  "{review.comment}"
                </p>
              </div>

              {/* MINI IMAGE THUMBNAILS */}
              {review.images && review.images.length > 0 && (
                <div className="flex gap-2 mb-6">
                  {review.images.slice(0, 3).map((img, i) => (
                    <div key={i} className="relative w-12 h-12 rounded-lg overflow-hidden border border-slate-100 grayscale hover:grayscale-0 transition-all">
                       <img src={img} className="object-cover w-full h-full" alt="evidence" />
                    </div>
                  ))}
                  {review.images.length > 3 && (
                    <div className="w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center text-[10px] font-black text-slate-400">
                      +{review.images.length - 3}
                    </div>
                  )}
                </div>
              )}

              {/* FOOTER */}
              <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
                <div className="flex items-center gap-2 text-slate-400">
                  <FaClock size={10} />
                  <span className="text-[9px] font-bold uppercase tracking-widest">
                    {/* Locale-aware date formatting */}
                    {new Date(review.date).toLocaleDateString(language === 'BN' ? 'bn-BD' : 'en-US')}
                  </span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-[#0EA5A4]" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* VIEW ALL CTA */}
        <div className="mt-12 text-center">
            <button className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] hover:text-[#0EA5A4] transition-colors">
              {t('review.archive')} ({reviews.length})
            </button>
        </div>
      </div>
    </section>
  );
};

export default ReviewFeed;