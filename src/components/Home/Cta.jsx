import { ArrowRight, PlayCircle } from "lucide-react";
import Link from "next/link";

const CTA = () => {
  return (
    <section className="relative py-16 md:py-20 overflow-hidden bg-gradient-to-br from-primary via-secondary to-accent">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Circles */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/20 rounded-full blur-3xl"></div>
        {/* Floating Icons */}
        <div className="absolute top-1/4 left-1/4 animate-float">
          <div className="text-white/20 text-6xl">✈️</div>
        </div>
        <div className="absolute top-1/3 right-1/4 animate-float-delayed">
          <div className="text-white/20 text-5xl">🗺️</div>
        </div>
        <div className="absolute bottom-1/4 left-1/3 animate-float-slow">
          <div className="text-white/20 text-7xl">🌍</div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-5 py-2 rounded-full text-sm font-medium mb-4 md:mb-8 border border-white/30">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          <span>Join 10,000+ Happy Travelers</span>
        </div>

        {/* Main Heading with Gradient Effect */}
        <h2 className="text-4xl md:text-7xl font-bold mb-3 md:mb-6 text-white ">
          Ready to start your
          <span className="block mt-2 bg-gradient-to-r from-white via-orange-200 to-white bg-clip-text text-transparent animate-gradient">
            dream journey?
          </span>
        </h2>

        {/* Subheading */}
        <p className="mb-6 md:mb-12 text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
          Discover amazing destinations, book instantly, and create memories that last forever.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6 md:mb-12">
          {/* Primary Button */}
          <Link
            href="/register"
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-accent via-secondary to-primary text-white border-2 border-white/30 hover:border-white/50 font-bold px-6 py-3 md:px-10 md:py-5 rounded-2xl hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-white/50"
          >
            <span className="text-lg">Get Started - It's Free</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
            {/* Shine Effect */}
            <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
          </Link>

          {/* Secondary Button */}
          <Link
            href="/destinations"
            className="group inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm text-white font-semibold px-6 py-3 md:px-10 md:py-5 rounded-2xl hover:bg-white/20 transition-all duration-300 border-2 border-white/30 hover:border-white/50"
          >
            <PlayCircle className="w-5 h-5"/>
            <span className="text-lg">Watch Demo</span>
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto pt-4 md:pt-8 border-t border-white/20">
          <div className="text-center">
            <div className="text-2xl md:text-4xl font-bold text-white md:mb-2">10K+</div>
            <div className="text-white/80 text-sm">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-4xl font-bold text-white md:mb-2">150+</div>
            <div className="text-white/80 text-sm">Destinations</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-4xl font-bold text-yellow-500 md:mb-2">4.9⭐</div>
            <div className="text-white/80 text-sm">User Rating</div>
          </div>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-10 md:mt-12">
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm border border-white/20">
            ✅ No credit card required
          </span>
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm border border-white/20">
            ⚡ Instant booking
          </span>
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm border border-white/20">
            🔒 100% secure
          </span>
        </div>
      </div>

      {/* CSS for custom animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 8s ease-in-out infinite;
          animation-delay: 2s;
        }
        .animate-float-slow {
          animation: float 10s ease-in-out infinite;
          animation-delay: 1s;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .delay-700 {
          animation-delay: 700ms;
        }
      `}</style>
    </section>
  );
};

export default CTA;