"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";
import { 
  LayoutDashboard,
  Search,
  User,
  MessageSquare,
  Calculator,
  Heart,
  ShieldCheck,
  Globe,
  Users,
  CloudSun,
  Zap,
  Target,
  TrendingUp
} from "lucide-react";

const uspFeatures = [
  {
    title: "Smart Itinerary Builder",
    desc: "Drag-and-drop tool to create day-by-day travel schedules including sightseeing, meals, and rest periods with intuitive planning.",
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
    icon: LayoutDashboard,
    category: "Planning",
  },
  {
    title: "Dynamic Search & Filtering",
    desc: "Powerful search with real-time data filtering by tags, budget, and location to find your perfect destination instantly.",
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
    icon: Search,
    category: "Discovery",
  },
  {
    title: "Personalized Dashboard",
    desc: "Manage upcoming trips, view activity history, and receive personalized travel suggestions tailored to your preferences.",
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    icon: User,
    category: "Experience",
  },
  {
    title: "Real-time Review System",
    desc: "Live feedback with ratings and images allowing instant updates about locations from the community.",
    gradient: "from-rose-500 via-pink-500 to-red-500",
    icon: MessageSquare,
    category: "Community",
  },
  {
    title: "Travel Cost Estimator",
    desc: "Automated budget calculator based on destination, trip duration, and travel style for accurate planning.",
    gradient: "from-emerald-500 via-green-500 to-lime-500",
    icon: Calculator,
    category: "Planning",
  },
  {
    title: "Smart Wishlist",
    desc: "Save favorite destinations and itineraries to your personalized wishlist for future planning and inspiration.",
    gradient: "from-red-500 via-rose-500 to-pink-500",
    icon: Heart,
    category: "Experience",
  },
  {
    title: "Interactive Admin Panel",
    desc: "Comprehensive control center to manage content, verify reviews, update destinations, and track analytics.",
    gradient: "from-indigo-500 via-blue-500 to-cyan-500",
    icon: ShieldCheck,
    category: "Management",
  },
  {
    title: "Multi-language Support",
    desc: "Toggle between English and Bangla to make travel planning accessible to a wider global audience.",
    gradient: "from-purple-500 via-violet-500 to-indigo-500",
    icon: Globe,
    category: "Accessibility",
  },
  {
    title: "Collaborative Planning",
    desc: "Real-time collaboration allowing friends to join trip groups and edit itineraries simultaneously.",
    gradient: "from-cyan-500 via-blue-500 to-indigo-500",
    icon: Users,
    category: "Community",
  },
  {
    title: "Weather-Adaptive Scheduling",
    desc: "Real-time weather forecasts suggesting optimal indoor or outdoor activities based on travel dates.",
    gradient: "from-sky-500 via-blue-400 to-cyan-400",
    icon: CloudSun,
    category: "Innovation",
  },
];

const whyDifferent = [
  {
    title: "SEO Optimized",
    desc: "Server-side rendering ensures maximum visibility in search results",
    icon: TrendingUp,
    color: "from-blue-600 to-cyan-600",
  },
  {
    title: "Lightning Fast",
    desc: "Next.js optimization delivers instant loading on any device",
    icon: Zap,
    color: "from-orange-600 to-amber-600",
  },
  {
    title: "User-Centric",
    desc: "Built for solo travelers, groups, and content creators",
    icon: Target,
    color: "from-purple-600 to-pink-600",
  },
];

