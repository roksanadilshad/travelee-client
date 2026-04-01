"use client";
import { useState, useEffect, Suspense, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "next/navigation";
import { addDay, addActivity, setTripDetails } from "@/lib/redux/itinerarySlice";
import { selectTotalCost } from "@/lib/redux/selectors";
import { FaPlus, FaCheckCircle, FaSuitcaseRolling, FaBars, FaMapMarkerAlt, FaUsers, FaCalendarAlt, FaBed } from "react-icons/fa";
import ActivityModal from "@/components/Itinerary/ActivityModal";
import Swal from "sweetalert2";
import BudgetSummary from "@/components/Itinerary/BudgetSummary";
import { useSocket } from "@/providers/SocketProvider";
import { useSession } from "next-auth/react";
import PresenceBar from "@/components/Share/PresenceBar";
import InviteFriend from "@/components/InviteFriend";
import { DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors, closestCenter } from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { SortableActivity } from "@/components/Itinerary/SortableActivity";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

function ItinerarySearchHandler() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const tripDaysCount = useSelector((state) => state.itinerary.currentTrip.days.length);

  const trip = useSelector((state) => state.itinerary.currentTrip);
  
  useEffect(() => {
    const safeISO = (dateStr) => {
      if (!dateStr) return null;
      const date = new Date(dateStr);
      return !isNaN(date.getTime()) ? date.toISOString() : null;
    };
    const destName = searchParams.get("name");
    const destPrice = searchParams.get("price");
    const destStartDate = searchParams.get("startDate");
    const destEndDate = searchParams.get("endDate");
    // New Params
    const guests = searchParams.get("guests");
    const rooms = searchParams.get("rooms");
    const coverImage = searchParams.get("cover_image");
    const country = searchParams.get("country");
    const galleryRaw = searchParams.get("gallery");
    let parsedGallery = [];

if (galleryRaw) {
  try {
    // URLSearchParams sometimes needs double decoding for JSON strings
    parsedGallery = JSON.parse(decodeURIComponent(galleryRaw));
  } catch (e) {
    console.error("Gallery Parse Error:", e);
    parsedGallery = [];
  }
}

dispatch(
  setTripDetails({
    destination: decodeURIComponent(destName),
    basePrice: destPrice ? parseFloat(destPrice) : 0,
    startDate: safeISO(destStartDate),
    endDate: safeISO(destEndDate),
    // Ensure these are added to your Redux state
    coverImage: searchParams.get("cover_image") || "",
    gallery: parsedGallery, 
    country: searchParams.get("country") || "",
  })
);

    if (!destName) return;

    // const safeISO = (dateStr) => {
    //   if (!dateStr) return null;
    //   const date = new Date(dateStr);
    //   return !isNaN(date.getTime()) ? date.toISOString() : null;
    // };

    dispatch(
      setTripDetails({
        destination: decodeURIComponent(destName),
        basePrice: destPrice ? parseFloat(destPrice) : 0,
        startDate: safeISO(destStartDate),
        endDate: safeISO(destEndDate),
        guests: guests || "1",
        rooms: rooms ? JSON.parse(rooms) : null,
        coverImage: coverImage || "",
        gallery: parsedGallery,
        country: country || "",
      })
    );
    const currentDayOneActivities = trip?.days[0]?.activities || [];

    if (tripDaysCount === 0) {
      dispatch(addDay());
    }
    if (tripDaysCount <= 1 && currentDayOneActivities.length === 0){
      const starterActivities = [
        { task: "Arrival & Hotel Check-in", time: "10:00 AM", cost: 0 },
        { task: "Lunch at Local Restaurant", time: "01:00 PM", cost: 20 },
      ];
      starterActivities.forEach((act, index) => {
        dispatch(addActivity({ dayIndex: 0, activity: { ...act, id:`starter-${index}-${Date.now()}`} }));
      });
    }
  }, [searchParams, dispatch]);

  return null;
}

export default function ProfessionalItinerary() {
  const dispatch = useDispatch();
  const trip = useSelector((state) => state.itinerary.currentTrip);
  const activityTotal = useSelector(selectTotalCost);
  const { data: session } = useSession();
  const socket = useSocket();

  const totalCost = useMemo(() => (Number(trip.basePrice) || 0) + activityTotal, [trip.basePrice, activityTotal]);
  const [activeDay, setActiveDay] = useState(null);
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);
  const [tripId, setTripId] = useState(null);
  const [activeUsers, setActiveUsers] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // Existing reorder and save logic kept exactly the same...
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const currentActivities = trip.days[selectedDayIdx]?.activities || [];
    const oldIndex = currentActivities.findIndex((a) => a.id === active.id);
    const newIndex = currentActivities.findIndex((a) => a.id === over.id);
    dispatch({
      type: "itinerary/reorderActivities",
      payload: { dayIndex: selectedDayIdx, newActivities: arrayMove(currentActivities, oldIndex, newIndex) },
    });
  };
