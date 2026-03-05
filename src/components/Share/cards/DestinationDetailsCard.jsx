"use client";
import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Gallery } from "./Gallery";
import { InclusionList, AccordionSection } from "./InfoSections";
import { TripSidebar } from "./TripSidebar";
import TripReviewsList from "@/components/Reviews/TripReviewList";
import { TourQuickInfo } from "./TourQuickInfo";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Share2 } from "lucide-react";
import { FaCopy, FaFacebook, FaWhatsapp, FaXTwitter } from "react-icons/fa6";

const MySwal = withReactContent(Swal);

const DestinationDetailsCard = ({ destination }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { user } = useAuth();

  const displayPrice = destination?.price?.split("-")[0] || "$0";
  const numericPriceForURL = displayPrice.replace(/[^0-9.]/g, "");

  const duration =
    startDate && endDate
      ? Math.ceil(
          (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24),
        )
      : 0;

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
            destination_id: destination._id || destination.destination_id,
            country: destination.country || "",
            city: destination.city || "",
            region: destination.region || "",
            startDate: startDate,
            endDate: endDate,
            duration: duration,
            totalCost: parseFloat(numericPriceForURL),
            userEmail: user.email,
            userName: user.name || "Traveler",
            media: {
              cover_image: destination.media?.cover_image || "",
            },
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
    <div className="bg-gray-50 max-w-7xl mx-auto px-6 py-8">
      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <Gallery media={destination.media} city={destination.city} />

          {/* Share Button Section */}
          <div className="flex justify-center mb-3">
            <button
              onClick={() => {
                const shareUrl = window.location.href;
                const shareText = `Check out this amazing trip to ${destination.name || "this place"}!`;

                MySwal.fire({
                  title: (
                    <span className="text-xl font-bold">Share this Trip</span>
                  ),
                  html: (
                    <div className="flex justify-center gap-6 py-4">
                      {/* WhatsApp Direct Web Link */}
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

                      {/* X (Twitter) Direct Web Link */}
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

                      {/* Facebook Direct Web Link */}
                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-2 group"
                      >
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-all">
                          <FaFacebook size={24} />
                        </div>
                        <span className="text-xs font-bold text-gray-500">
                          Facebook
                        </span>
                      </a>

                      {/* Copy Link Button */}
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
                          Copy
                        </span>
                      </button>
                    </div>
                  ),
                  showConfirmButton: false,
                  showCloseButton: true,
                  customClass: {
                    popup: "rounded-3xl",
                  },
                });
              }}
              className="group flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl hover:bg-gray-50 hover:border-blue-400 hover:text-blue-600 transition-all shadow-sm active:scale-95"
            >
              <Share2 size={18} className="group-hover:animate-pulse" />
              <span className="font-bold text-sm">Share</span>
            </button>
          </div>

          {/* Overview Section */}
          <div className="mb-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Overview</h3>
            <p className="text-gray-600 leading-relaxed">
              {destination.description}
            </p>
          </div>

          <InclusionList />
          <AccordionSection titleKey="tour_plan" items={tourPlanData} />
          <TripReviewsList destinationId={destination.destination_id} />
        </div>

        <TripSidebar
          destination={destination}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          duration={duration}
          handleAddToMyTrips={handleBookNow}
        />
      </div>

      {/* Quick Info Sidebar/Bottom Section */}
      <div className="lg:col-span-1 lg:space-y-6">
        <div className="bg-white rounded-xl shadow-lg p-6 lg:sticky lg:top-24 mt-6">
          <TourQuickInfo destination={destination} />
        </div>
      </div>
    </div>
  );
};

export default DestinationDetailsCard;
