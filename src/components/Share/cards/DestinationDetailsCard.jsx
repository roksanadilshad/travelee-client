"use client";

import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Clock3,
  Globe,
  Tag,
  ThermometerSun,
  Star,
  ChevronDown,
  Check,
  Calendar,
  Users,
  Clock,
  Share2,
  Heart,
} from "lucide-react";
import Link from "next/link";
import TripReviewsList from "@/components/Reviews/TripReviewList";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "react-toastify";
import { useLanguage } from "@/context/LanguageContext";

const DestinationDetailsCard = ({ destination }) => {
  console.log(destination);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { t } = useLanguage();

  // Duration calculation in days
  let duration = 0;
  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    // Difference in milliseconds
    const diffTime = end - start;
    // Convert to days
    duration = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
  const { user } = useAuth();

const handleAddToMyTrips = async (e) => {
  e.preventDefault();

  if (!user || !user.email) {
    return toast.info("Please login first to save trips 🙏");
  }

  const tripData = {
    destination_id: destination.destination_id || "d2001",
    country: destination.country,
    startDate,
    endDate,
    duration,
    city: destination.city,
    region: destination.region || "",
    media: {
      cover_image: destination.media?.cover_image,
    },
    userEmail: user?.email ?? "",
    userName: user?.name,
  };

  if (!tripData.userEmail) {
    return toast.info("Please login first to save trips 🙏");
  }

  try {
    const res = await fetch("https://travelee-server.vercel.app/my-trips", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(tripData),
    });

    const data = await res.json();

    if (!res.ok) {
      return toast.error(data.message || "Failed to save trip");
    }

    toast.success("Trip added to My Trips! ✅");
  } catch (err) {
    console.error(err);
    toast.error(err.message || "Failed to save trip");
  }
};

  return (
    <div className=" bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <section className="relative">

        <div className="grid   lg:grid-cols-3 gap-8 items-start">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-gray-500 mb-4"
            >
              Home / Destinations / {destination.city}
            </motion.div>

            {/* Title Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-black italic uppercase tracking-tighter leading-none mb-4">
                {destination.duration} - {destination.city},{" "}
                {destination.country}
              </h2>
              <div className="flex items-center space-x-6 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(destination.popularityScore)
                          ? "fill-orange-400 text-orange-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {destination.popularityScore} (128 reviews)
                  </span>
                </div>
              </div>

              {/* Quick Info Badges */}
              <div className="flex items-center space-x-6 mb-6 text-sm">
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2 text-orange-500" />
                  <span>{destination.duration}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-2 text-orange-500" />
                  <span>2-10 People</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2 text-orange-500" />
                  <span>{destination.best_time_to_visit}</span>
                </div>
                <div className="flex items-center space-x-3 ml-auto">
                  <button className="p-2 border rounded-lg hover:bg-gray-50">
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 border rounded-lg hover:bg-gray-50">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="grid grid-cols-4 gap-3">
                <div className="col-span-3 row-span-2 relative group">
                  <img
                    src={destination.media.cover_image}
                    alt={destination.city}
                    className="w-full h-[400px] object-cover rounded-xl"
                  />
                  <div className="absolute bottom-4 left-4 flex space-x-2">
                    <span className="bg-white px-3 py-1.5 rounded-full text-xs font-medium shadow-md">
                      Nature
                    </span>
                    <span className="bg-white px-3 py-1.5 rounded-full text-xs font-medium shadow-md">
                      Adventure
                    </span>
                  </div>
                </div>
                {destination.media.gallery.slice(0, 4).map((img, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    className="relative overflow-hidden rounded-xl"
                  >
                    <img
                      src={img}
                      alt={`Gallery ${idx + 1}`}
                      className="w-full h-[120px] object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              <h3 className="text-2xl font-bold mb-4">Overview</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                {destination.description}
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Discover the enchanting beauty of {destination.city}, where
                ancient traditions meet modern marvels. This destination offers
                an unforgettable journey through stunning landscapes, rich
                cultural heritage, and warm hospitality that will leave you with
                memories to last a lifetime.
              </p>
              <p className="text-gray-600 leading-relaxed">
                From breathtaking natural wonders to vibrant local markets,
                every moment in {destination.city} is an adventure waiting to
                unfold. Experience authentic cuisine, explore historical
                landmarks, and immerse yourself in the unique atmosphere that
                makes this destination truly special.
              </p>
            </motion.div>

            {/* What's Included */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-8"
            >
              <h3 className="text-2xl font-bold mb-4">What s Included</h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                <div className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Professional Tour Guide</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Luxury Accommodation</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">All Meals & Beverages</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Airport Transfers</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Entry Tickets & Permits</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Travel Insurance</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">24/7 Support</span>
                </div>
                <div className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Complimentary WiFi</span>
                </div>
              </div>
            </motion.div>

            {/* Tour Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-8"
            >
              <h3 className="text-2xl font-bold mb-4">Tour Plan</h3>
              <div className="space-y-3">
                {[
                  {
                    day: 1,
                    title: "Arrival & Welcome Dinner",
                    desc: `Arrive in ${destination.city} and transfer to your hotel. Evening welcome dinner and orientation session.`,
                  },
                  {
                    day: 2,
                    title: "City Tour & Cultural Experience",
                    desc: "Explore major landmarks, visit museums, and experience local culture and cuisine.",
                  },
                  {
                    day: 3,
                    title: "Adventure & Nature Activities",
                    desc: "Outdoor activities, nature exploration, and scenic viewpoints.",
                  },
                  {
                    day: 4,
                    title: "Free Day & Optional Tours",
                    desc: "Leisure time for shopping, relaxation, or optional excursions.",
                  },
                  {
                    day: 5,
                    title: "Departure",
                    desc: "Final breakfast and airport transfer for your departure flight.",
                  },
                ].map((item, idx) => (
                  <details
                    key={idx}
                    className="bg-white p-4 rounded-lg border border-gray-200 group"
                  >
                    <summary className="font-semibold cursor-pointer flex items-center justify-between">
                      <span>
                        Day {item.day}: {item.title}
                      </span>
                      <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                    </summary>
                    <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </details>
                ))}
              </div>
            </motion.div>

            {/* Itinerary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mb-8"
            >
              <h3 className="text-2xl font-bold mb-4">Itinerary</h3>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <p className="text-gray-600 leading-relaxed mb-4">
                  Our carefully crafted itinerary ensures you experience the
                  best of {destination.city}. Each day is designed to balance
                  adventure, culture, and relaxation.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span>Morning activities start at 8:00 AM</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span>Lunch breaks at authentic local restaurants</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span>Afternoon tours and activities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span>Evening free time or optional group activities</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Important Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mb-8"
            >
              <h3 className="text-2xl font-bold mb-4">Important Information</h3>
              <div className="space-y-3">
                <details className="bg-white p-4 rounded-lg border border-gray-200 group">
                  <summary className="font-semibold cursor-pointer flex items-center justify-between">
                    <span>Visa Requirements</span>
                    <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                  </summary>
                  <p className="mt-3 text-gray-600 text-sm">
                    Check visa requirements for {destination.country}. Most
                    nationalities can obtain visa on arrival or e-visa.
                    Processing time is typically 3-5 business days.
                  </p>
                </details>
                <details className="bg-white p-4 rounded-lg border border-gray-200 group">
                  <summary className="font-semibold cursor-pointer flex items-center justify-between">
                    <span>Health & Safety</span>
                    <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                  </summary>
                  <p className="mt-3 text-gray-600 text-sm">
                    No special vaccinations required. Travel insurance is
                    included. Emergency medical facilities are available. Safety
                    index: {destination.safety_index}/10
                  </p>
                </details>
                <details className="bg-white p-4 rounded-lg border border-gray-200 group">
                  <summary className="font-semibold cursor-pointer flex items-center justify-between">
                    <span>What to Pack</span>
                    <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                  </summary>
                  <p className="mt-3 text-gray-600 text-sm">
                    Comfortable walking shoes, light clothing, sunscreen, hat,
                    camera, and any personal medications. Average temperature:{" "}
                    {destination.climate.avg_temp_c}°C
                  </p>
                </details>
                <details className="bg-white p-4 rounded-lg border border-gray-200 group">
                  <summary className="font-semibold cursor-pointer flex items-center justify-between">
                    <span>Cancellation Policy</span>
                    <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                  </summary>
                  <p className="mt-3 text-gray-600 text-sm">
                    Free cancellation up to 30 days before departure. 50% refund
                    for 15-30 days. No refund within 15 days of departure.
                  </p>
                </details>
              </div>
            </motion.div>

            {/* FAQ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mb-8"
            >
              <h3 className="text-2xl font-bold mb-4">FAQ</h3>
              <div className="space-y-3">
                <details className="bg-white p-4 rounded-lg border border-gray-200 group">
                  <summary className="font-semibold cursor-pointer flex items-center justify-between">
                    <span>Can I customize my tour?</span>
                    <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                  </summary>
                  <p className="mt-3 text-gray-600 text-sm">
                    Yes! We offer customizable itineraries. Contact our team to
                    discuss your preferences and we will create a personalized
                    experience for you.
                  </p>
                </details>
                <details className="bg-white p-4 rounded-lg border border-gray-200 group">
                  <summary className="font-semibold cursor-pointer flex items-center justify-between">
                    <span>Is this tour suitable for children?</span>
                    <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                  </summary>
                  <p className="mt-3 text-gray-600 text-sm">
                    This tour is family-friendly and suitable for children aged
                    5 and above. Special arrangements can be made for younger
                    children.
                  </p>
                </details>
                <details className="bg-white p-4 rounded-lg border border-gray-200 group">
                  <summary className="font-semibold cursor-pointer flex items-center justify-between">
                    <span>Whats the group size?</span>
                    <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                  </summary>
                  <p className="mt-3 text-gray-600 text-sm">
                    Our groups range from 2 to 10 people, ensuring a
                    personalized experience with attention to each traveler.
                  </p>
                </details>
                <details className="bg-white p-4 rounded-lg border border-gray-200 group">
                  <summary className="font-semibold cursor-pointer flex items-center justify-between">
                    <span>What if I have dietary restrictions?</span>
                    <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                  </summary>
                  <p className="mt-3 text-gray-600 text-sm">
                    We accommodate all dietary requirements including
                    vegetarian, vegan, halal, and allergy-specific needs. Please
                    inform us during booking.
                  </p>
                </details>
              </div>
            </motion.div>

            {/* Related Tours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mb-8"
            >
              <h3 className="text-2xl font-bold mb-6">Related Tours</h3>
              {/* <div className="grid grid-cols-3 gap-5">
                {allDestinations.slice(1, 4).map((dest, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -8 }}
                    className="bg-white rounded-xl overflow-hidden shadow-md cursor-pointer group"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={dest.media.cover_image}
                        alt={dest.city}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-gray-900 mb-2">{dest.city}, {dest.country}</h4>
                      <div className="flex items-center mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(dest.popularityScore)
                                ? 'fill-orange-400 text-orange-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-xs text-gray-500">({dest.popularityScore})</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-blue-600 font-bold text-lg">{dest.price.split('-')[0]}</span>
                        <span className="text-xs text-gray-500">{dest.duration}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div> */}
            </motion.div>

            {/* Reviews Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="mb-8"
            >
              <h3 className="text-2xl font-bold mb-6">Customer Reviews</h3>

              {/* Overall Rating */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 mb-6">
                <div className="flex items-center space-x-8">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-gray-900 mb-2">
                      {destination.popularityScore}
                    </div>
                    <div className="flex items-center justify-center mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(destination.popularityScore)
                              ? "fill-orange-400 text-orange-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-gray-500">128 reviews</div>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center space-x-3">
                        <span className="text-sm text-gray-600 w-12">
                          {rating} star
                        </span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-orange-400 h-2 rounded-full"
                            style={{
                              width: `${rating === 5 ? 75 : rating === 4 ? 20 : 5}%`,
                            }}
                          />
                        </div>
                        <span className="text-sm text-gray-500 w-8">
                          {rating === 5 ? 96 : rating === 4 ? 26 : 6}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Individual Reviews */}
              {/* <div className="space-y-4">
                {[
                  {
                    name: "Sarah Johnson",
                    rating: 5,
                    date: "December 2023",
                    text: "Amazing experience! The tour was well-organized and our guide was incredibly knowledgeable. Would definitely recommend!",
                  },
                  {
                    name: "Michael Chen",
                    rating: 5,
                    date: "November 2023",
                    text: "Best vacation ever! Every detail was perfect, from accommodation to activities. Worth every penny.",
                  },
                ].map((review, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-5 rounded-xl border border-gray-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {review.name}
                        </h4>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < review.rating
                                  ? "fill-orange-400 text-orange-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">
                        {review.date}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {review.text}
                    </p>
                  </div>
                ))}
              </div> */}
              <TripReviewsList destinationId={destination.destination_id} />
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 lg:space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg p-6 lg:sticky lg:top-24"
            >
              {/* Price */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-baseline mb-1">
                  <span className="text-4xl font-bold text-primary">
                    {destination.price.split("-")[0]}
                  </span>
                  <span className="text-gray-500 ml-2">/ person</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Daily budget: {destination.avgBudget}
                </p>
              </div>

              {/* Booking Form */}
              {/* <div className="space-y-4 mb-6 ">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check In
                  </label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check Out
                  </label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Guests
                  </label>
                  <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>1 Guest</option>
                    <option>2 Guests</option>
                    <option>3 Guests</option>
                    <option>4 Guests</option>
                    <option>5+ Guests</option>
                  </select>
                </div>
              </div> */}

              {/* Buttons */}
              {/* <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-primary text-white py-3.5 rounded-lg font-semibold mb-3 hover:bg-green-900 transition-colors"
              >
                Book Now
              </motion.button>

              <button className="w-full border-2 border-gray-300 text-gray-700 py-3.5 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Contact Us
              </button> */}
              {/* add my trip form */}
              <form onSubmit={handleAddToMyTrips} className="mt-6 space-y-3">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Save to My Trips
                </h4>

                <input
                  type="text"
                  value={destination.destination_id || "d2001"}
                  readOnly
                  className="w-full border px-3 py-2 rounded-md text-sm"
                  placeholder="Destination ID"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check In
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check Out
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <input
                  type="text"
                  value={duration ? `${duration}` : ""}
                  readOnly
                  className="w-full border px-3 py-2 rounded-md text-sm"
                  placeholder="Duration"
                />
                <input
                  type="text"
                  value={destination.country}
                  readOnly
                  className="w-full border px-3 py-2 rounded-md text-sm"
                  placeholder="Country"
                />

                <input
                  type="text"
                  value={destination.city}
                  readOnly
                  className="w-full border px-3 py-2 rounded-md text-sm"
                  placeholder="City"
                />

                <input
                  type="text"
                  value={destination.region || ""}
                  readOnly
                  className="w-full border px-3 py-2 rounded-md text-sm"
                  placeholder="Region"
                />

                <input
                  type="text"
                  value={destination.media?.cover_image}
                  readOnly
                  className="w-full border px-3 py-2 rounded-md text-sm"
                  placeholder="Cover Image URL"
                />

                <button
                  type="submit"
                  className="w-full bg-accent text-white py-2 rounded-md hover:bg-red-700 transition"
                >
                  Save to My Trips
                </button>
              </form>

              {/* Quick Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Tour Information
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium text-gray-900">
                      {destination.duration}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Best Time</span>
                    <span className="font-medium text-gray-900">
                      {destination.best_time_to_visit}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Group Size</span>
                    <span className="font-medium text-gray-900">
                      2-10 People
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Currency</span>
                    <span className="font-medium text-gray-900">
                      {destination.currency}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Safety Rating</span>
                    <span className="font-medium text-gray-900">
                      {destination.safety_index}/10
                    </span>
                  </div>
                </div>
              </div>

              {/* Languages */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Languages</h4>
                <div className="flex flex-wrap gap-2">
                  {destination.languages_spoken.map((lang, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-xs font-medium"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Need Help */}
              <div className="mt-6  pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">Need Help?</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Our travel experts are here to assist you
                </p>
                <a
                  href="tel:+1234567890"
                  className="text-blue-600 font-semibold text-sm hover:underline"
                >
                  Call: +1 (234) 567-890
                </a>
              </div>
            </motion.div>
          </div>
          
        </div>
        </section>
      </div>
    </div>
  );
};

export default DestinationDetailsCard;
