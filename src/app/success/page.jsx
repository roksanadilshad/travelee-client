"use client";
import Link from "next/link";
import { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import confetti from "canvas-confetti"; 
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const tripId = searchParams.get("tripId");

 useEffect(() => {
  // 1. Fixed Confetti (no workers)
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
    useWorker: false 
  });

  // 2. Fixed Fetch (correct port and error handling)
  if (tripId) {
    // Changed port to 5000 to match your server.js
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payments/mark-as-paid`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tripId }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Server responded with ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data.success) console.log("Status updated to PAID");
      })
      .catch((err) => {
        console.error("Failed to update status. Check if the route exists on port 5000:", err);
      });
  }
}, [tripId]);
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
            href="/dashboard/my-trips" // Double check your dashboard path
            className="block w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors"
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