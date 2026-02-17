import React from "react";
import { FaSearch, FaStar } from "react-icons/fa";
import { MdOutlineCalendarToday } from "react-icons/md";

const FilterAndSearch = () => {
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

                {/* Divider */}
                <div className="h-px bg-gray-200" />

                {/* Keywords */}
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Keywords
                    </label>
                    <div className="relative">
                        <input
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
                    <select className="w-full rounded-full border px-5 py-3">
                        <option>Any</option>
                        <option>1-3 Days</option>
                        <option>4-7 Days</option>
                        <option>7+ Days</option>
                    </select>
                </div>

                {/* Date */}
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Date
                    </label>
                    <div className="relative">
                        <input
                            type="date"
                            className="w-full rounded-full border px-5 py-3 pl-12"
                        />
                        <MdOutlineCalendarToday className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                {/* Month */}
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Month
                    </label>
                    <select className="w-full rounded-full border px-5 py-3">
                        <option>Any</option>
                        <option>January</option>
                        <option>February</option>
                        <option>March</option>
                        <option>April</option>
                    </select>
                </div>

                {/* Price */}
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Budget Range
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                        <input
                            type="number"
                            placeholder="Min $"
                            className="w-full rounded-full border px-4 py-3"
                        />
                        <input
                            type="number"
                            placeholder="Max $"
                            className="w-full rounded-full border px-4 py-3"
                        />
                    </div>
                </div>

                {/* Rating */}
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Minimum Rating
                    </label>
                    <div className="flex items-center gap-1 text-orange-400 text-lg">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar className="text-gray-300" />
                        <span className="text-sm text-gray-500 ml-2">
                            & up
                        </span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                    <button className="flex-1 rounded-full bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600 transition">
                        Apply
                    </button>
                    <button className="flex-1 rounded-full border py-3 font-medium text-gray-600 hover:bg-gray-100 transition">
                        Clear
                    </button>
                </div>

            </div>
        </div>
    );
};

export default FilterAndSearch;