export default function USP() {
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    setMounted(true);
  }, []);

  const categories = ["All", "Planning", "Discovery", "Experience", "Community", "Management", "Accessibility", "Innovation"];
  
  const filteredFeatures = activeCategory === "All" 
    ? uspFeatures 
    : uspFeatures.filter(feature => feature.category === activeCategory);

  return (
    <section className="max-w-7xl mx-auto px-4 py-20 relative overflow-hidden">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Header Section */}
      <motion.div
        initial={mounted ? { opacity: 0, y: -30 } : false}
        animate={mounted ? { opacity: 1, y: 0 } : false}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <div className="inline-block mb-4">
          <span className="px-6 py-2 rounded-full bg-gradient-to-r from-[#3493cc] to-[#ed8433] text-white text-sm font-semibold shadow-lg">
            What Makes Us Different
          </span>
        </div>
        
        <h2 className="text-5xl md:text-6xl font-extrabold mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#3493cc] via-purple-500 to-[#ed8433]">
            Unique Features
          </span>
          <br />
          <span className="text-gray-900">That Set Us Apart</span>
        </h2>
        
        <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
          Travelee combines cutting-edge technology with user-centric design to deliver 
          an unmatched travel planning experience that addresses every traveler's need.
        </p>
      </motion.div>

      {/* Category Filter Pills */}
      <motion.div
        initial={mounted ? { opacity: 0, y: 20 } : false}
        animate={mounted ? { opacity: 1, y: 0 } : false}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-wrap justify-center gap-3 mb-12"
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
              activeCategory === category
                ? "bg-gradient-to-r from-[#3493cc] to-[#ed8433] text-white shadow-lg scale-105"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
            }`}
          >
            {category}
          </button>
        ))}
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        {filteredFeatures.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={mounted ? { opacity: 0, scale: 0.8, y: 50 } : false}
              animate={mounted ? { opacity: 1, scale: 1, y: 0 } : false}
              transition={{ 
                duration: 0.5, 
                delay: mounted ? index * 0.1 : 0,
                type: "spring",
                stiffness: 100
              }}
              layout
            >
              <Card className="group relative overflow-hidden h-full border-2 border-gray-100 hover:border-transparent transition-all duration-500 hover:shadow-2xl rounded-3xl bg-white/80 backdrop-blur-sm">
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                {/* Floating Gradient Circle */}
                <div className="absolute -top-20 -right-20 w-40 h-40 opacity-0 group-hover:opacity-100 transition-all duration-700">
                  <div className={`w-full h-full rounded-full bg-gradient-to-br ${feature.gradient} blur-2xl`} />
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/90 text-gray-700 shadow-sm">
                    {feature.category}
                  </span>
                </div>

                <CardHeader className="pt-8 pb-4">
                  {/* Icon Container */}
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-6"
                  >
                    <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.gradient} p-0.5 shadow-xl group-hover:shadow-2xl transition-shadow duration-300`}>
                      <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center">
                        <Icon className={`w-10 h-10 bg-gradient-to-br ${feature.gradient} bg-clip-text text-transparent`} strokeWidth={2} />
                      </div>
                    </div>
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#3493cc] group-hover:to-[#ed8433] transition-all duration-300">
                    {feature.title}
                  </h3>
                </CardHeader>

                <CardContent className="relative z-10 pb-8">
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {feature.desc}
                  </p>

                  {/* Progress Bar */}
                  <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${feature.gradient}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1, delay: 0.2 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </CardContent>

                {/* Corner Decoration */}
                <div className="absolute bottom-0 right-0 w-24 h-24 -mb-12 -mr-12 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                  <div className={`w-full h-full rounded-full bg-gradient-to-br ${feature.gradient}`} />
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Why We're Different Section */}
      <motion.div
        initial={mounted ? { opacity: 0, y: 30 } : false}
        animate={mounted ? { opacity: 1, y: 0 } : false}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="relative"
      >
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Powered by <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">Next.js</span>
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Leveraging cutting-edge technology to deliver exceptional performance and user experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {whyDifferent.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={mounted ? { opacity: 0, x: -50 } : false}
                animate={mounted ? { opacity: 1, x: 0 } : false}
                transition={{ duration: 0.5, delay: mounted ? 0.6 + index * 0.1 : 0 }}
                whileHover={{ y: -10 }}
                className="relative group"
              >
                <div className="relative p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100 hover:border-transparent hover:shadow-2xl transition-all duration-500 overflow-hidden">
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  <div className="relative z-10">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                      <Icon className="w-8 h-8 text-white" strokeWidth={2.5} />
                    </div>
                    
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      {item.title}
                    </h4>
                    
                    <p className="text-gray-600 text-sm">
                      {item.desc}
                    </p>
                  </div>

                  {/* Decorative Element */}
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                    <div className={`w-full h-full rounded-full bg-gradient-to-br ${item.color}`} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={mounted ? { opacity: 0, scale: 0.9 } : false}
        animate={mounted ? { opacity: 1, scale: 1 } : false}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="mt-20 text-center"
      >
        <div className="inline-block p-1 rounded-3xl bg-gradient-to-r from-[#3493cc] via-purple-500 to-[#ed8433]">
          <div className="bg-white rounded-3xl px-12 py-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Ready to Plan Your Next Adventure?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of travelers who trust Travelee for smarter, easier trip planning
            </p>
            <button className="px-8 py-4 rounded-full bg-gradient-to-r from-[#3493cc] to-[#ed8433] text-white font-bold text-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
              Start Planning Now
            </button>
          </div>
        </div>
      </motion.div>

      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}