const [currentImageIdx, setCurrentImageIdx] = useState(0);

 const sliderImages = useMemo(() => {
  const images = [];
  
  // 1. Add Cover Image
  if (trip.coverImage) images.push(trip.coverImage);
  
  // 2. Add Gallery Images
  if (Array.isArray(trip.gallery)) {
    images.push(...trip.gallery);
  } else if (typeof trip.gallery === "string" && trip.gallery.length > 0) {
    try {
      const parsed = JSON.parse(trip.gallery);
      if (Array.isArray(parsed)) images.push(...parsed);
    } catch (e) { /* ignore */ }
  }

  // 3. Final Fallback
  return images.length > 0 
    ? [...new Set(images)] // Remove duplicates if cover is also in gallery
    : ["https://images.unsplash.com/photo-1469854523086-cc02fe5d8800"];
}, [trip.coverImage, trip.gallery]);

// 2. THE CRITICAL AUTO-PLAY EFFECT
useEffect(() => {
  if (sliderImages.length <= 1) return; // Don't slide if only 1 image

  const timer = setInterval(() => {
    setCurrentImageIdx((prev) => (prev + 1) % sliderImages.length);
  }, 5000); // Changes every 5 seconds

  return () => clearInterval(timer); // Cleanup on unmount
}, [sliderImages]);

  // Auto-play logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIdx((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [sliderImages.length]);

  const handleSaveTrip = async () => {
    if (!trip.destination) return Swal.fire({ icon: "warning", title: "Destination required", confirmButtonColor: "#0EA5A4" });
    if (!session?.user?.email) return Swal.fire({ icon: "error", title: "Login Required", confirmButtonColor: "#0EA5A4" });

    const validDays = trip.days
      .filter((day) => day.activities && day.activities.length > 0)
      .map((day) => ({
        id: day.id,
        activities: (day.activities || []).map((act) => ({ ...act, id: Number(act.id), cost: Number(act.cost) || 0 })),
      }));

    if (validDays.length === 0) return Swal.fire({ icon: "info", title: "No Activities", text: "Please add at least one activity.", confirmButtonColor: "#0EA5A4" });

    const tripToSave = {
      destination: trip.destination,
      userEmail: session.user.email,
      basePrice: Number(trip.basePrice) || 0,
      totalCost,
      startDate: trip.startDate,
      status: "saved",
      days: validDays,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/itineraries`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tripToSave),
      });
      const result = await response.json();
      const newId = result.insertedId || result._id || result.id;
      setTripId(newId);
      dispatch(setTripDetails({ ...trip, _id: newId }));
      Swal.fire({ title: "Saved!", icon: "success", timer: 1000, showConfirmButton: false });
      return newId;
    } catch (error) {
      Swal.fire({ icon: "error", title: "Save Failed", text: error.message, confirmButtonColor: "#0EA5A4" });
      return null;
    }
  };

  const handleDelete = (activityId) => {
    dispatch({ type: "itinerary/removeActivity", payload: { dayIndex: selectedDayIdx, activityId } });
  };

  const allActivities = useMemo(() => {
    if (!trip?.days) return [];
    return trip.days.flatMap((day) => day?.activities || []);
  }, [trip.days]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-40">
      <Suspense fallback={<div className="text-center mt-10">Loading Itinerary...</div>}>
        <ItinerarySearchHandler />
      </Suspense>

      {/* --- PROFESSIONAL HERO SECTION --- */}
     {/* --- HERO SECTION --- */}
<div className="relative h-[350px] lg:h-[500px] w-full bg-slate-900 overflow-hidden">
  <AnimatePresence mode="wait">
    <motion.img
      key={currentImageIdx} // <--- CRITICAL: Framer needs this to trigger the fade
      src={sliderImages[currentImageIdx]}
      initial={{ opacity: 0, scale: 1.1 }} // Starts slightly zoomed in
      animate={{ opacity: 1, scale: 1 }}    // Zooms out while fading in
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="absolute inset-0 w-full h-full object-cover"
    />
  </AnimatePresence>

  {/* Cinematic Overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80 z-10" />

  {/* Optional: Navigation Arrows */}
  <div className="absolute inset-0 flex items-center justify-between px-6 z-20 pointer-events-none">
    <button 
      onClick={() => setCurrentImageIdx((prev) => (prev - 1 + sliderImages.length) % sliderImages.length)}
      className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white pointer-events-auto backdrop-blur-md transition-all"
    >
      <FaChevronLeft />
    </button>
    <button 
      onClick={() => setCurrentImageIdx((prev) => (prev + 1) % sliderImages.length)}
      className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white pointer-events-auto backdrop-blur-md transition-all"
    >
      <FaChevronRight />
    </button>
  </div>

  {/* Content Overlay */}
  <div className="absolute bottom-12 left-0 right-0 z-30 max-w-7xl mx-auto px-4 lg:px-8">
     {/* Title and stats... */}
     <div className="flex gap-2 mt-4">
        {sliderImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentImageIdx(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === currentImageIdx ? "w-8 bg-[#0EA5A4]" : "w-2 bg-white/30"
            }`}
          />
        ))}
     </div>
  </div>
