"use client";

import React, { useState } from "react";
import {
  MapPin,
  Heart,
  Share2,
  Trash2,
  Plus,
  Search,
  Clock,
} from "lucide-react";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      destination: "Bali, Indonesia",
      note: "Beach vacation with white sand",
      image:
        "https://i.pinimg.com/736x/79/7f/10/797f10311478899b73037d563d76b7f4.jpg",
      category: "beach",
      priority: "high",
      estimatedCost: 2500,
      activities: ["Surfing", "Temples", "Rice Terraces"],
      addedDate: "2025-01-15",
      liked: true,
    },
    {
      id: 2,
      destination: "Santorini, Greece",
      note: "Romantic sunset getaway",
      image:
        "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=800&q=80",
      category: "romantic",
      priority: "high",
      estimatedCost: 3500,
      activities: ["Sunset Viewing", "Wine Tasting", "Island Hopping"],
      addedDate: "2025-01-10",
      liked: true,
    },
    {
      id: 3,
      destination: "Kyoto, Japan",
      note: "Cherry blossom season exploration",
      image:
        "https://i.pinimg.com/736x/3f/91/ca/3f91ca5bb89f9980f7840350224bb393.jpg",
      category: "cultural",
      priority: "medium",
      estimatedCost: 2800,
      activities: ["Temple Tours", "Tea Ceremony", "Geisha Show"],
      addedDate: "2025-01-08",
      liked: false,
    },
    {
      id: 4,
      destination: "Iceland",
      note: "Northern lights adventure",
      image:
        "https://i.pinimg.com/736x/b2/0d/01/b20d01b7a37dfc7fcb34e2548435d85d.jpg",
      category: "adventure",
      priority: "high",
      estimatedCost: 4200,
      activities: ["Northern Lights", "Waterfalls", "Glacier Hiking"],
      addedDate: "2025-01-05",
      liked: true,
    },
    {
      id: 5,
      destination: "Maldives",
      note: "Luxury island resort experience",
      image:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80",
      category: "luxury",
      priority: "medium",
      estimatedCost: 5500,
      activities: ["Snorkeling", "Spa", "Water Bungalows"],
      addedDate: "2024-12-28",
      liked: true,
    },
    {
      id: 6,
      destination: "New Zealand",
      note: "Adventure sports and stunning landscapes",
      image:
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
      category: "adventure",
      priority: "low",
      estimatedCost: 3800,
      activities: ["Bungee Jumping", "Hiking", "Fjord Tours"],
      addedDate: "2024-12-20",
      liked: false,
    },
    {
      id: 7,
      destination: "Dubai, UAE",
      note: "Modern luxury and desert experiences",
      image:
        "https://i.pinimg.com/1200x/bf/cb/59/bfcb59d525bd4c82d3f8934652f4a4c1.jpg",
      category: "luxury",
      priority: "medium",
      estimatedCost: 2900,
      activities: ["Desert Safari", "Burj Khalifa", "Gold Souk"],
      addedDate: "2024-12-15",
      liked: true,
    },
    {
      id: 8,
      destination: "Barcelona, Spain",
      note: "Architecture and Mediterranean charm",
      image:
        "https://i.pinimg.com/1200x/53/3e/c7/533ec7964cb0f789a279487730791ab4.jpg",
      category: "cultural",
      priority: "low",
      estimatedCost: 1800,
      activities: ["Sagrada Familia", "Park Güell", "Gothic Quarter"],
      addedDate: "2024-12-10",
      liked: false,
    },
  ]);

  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");

  const categories = [
    { id: "all", label: "All", icon: "🌍" },
    { id: "beach", label: "Beach", icon: "🏖️" },
    { id: "adventure", label: "Adventure", icon: "🏔️" },
    { id: "cultural", label: "Cultural", icon: "🏛️" },
    { id: "romantic", label: "Romantic", icon: "💑" },
    { id: "luxury", label: "Luxury", icon: "✨" },
  ];

  const filteredAndSortedItems = wishlistItems
    .filter((item) => {
      const matchesCategory =
        selectedFilter === "all" || item.category === selectedFilter;
      const matchesSearch =
        item.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.note.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "recent")
        return new Date(b.addedDate) - new Date(a.addedDate);
      if (sortBy === "price-low") return a.estimatedCost - b.estimatedCost;
      if (sortBy === "price-high") return b.estimatedCost - a.estimatedCost;
      if (sortBy === "priority") {
        const priorityMap = { high: 3, medium: 2, low: 1 };
        return priorityMap[b.priority] - priorityMap[a.priority];
      }
      return 0;
    });

  const removeItem = (id) =>
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
  const toggleLike = (id) =>
    setWishlistItems(
      wishlistItems.map((item) =>
        item.id === id ? { ...item, liked: !item.liked } : item,
      ),
    );

  const stats = [
    {
      label: "Destinations",
      value: wishlistItems.length,
      icon: "🌏",
      color: "#0680C9",
    },
    {
      label: "Total Budget",
      value: `$${wishlistItems.reduce((sum, item) => sum + item.estimatedCost, 0)}`,
      icon: "💰",
      color: "#E86201",
    },
    {
      label: "Favorites",
      value: wishlistItems.filter((i) => i.liked).length,
      icon: "❤️",
      color: "#E86201",
    },
  ];

  const getPriorityBadge = (priority) => {
    const badges = {
      high: { bg: "#ffebee", color: "#c62828", label: "High Priority" },
      medium: { bg: "#fff3e0", color: "#e65100", label: "Medium Priority" },
      low: { bg: "#e8f5e9", color: "#2e7d32", label: "Low Priority" },
    };
    return badges[priority];
  };

  return (
    <div className="min-h-screen relative md:px-6 py-12">
      {/* Floating circles */}
      <div className="fixed top-0 left-0 w-96 h-96 rounded-full pointer-events-none opacity-10 bg-gradient-radial from-blue-500 to-transparent blur-3xl animate-float"></div>
      <div className="fixed bottom-0 right-0 w-96 h-96 rounded-full pointer-events-none opacity-10 bg-gradient-radial from-orange-500 to-transparent blur-3xl animate-float animation-delay-1000"></div>

      {/* Header */}
      <div className="mb-12 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
    
          <h1 className="text-5xl md:text-6xl font-bold text-blue-700">
            My Wishlist
          </h1>
        </div>
        <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto md:mx-0">
          Discover and save your dream destinations. Plan your perfect getaway
          from amazing places
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-6 shadow hover:shadow-xl transition-all"
            style={{ borderTop: `4px solid ${stat.color}` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm uppercase tracking-wide mb-2">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold" style={{ color: stat.color }}>
                  {stat.value}
                </p>
              </div>
              <div className="text-4xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="mb-10">
        <div className="relative mb-6  mx-auto md:mx-0">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search destinations, activities, notes..."
            className="w-full pl-12 pr-6 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:outline-none shadow-sm"
          />
        </div>

        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
            Categories
          </p>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedFilter(cat.id)}
                className={`px-5 py-2 rounded-full font-semibold whitespace-nowrap transition-all transform hover:scale-105 ${
                  selectedFilter === cat.id
                    ? "bg-blue-700 text-white shadow-md"
                    : "bg-white text-blue-700 border border-gray-300"
                }`}
              >
                <span className="mr-2">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex gap-2 flex-wrap">
            {["recent", "priority", "price-low", "price-high"].map((option) => {
              const labels = {
                recent: "Most Recent",
                priority: "Priority",
                "price-low": "Lowest Price",
                "price-high": "Highest Price",
              };
              return (
                <button
                  key={option}
                  onClick={() => setSortBy(option)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    sortBy === option
                      ? "bg-gradient-to-r from-blue-500 to-orange-500 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {labels[option]}
                </button>
              );
            })}
          </div>
          <p className="text-sm text-gray-600 mt-2 sm:mt-0">
            Showing{" "}
            <span className="font-bold text-gray-800">
              {filteredAndSortedItems.length}
            </span>{" "}
            destination{filteredAndSortedItems.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Wishlist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedItems.map((item) => {
          const badge = getPriorityBadge(item.priority);
          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow hover:shadow-2xl transition-all transform hover:-translate-y-2 overflow-hidden flex flex-col"
              style={{ height: "460px" }} 
            >
              {/* Image */}
              <div className="relative h-48 flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.destination}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div
                  className="absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold"
                  style={{ background: badge.bg, color: badge.color }}
                >
                  {item.priority === "high"
                    ? "🔴"
                    : item.priority === "medium"
                      ? "🟠"
                      : "🟢"}{" "}
                  {badge.label}
                </div>
                <div
                  className="absolute top-4 right-4 px-3 py-1 rounded-full font-bold text-white text-sm"
                  style={{
                    background:
                      "linear-gradient(135deg, #0680C9 0%, #E86201 100%)",
                  }}
                >
                  ${item.estimatedCost}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col justify-between flex-1">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin
                      size={18}
                      className="text-orange-500 flex-shrink-0"
                    />
                    <h3 className="text-lg font-bold text-gray-800 truncate">
                      {item.destination}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm ml-6 line-clamp-2">
                    {item.note}
                  </p>

                  <div className="flex flex-wrap gap-2 max-h-16 overflow-hidden">
                    {item.activities.map((act, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1 rounded-full font-medium bg-blue-50 text-blue-700"
                      >
                        {act}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-gray-500 text-xs border-t border-gray-200 pt-2">
                    <Clock size={14} />
                    <span>
                      Added on{" "}
                      {new Date(item.addedDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => toggleLike(item.id)}
                    className={`flex-1 py-2 rounded-xl font-semibold transition-all flex items-center justify-center gap-1 ${
                      item.liked
                        ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    <Heart
                      size={16}
                      fill={item.liked ? "currentColor" : "none"}
                    />
                    {item.liked ? "Saved" : "Save"}
                  </button>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>

                  <button className="p-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 transition-all">
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredAndSortedItems.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl shadow-lg mt-10">
          <div className="text-6xl mb-4">🌍</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            No destinations found
          </h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your filters or search to find your dream destination
          </p>
          <button className="px-8 py-3 rounded-xl font-bold text-white text-lg bg-gradient-to-r from-blue-500 to-orange-500 shadow-md flex items-center justify-center gap-2 mx-auto">
            <Plus size={20} /> Add Destination
          </button>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
