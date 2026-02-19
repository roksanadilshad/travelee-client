"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { Clock3, Globe, Tag, ThermometerSun, Star } from "lucide-react";
import Link from "next/link";

const DestinationDetailsCard = ({ destination }) => {
  console.log(destination);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-12">
        {/* Cover Image */}
        <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-lg md:col-span-7 overflow-hidden shadow-lg">
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
        {/* Gallery */}
        <div className="md:col-span-5">
          {destination.media?.gallery?.length > 0 && (
            <div>
              <h2 className="text-2xl flex justify-center font-bold text-amber-600">
                Gallery
              </h2>
            </div>
          )}
          <div className="shadow-2xl ml-2 pl-4 pt-2   p-6 rounded-2xl md:col-span-5  grid grid-cols-2 md:grid-cols-3  gap-2">
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
      <p className="text-gray-500 text-lg leading-relaxed">
        {destination.description || "No description available."}
      </p>

      {/* Detail grid */}
      <div className="grid gap-6 text-lg font-semibold  text-black">
        {destination.best_time_to_visit && (
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-indigo-600" /> Best Time:{" "}
            <span className="text-orange-500">
              {destination.best_time_to_visit}
            </span>
          </div>
        )}

        {destination.duration && (
          <div className="flex items-center gap-2">
            <Clock3 className="w-5 h-5 text-green-600" /> Duration:{" "}
            <span className="text-orange-500">{destination.duration}</span>
          </div>
        )}

        {destination.climate?.avg_temp_c !== undefined && (
          <div className="flex items-center gap-2">
            <ThermometerSun className="w-5 h-5 text-red-500" /> Avg Temp:{" "}
            <span className="text-orange-500">
              {destination.climate.avg_temp_c}°C
            </span>
          </div>
        )}

        {destination.climate?.rainy_months?.length > 0 && (
          <div className="col-span-full text-lg font-semibold ">
            ☔ Rainy Months:{" "}
            <span className="text-orange-500">
              {destination.climate.rainy_months.join(", ")}
            </span>
          </div>
        )}

        {destination.languages_spoken && (
          <div className="col-span-full  flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-600" /> Languages:{" "}
            <span className="text-orange-500">
              {destination.languages_spoken.join(", ")}
            </span>
          </div>
        )}
        {/* Budget & popularity */}
        <div className=" text-lg font-semibold text-gray-900">
          {destination.avgBudget && (
            <span className="text-green-600">
              {" "}
              <span className="text-black">💲 Avg. Budget: </span>
              {destination.avgBudget}
            </span>
          )}
          {destination.popularityScore && (
            <span className="flex mt-5 items-center gap-1 text-orange-500">
              <span className="text-black">👨‍👨‍👦‍👦 Popularity:</span>{" "}
              <Star className="w-5 h-5" /> {destination.popularityScore}
            </span>
          )}
        </div>
      </div>

      {/* Buttons  */}
      <div className="flex justify-evenly">
        <span className="flex justify-center my-8">
          <Link href="/itinerary">
            <button className="mt-4 bg-blue-600 text-white font-semibold px-4 py-2 flex items-center rounded-lg hover:bg-blue-700 transition">
              Start Planning
            </button>
          </Link>
        </span>
        <span className="flex justify-center my-8">
          <Link href="">
            <button className="mt-4 bg-blue-600 text-white font-semibold px-4 py-2 flex items-center rounded-lg hover:bg-blue-700 transition">
              Book Now
            </button>
          </Link>
        </span>
      </div>
    </div>
  );
};

export default DestinationDetailsCard;
