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
  FaCheckCircle,
  FaSuitcaseRolling,
  FaBars,
} from "react-icons/fa";
import ActivityModal from "@/components/Itinerary/ActivityModal";
import Swal from "sweetalert2";
import BudgetSummary from "@/components/Itinerary/BudgetSummary";

import { useSocket } from "@/providers/SocketProvider";
import { useSession } from "next-auth/react";
import PresenceBar from "@/components/Share/PresenceBar";
import { motion, AnimatePresence } from "framer-motion";
import InviteFriend from "@/components/InviteFriend";

// DND-Kit Imports
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { SortableActivity } from "@/components/Itinerary/SortableActivity";

function ItinerarySearchHandler() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const trip = useSelector((state) => state.itinerary.currentTrip);

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
          dispatch(
            addActivity({
              dayIndex: 0,
              activity: { ...act, id: Date.now() + index },
            }),
          );
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
  const socket = useSocket();

  const totalCost = (Number(trip.basePrice) || 0) + activityTotal;

  const [activeDay, setActiveDay] = useState(null);
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);
  const [tripId, setTripId] = useState(null);
  const [activeUsers, setActiveUsers] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  useEffect(() => {
    if (!session?.user || !socket || !tripId || tripId === "temp-id") return;

    socket.emit("join-trip", {
      tripId: tripId,
      user: {
        name: session.user.name || session.user.email,
        image: session.user.image,
        email: session.user.email,
      },
    });

    socket.on("user-presence", (users) => {
      setActiveUsers(users);
    });

    return () => {
      socket.off("user-presence");
    };
  }, [session?.user, socket, tripId]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const currentActivities = trip.days[selectedDayIdx]?.activities || [];
    const oldIndex = currentActivities.findIndex((a) => a.id === active.id);
    const newIndex = currentActivities.findIndex((a) => a.id === over.id);
    const newOrder = arrayMove(currentActivities, oldIndex, newIndex);
    dispatch({
      type: "itinerary/reorderActivities",
      payload: { dayIndex: selectedDayIdx, newActivities: newOrder },
    });
  };

  const handleSaveTrip = async () => {
    if (!trip.destination) {
      Swal.fire({ icon: "warning", title: "Destination required" });
      return null;
    }
    if (!session?.user?.email) {
      Swal.fire({
        icon: "error",
        title: "Login Required",
        text: "Please log in to save your trip.",
      });
      return null;
    }

    const tripToSave = {
      destination: trip.destination,
      userEmail: session?.user?.email,
      basePrice: Number(trip.basePrice) || 0,
      totalCost: Number(totalCost) || 0,
      status: "saved",
      days: trip.days
        .filter((day) => day.activities && day.activities.length > 0)
        .map((day, dayIndex) => ({
    id: day.id || `day-${Date.now()}-${dayIndex}-${Math.random()}`,
    activities: (day.activities || []).map((act, actIndex) => ({
        
        id: act.id && !isNaN(act.id) ? Number(act.id) : Number(`${Date.now()}${dayIndex}${actIndex}`),
        time: act.time || "10:00 AM",
        task: act.task || "Planned Activity",
        cost: Number(act.cost) || 0,
          })),
        })),
    };

    console.log("📤 Sending Data to Backend:", tripToSave);

    try {
      const response = await fetch(
        "https://travelee-server.vercel.app/itineraries",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(tripToSave),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        console.error("❌ Server Error Details:", result);
        throw new Error(result.message || "Bad Request");
      }

      const newId = result.insertedId || result._id || result.id;
      if (newId) {
        setTripId(newId);
        Swal.fire({
          title: "Saved!",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
        });
        return newId;
      }
      return null;
    } catch (error) {
      console.error("Save error:", error);
      Swal.fire({
        icon: "error",
        title: "Save Failed",
        text: error.message || "Could not save trip",
      });
      return null;
    }
  };

  const handleDelete = (activityId) => {
    dispatch({
      type: "itinerary/removeActivity",
      payload: { dayIndex: selectedDayIdx, activityId },
    });
  };

  const allActivities =
    trip?.days?.flatMap((day) => day.activities || []) || [];

  return (
    <div className="min-h-screen mt-16 bg-[#F8FAFC] pb-40 lg:pb-32">
      <Suspense
        fallback={<div className="text-center mt-10">Loading Itinerary...</div>}
      >
        <ItinerarySearchHandler />
      </Suspense>

      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 px-4 lg:px-8 py-3 lg:py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Left Side */}
          <div className="flex items-center gap-2 lg:gap-4 overflow-hidden">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden text-gray-600 p-2 shrink-0"
            >
              <FaBars size={18} />
            </button>
            <div className="bg-white p-2 rounded-xl text-primary shadow-lg shadow-blue-100 hidden sm:block shrink-0">
              <FaSuitcaseRolling size={20} />
            </div>
            <div className="min-w-0">
              <input
                className="text-base lg:text-xl font-bold text-gray-900 bg-transparent outline-none border-b border-transparent focus:border-blue-500 transition-all w-full truncate"
                placeholder="Adventure Name..."
                value={trip.destination || ""}
                onChange={(e) =>
                  dispatch(setTripDetails({ destination: e.target.value }))
                }
              />
            </div>
          </div>

          <div className="flex items-center gap-2 lg:gap-6 shrink-0">
            <div className="shrink-0 scale-75 lg:scale-100">
              <PresenceBar activeUsers={activeUsers} />
            </div>
            <div className="hidden sm:block shrink-0">
              <InviteFriend
                tripId={tripId}
                tripTitle={trip.destination}
                currentUser={session?.user}
                socket={socket}
                onAutoSave={handleSaveTrip}
              />
            </div>
            <button
              onClick={handleSaveTrip}
              className="bg-gray-900 text-white px-3 lg:px-6 py-2 rounded-full text-xs lg:text-sm font-semibold hover:bg-black transition-all shrink-0"
            >
              Save
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row px-4 lg:px-8 py-6 lg:py-10 gap-8">
        <div className="sm:hidden w-full bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">
            Collab with friends
          </p>
          <InviteFriend
            tripId={tripId}
            tripTitle={trip.destination}
            currentUser={session?.user}
            socket={socket}
            onAutoSave={handleSaveTrip}
          />
        </div>

        {/* Sidebar */}
        <aside
          className={`${isSidebarOpen ? "block" : "hidden"} lg:block w-full lg:w-64`}
        >
          <h3 className="text-xs font-bold text-gray-400 uppercase mb-4 px-2 tracking-widest">
            Trip Timeline
          </h3>
          <nav className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 no-scrollbar">
            {trip.days.map((day, idx) => (
              <button
                key={day.id}
                onClick={() => {
                  setSelectedDayIdx(idx);
                  setIsSidebarOpen(false);
                }}
                className={`flex-shrink-0 lg:w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${selectedDayIdx === idx ? "bg-white shadow-md border border-gray-100 text-primary" : "text-gray-500 hover:bg-gray-100"}`}
              >
                <span className="font-bold text-sm whitespace-nowrap">
                  Day {idx + 1}
                </span>
                {day.activities?.length > 0 && (
                  <FaCheckCircle className="ml-2 text-green-500" size={12} />
                )}
              </button>
            ))}
            <button
              onClick={() => dispatch(addDay())}
              className="flex-shrink-0 lg:w-full flex items-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 hover:text-blue-500 text-sm font-bold transition-all"
            >
              <FaPlus size={10} /> Add
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 w-full max-w-2xl mx-auto lg:mx-0">
          {trip.days.length > 0 ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-6 lg:mb-8">
                <div>
                  <h2 className="text-3xl lg:text-4xl font-black text-gray-900">
                    Day {selectedDayIdx + 1}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {trip.days[selectedDayIdx]?.activities?.length || 0}{" "}
                    activities planned
                  </p>
                </div>
                <button
                  onClick={() => setActiveDay(selectedDayIdx)}
                  className="bg-primary text-white flex items-center gap-2 px-4 lg:px-5 py-2 lg:py-2.5 rounded-xl font-bold shadow-lg shadow-blue-100 hover:scale-105 transition-transform text-sm lg:text-base"
                >
                  <FaPlus size={12} /> <span>Add</span>
                </button>
              </div>

              <div className="relative space-y-4">
                <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gray-200"></div>
                {trip.days[selectedDayIdx].activities.length === 0 ? (
                  <div className="bg-white rounded-2xl p-8 lg:p-12 text-center border border-gray-100 shadow-sm">
                    <p className="text-gray-400 italic text-sm">
                      No activities yet.
                    </p>
                  </div>
                ) : (
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext
                      items={
                        trip.days[selectedDayIdx]?.activities?.map(
                          (act) => act.id,
                        ) || []
                      }
                      strategy={verticalListSortingStrategy}
                    >
                      <AnimatePresence mode="popLayout">
                        {trip.days[selectedDayIdx]?.activities?.map((act) => (
                          <motion.div
                            key={act.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                          >
                            <SortableActivity
                              act={act}
                              onDelete={handleDelete}
                            />
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </SortableContext>
                  </DndContext>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-gray-200">
              <button
                onClick={() => dispatch(addDay())}
                className="text-primary font-bold hover:underline underline-offset-4"
              >
                Click here to start Day 1
              </button>
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

      <div className="max-w-7xl mx-auto px-4 lg:px-8 pb-10">
        <div className="w-full lg:w-9/12 mx-auto">
          <BudgetSummary activities={allActivities} />
        </div>
      </div>

      {/* Floating Price Bar */}
      <div className="fixed bottom-4 lg:bottom-6 left-1/2 -translate-x-1/2 w-[92%] sm:w-auto bg-gray-900 text-white px-4 lg:px-8 py-3 lg:py-4 rounded-2xl lg:rounded-full shadow-2xl z-50 flex flex-row items-center justify-between lg:justify-start gap-4 lg:gap-6 border border-gray-700">
        <div className="flex gap-3 lg:gap-4">
          <div className="flex flex-col border-r border-gray-700 pr-3 lg:pr-4">
            <span className="text-[8px] lg:text-[9px] text-gray-400 uppercase font-bold">
              Base
            </span>
            <span className="text-xs lg:text-sm font-bold">
              ${trip.basePrice || 0}
            </span>
          </div>
          <div className="flex flex-col min-w-[60px]">
            <span className="text-[8px] lg:text-[9px] text-gray-400 uppercase font-bold">
              Total
            </span>
            <span className="text-lg lg:text-xl font-black text-green-400">
              ${totalCost}
            </span>
          </div>
        </div>
        <div className="hidden sm:block h-8 w-[1px] bg-gray-700"></div>
        <button
          onClick={handleSaveTrip}
          className="bg-primary hover:bg-blue-700 px-4 lg:px-6 py-2 rounded-lg lg:rounded-xl text-xs lg:text-sm font-bold transition-colors"
        >
          Confirm Plan
        </button>
      </div>
    </div>
  );
}