</div>

      {/* --- STATS BAR --- */}
      <div className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-[#0EA5A4]" /> 
              {trip.startDate ? new Date(trip.startDate).toLocaleDateString() : 'Set Date'}
            </div>
            <div className="flex items-center gap-2">
              <FaUsers className="text-[#0EA5A4]" /> {trip.guests} Guests
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <FaBed className="text-[#0EA5A4]" /> Optimized Rooms
            </div>
          </div>
          <div className="flex items-center gap-3">
            <PresenceBar activeUsers={activeUsers} />
            <InviteFriend tripId={tripId || trip?._id} tripTitle={trip?.destination} currentUser={session?.user} socket={socket} onAutoSave={handleSaveTrip} />
            <button onClick={handleSaveTrip} className="bg-[#0EA5A4] text-white px-6 py-2 rounded-xl text-sm font-bold hover:shadow-lg transition-all">Save Trip</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row px-4 lg:px-8 py-10 gap-10">
        {/* --- SIDEBAR --- */}
        <aside className={`${isSidebarOpen ? "block" : "hidden"} lg:block w-full lg:w-72`}>
          <div className="sticky top-28 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-[10px] font-black text-gray-400 uppercase mb-6 tracking-[0.2em]">Trip Timeline</h3>
            <nav className="space-y-2">
              {(trip?.days || []).map((day, idx) => (
                <button
                  key={day.id}
                  onClick={() => { setSelectedDayIdx(idx); setIsSidebarOpen(false); }}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all ${
                    selectedDayIdx === idx ? "bg-slate-900 text-white shadow-xl scale-[1.02]" : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <span className="font-bold text-sm uppercase tracking-tight">Day {idx + 1}</span>
                  {day.activities?.length > 0 && <FaCheckCircle className={selectedDayIdx === idx ? "text-green-400" : "text-green-500"} size={14} />}
                </button>
              ))}
              <button onClick={() => dispatch(addDay())} className="w-full py-3.5 rounded-xl border-2 border-dashed border-gray-100 text-gray-400 hover:border-[#0EA5A4] hover:text-[#0EA5A4] font-bold text-xs transition-all uppercase tracking-widest">+ Add Day</button>
            </nav>
          </div>
        </aside>

        {/* --- MAIN CONTENT --- */}
        <main className="flex-1">
          <div className="flex justify-between items-end mb-10">
            <div>
              <span className="text-[#0EA5A4] font-black text-xs uppercase tracking-widest">Schedule</span>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mt-1">Day {selectedDayIdx + 1}</h2>
            </div>
            <button onClick={() => setActiveDay(selectedDayIdx)} className="bg-slate-900 text-white flex items-center gap-2 px-6 py-3 rounded-xl font-bold hover:bg-slate-800 shadow-xl transition-all">
              <FaPlus size={12} /> Add Activity
            </button>
          </div>

          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-gray-200 via-gray-200 to-transparent"></div>
            
            {!trip.days[selectedDayIdx] || (trip.days[selectedDayIdx]?.activities || []).length === 0 ? (
              <div className="bg-white rounded-3xl p-20 text-center border border-dashed border-gray-200 ml-12">
                <p className="text-gray-400 font-medium italic">Your schedule is empty. Start adding some magic!</p>
              </div>
            ) : (
              <div className="space-y-6">
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                  <SortableContext items={(trip.days[selectedDayIdx]?.activities || []).map((a) => a.id)} strategy={verticalListSortingStrategy}>
                    {(trip.days[selectedDayIdx]?.activities || []).map((act, index) => (
                      <div key={`${act.id}-${index}`} className="pl-12">
                        <SortableActivity act={act} onDelete={handleDelete} />
                      </div>
                    ))}
                  </SortableContext>
                </DndContext>
              </div>
            )}
          </div>

          <div className="mt-20 p-8 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">Financial Overview</h3>
            <BudgetSummary activities={allActivities} />
          </div>
        </main>
      </div>

      {/* --- PROFESSIONAL FLOATING TOTAL BAR --- */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-2xl bg-slate-900/95 backdrop-blur-md text-white p-2 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-50 border border-white/10">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex gap-8">
            <div className="flex flex-col">
              <span className="text-[9px] text-gray-400 uppercase font-black tracking-[0.1em]">Stay Cost</span>
              <span className="text-sm font-bold text-white">${trip.basePrice || 0}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] text-[#0EA5A4] uppercase font-black tracking-[0.1em]">Total Budget</span>
              <span className="text-xl font-black text-white">${totalCost}</span>
            </div>
          </div>
          <button onClick={handleSaveTrip} className="bg-[#0EA5A4] hover:bg-[#0c8a89] px-8 py-3 rounded-xl text-sm font-black transition-all shadow-lg uppercase tracking-tight">
            Finalize Trip
          </button>
        </div>
      </div>

      <ActivityModal
        isOpen={activeDay !== null}
        onClose={() => setActiveDay(null)}
        onSave={(data) => {
          dispatch(addActivity({ dayIndex: activeDay, activity: { ...data, id: Date.now() } }));
          setActiveDay(null);
        }}
      />
    </div>
  );
}