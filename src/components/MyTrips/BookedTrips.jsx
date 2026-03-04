"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Download, Trash2, Star, Ticket } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Swal from "sweetalert2";
import TripReviewForm from "../Reviews/TripReviewForm";
import withReactContent from "sweetalert2-react-content";
import Link from "next/link";

export default function BookedTrips() {
  const { data: session } = useSession();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const MySwal = withReactContent(Swal);

  // Helper: Check if the trip is in the past
  const isTripOver = (endDate) => {
    if (!endDate) return false;
    return new Date(endDate) < new Date();
  };

  // Function: Generate PDF Ticket
  const downloadTicket = async (tripId) => {
    const element = document.getElementById(`ticket-${tripId}`);
    if (!element) return;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
    pdf.save(`Ticket-${tripId}.pdf`);
  };

  useEffect(() => {
    if (session?.user?.email) {
      setLoading(true);
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-trips?userEmail=${session.user.email}`)
        .then((res) => res.json())
        .then((response) => {
          const actualData = response.success ? response.data : response;
          setTrips(Array.isArray(actualData) ? actualData : []);
        })
        .finally(() => setLoading(false));
    }
  }, [session]);

  if (loading) return <div className="p-10 text-center">Loading adventures...</div>;

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
            const destinationId = trip.destination_id || trip._id;

            return (
              <div
                key={trip._id}
                id={`ticket-${trip._id}`}
                className="group relative bg-white border border-slate-100 p-6 rounded-[2.5rem] shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  
                  {/* LEFT: Info Section (Clickable Area) */}
                  <Link 
                    href={`/destinations/${destinationId}`} 
                    className="flex items-center gap-5 flex-1 w-full hover:opacity-80 transition-opacity"
                  >
                    <div className="relative w-20 h-20 shrink-0">
                      <img
                        src={trip.image || trip.media?.cover_image || "https://placehold.co/400x400?text=Travel"}
                        className="w-full h-full rounded-3xl object-cover"
                        alt={trip.destination || "Trip"}
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
                      <div className="mt-2 flex gap-2">
                        <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${
                          expired ? 'bg-slate-100 text-slate-400' : 'bg-emerald-100 text-emerald-600'
                        }`}>
                          {expired ? 'Completed' : 'Active'}
                        </span>
                      </div>
                    </div>
                  </Link>

                  {/* RIGHT: Dynamic Actions (Independent of Link) */}
                  <div className="flex flex-wrap gap-3 w-full md:w-auto z-10">
                    {!expired ? (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          downloadTicket(trip._id);
                        }}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#0A1D1A] text-white px-5 py-3 rounded-2xl text-xs font-black shadow-lg hover:scale-105 transition-all"
                      >
                        <Download size={16} /> Download Ticket
                      </button>
                    ) : (
                      <>
                        <button
                          className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-emerald-500 text-white px-5 py-3 rounded-2xl text-xs font-black shadow-lg hover:scale-105 transition-all"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            MySwal.fire({
                              title: <h2 className="text-xl font-black">Review your trip</h2>,
                              html: (
                                <TripReviewForm
                                  session={session}
                                  tripId={destinationId}
                                  onReviewAdded={() => {
                                    MySwal.close();
                                    Swal.fire("Success", "Live review posted!", "success");
                                  }}
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
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            Swal.fire("Delete", "Delete History", "warning");
                          }}
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