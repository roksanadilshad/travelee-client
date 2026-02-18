"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { Clock3, MapPin, Globe, Tag, ThermometerSun, Star } from "lucide-react";

const DestinationDetailsCard = ({ destination }) => {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Cover Image */}
      <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden shadow-lg">
        {destination.media?.cover_image ? (
          <Image
            src={destination.media.cover_image}
            alt={destination.city}
            fill
            className="object-cover"
          />
        ) : (
          <Image
            src="/default-placeholder.png"
            alt="No Image"
            fill
            className="object-cover"
          />
        )}
      </div>

      {/* Main title */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">
          {destination.city},{" "}
          <span className="text-xl font-semibold">{destination.country}</span>
        </h1>
        {destination.region && (
          <p className="text-gray-700 text-md">{destination.region}</p>
        )}
      </div>

      {/* Description */}
      <p className="text-gray-800 text-lg leading-relaxed">
        {destination.description || "No description available."}
      </p>

      {/* Detail grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-800">
        {destination.best_time_to_visit && (
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-indigo-600" /> Best Time:{" "}
            {destination.best_time_to_visit}
          </div>
        )}

        {destination.duration && (
          <div className="flex items-center gap-2">
            <Clock3 className="w-5 h-5 text-green-600" /> Duration:{" "}
            {destination.duration}
          </div>
        )}

        {destination.climate?.avg_temp_c !== undefined && (
          <div className="flex items-center gap-2">
            <ThermometerSun className="w-5 h-5 text-red-500" /> Avg Temp:{" "}
            {destination.climate.avg_temp_c}°C
          </div>
        )}

        {destination.climate?.rainy_months?.length > 0 && (
          <div className="col-span-full text-sm text-gray-700">
            ☔ Rainy Months: {destination.climate.rainy_months.join(", ")}
          </div>
        )}

        {destination.languages_spoken && (
          <div className="col-span-full flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-600" /> Languages:{" "}
            {destination.languages_spoken.join(", ")}
          </div>
        )}
      </div>

      {/* Budget & popularity */}
      <div className="flex justify-between items-center text-lg font-semibold text-gray-900">
        {destination.avgBudget && (
          <span className="text-green-600">💰 {destination.avgBudget}</span>
        )}
        {destination.popularityScore && (
          <span className="flex items-center gap-1 text-yellow-500">
            <Star className="w-5 h-5" /> {destination.popularityScore}
          </span>
        )}
      </div>

      {/* Gallery */}
      {destination.media?.gallery?.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Gallery</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {destination.media.gallery.map((img, i) => (
              <motion.div
                key={i}
                className="relative w-full h-40 rounded-lg overflow-hidden shadow-sm"
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src={img}
                  alt={`${destination.city} gallery ${i}`}
                  fill
                  className="object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DestinationDetailsCard;
