"use client"

import React, { useState } from 'react';
import Swal from 'sweetalert2';

const AddDestination = () => {
    const [loading, setLoading] = useState(false);
    const IMGBB_API_KEY = process.env.NEXT_PUBLIC_API_IMAGEBB;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target;

        try {
            // ১. ইমেজ হ্যান্ডলিং
            const imageFiles = Array.from(form.images.files);
            if (imageFiles.length === 0) {
                throw new Error("Please select at least one image.");
            }

            const imageUrls = [];
            for (const file of imageFiles) {
                const formData = new FormData();
                formData.append('image', file);
                const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                    method: 'POST',
                    body: formData,
                });
                const data = await res.json();
                if (data.success) imageUrls.push(data.data.url);
            }

            const destinationInfo = {
                country: form.country.value,
                city: form.city.value,
                region: form.region.value,
                coordinates: {
                    latitude: parseFloat(form.lat.value) || 0,
                    longitude: parseFloat(form.lng.value) || 0,
                },
                timezone: form.timezone.value || "UTC+6",
                best_time_to_visit: form.best_time.value,
                currency: form.currency.value,
                languages_spoken: form.languages.value ? form.languages.value.split(',').map(lang => lang.trim()) : ["Bengali"],
                safety_index: parseFloat(form.safety.value) || 0,
                description: form.description.value,
                duration: form.duration.value,
                price: form.price.value,
                popularityScore: parseFloat(form.popularity.value) || 0,
                avgBudget: form.avgBudget.value,
                climate: {
                    avg_temp_c: parseInt(form.avgTemp.value) || 25,
                    rainy_months: form.rainyMonths.value ? form.rainyMonths.value.split(',').map(m => m.trim()) : []
                },
                media: {
                    cover_image: imageUrls[0] || "",
                    gallery: imageUrls,
                },
            };

            const response = await fetch('http://localhost:500/destinations/add-destination', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(destinationInfo),
            });

            if (response.ok) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Destination has been added to the map.',
                    icon: 'success',
                    confirmButtonColor: '#0EA5A4', // Your Primary Teal
                    borderRadius: '1.25rem'
                });
                form.reset();
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error.message || 'Something went wrong',
                icon: 'error',
                confirmButtonColor: '#FF6B6B', // Your Accent Coral
            });
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = "w-full p-3 bg-white border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-muted-foreground text-foreground";
    const labelStyle = "block text-sm font-semibold text-foreground mb-1.5 ml-1";

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-8">
            <div className="bg-white shadow-xl shadow-slate-200/50 border border-slate-100 rounded-[2rem] overflow-hidden">
                <div className="bg-primary p-8 text-white">
                    <h2 className="text-3xl font-bold">Add New Destination</h2>
                    <p className="text-primary-foreground/80 mt-1">Create a new travel spot for the world to explore.</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Location Info Section */}
                    <div className="space-y-4 md:col-span-1">
                        <h3 className="text-lg font-bold text-primary flex items-center gap-2 border-b pb-2">
                            Basic Details
                        </h3>
                        <div>
                            <label className={labelStyle}>City Name</label>
                            <input name="city" placeholder="e.g. Saint Martin" className={inputStyle} required />
                        </div>
                        <div>
                            <label className={labelStyle}>Country</label>
                            <input name="country" placeholder="e.g. Bangladesh" className={inputStyle} required />
                        </div>
                        <div>
                            <label className={labelStyle}>Region</label>
                            <input name="region" placeholder="e.g. Chittagong" className={inputStyle} required />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className={labelStyle}>Lat</label>
                                <input name="lat" type="number" step="any" placeholder="20.62" className={inputStyle} required />
                            </div>
                            <div>
                                <label className={labelStyle}>Lng</label>
                                <input name="lng" type="number" step="any" placeholder="92.32" className={inputStyle} required />
                            </div>
                        </div>
                    </div>

                    {/* Logistics Section */}
                    <div className="space-y-4 md:col-span-1">
                        <h3 className="text-lg font-bold text-primary flex items-center gap-2 border-b pb-2">
                            Travel Logistics
                        </h3>
                        <div>
                            <label className={labelStyle}>Best Time to Visit</label>
                            <input name="best_time" placeholder="Nov to Feb" className={inputStyle} required />
                        </div>
                        <div>
                            <label className={labelStyle}>Duration & Price</label>
                            <div className="grid grid-cols-2 gap-3">
                                <input name="duration" placeholder="2-3 Days" className={inputStyle} required />
                                <input name="price" placeholder="$150-250" className={inputStyle} required />
                            </div>
                        </div>
                        <div>
                            <label className={labelStyle}>Avg Daily Budget</label>
                            <input name="avgBudget" placeholder="$40-70/day" className={inputStyle} required />
                        </div>
                        <div>
                            <label className={labelStyle}>Currency & Timezone</label>
                            <div className="grid grid-cols-2 gap-3">
                                <input name="currency" placeholder="BDT" className={inputStyle} required />
                                <input name="timezone" defaultValue="UTC+6" className={inputStyle} required />
                            </div>
                        </div>
                    </div>

                    {/* Scores & Extra Info */}
                    <div className="space-y-4 md:col-span-1">
                        <h3 className="text-lg font-bold text-primary flex items-center gap-2 border-b pb-2">
                            Atmosphere
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className={labelStyle}>Safety Index</label>
                                <input name="safety" type="number" step="any" placeholder="8.5" className={inputStyle} required />
                            </div>
                            <div>
                                <label className={labelStyle}>Popularity</label>
                                <input name="popularity" type="number" step="any" placeholder="9.0" className={inputStyle} required />
                            </div>
                        </div>
                        <div>
                            <label className={labelStyle}>Languages (comma separated)</label>
                            <input name="languages" placeholder="Bengali, English" className={inputStyle} required />
                        </div>
                        <div>
                            <label className={labelStyle}>Climate (Temp & Rainy Months)</label>
                            <div className="grid grid-cols-2 gap-3">
                                <input name="avgTemp" type="number" placeholder="27°C" className={inputStyle} required />
                                <input name="rainyMonths" placeholder="June, July" className={inputStyle} required />
                            </div>
                        </div>
                    </div>

                    {/* Description & Media - Full Width */}
                    <div className="md:col-span-3 space-y-4 mt-4">
                        <h3 className="text-lg font-bold text-primary flex items-center gap-2 border-b pb-2">
                            Media & Content
                        </h3>
                        <div>
                            <label className={labelStyle}>Description</label>
                            <textarea name="description" placeholder="Describe the beauty of this place..." className={`${inputStyle} h-32 resize-none`} required ></textarea>
                        </div>

                        <div className="p-6 border-2 border-dashed border-muted rounded-[1.25rem] bg-slate-50 hover:bg-slate-100/50 transition-colors">
                            <label className="block text-center cursor-pointer">
                                <span className="text-primary font-bold">Click to upload images</span>
                                <span className="block text-xs text-muted-foreground mt-1">First image will be set as Cover Image</span>
                                <input name="images" type="file" multiple className="hidden" accept="image/*" required />
                            </label>
                        </div>
                    </div>

                    <div className="md:col-span-3 pt-6">
                        <button
                            disabled={loading}
                            className={`w-full py-4 rounded-2xl text-white font-bold text-lg shadow-lg transition-all transform active:scale-[0.98] ${loading
                                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                                    : "bg-primary hover:bg-primary/90 hover:shadow-primary/20 shadow-xl"
                                }`}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    Uploading Assets...
                                </span>
                            ) : "Publish Destination"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddDestination;