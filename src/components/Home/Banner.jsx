// src/components/Banner.jsx
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaPlaneDeparture, FaVideo } from "react-icons/fa";

const bannerData = {
  colors: {
    primary: "#FF7A18",      // Sunset Orange
    primaryLight: "#FFB347", // Golden Sun
    accent: "#1DA1F2",       // Sky Blue
  },

  headline: {
    main: "Discover the world,",
    highlight: "one trip at a time",
  },
  subtitle:
    "Handpicked destinations, smart planning tools, and unforgettable experiences — start your journey with us today.",

  ctas: {
    plan: "Plan Your Adventure",
    watchStory: "Watch Travel Stories",
  },

  stats: [
    {
      avatars: [
        "https://i.pravatar.cc/300?img=32",
        "https://i.pravatar.cc/300?img=44",
        "https://i.pravatar.cc/300?img=68",
      ],
      count: "3K+",
      label: "Happy Travelers",
    },
    {
      count: "2,000+",
      label: "Destinations",
    },
  ],

  heroImage: {
    url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&auto=format&fit=crop&q=80",
    alt: "Traveler enjoying mountain view",
  },

  phoneMockup: {
    url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
    alt: "Travel app on mobile phone",
  },
};

export default function Banner() {
  const { colors, headline, subtitle, ctas, stats, heroImage, phoneMockup } = bannerData;

  return (
    <section className="relative w-full overflow-hidden pt-24 pb-32">
      {/* Inline animations & keyframes (one-file only) */}
      <style>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(14px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-float { animation: floatSlow 6s ease-in-out infinite; }
        .animate-fade-up { animation: fadeUp 700ms ease-out both; }
      `}</style>

      {/* 🌤️ Sky + Sun Glow Background */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, ${colors.accent}22 0%, white 45%, ${colors.primaryLight}22 100%)`,
          }}
        />
        <div
          className="absolute -top-40 right-10 w-[520px] h-[520px] rounded-full blur-[140px]"
          style={{ backgroundColor: `${colors.primary}55` }}
        />
        <div
          className="absolute top-1/3 -left-40 w-[420px] h-[420px] rounded-full blur-[140px]"
          style={{ backgroundColor: `${colors.accent}44` }}
        />
      </div>

      <div className="container mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left content */}
        <div className="space-y-8">
          <div
            className="inline-block rounded-full px-4 py-1 text-sm font-medium animate-fade-up"
            style={{
              background: `${colors.accent}22`,
              color: colors.accent,
            }}
          >
            ✈️ Your next adventure starts here
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight animate-fade-up">
            {headline.main}{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(90deg, ${colors.primary}, ${colors.primaryLight})`,
              }}
            >
              {headline.highlight}
            </span>
          </h1>

          <p className="text-lg sm:text-xl max-w-xl text-gray-600 animate-fade-up" style={{ animationDelay: "120ms" }}>
            {subtitle}
          </p>

          <div className="flex flex-wrap gap-4 pt-2 animate-fade-up" style={{ animationDelay: "200ms" }}>
            <Button
              size="lg"
              className="rounded-full px-8 py-6 text-base text-white shadow-xl transition hover:scale-[1.06] hover:shadow-2xl active:scale-[0.98]"
              style={{
                background: `linear-gradient(90deg, ${colors.primary}, ${colors.primaryLight})`,
              }}
            >
              {ctas.plan}
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 py-6 text-base transition hover:scale-[1.06] hover:shadow-lg active:scale-[0.98]"
              style={{
                borderColor: colors.accent,
                color: colors.accent,
              }}
            >
              <FaVideo className="mr-2" />
              {ctas.watchStory}
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-10 pt-6 animate-fade-up" style={{ animationDelay: "320ms" }}>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {stats[0].avatars.map((src, idx) => (
                  <Avatar key={idx} className="w-9 h-9 border-2 border-white">
                    <AvatarImage src={src} alt={`Traveler ${idx + 1}`} />
                    <AvatarFallback>{String.fromCharCode(65 + idx)}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <div className="text-sm">
                <p className="font-semibold">{stats[0].count}</p>
                <p className="text-gray-500">{stats[0].label}</p>
              </div>
            </div>

            <div className="text-sm">
              <p className="font-semibold">{stats[1].count}</p>
              <p className="text-gray-500">{stats[1].label}</p>
            </div>
          </div>
        </div>

        {/* Right visual */}
        <div className="relative hidden lg:block">
          <Card className="relative overflow-hidden rounded-[36px] shadow-2xl border border-white/50 bg-white/70 backdrop-blur-xl animate-float">
            <img
              src={heroImage.url}
              alt={heroImage.alt}
              className="w-full h-[520px] object-cover transition-transform duration-700 hover:scale-[1.03]"
            />
          </Card>

          {/* Floating phone */}
          <Card className="absolute -bottom-12 -left-12 p-4 rounded-2xl shadow-2xl bg-white animate-float" style={{ animationDelay: "1.2s" }}>
            <img
              src={phoneMockup.url}
              alt={phoneMockup.alt}
              className="w-[190px] h-[380px] object-cover rounded-xl"
            />
          </Card>

          {/* Floating badge */}
          <div
            className="absolute -top-6 -right-6 w-20 h-20 rounded-full flex items-center justify-center text-center text-xs font-bold text-white shadow-xl animate-float"
            style={{
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`,
              animationDelay: "2s",
            }}
          >
            24/7
            <br />
            Travel
            <br />
            Support
          </div>
        </div>
      </div>
    </section>
  );
}
