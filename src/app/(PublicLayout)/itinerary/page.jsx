"use client";
import { useState, useEffect, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "next/navigation";
import {
  addDay,
  addActivity,
  setTripDetails,
} from "@/lib/redux/itinerarySlice";
import { selectTotalCost } from "@/lib/redux/selectors"; 
import {
  FaPlus,
  FaClock,
  FaTrash,
  FaCheckCircle,
  FaSuitcaseRolling,
} from "react-icons/fa";
import ActivityModal from "@/components/Itinerary/ActivityModal";
import Swal from "sweetalert2";
import BudgetSummary from "@/components/Itinerary/BudgetSummary";
import { socket } from "@/lib/socket";
import { useSession } from "next-auth/react";
import PresenceBar from "@/components/Share/PresenceBar";
import { motion, AnimatePresence } from "framer-motion";

// DND-Kit Imports
import { 
  DndContext, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors, 
  closestCenter 
} from "@dnd-kit/core";
import { 
  SortableContext, 
  sortableKeyboardCoordinates, 
  verticalListSortingStrategy,
  arrayMove 
} from "@dnd-kit/sortable";
import { SortableActivity } from "@/components/Itinerary/SortableActivity";

// Search Handler Component
function ItinerarySearchHandler() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const trip = useSelector((state) => state.itinerary.currentTrip);
  console.log(searchParams.get("startDate"));
  
  const startDate = searchParams.get("startDate")
  const destName = searchParams.get("name");
  const destPrice = searchParams.get("price");

  useEffect(() => {
    if (destName && trip.destination !== decodeURIComponent(destName)) {
      const name = decodeURIComponent(destName);
      const price = destPrice ? parseFloat(destPrice) : 0;
      dispatch(setTripDetails({ destination: name, basePrice: price }));

      if (trip.days.length === 0) {
        dispatch(addDay()); 
        const starterActivities = [
          { task: "Arrival & Hotel Check-in", time: "10:00 AM", cost: 0 },
          { task: "Lunch at Local Restaurant", time: "01:00 PM", cost: 20 },
          { task: "Afternoon Sightseeing", time: "03:00 PM", cost: 0 },
          { task: "Dinner", time: "07:00 PM", cost: 25 },
        ];

        starterActivities.forEach((act, index) => {
          dispatch(addActivity({
            dayIndex: 0,
            activity: { ...act, id: Date.now() + index }
          }));
        });
      }
    }
  }, [destName, destPrice, dispatch, trip.destination, trip.days.length]);

  return null;
}

export default function ProfessionalItinerary() {
  const dispatch = useDispatch();
  const trip = useSelector((state) => state.itinerary.currentTrip);
  const activityTotal = useSelector(selectTotalCost);
  const { data: session } = useSession();
  
  const totalCost = (Number(trip.basePrice) || 0) + activityTotal; 
  
  const [activeDay, setActiveDay] = useState(null);
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);
  const [tripId, setTripId] = useState(null);
  const [activeUsers, setActiveUsers] = useState([]);

  
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // --- Real-time Socket Logic (Presence Only) ---
  useEffect(() => {
    if (!session?.user) return;
    socket.connect();

    const roomName = "my-awesome-trip";

    socket.emit("join-trip", {
      tripId: roomName,
      user: {
        displayName: session.user.name,
        photoURL: session.user.image,
        email: session.user.email,
      },
    });

    
    socket.on("user-presence", (users) => {
      setActiveUsers(users);
    });

    
    return () => {
      socket.off("user-presence");
      socket.disconnect();
    };
  }, [session?.user?.email]);

  // Handle Drag End
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const currentActivities = trip.days[selectedDayIdx]?.activities || [];
    const oldIndex = currentActivities.findIndex((a) => a.id === active.id);
    const newIndex = currentActivities.findIndex((a) => a.id === over.id);

    const newOrder = arrayMove(currentActivities, oldIndex, newIndex);

    dispatch({
      type: "itinerary/reorderActivities",
      payload: { dayIndex: selectedDayIdx, newActivities: newOrder }
    });
  };

  const allActivities = trip?.days?.flatMap((day) => day.activities || []) || [];

  const handleSaveTrip = async () => {
    if (!trip.destination) {
      Swal.fire({ icon: "warning", title: "Destination required" });
      return;
    }

    const tripToSave = {
      destination: trip.destination,
      userEmail: session?.user?.email,
      basePrice: Number(trip.basePrice) || 0,
      totalCost: Number(totalCost) || 0,
      status: 'saved',
      days: trip.days.map(day => ({
        id: day.id,
        activities: day.activities.map(act => ({
          id: Number(act.id),
          time: act.time,
          task: act.task,
          cost: Number(act.cost) || 0
        }))
      }))
    };

    try {
      const response = await fetch("https://travelee-server.vercel.app/itineraries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tripToSave),
      });

      const result = await response.json();
      if (response.ok) {
        setTripId(result.insertedId);
        Swal.fire({ title: "Saved!", icon: "success", timer: 2000 });
      }
    } catch (error) {
      Swal.fire({ icon: "error", title: "Connection Error", text: "Server is unreachable" });
    }
  };

  const handleDelete = (activityId) => {
    dispatch({ 
      type: "itinerary/removeActivity", 
      payload: { dayIndex: selectedDayIdx, activityId } 
    });
    Swal.fire({ icon: "success", title: "Activity Removed", timer: 1000, showConfirmButton: false });
  };
