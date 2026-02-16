"use client";
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";
import { 
  Search, 
  Calendar, 
  CloudSun, 
  Users, 
  Heart, 
  Shield 
} from "lucide-react";
import Link from "next/link";

const steps = [
  {
    title: "Discover Destinations",
    desc: "Search destinations using filters like budget, location, and tags. Explore real user reviews and photos.",
    color: "#0046FF",
    gradient: "from-blue-500 to-cyan-400",
    icon: Search,
    pattern: "dots",
    link: "/destinations",
  },
  {
    title: "Build Smart Itinerary",
    desc: "Create day-by-day travel plans with a drag-and-drop itinerary builder for sightseeing, meals, and rest.",
    color: "#FF9013",
    gradient: "from-orange-500 to-amber-400",
    icon: Calendar,
    pattern: "grid",
    link: "/itinerary",
  },
  {
    title: "Check Budget & Weather",
    desc: "Get estimated travel cost and weather-based activity suggestions before confirming your plan.",
    color: "#73C8D2",
    gradient: "from-cyan-400 to-teal-300",
    icon: CloudSun,
    pattern: "waves",
    link: "/weather"
  },
  {
    title: "Collaborate with Friends",
    desc: "Invite friends to edit the same trip plan in real-time and make group decisions easily.",
    color: "#F5F1DC",
    gradient: "from-purple-500 to-pink-400",
    icon: Users,
    pattern: "circles",
    link:"collaborate"
  },
  {
    title: "Save, Review & Share",
    desc: "Save favorite places to wishlist and post real-time reviews with images after your trip.",
    color: "#0046FF",
    gradient: "from-rose-500 to-orange-400",
    icon: Heart,
    pattern: "diagonal",
    link: "save"
  },
  {
    title: "Admin Moderation",
    desc: "Admins verify reviews, manage destinations, and monitor platform activity to ensure trust.",
    color: "#FF9013",
    gradient: "from-indigo-500 to-blue-400",
    icon: Shield,
    pattern: "dots",
    link: "/admin/dashboard",
  },
];

const PatternOverlay = ({ pattern }) => {
  switch (pattern) {
    case "dots":
      return (
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }} />
        </div>
      );
    case "grid":
      return (
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }} />
        </div>
      );
    case "waves":
      return (
        <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
          <pattern id="waves" x="0" y="0" width="100" height="20" patternUnits="userSpaceOnUse">
            <path d="M0 10 Q 25 0, 50 10 T 100 10" fill="none" stroke="currentColor" strokeWidth="1"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#waves)" />
        </svg>
      );
    case "circles":
      return (
        <div className="absolute inset-0 opacity-5 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full border-2 border-current" />
          <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full border-2 border-current" />
        </div>
      );
    case "diagonal":
      return (
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, currentColor 0px, currentColor 1px, transparent 1px, transparent 20px)',
          }} />
        </div>
      );
    default:
      return null;
  }
};

export default function HowItWorks() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20 relative">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-4">
          <span className="text-[#3493cc]">How</span>{" "}
          <span className="text-[#ed8433]">Travelee Works</span>
        </h2>
        <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
          Your journey from inspiration to adventure in six simple steps
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
      >
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 50, scale: 0.9 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Link href={step.link} className="block h-full"
              
              >

              <Card className="group relative overflow-hidden h-full border-2 border-transparent hover:border-gray-200 transition-all duration-500 hover:shadow-2xl rounded-2xl bg-white">
                {/* Pattern overlay */}
                <PatternOverlay pattern={step.pattern} />
                
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                {/* Animated corner accent */}
                <div className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16">
                  <div className={`w-full h-full rounded-full bg-gradient-to-br ${step.gradient} opacity-20 group-hover:opacity-30 transition-all duration-500 group-hover:scale-150`} />
                </div>

                {/* Step number badge */}
                <div className="absolute top-4 left-4 z-10">
                  <motion.div
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className="text-white font-bold text-lg">{index + 1}</span>
                  </motion.div>
                </div>

                <CardHeader className="pt-20 pb-4">
                  {/* Icon */}
                  <motion.div
                    className="mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-md group-hover:shadow-xl transition-shadow duration-300`}>
                      <Icon className="w-8 h-8 text-white" strokeWidth={2.5} />
                    </div>
                  </motion.div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#3493cc] group-hover:to-[#ed8433] transition-all duration-300">
                    {step.title}
                  </h3>
                </CardHeader>

                <CardContent className="relative z-10">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.desc}
                  </p>

                  {/* Decorative bottom bar */}
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <div className={`h-1 w-0 group-hover:w-full bg-gradient-to-r ${step.gradient} rounded-full transition-all duration-500`} />
                  </div>
                </CardContent>

                {/* Floating particles effect */}
                <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden pointer-events-none">
                  <div className={`absolute bottom-0 left-1/4 w-2 h-2 rounded-full bg-gradient-to-r ${step.gradient} opacity-0 group-hover:opacity-60 group-hover:animate-float`} />
                  <div className={`absolute bottom-0 left-1/2 w-2 h-2 rounded-full bg-gradient-to-r ${step.gradient} opacity-0 group-hover:opacity-60 group-hover:animate-float animation-delay-200`} />
                  <div className={`absolute bottom-0 left-3/4 w-2 h-2 rounded-full bg-gradient-to-r ${step.gradient} opacity-0 group-hover:opacity-60 group-hover:animate-float animation-delay-400`} />
                </div>
              </Card>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Add custom animations to your global CSS or tailwind.config.js */}
      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes float {
          0% { transform: translateY(0px); opacity: 0; }
          50% { opacity: 0.6; }
          100% { transform: translateY(-100px); opacity: 0; }
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
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </section>
  );
}