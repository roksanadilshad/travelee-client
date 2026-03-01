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

const DestinationDetailsCard = ({ destination }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { user } = useAuth();

  const duration = (startDate && endDate) 
    ? Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) 
    : 0;

  const handleAddToMyTrips = async (e) => {
    e.preventDefault();
    if (!user?.email) return toast.info("Please login first to save trips 🙏");

    const tripData = {
      destination_id: destination.destination_id || "d2001",
      country: destination.country,
      startDate, endDate, duration,
      city: destination.city,
      media: { cover_image: destination.media?.cover_image },
      userEmail: user.email,
    };

    try {
      const res = await fetch("https://travelee-server.vercel.app/my-trips", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(tripData),
      });
      if (res.ok) toast.success("Trip added! ✅");
    } catch (err) {
      toast.error("Failed to save trip");
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
          handleAddToMyTrips={handleAddToMyTrips}
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