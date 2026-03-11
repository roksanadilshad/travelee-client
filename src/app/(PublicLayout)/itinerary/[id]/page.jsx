"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { FaCalendarDay, FaClock } from "react-icons/fa";

export default function TripDetails() {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState([]);

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "https://travelee-server.vercel.app";

  useEffect(() => {
    if (!id) return;

    const fetchTripDetails = async () => {
      try {
        const res = await fetch(`${API_URL}/itineraries/${id}`);
        const data = await res.json();
        setTrip(data);
      } catch (error) {
        console.error("Error fetching trip:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchWeather = async () => {
      try {
        const res = await fetch(`${API_URL}/itineraries/${id}/weather`);
        const data = await res.json();
        setWeather(data.weatherSummary || []);
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };

    fetchTripDetails();
    fetchWeather();
  }, [id, API_URL]);

  if (loading) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  if (!trip) {
    return <p className="text-center mt-20">Trip not found</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 py-20 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Header Card */}
        <div className="bg-white rounded-3xl p-8 shadow-sm mb-8 border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-black text-gray-900">
                {trip.destination}
              </h1>

              <p className="text-gray-500 mt-2 flex items-center gap-2">
                <FaCalendarDay /> {trip.days?.length} Day Trip
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">
                Total Budget
              </p>

              <p className="text-3xl font-black text-green-600">
                ${trip.totalCost}
              </p>
            </div>
          </div>
        </div>

        {/* Weather */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2 border-gray-200">
            🌦 Weather Adaptive Plan
          </h2>

          <div className="grid gap-4 md:grid-cols-3">
            {weather.map((day) => (
              <div
                key={day.day}
                className="bg-blue-50 p-4 rounded-2xl shadow-md border border-blue-200"
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="font-semibold text-blue-700">
                    Day {day.day}
                  </p>
                  <p className="text-sm text-gray-500">{day.date}</p>
                </div>

                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-sm">
                  {day.tag}
                </span>

                {day.activitySwap?.swapRecommended ? (
                  <div className="mt-2 bg-red-50 border border-red-200 p-2 rounded-lg text-red-700 text-sm">
                    🔄 Suggested Activity:{" "}
                    {day.activitySwap.suggestedActivity}
                  </div>
                ) : (
                  <div className="mt-2 bg-green-50 border border-green-200 p-2 rounded-lg text-green-700 text-sm">
                    ✅ Activity is suitable for this weather
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Itinerary */}
        <div className="space-y-8">
          {trip.days?.map((day, index) => (
            <div
              key={day.id || index}
              className="relative pl-8 border-l-2 border-blue-200"
            >
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-white"></div>

              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Day {index + 1}
              </h2>

              <div className="grid gap-4">
                {day.activities?.map((activity) => (
                  <div
                    key={activity.id}
                    className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-50 p-3 rounded-lg text-primary">
                        <FaClock />
                      </div>

                      <div>
                        <p className="text-xs font-bold text-blue-500 uppercase">
                          {activity.time}
                        </p>

                        <h3 className="font-bold text-gray-800">
                          {activity.task}
                        </h3>
                      </div>
                    </div>

                    <div className="bg-gray-50 px-4 py-2 rounded-xl font-bold text-gray-600">
                      ${activity.cost}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}