"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiDollar } from "react-icons/bi";
import { LuClock3 } from "react-icons/lu";

const DestinationCard = ({ destination }) => {
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300">
      <div className="relative w-full h-48">
        <Image
          src={destination.image}
          alt={destination.name}
          fill={true}
          className="object-cover rounded-t-lg"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900">
          {destination.title},
          <span className="text-sm font-semibold"> {destination.city}. </span>
        </h3>

        <p className="text-sm font-bold text-gray-500">{destination.country}</p>

        <p className="mt-2 text-gray-700 text-sm line-clamp-2">
          {destination.description}
        </p>
        <div className="flex font-semibold text-gray-600 items-center mt-3">
          <LuClock3 />
          <span className="ml-2">{destination.duration}</span>
        </div>

        <div className="flex justify-between items-center mt-3">
          <span className="text-green-600 font-semibold flex items-center">
            <BiDollar /> {destination.avgBudget}
          </span>

          <span className="text-yellow-500 font-semibold">
            ⭐ {destination.popularityScore}
          </span>
        </div>

        <Link href={"/destinations/Details"}>
          <button className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DestinationCard;
