import { Button } from "@/components/ui/button";
import Image from "next/image";
import { MapPin, Users, Star } from "lucide-react";

export default function About() {
  return (
    <section className="py-12 px-4 md:px-20 bg-gradient-to-r from-[#f6f9fc] to-[#fff3e8]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">

        {/* Left Content (Image + About Badge Right Aligned) */}
        <div className="md:w-1/2 flex justify-center">
          <div className="w-full rounded-2xl text-right">
            <p className="inline-flex items-center gap-2 mb-3 rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-600">
              <MapPin size={16} />
              About Us
            </p>

            <Image
              src="https://i.ibb.co.com/bgsWhmN9/vinwonders.jpg"
              alt="Travel Planning"
              width={500}
              height={500}
              className="w-full rounded-2xl shadow-lg"
            />
          </div>
        </div>

        {/* Right Content */}
        <div className="md:w-1/2">
          <h2 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">
            Plan Smart,
            <span className="text-orange-500"> Travel Easy</span>
          </h2>

          <p className="text-gray-600 text-base md:text-lg mb-4">
            Travelee is your all-in-one travel planning and review platform,
            designed to make every journey seamless and memorable.
          </p>

          {/* Icon Features */}
          <div className="space-y-3 mb-6">
            <div className="flex justify-start items-center gap-3">
              <MapPin className="text-orange-500" size={20} />
              <p className="text-gray-700 font-medium">
                Smart Itinerary Builder
              </p>
            </div>

            <div className="flex justify-start items-center gap-3">
              <Users className="text-orange-500" size={20} />
              <p className="text-gray-700 font-medium">
                Collaborative Trip Planning
              </p>
            </div>

            <div className="flex justify-start items-center gap-3">
              <Star className="text-orange-500" size={20} />
              <p className="text-gray-700 font-medium">
                Real-time Reviews & Ratings
              </p>
            </div>
          </div>

          <Button className="bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600 transition">
            Explore Features
          </Button>
        </div>
      </div>
    </section>
  );
}
