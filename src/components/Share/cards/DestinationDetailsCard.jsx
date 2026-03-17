"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Gallery } from "./Gallery";
import { InclusionList, AccordionSection } from "./InfoSections";
import { TripSidebar } from "./TripSidebar";
import TripReviewsList from "@/components/Reviews/TripReviewList";
import { TourQuickInfo } from "./TourQuickInfo";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Calendar, Clock, Share2, Users, Star, Heart } from "lucide-react";
import { FaCopy, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";

const MySwal = withReactContent(Swal);

const DestinationDetailsCard = ({ destination }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const { user } = useAuth();
  const searchParams = useSearchParams();

  useEffect(() => {
    const isInvited = searchParams.get("invited");
    if (isInvited === "true") {
      Swal.fire({
        title: "Welcome Traveler!",
        text: "You've been invited to explore this trip.",
        icon: "info",
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 4000,
      });
    }
  }, [searchParams]);

  useEffect(() => {
    if (destination?.city) {
      document.title = `${destination.city} - ${destination.country} | Travelee`;
    }
  }, [destination]);

  const displayPrice = destination?.price?.split("-")[0] || "$0";
  const numericPriceForURL = displayPrice.replace(/[^0-9.]/g, "");

  const duration =
    startDate && endDate
      ? Math.ceil(
          (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24),
        )
      : 0;

  const handleWishlist = async () => {
    if (!user?.email) {
      return Swal.fire(
        "Login Required",
        "Please login to save this trip",
        "info",
      );
    }

    try {
      const response = await fetch(
        "https://travelee-server.vercel.app/api/wishlist",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userEmail: user.email,
            destination_id: destination._id,
            title: destination.city,
            country: destination.country,
            image: destination.media?.cover_image || destination.cover_image,
            price: numericPriceForURL,
          }),
        },
      );

      if (response.ok) {
        setIsFavorite(true);
        Swal.fire({
          title: "Added to Wishlist!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
          toast: true,
          position: "top-end",
        });
      }
    } catch (error) {
      console.error("Wishlist Error:", error);
    }
  };

  const handleBookNow = async (e) => {
    if (e) e.preventDefault();
    if (!user?.email || !startDate || !endDate) {
      return Swal.fire(
        "Missing Info",
        "Please log in and select dates",
        "warning",
      );
    }

    try {
      const response = await fetch(
        "https://travelee-server.vercel.app/api/payments/create-checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            destination_id: destination._id,
            country: destination.country || "",
            city: destination.city || "",
            startDate,
            endDate,
            duration,
            totalCost: parseFloat(numericPriceForURL),
            userEmail: user.email,
            userName: user.name || "Traveler",
            media: { cover_image: destination.media?.cover_image || "" },
          }),
        },
      );
      const data = await response.json();
      if (data.url) window.location.href = data.url;
    } catch (error) {
      console.error("Booking Error:", error);
    }
  };

  const tourPlanData = [
    { day: 1, titleKey: "arrival_title", descKey: "arrival_desc" },
    { day: 2, titleKey: "city_tour_title", descKey: "city_tour_desc" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-2">
                Home / Destinations / {destination.city}
              </p>
              <h2 className="text-4xl font-black italic uppercase tracking-tighter leading-none mb-4">
                {destination.duration} - {destination.city},{" "}
                {destination.country}
              </h2>
            </div>
            <button
              onClick={handleWishlist}
              className={`p-3 rounded-full shadow-sm border transition-all ${isFavorite ? "bg-red-50 border-red-200" : "bg-white border-gray-100 hover:bg-red-50"}`}
            >
              <Heart
                className={`w-6 h-6 transition-all ${isFavorite ? "text-red-500 fill-red-500" : "text-gray-400"}`}
              />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(destination.popularityScore || 0) ? "fill-orange-400 text-orange-400" : "text-gray-300"}`}
                />
              ))}
              <span className="ml-2 text-gray-600">
                {destination.popularityScore} (128 reviews)
              </span>
            </div>
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
          </div>
        </motion.div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-8">
            <Gallery
              media={
                destination?.media || {
                  cover_image: destination?.cover_image,
                  gallery: [],
                }
              }
              city={destination?.city}
            />

            <div className="flex justify-center">
              <button
                onClick={() => {
                  const shareUrl = `${window.location.origin}/destinations/${destination._id}?invited=true`;
                  const shareText = `Check out this amazing trip to ${destination.city}!`;
                  MySwal.fire({
                    title: (
                      <span className="text-xl font-bold">Share this Trip</span>
                    ),
                    html: (
                      <div className="flex justify-center gap-6 py-4">
                        <a
                          href={`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-col items-center gap-2 group"
                        >
                          <div className="p-3 bg-green-100 text-green-600 rounded-full group-hover:bg-green-600 group-hover:text-white transition-all">
                            <FaWhatsapp size={24} />
                          </div>
                          <span className="text-xs font-bold text-gray-500">
                            WhatsApp
                          </span>
                        </a>
                        <a
                          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-col items-center gap-2 group"
                        >
                          <div className="p-3 bg-gray-100 text-black rounded-full group-hover:bg-black group-hover:text-white transition-all">
                            <FaXTwitter size={24} />
                          </div>
                          <span className="text-xs font-bold text-gray-500">
                            X
                          </span>
                        </a>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(shareUrl);
                            MySwal.fire({
                              title: "Link Copied!",
                              icon: "success",
                              timer: 1000,
                              showConfirmButton: false,
                            });
                          }}
                          className="flex flex-col items-center gap-2 group"
                        >
                          <div className="p-3 bg-orange-100 text-orange-600 rounded-full group-hover:bg-orange-600 group-hover:text-white transition-all">
                            <FaCopy size={24} />
                          </div>
                          <span className="text-xs font-bold text-gray-500">
                            Copy Link
                          </span>
                        </button>
                      </div>
                    ),
                    showConfirmButton: false,
                    showCloseButton: true,
                    customClass: { popup: "rounded-3xl" },
                  });
                }}
                className="group flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl hover:bg-gray-50 hover:border-blue-400 hover:text-blue-600 transition-all shadow-sm active:scale-95"
              >
                <Share2 size={18} className="group-hover:animate-pulse" />
                <span className="font-bold text-sm">Share Trip</span>
              </button>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
            >
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Overview
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {destination.description}
              </p>
            </motion.div>

            <InclusionList />
            <AccordionSection titleKey="tour_plan" items={tourPlanData} />

            <TripReviewsList destinationId={destination._id} />
          </div>

          <div className="lg:col-span-1 space-y-6">
            <TripSidebar
              destination={destination}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              duration={duration}
              handleAddToMyTrips={handleBookNow}
            />
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <TourQuickInfo destination={destination} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetailsCard;
