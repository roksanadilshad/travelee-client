"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Download, Trash2, Ticket } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import TripReviewForm from "../Reviews/TripReviewForm";
import axios from "axios";
import { Button } from "../ui/button";

export default function BookedTrips() {
  const { data: session } = useSession();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const MySwal = withReactContent(Swal);

  const isTripOver = (endDate) => {
    if (!endDate) return false;
    return new Date(endDate) < new Date();
  };

  const downloadTicket = async (tripId) => {
    const element = document.getElementById(`ticket-${tripId}`);
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
    pdf.save(`Ticket-${tripId}.pdf`);
  };

  useEffect(() => {
    if (session?.user?.email) {
      setLoading(true);
      fetch(`https://travelee-server.vercel.app/my-trips?userEmail=${session.user.email}`)
        .then((res) => res.json())
        .then((response) => {
          const actualData = response.success ? response.data : response;
          setTrips(Array.isArray(actualData) ? actualData : []);
        })
        .finally(() => setLoading(false));
    }
  }, [session]);

  if (loading) return <div className="p-10 text-center">Loading adventures...</div>;

  // Weather Modal Component
  const WeatherButtonModalButton = ({ tripId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [weatherData, setWeatherData] = useState([]);
  const [loadingWeather, setLoadingWeather] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const fetchWeather = async () => {
      setLoadingWeather(true);
      try {
        const res = await axios.get(
          `https://travelee-server.vercel.app/itinerary/${tripId}/myTrip/weather`
        );
        if (res.data.success) setWeatherData(res.data.weatherSummary);
      } catch (err) {
        console.error("Error fetching weather:", err);
      } finally {
        setLoadingWeather(false);
      }
    };

    fetchWeather();
  }, [isOpen, tripId]);

  return (
    <>
      <button className="text-emerald-600 rounded-full px-2 border-1 border-emerald-600" onClick={()=> setIsOpen(true)}>weather</button>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl max-w-3xl w-11/12 p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">
                Trip Weather & Activity Suggestions
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-red-500 font-bold"
              >
                X
              </button>
            </div>

            {loadingWeather ? (
              <p>Loading weather...</p>
            ) : weatherData.length === 0 ? (
              <p>No weather data found.</p>
            ) : (
              weatherData.map((day) => (
                <div
                  key={day.day}
                  className="border p-3 my-2 rounded shadow-sm"
                >
                  <p>
                    <strong>Day {day.day}</strong> - {day.date}
                  </p>
                  <p>Weather: {day.tag}</p>

                  {day.activitySwap?.swapRecommended ? (
                    <div className="mt-2 bg-red-50 border border-red-200 p-2 rounded-lg text-red-700 text-sm">
                      🔄 Suggested Activity: {day.activitySwap.suggestedActivity}
                    </div>
                  ) : (
                    <div className="mt-2 bg-green-50 border border-green-200 p-2 rounded-lg text-green-700 text-sm">
                      ✅ Activity is suitable for this weather
                    </div>
                  )}
                </div>
              ))
            )}

            <div className="mt-4 flex justify-end">
              <Button variant="ghost" onClick={() => setIsOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

  // Main
  return (
    <div className="max-w-4xl mx-auto p-4 lg:p-8">
      <h1 className="text-3xl font-black mb-8 text-slate-900 tracking-tight">My Bookings</h1>
      <div className="space-y-6">
        {trips.length === 0 ? (
          <div className="text-center p-20 border-2 border-dashed rounded-[2rem]">
            <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">No trips found</p>
          </div>
        ) : (
          trips.map((trip) => {
            const expired = isTripOver(trip.endDate);

            return (
              <div 
                key={trip._id} 
                id={`ticket-${trip._id}`}
                className="group bg-white border border-slate-100 p-6 rounded-[2.5rem] shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="flex items-center gap-5">
                    <div className="relative w-20 h-20 shrink-0">
                      <img 
                        src={trip.image || trip.media?.cover_image || "https://placehold.co/400x400?text=Travel"} 
                        className="w-full h-full rounded-3xl object-cover" 
                        alt="" 
                      />
                      <div className="absolute -top-2 -right-2 bg-[#0A1D1A] text-white p-1.5 rounded-xl">
                        <Ticket size={14} />
                      </div>
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-slate-900 leading-none mb-1">
                        {trip.destination || trip.city}
                      </h2>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">
                        {trip.startDate} — {trip.endDate}
                      </p>
                     <div className="mt-2 flex gap-2 items-center">
  <span
    className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${
      expired ? "bg-slate-100 text-slate-400" : "bg-emerald-100 text-emerald-600"
    }`}
  >
    {expired ? "Completed" : "Active"}
  </span>

  {/* Only show Weather button if trip is active */}
  {!expired && (
    <WeatherButtonModalButton tripId={trip._id} />
  )}
</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 w-full md:w-auto">
                    {!expired ? (
                      <button 
                        onClick={() => downloadTicket(trip._id)}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#0A1D1A] text-white px-5 py-3 rounded-2xl text-xs font-black shadow-lg hover:scale-105 transition-all"
                      >
                        <Download size={16} /> Download Ticket
                      </button>
                    ) : (
                      <>
                        <button 
                          className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-emerald-500 text-white px-5 py-3 rounded-2xl text-xs font-black shadow-lg hover:scale-105 transition-all"
                          onClick={() => {
                            MySwal.fire({
                              title: <h2 className="text-xl font-black">Review your trip</h2>,
                              html: (
                                <TripReviewForm 
                                  session={session}
                                  tripId={trip.destination_id || trip._id} 
                                />
                              ),
                              showConfirmButton: false,
                            });
                          }}
                        >
                          Write Review
                        </button>
                        <button 
                          className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-100 transition-colors"
                          onClick={() => Swal.fire("Delete", "Delete History", "warning")}
                        >
                          <Trash2 size={18} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}