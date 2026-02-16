"use client";

import React, { useState } from "react";
import {
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Heart,
  Share2,
  ChevronRight,
} from "lucide-react";
import Search from "@/components/Share/Search";

const MyTripsData = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [likedTrips, setLikedTrips] = useState(new Set());

  const trips = [
    {
      id: 1,
      title: "Paris: City of Love",
      destination: "Paris, France",
      startDate: "2025-04-15",
      endDate: "2025-04-22",
      duration: "7 days",
      travelers: 2,
      budget: 3500,
      spent: 2800,
      status: "upcoming",
      image:
        "https://i.pinimg.com/736x/2f/27/08/2f27088cf1149c60b423bb3836c5534c.jpg",
      highlights: ["Eiffel Tower", "Louvre Museum", "Montmartre"],
      rating: null,
      activities: 12,
      accommodation: "Hotel Lumiere",
    },
    {
      id: 2,
      title: "Tokyo Adventure",
      destination: "Tokyo, Japan",
      startDate: "2025-03-01",
      endDate: "2025-03-15",
      duration: "14 days",
      travelers: 3,
      budget: 5200,
      spent: 5200,
      status: "completed",
      image:
        "https://i.pinimg.com/736x/ba/a0/94/baa0943a315f0038f75df6a91efe43d2.jpg",
      highlights: ["Shibuya Crossing", "Mount Fuji", "Senso-ji Temple"],
      rating: 4.8,
      activities: 18,
      accommodation: "Shinjuku Plaza Hotel",
    },
    {
      id: 3,
      title: "Bali Escape",
      destination: "Bali, Indonesia",
      startDate: "2025-06-10",
      endDate: "2025-06-20",
      duration: "10 days",
      travelers: 4,
      budget: 2800,
      spent: 0,
      status: "planned",
      image:
        "https://i.pinimg.com/1200x/b2/29/cb/b229cbe4a9fdfd412d43fcc0c4dcdcfd.jpg",
      highlights: ["Ubud Rice Terraces", "Beach Clubs", "Temples"],
      rating: null,
      activities: 8,
      accommodation: "The Bali Soul Hotel",
    },
    {
      id: 4,
      title: "Barcelona Weekend",
      destination: "Barcelona, Spain",
      startDate: "2024-12-20",
      endDate: "2024-12-24",
      duration: "4 days",
      travelers: 2,
      budget: 1500,
      spent: 1500,
      status: "completed",
      image:
        "https://i.pinimg.com/1200x/dc/4a/b2/dc4ab2d116939468f6bca2f8902de730.jpg",
      highlights: ["Sagrada Familia", "Park Güell", "Gothic Quarter"],
      rating: 4.5,
      activities: 10,
      accommodation: "Apartment Gótico",
    },
    {
      id: 5,
      title: "New York City",
      destination: "New York, USA",
      startDate: "2025-07-01",
      endDate: "2025-07-10",
      duration: "9 days",
      travelers: 1,
      budget: 4000,
      spent: 0,
      status: "planned",
      image:
        "https://i.pinimg.com/736x/fc/4b/a7/fc4ba77f3cb0a0ff45935e45ec6be782.jpg",
      highlights: ["Times Square", "Central Park", "Brooklyn Bridge"],
      rating: null,
      activities: 15,
      accommodation: "Manhattan Suites",
    },
    {
      id: 6,
      title: "Maldives Paradise",
      destination: "Maldives",
      startDate: "2025-05-05",
      endDate: "2025-05-12",
      duration: "7 days",
      travelers: 2,
      budget: 6500,
      spent: 0,
      status: "planned",
      image:
        "https://i.pinimg.com/736x/5d/f2/bc/5df2bc29c83f8d710d378f60b77bbbfc.jpg",
      highlights: ["Snorkeling", "Island Hopping", "Water Bungalows"],
      rating: null,
      activities: 9,
      accommodation: "Luxury Resort Villas",
    },
    {
      id: 7,
      title: "Dubai Luxury",
      destination: "Dubai, UAE",
      startDate: "2024-11-10",
      endDate: "2024-11-17",
      duration: "7 days",
      travelers: 3,
      budget: 3800,
      spent: 3800,
      status: "completed",
      image:
        "https://i.pinimg.com/736x/45/50/86/455086a8390fa2d159f77a16cbf0395b.jpg",
      highlights: ["Burj Khalifa", "Desert Safari", "Gold Souk"],
      rating: 4.3,
      activities: 11,
      accommodation: "Burj Al Arab Suite",
    },
    {
      id: 8,
      title: "Iceland Road Trip",
      destination: "Iceland",
      startDate: "2025-08-15",
      endDate: "2025-08-25",
      duration: "10 days",
      travelers: 4,
      budget: 4200,
      spent: 0,
      status: "planned",
      image:
        "https://i.pinimg.com/1200x/18/22/82/182282d5c3ccd1ac966079b37eb273c0.jpg",
      highlights: ["Blue Lagoon", "Waterfalls", "Northern Lights"],
      rating: null,
      activities: 12,
      accommodation: "Mountain Cabin Resort",
    },
  ];

  const filters = [
    { id: "all", label: "All Trips", icon: "🌍" },
    { id: "upcoming", label: "Upcoming", icon: "📅" },
    { id: "planned", label: "Planned", icon: "📝" },
    { id: "completed", label: "Completed", icon: "✓" },
  ];

  const filteredTrips = trips.filter(
    (trip) =>
      (selectedFilter === "all" || trip.status === selectedFilter) &&
      (trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.destination.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  const toggleLike = (tripId) => {
    const newLiked = new Set(likedTrips);
    likedTrips.has(tripId) ? newLiked.delete(tripId) : newLiked.add(tripId);
    setLikedTrips(newLiked);
  };

  const getStatusBadge = (status) => {
    const badges = {
      upcoming: { bg: "bg-blue-100", text: "text-blue-700", label: "Upcoming" },
      planned: {
        bg: "bg-purple-100",
        text: "text-purple-700",
        label: "Planned",
      },
      completed: {
        bg: "bg-green-100",
        text: "text-green-700",
        label: "Completed",
      },
    };
    return badges[status];
  };

  const stats = [
    { label: "Total Trips", value: trips.length, icon: "✈️" },
    { label: "Countries Visited", value: 5, icon: "🌏" },
    {
      label: "Total Days",
      value: trips.reduce((sum, trip) => {
        const start = new Date(trip.startDate);
        const end = new Date(trip.endDate);
        return sum + Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      }, 0),
      icon: "⏱️",
    },
    {
      label: "Total Spent",
      value: `$${trips.reduce((sum, trip) => sum + trip.spent, 0)}`,
      icon: "💰",
    },
  ];

  return (
    <div className="min-h-screen relative">
      {/* Floating Background Circles */}
      <div className="fixed top-0 left-0 w-96 h-96 rounded-full opacity-10 pointer-events-none bg-gradient-to-br from-blue-400 to-transparent blur-3xl animate-float"></div>
      <div className="fixed bottom-0 right-0 w-96 h-96 rounded-full opacity-10 pointer-events-none bg-gradient-to-br from-orange-400 to-transparent blur-3xl animate-float animation-delay-1s"></div>

      <div className="relative max-w-7xl mx-auto md:px-6 py-7 md:py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-4">
            My Adventures
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Explore all your trips, plan new adventures, and relive your
            favorite travel memories
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border-t-4 border-primary"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <p className="text-gray-500 text-sm uppercase tracking-wide mb-2">
                {stat.label}
              </p>
              <p className="text-3xl font-bold text-primary">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Search & Filters */}
        <div className="mb-10">
          <div className="mb-6 relative">
            <input
              type="text"
              placeholder="Search trips by destination..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-4 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none shadow-md transition-all"
            />
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>

          <div className="flex gap-3 overflow-x-auto pb-4">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-6 py-3 rounded-full font-semibold whitespace-nowrap transition-transform hover:scale-105 ${
                  selectedFilter === filter.id
                    ? "bg-primary text-white shadow-lg"
                    : "bg-white text-primary border border-gray-300"
                }`}
              >
                <span className="mr-2">{filter.icon}</span>
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Trips Count */}
        <p className="text-gray-600 mb-6">
          Showing{" "}
          <span className="font-bold text-gray-800">
            {filteredTrips.length}
          </span>{" "}
          trip{filteredTrips.length !== 1 ? "s" : ""}
        </p>

        {/* Trips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredTrips.map((trip, idx) => {
            const badge = getStatusBadge(trip.status);
            const budgetPercentage = (trip.spent / trip.budget) * 100;
            return (
              <div
                key={trip.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 cursor-pointer"
              >
                {/* Image */}
                {/* Image */}
                <div className="relative h-40 flex-shrink-0 overflow-hidden rounded-t-2xl">
                  <img
                    src={trip.image}
                    alt={trip.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  {/* Status Badge */}
                  <div
                    className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${badge.bg} ${badge.text}`}
                  >
                    {badge.label}
                  </div>
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-all">
                    <button className="bg-white px-4 py-2 rounded-full flex items-center gap-2 font-bold hover:shadow-lg">
                      <ChevronRight size={18} /> View Details
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {trip.title}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <MapPin size={16} className="text-orange-500" />{" "}
                    {trip.destination}
                  </div>

                  <div className="mb-4 flex flex-wrap gap-2">
                    {trip.highlights.slice(0, 3).map((h, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-primary"
                      >
                        {h}
                      </span>
                    ))}
                    {trip.highlights.length > 3 && (
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-primary">
                        +{trip.highlights.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-gray-200 text-gray-700 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} /> {trip.duration}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={16} /> {trip.travelers} traveler
                      {trip.travelers > 1 ? "s" : ""}
                    </div>
                    <div className="flex items-center gap-2">
                      🏨 {trip.accommodation}
                    </div>
                    <div className="flex items-center gap-2">
                      🎯 {trip.activities} activities
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2 text-gray-800 font-semibold">
                      <div className="flex items-center gap-1">
                        <DollarSign size={16} className="text-orange-500" /> $
                        {trip.spent} / ${trip.budget}
                      </div>
                      <span className="text-xs text-gray-500">
                        {Math.round(budgetPercentage)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full"
                        style={{
                          width: `${Math.min(budgetPercentage, 100)}%`,
                          background:
                            budgetPercentage > 100
                              ? "#f44336"
                              : "linear-gradient(90deg, #0680C9 0%, #E86201 100%)",
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    {trip.rating ? (
                      <div className="flex items-center gap-2">
                        <span>⭐</span> {trip.rating}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">
                        No rating yet
                      </span>
                    )}
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleLike(trip.id)}
                        className={`p-2 rounded-lg transition-transform hover:scale-110 ${likedTrips.has(trip.id) ? "bg-red-100 text-orange-500" : "bg-gray-100 text-gray-400"}`}
                      >
                        <Heart
                          size={18}
                          fill={
                            likedTrips.has(trip.id) ? "currentColor" : "none"
                          }
                        />
                      </button>
                      <button className="p-2 rounded-lg transition-transform hover:scale-110 hover:bg-blue-100">
                        <Share2 size={18} className="text-primary" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredTrips.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🌍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No trips found
            </h3>
            <p className="text-gray-600 mb-8">
              Try adjusting your search or filters
            </p>
            <button className="px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-br from-primary to-accent">
              Create New Trip
            </button>
          </div>
        )}

      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(30px);
          }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animation-delay-1s {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default MyTripsData;