console.log(trip);

  return (
    <div className="min-h-screen mt-20 bg-[#F8FAFC] pb-32">
      <Suspense fallback={<div className="text-center mt-10">Loading Itinerary...</div>}>
        <ItinerarySearchHandler />
      </Suspense>

      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-white p-3 rounded-xl text-primary shadow-lg shadow-blue-100">
              <FaSuitcaseRolling size={20} />
            </div>
            <div>
              <input
                className="text-xl font-bold text-gray-900 bg-transparent outline-none border-b border-transparent focus:border-blue-500 transition-all"
                placeholder="Name your adventure..."
                value={trip.destination || ""}
                onChange={(e) => dispatch(setTripDetails({ destination: e.target.value }))}
              />
              <p className="text-xs text-gray-400 font-medium uppercase tracking-widest mt-1">Travel Itinerary Builder</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <PresenceBar activeUsers={activeUsers} />
            <button onClick={handleSaveTrip} className="bg-gray-900 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-black transition-all">
              Save Trip
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex px-8 py-10 gap-8">
        <aside className="w-64 hidden lg:block">
          <h3 className="text-sm font-bold text-gray-400 uppercase mb-4 px-2">Trip Timeline</h3>
          <nav className="space-y-2">
            {trip.days.map((day, idx) => (
              <button
                key={day.id}
                onClick={() => setSelectedDayIdx(idx)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${selectedDayIdx === idx ? "bg-white shadow-md border border-gray-100 text-primary" : "text-gray-500 hover:bg-gray-100"}`}
              >
                <span className="font-bold text-sm">Day {idx + 1}</span>
                {day.activities?.length > 0 && <FaCheckCircle className="text-green-500" size={12} />}
              </button>
            ))}
            <button onClick={() => dispatch(addDay())} className="w-full mt-4 flex items-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 hover:text-blue-500 text-sm font-bold transition-all">
              <FaPlus size={10} /> Add Day
            </button>
          </nav>
        </aside>

        <main className="flex-1 max-w-2xl">
          {trip.days.length > 0 ? (
            <div className="space-y-6">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-4xl font-black text-gray-900">Day {selectedDayIdx + 1}</h2>
                  <p className="text-gray-500 mt-1">{trip.days[selectedDayIdx]?.activities?.length || 0} activities planned</p>
                </div>
                <button onClick={() => setActiveDay(selectedDayIdx)} className="bg-primary text-white flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-100 hover:scale-105 transition-transform">
                  <FaPlus size={14} /> Add Activity
                </button>
              </div>

              <div className="relative space-y-4">
                <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gray-200"></div>

                {trip.days[selectedDayIdx].activities.length === 0 ? (
                  <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
                    <p className="text-gray-400 italic">No activities yet.</p>
                  </div>
                ) : (
                  // FIX 4: Integrated DND Logic into the map
                  <DndContext
  sensors={sensors}
  collisionDetection={closestCenter}
  onDragEnd={handleDragEnd}
>
  <SortableContext
    items={trip.days[selectedDayIdx]?.activities?.map(act => act.id) || []}
    strategy={verticalListSortingStrategy}
  >
    <AnimatePresence mode="popLayout">
      {trip.days[selectedDayIdx]?.activities?.map((act) => (
        <motion.div
          key={act.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
        >
          <SortableActivity act={act} onDelete={handleDelete} />
        </motion.div>
      ))}
    </AnimatePresence>
  </SortableContext>
</DndContext>
                )
              }
                
              </div> 
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-200">
              <button onClick={() => dispatch(addDay())} className="text-primary font-bold hover:underline underline-offset-4">Click here to start Day 1</button>
            </div>
          )}
        </main>
      </div>

      <ActivityModal
        isOpen={activeDay !== null}
        onClose={() => setActiveDay(null)}
        onSave={(data) => {
          const newActivity = { ...data, id: Date.now() };
          
          dispatch(addActivity({ dayIndex: activeDay, activity: newActivity }));
          setActiveDay(null);
        }}
      />

      <div className="max-w-7xl mx-auto px-8 pb-10">
        <div className="w-full lg:w-9/12 mx-auto">
          <BudgetSummary activities={allActivities} />
        </div>
      </div>

      {/* Floating Price Bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-8 py-4 rounded-full shadow-2xl z-50 flex items-center gap-6 border border-gray-700">
        <div className="flex gap-4">
          <div className="flex flex-col border-r border-gray-700 pr-4">
            <span className="text-[9px] text-gray-400 uppercase font-bold tracking-tighter">Base Package</span>
            <span className="text-sm font-bold text-white">${trip.basePrice || 0}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] text-gray-400 uppercase font-bold tracking-tighter">Total Estimate</span>
            <span className="text-xl font-black text-green-400 leading-none">${totalCost}</span>
          </div>
        </div>
        <div className="h-8 w-[1px] bg-gray-700"></div>
        <button onClick={handleSaveTrip} className="bg-primary hover:bg-blue-700 px-6 py-2 rounded-xl text-sm font-bold transition-colors">
          Confirm Plan
        </button>
      </div>
    </div>
  );
}