"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function BookedTrips() {
  const { data: session } = useSession();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.email) {
      setLoading(true);
      
      // FIX 1: Send BOTH 'email' and 'userEmail' just to be safe, 
      // or change this to match exactly what your backend controller uses.
      fetch(`https://travelee-server.vercel.app/my-trips?userEmail=${session.user.email}`)
        .then((res) => {
          if (!res.ok) throw new Error(`Error: ${res.status}`);
          return res.json();
        })
        .then((response) => {
          // FIX 2: Check for the 'data' wrapper from your backend response
          const actualData = response.success ? response.data : response;
          
          if (Array.isArray(actualData)) {
            setTrips(actualData);
          } else {
            setTrips([]);
          }
        })
        .catch((err) => {
          console.error("Fetch error:", err);
          setTrips([]);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [session]);

  if (loading) return <div className="p-10 text-center font-medium">Loading your adventures...</div>;
console.log(...trips);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Bookings</h1>
      <div className="space-y-4">
        {trips.length === 0 ? (
          <div className="text-center p-10 border-2 border-dashed rounded-xl">
             <p className="text-gray-500 italic">No trips found for {session?.user?.email}.</p>
          </div>
        ) : (
          trips.map((trip) => (
            <div key={trip._id} className="border p-5 rounded-xl shadow-sm bg-white flex justify-between items-center hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                {/* Display image if available in old or new format */}
                {(trip.image || trip.media?.cover_image) && (
                  <img 
                    src={trip.image || trip.media?.cover_image} 
                    alt="destination" 
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                )}
                <div>
                  <h2 className="text-xl font-bold text-blue-600">
                    {/* FIX 3: Support both 'city' (old) and 'destination' (new) */}
                    {trip.destination || trip.city || "Trip Destination"}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {trip.startDate} to {trip.endDate}
                  </p>
                  {trip.country && <p className="text-xs text-gray-400">{trip.country}</p>}
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-lg font-bold text-gray-800">${trip.totalCost || "0"}</p>
                <span className={`text-[10px] uppercase tracking-widest font-black px-3 py-1 rounded-full ${
                  trip.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {trip.status || 'Planned'}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}