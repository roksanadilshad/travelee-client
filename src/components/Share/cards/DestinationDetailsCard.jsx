"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";
import { Gallery } from "./Gallery";
import { InclusionList, AccordionSection } from "./InfoSections";
import { TripSidebar } from "./TripSidebar";
import TripReviewsList from "@/components/Reviews/TripReviewList";
import { TourQuickInfo } from "./TourQuickInfo";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const DestinationDetailsCard = ({ destination }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { user } = useAuth();

  const displayPrice = destination?.price?.split("-")[0] || "$0";
  const numericPriceForURL = displayPrice.replace(/[^0-9.]/g, '');

  const duration = (startDate && endDate) 
    ? Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) 
    : 0;

 const handleBookNow = async (e) => {
  if (e) e.preventDefault();

  if (!user?.email || !startDate || !endDate) {
    return Swal.fire("Missing Info", "Please log in and select dates", "warning");
  }

  try {
    const response = await fetch("http://localhost:500/api/payments/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // Matching your "Previous" format exactly:
        destination_id: destination._id || destination.destination_id,
        country: destination.country || "",
        city: destination.city || "",
        region: destination.region || "",
        startDate: startDate,
        endDate: endDate,
        duration: duration, 
        totalCost: parseFloat(numericPriceForURL),
        userEmail: user.email,
        userName: user.name || "Traveler", // Added userName
        media: {
          cover_image: destination.media?.cover_image || ""
        }
      }),
    });

    const data = await response.json();
    if (data.url) window.location.href = data.url;
  } catch (error) {
    console.error("Booking Error:", error);
  }
};

  const tourPlanData = [
  { day: 1, titleKey: "arrival_title", descKey: "arrival_desc" },
  { day: 2, titleKey: "city_tour_title", descKey: "city_tour_desc" },
  // ... and so on
];

  return (
    <div className="bg-gray-50 max-w-7xl mx-auto px-6 py-8">
      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <Gallery media={destination.media} city={destination.city} />
          
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4">Overview</h3>
            <p className="text-gray-600 leading-relaxed">{destination.description}</p>
          </div>

          <InclusionList />
          
          <AccordionSection 
  titleKey="tour_plan" 
  items={tourPlanData} 
/>

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
      <div className="lg:col-span-1 lg:space-y-6">
  <motion.div className="bg-white rounded-xl shadow-lg p-6 lg:sticky lg:top-24">
    
    {/* ... Price and Booking Form code here ... */}

    {/* New Component Integrated Here */}
    <TourQuickInfo destination={destination} />

  </motion.div>
</div>
       
    </div>
  );
};

export default DestinationDetailsCard;