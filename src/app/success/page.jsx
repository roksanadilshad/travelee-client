"use client";
import Link from "next/link";
import { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import confetti from "canvas-confetti"; // Optional: npm install canvas-confetti
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
    const searchParams = useSearchParams();
  const tripId = searchParams.get("tripId");
  useEffect(() => {
    // Celebrate the booking!
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 text-center">
        <div className="flex justify-center mb-6">
          <FaCheckCircle className="text-green-500 text-7xl" />
        </div>
        <h1 className="text-3xl font-black text-gray-900 mb-4">
          Booking Confirmed!
        </h1>
        <p className="text-gray-600 mb-8">
          Pack your bags! Your payment was successful and your itinerary is now secured.
        </p>
        <div className="space-y-4">
          <Link 
            href="/dashboard/my-trips" 
            className="block w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-blue-600 transition-colors"
          >
            View My Trips
          </Link>
          <Link 
            href="/" 
            className="block w-full bg-gray-100 text-gray-600 font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}