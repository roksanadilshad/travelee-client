"use client";

import React, { useEffect, useState, useMemo } from 'react';
import {
    TrendingUp, MapPin, DollarSign,
    ChevronLeft, ChevronRight, RefreshCw,
    Search, FileText, ArrowRight
} from "lucide-react";

const RevenuePage = () => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const fetchTrips = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/trip`);
            const result = await res.json();
            if (result.success) {
                setTrips(result.data);
            }
        } catch (error) {
            console.error("Fetch Error:", error);
        } finally {
            setTimeout(() => setLoading(false), 500);
        }
    };

    useEffect(() => {
        fetchTrips();
    }, []);

    const filteredTrips = useMemo(() => {
        return trips.filter(trip =>
            trip.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            trip.country?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [trips, searchTerm]);

    const totalPages = Math.ceil(filteredTrips.length / itemsPerPage);
    const currentItems = filteredTrips.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const getPageNumbers = () => {
        const pages = [];
        if (totalPages <= 3) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage === 1) {
                pages.push(1, 2, 3);
            } else if (currentPage === totalPages) {
                pages.push(totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(currentPage - 1, currentPage, currentPage + 1);
            }
        }
        return pages;
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-4 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header Section */}
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary rounded-xl shadow-lg shadow-primary/20">
                                <TrendingUp className="text-white w-6 h-6" />
                            </div>
                            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Revenue Analytics</h1>
                        </div>
                        <p className="text-slate-500 font-medium">Monitor your travel earnings and trip statuses.</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={fetchTrips}
                            className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all shadow-sm active:scale-95"
                        >
                            <RefreshCw size={20} className={`${loading ? "animate-spin text-primary" : "text-slate-600"}`} />
                        </button>
                    </div>
                </header>

                {/* Filters and Stats */}
                <div className="flex flex-col lg:flex-row gap-4 items-center">
                    <div className="w-full lg:flex-1 relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Search by city or country..."
                            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-slate-700 font-medium placeholder:text-slate-400"
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                        />
                    </div>
                    <div className="w-full lg:w-72 flex items-center justify-between px-6 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
                        <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Total Records</span>
                            <span className="text-2xl font-black text-slate-800">{filteredTrips.length} <span className="text-sm font-normal text-slate-400">trips</span></span>
                        </div>
                        <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                            <FileText size={24} />
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="space-y-4">
                    {loading ? (
                        Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="h-32 w-full bg-white rounded-3xl animate-pulse border border-slate-100" />
                        ))
                    ) : currentItems.length > 0 ? (
                        <div className="grid gap-6">
                            {currentItems.map((trip) => (
                                <div
                                    key={trip._id}
                                    className="group bg-white rounded-[2rem] shadow-sm border border-slate-200 flex flex-col md:flex-row items-stretch overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 hover:border-primary/30 transition-all duration-300"
                                >
                                    {/* Location Section */}
                                    <div className="p-6 md:w-1/3 flex items-center gap-4 bg-slate-50/50">
                                        <div className="relative shrink-0">
                                            <img
                                                src={trip.media?.cover_image || 'https://via.placeholder.com/150'}
                                                alt={trip.city}
                                                className="w-20 h-20 rounded-2xl object-cover ring-4 ring-white shadow-md group-hover:scale-105 transition-transform"
                                            />
                                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 border-4 border-white rounded-full"></div>
                                        </div>
                                        <div className="overflow-hidden">
                                            <h3 className="font-bold text-xl text-slate-800 truncate">{trip.city}</h3>
                                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                                                <MapPin size={12} className="text-primary" /> {trip.country}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Timeline Section */}
                                    <div className="flex-1 flex items-center justify-between px-8 py-6 border-y md:border-y-0 md:border-x border-slate-100 relative">
                                        <div className="text-left">
                                            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Departure</p>
                                            <p className="text-base font-bold text-slate-700">
                                                {new Date(trip.startDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                            </p>
                                            <span className="text-[11px] text-primary font-bold">START</span>
                                        </div>

                                        <div className="flex flex-col items-center gap-1">
                                            <ArrowRight className="text-slate-200" size={20} />
                                            <span className="text-[10px] font-bold text-slate-300 bg-slate-50 px-2 py-0.5 rounded-full">{trip.duration} Days</span>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Arrival</p>
                                            <p className="text-base font-bold text-slate-700">
                                                {new Date(trip.endDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                            </p>
                                            <span className="text-[11px] text-slate-400 font-medium">END</span>
                                        </div>
                                    </div>

                                    {/* Revenue Section */}
                                    <div className="p-6 md:w-56 bg-slate-50/30 flex flex-row md:flex-col items-center justify-between md:justify-center gap-2">
                                        <div className="text-left md:text-center">
                                            <p className="text-[10px] uppercase font-bold text-slate-400">Total Revenue</p>
                                            <div className="flex items-center md:justify-center">
                                                <DollarSign size={20} className="text-primary" />
                                                <span className="text-3xl font-black text-slate-800 tracking-tighter">{trip.totalCost}</span>
                                            </div>
                                            <div className="mt-2 text-center">
                                                <span className={`inline-block text-[10px] px-3 py-1 rounded-lg font-black uppercase tracking-wider border ${trip.status === 'paid'
                                                    ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                                    : 'bg-amber-50 text-amber-600 border-amber-100'
                                                    }`}>
                                                    {trip.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-24 bg-white rounded-[2rem] border border-slate-200">
                            <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FileText className="w-8 h-8 text-slate-300" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-700">No Records Found</h3>
                            <p className="text-sm text-slate-400">Try adjusting your search or add new trip data.</p>
                        </div>
                    )}
                </div>

                {/* PAGINATION SECTION */}
                {totalPages > 1 && (
                    <div className="px-8 py-6 bg-white rounded-[2rem] border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
                            Page {currentPage} <span className="text-slate-200 mx-2">|</span> {filteredTrips.length} Trips
                        </span>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:border-primary hover:text-primary disabled:opacity-30 transition-all shadow-sm"
                            >
                                <ChevronLeft size={18} />
                            </button>

                            <div className="flex items-center gap-1.5 mx-2">
                                {getPageNumbers().map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        className={`w-10 h-10 rounded-xl font-bold text-xs transition-all ${currentPage === page
                                            ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-110'
                                            : 'bg-white text-slate-500 border border-slate-200 hover:border-primary/50'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:border-primary hover:text-primary disabled:opacity-30 transition-all shadow-sm"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RevenuePage;