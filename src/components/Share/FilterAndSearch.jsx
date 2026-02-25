"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { FaSearch, FaStar, FaRegClock, FaMoneyBillWave, FaSortAmountDown } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";

const FilterAndSearch = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { t } = useLanguage();

    const [keyword, setKeyword] = useState(searchParams.get("city") || "");
    const [duration, setDuration] = useState(searchParams.get("duration") || "Any");
    const [budget, setBudget] = useState(searchParams.get("budget") || "");
    const [rating, setRating] = useState(Number(searchParams.get("rating")) || 0);
    const [sort, setSort] = useState(searchParams.get("sort") || "");

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (keyword) params.append("city", keyword);
        if (duration !== "Any") params.append("duration", duration);
        if (budget) params.append("budget", budget);
        if (rating) params.append("rating", rating);
        if (sort) params.append("sort", sort);
        router.push(`/destinations?${params.toString()}`);
    };

    const handleClear = () => {
        setKeyword(""); setDuration("Any"); setBudget(""); setRating(0); setSort("");
        router.replace("/destinations");
    };

    return (
        <div className="sticky top-24">
            <div className="w-full bg-white border border-[#CBD5E1] rounded-2xl shadow-xl shadow-slate-200/50 p-6 space-y-7">
                
                {/* Header Section */}
                <div className="border-l-4 border-[#0EA5A4] pl-4">
                    <h3 className="text-xl font-black italic uppercase tracking-tighter text-[#1E293B]">
                        {t("filter.title")}
                    </h3>
                    <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">
                        {t("dest.hub_subtitle")}
                    </p>
                </div>

                <div className="space-y-5">
                    {/* Search Field */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[#64748B] flex items-center gap-2">
                            <FaSearch className="text-[#0EA5A4]" /> {t("filter.search_placeholder")}
                        </label>
                        <input
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            type="text"
                            placeholder="e.g. Luang Prabang"
                            className="w-full rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] px-5 py-3 outline-none focus:ring-2 focus:ring-[#0EA5A4] transition-all font-semibold text-sm"
                        />
                    </div>

                    {/* Sorting Field */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[#64748B] flex items-center gap-2">
                            <FaSortAmountDown className="text-[#0EA5A4]" /> {t("filter.sort_label")}
                        </label>
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="w-full rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] px-5 py-3 font-bold text-xs appearance-none cursor-pointer hover:border-[#0EA5A4] outline-none"
                        >
                            <option value="">{t("sort.default")}</option>
                            <option value="priceLow">{t("sort.price_low")}</option>
                            <option value="priceHigh">{t("sort.price_high")}</option>
                            <option value="ratingHigh">{t("sort.rating")}</option>
                        </select>
                    </div>

                    {/* Duration Grid */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[#64748B] flex items-center gap-2">
                            <FaRegClock className="text-[#0EA5A4]" /> {t("filter.duration")}
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            {["Any", "1-3 days", "4-7 days", "7+ days"].map((d) => (
                                <button
                                    key={d}
                                    onClick={() => setDuration(d)}
                                    className={`py-2 rounded-lg text-[9px] font-black uppercase border transition-all ${
                                        duration === d 
                                        ? "bg-[#0EA5A4] border-[#0EA5A4] text-white shadow-md" 
                                        : "bg-white border-[#CBD5E1] text-[#64748B] hover:border-[#0EA5A4] hover:text-[#0EA5A4]"
                                    }`}
                                >
                                    {d}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Budget Input */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[#64748B] flex items-center gap-2">
                            <FaMoneyBillWave className="text-[#0EA5A4]" /> {t("filter.budget")}
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0EA5A4] font-black">$</span>
                            <input
                                value={budget}
                                onChange={(e) => setBudget(e.target.value)}
                                type="number"
                                placeholder="Max"
                                className="w-full rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] px-10 py-3 outline-none focus:ring-2 focus:ring-[#0EA5A4] font-black text-sm"
                            />
                        </div>
                    </div>

                    {/* Safety Rating with Coral Accent */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[#64748B] flex items-center gap-2">
                            <FaStar className="text-[#FF6B6B]" /> {t("filter.safety")}
                        </label>
                        <div className="flex justify-between items-center bg-[#F8FAFC] p-3 rounded-xl border border-[#CBD5E1]">
                           <div className="flex gap-1">
                                {[2, 4, 6, 8, 10].map(star => (
                                    <FaStar
                                        key={star}
                                        onClick={() => setRating(star)}
                                        className={`cursor-pointer text-sm transition-all ${star <= rating ? "text-[#FF6B6B]" : "text-[#E2E8F0]"}`}
                                    />
                                ))}
                           </div>
                           <span className="text-[10px] font-black italic text-[#FF6B6B]">{rating}/10</span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 pt-4">
                    <button
                        onClick={handleSearch}
                        className="w-full rounded-xl bg-[#0EA5A4] text-white py-4 font-black uppercase italic tracking-[0.2em] text-xs hover:bg-[#0D9493] transition-all"
                    >
                        {t("search.button")}
                    </button>
                    <button
                        onClick={handleClear}
                        className="w-full rounded-xl border border-[#E2E8F0] text-[#64748B] py-3 text-[9px] font-black uppercase tracking-widest hover:bg-[#F8FAFC]"
                    >
                        {t("filter.clear")}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilterAndSearch;