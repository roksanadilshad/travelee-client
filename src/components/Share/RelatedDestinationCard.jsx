import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock3, Globe, MapPin, Star, Tag, ThermometerSun } from "lucide-react";

const RelatedDestinationCard = ({ destination }) => {
  return (
    <div className=" px-2">
      <div className=" shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
        
        {/*  ONLY ONE LINK (wrap entire card) */}
        <Link
          href={`/destinations/${destination._id}`}
          className="block rounded-lg overflow-hidden cursor-pointer"
        >
          <div className=" rounded-xl shadow-md hover:shadow-xl overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
            
            {/* IMAGE */}
            <div className="relative w-full h-40 sm:h-48 md:h-56">
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

            {/* CONTENT */}
            <div className="p-4 space-y-4">
              
              {/* TITLE */}
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <MapPin className="text-blue-500 w-5 h-5" />
                {destination.city},{" "}
                <span className="text-base font-semibold text-gray-700">
                  {destination.country}
                </span>
              </h3>

              {/* DESCRIPTION */}
              <p className="text-gray-700 text-sm line-clamp-3">
                {destination.description ||
                  "No description available for this destination."}
              </p>

              <div>
                {destination.best_time_to_visit && (
                  <div className="flex items-center gap-1">
                    <Tag className="w-4 h-4" /> {destination.best_time_to_visit}
                  </div>
                )}

                {destination.duration && (
                  <div className="flex items-center gap-1">
                    <Clock3 className="w-4 h-4" /> {destination.duration}
                  </div>
                )}
              </div>

              <div className="flex justify-between">
                <div className="grid grid-cols-2 text-sm text-gray-700">
                  {destination.languages_spoken && (
                    <div className="col-span-2 flex items-center gap-1">
                      <Globe className="w-4 h-4" />
                      {destination.languages_spoken.join(", ")}
                    </div>
                  )}
                </div>

                {destination.climate?.avg_temp_c && (
                  <div className="flex items-center gap-1">
                    <ThermometerSun className="w-4 h-4" />
                    {destination.climate.avg_temp_c}°C
                  </div>
                )}
              </div>

              {/* BUDGET + RATING */}
              <div className="flex justify-between items-center mt-2">
                {destination.avgBudget && (
                  <span className="text-green-600 font-semibold text-sm">
                    {destination.avgBudget}
                  </span>
                )}

                {destination.popularityScore && (
                  <span className="flex items-center gap-1 text-yellow-500 font-semibold text-sm">
                    <Star className="w-4 h-4" />
                    {destination.popularityScore}
                  </span>
                )}
              </div>

              {/* BUTTON (NOT A LINK ANYMORE) */}
              {/* <div className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-semibold text-center hover:bg-blue-700 transition">
                View Details
              </div> */}

            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default RelatedDestinationCard;