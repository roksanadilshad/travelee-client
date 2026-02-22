"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaSearch, FaStar } from "react-icons/fa";

const FilterAndSearch = () => {
    const router = useRouter();

    const [keyword, setKeyword] = useState("");
    const [duration, setDuration] = useState("Any");
    const [month, setMonth] = useState("Any");
    const [budget, setBudget] = useState("");
    const [rating, setRating] = useState(0);


    const handleSearch = () => {
        const params = new URLSearchParams();

        if (keyword) params.append("city", keyword);
        if (duration !== "Any") params.append("duration", duration);
        if (month !== "Any") params.append("month", month);
        if (budget) params.append("budget", budget);
        if (rating) params.append("rating", rating);

        router.push(`/destinations?${params.toString()}`);
    };


    const handleClear = () => {
        setKeyword("");
        setDuration("Any");
        setMonth("Any");
        setBudget("");
        setRating(0);
        router.replace("/destinations");
    };

    return (
        <div className="sticky top-6">
            <div className="w-full bg-white/80 backdrop-blur rounded-lg shadow-lg p-6 space-y-6 border">

                {/* Header */}
                <div>
                    <h3 className="text-xl font-bold">Search & Filter</h3>
                    <p className="text-sm text-gray-500">
                        Find your perfect destination
                    </p>
                </div>

                <div className="h-px bg-gray-200" />

                {/* Keywords */}
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Keywords
                    </label>
                    <div className="relative">
                        <input
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            type="text"
                            placeholder="City, country..."
                            className="w-full rounded-full border px-5 py-3 pr-12 outline-none focus:ring-2 focus:ring-orange-400"
                        />
                        <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                {/* Duration */}
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Duration
                    </label>
                    <select
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="w-full rounded-full border px-5 py-3"
                    >
                        <option value="Any">Any</option>
                        <option value="1-3 days">1-3 Days</option>
                        <option value="4-7 days">4-7 Days</option>
                        <option value="7+ days">7+ Days</option>
                    </select>
                </div>

                {/* Month */}
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Month <span className="text-xs text-gray-500 mt-1">(Best Time to Visit)</span>
                    </label>
                    <select
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        className="w-full rounded-full border px-5 py-3"
                    >
                        <option value="Any">Any</option>
                        <option value="january">January</option>
                        <option value="february">February</option>
                        <option value="march">March</option>
                        <option value="april">April</option>
                        <option value="may">May</option>
                        <option value="june">June</option>
                        <option value="july">July</option>
                        <option value="august">August</option>
                        <option value="september">September</option>
                        <option value="october">October</option>
                        <option value="november">November</option>
                        <option value="december">December</option>
                    </select>
                </div>

                {/* Price */}
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Your Budget (per person)
                    </label>
                    <div className="relative">
                        <input
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                            type="number"
                            placeholder="e.g. 1500"
                            className="w-full rounded-full border px-5 py-3 pl-10 outline-none focus:ring-2 focus:ring-orange-400"
                        />
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                        We will show destinations where your budget fits the range
                    </p>
                </div>

                {/* Rating */}
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Minimum Rating
                    </label>
                    <div className="flex items-center gap-1 text-lg">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(star => (
                            <FaStar
                                key={star}
                                onClick={() => setRating(star)}
                                className={`cursor-pointer transition ${star <= rating ? "text-orange-400" : "text-gray-300"
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                    <button
                        onClick={handleSearch}
                        className="flex-1 rounded-full bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600 transition"
                    >
                        Apply
                    </button>
                    <button
                        onClick={handleClear}
                        className="flex-1 rounded-full border py-3 font-medium text-gray-600 hover:bg-gray-100 transition"
                    >
                        Clear
                    </button>
                </div>

            </div>
        </div>

    );
};

export default FilterAndSearch;
