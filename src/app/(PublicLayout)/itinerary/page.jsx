"use client";
import { useState, useEffect, Suspense, useMemo } from "react";
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
  const tripDaysCount = useSelector(
    (state) => state.itinerary.currentTrip.days.length,
  );

  useEffect(() => {
    const destName = searchParams.get("name");
    const destPrice = searchParams.get("price");
    const destStartDate = searchParams.get("startDate");
    const destEndDate = searchParams.get("endDate");

    if (!destName) return;

    const safeISO = (dateStr) => {
      if (!dateStr) return null;
      const date = new Date(dateStr);
      return !isNaN(date.getTime()) ? date.toISOString() : null;
    };

    dispatch(
      setTripDetails({
        destination: decodeURIComponent(destName),
        basePrice: destPrice ? parseFloat(destPrice) : 0,
        startDate: safeISO(destStartDate),
        endDate: safeISO(destEndDate),
      }),
    );

    if (tripDaysCount === 0) {
      dispatch(addDay());
      const starterActivities = [
        { task: "Arrival & Hotel Check-in", time: "10:00 AM", cost: 0 },
        { task: "Lunch at Local Restaurant", time: "01:00 PM", cost: 20 },
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
  }, [searchParams, dispatch, tripDaysCount]);

  return null;
}

export default function ProfessionalItinerary() {
  const dispatch = useDispatch();
  const trip = useSelector((state) => state.itinerary.currentTrip);
  const activityTotal = useSelector(selectTotalCost);
  const { data: session } = useSession();
  const socket = useSocket();

  const totalCost = useMemo(
    () => (Number(trip.basePrice) || 0) + activityTotal,
    [trip.basePrice, activityTotal],
  );

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
    if (!session?.user?.email || !socket || !tripId) return;
    socket.emit("join-trip", {
      tripId,
      user: {
        name: session.user.name,
        image: session.user.image,
        email: session.user.email,
      },
    });
    socket.on("user-presence", (users) => setActiveUsers(users));
    return () => {
      socket.off("user-presence");
    };
  }, [session, socket, tripId]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const currentActivities = trip.days[selectedDayIdx]?.activities || [];
    const oldIndex = currentActivities.findIndex((a) => a.id === active.id);
    const newIndex = currentActivities.findIndex((a) => a.id === over.id);
    dispatch({
      type: "itinerary/reorderActivities",
      payload: {
        dayIndex: selectedDayIdx,
        newActivities: arrayMove(currentActivities, oldIndex, newIndex),
      },
    });
  };

  const handleSaveTrip = async () => {
    if (!trip.destination)
      return Swal.fire({
        icon: "warning",
        title: "Destination required",
        confirmButtonColor: "#0EA5A4",
      });

    if (!session?.user?.email)
      return Swal.fire({
        icon: "error",
        title: "Login Required",
        confirmButtonColor: "#0EA5A4",
      });

    const validDays = trip.days
      .filter((day) => day.activities && day.activities.length > 0)
      .map((day) => ({
        id: day.id,
        activities: (day.activities || []).map((act) => ({
          ...act,
          id: Number(act.id),
          cost: Number(act.cost) || 0,
        })),
      }));

    if (validDays.length === 0) {
      return Swal.fire({
        icon: "info",
        title: "No Activities",
        text: "Please add at least one activity to any day before saving.",
        confirmButtonColor: "#0EA5A4",
      });
    }

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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/itineraries`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(tripToSave),
        },
      );

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to save");

      const newId = result.insertedId || result._id || result.id;

      setTripId(newId);

      dispatch(setTripDetails({ ...trip, _id: newId }));

      Swal.fire({
        title: "Saved!",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      });

      return newId;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Save Failed",
        text: error.message,
        confirmButtonColor: "#0EA5A4",
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

  const allActivities = useMemo(() => {
    if (!trip?.days) return [];
    return trip.days.flatMap((day) => day?.activities || []);
  }, [trip.days]);

  return (
    <div className="min-h-screen mt-16 bg-[#F8FAFC] pb-40 lg:pb-32">
      <Suspense
        fallback={<div className="text-center mt-10">Loading Itinerary...</div>}
      >
        <ItinerarySearchHandler />
      </Suspense>

      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 px-4 lg:px-8 py-3 lg:py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 lg:gap-4 overflow-hidden">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden text-gray-600 p-2"
            >
              <FaBars size={18} />
            </button>
            <div className="bg-white p-2 rounded-xl text-[#0EA5A4] shadow-lg hidden sm:block">
              <FaSuitcaseRolling size={20} />
            </div>
            <input
              className="text-base lg:text-xl font-bold text-gray-900 bg-transparent outline-none border-b border-transparent focus:border-[#0EA5A4] w-full truncate"
              value={trip.destination || ""}
              onChange={(e) =>
                dispatch(setTripDetails({ destination: e.target.value }))
              }
            />
          </div>
          <div className="flex flex-col md:flex-row items-center gap-2 lg:gap-6 shrink-0">
            <PresenceBar activeUsers={activeUsers} />
            {console.log(
              "Current ID being passed to Invite:",
              trip?._id || tripId,
            )}
            <InviteFriend
              tripId={tripId || trip?._id}
              tripTitle={trip?.destination}
              currentUser={session?.user}
              socket={socket}
              onAutoSave={handleSaveTrip}
            />
            <button
              onClick={handleSaveTrip}
              className="bg-[#0EA5A4] text-white px-4 lg:px-6 py-2 rounded-full text-sm font-semibold transition-all"
            >
              Save
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row px-4 lg:px-8 py-6 lg:py-10 gap-8">
        <aside
          className={`${isSidebarOpen ? "block" : "hidden"} lg:block w-full lg:w-64`}
        >
          <h3 className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-widest">
            Timeline
          </h3>
          <nav className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 no-scrollbar">
            {(trip?.days || []).map((day, idx) => (
              <button
                key={day.id}
                onClick={() => {
                  setSelectedDayIdx(idx);
                  setIsSidebarOpen(false);
                }}
                className={`flex-shrink-0 lg:w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all relative ${
                  selectedDayIdx === idx
                    ? "bg-white shadow-md text-[#0EA5A4] border border-gray-100"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  {selectedDayIdx === idx && (
                    <span className="w-2 h-2 rounded-full bg-[#0EA5A4] animate-pulse"></span>
                  )}
                  <span className="font-bold text-sm whitespace-nowrap">
                    Day {idx + 1}
                  </span>
                </div>
                {day.activities?.length > 0 && (
                  <FaCheckCircle className="text-green-500" size={12} />
                )}
              </button>
            ))}
            <button
              onClick={() => dispatch(addDay())}
              className="flex-shrink-0 lg:w-full flex items-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 hover:text-[#0EA5A4] hover:border-[#0EA5A4] font-bold transition-all text-sm"
            >
              + Add Day
            </button>
          </nav>
        </aside>

        <main className="flex-1 w-full max-w-2xl mx-auto lg:mx-0">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl lg:text-4xl font-black text-gray-900">
                Day {selectedDayIdx + 1}
              </h2>
              <p className="text-sm text-gray-500">
                {trip.days[selectedDayIdx]?.activities?.length || 0} activities
              </p>
            </div>
            <button
              onClick={() => setActiveDay(selectedDayIdx)}
              className="bg-[#0EA5A4] text-white flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold shadow-lg transition-transform"
            >
              <FaPlus size={12} /> Add
            </button>
          </div>

          <div className="relative space-y-4">
            <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gray-200"></div>
            {!trip.days[selectedDayIdx] ||
            (trip.days[selectedDayIdx]?.activities || []).length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
                <p className="text-gray-400 italic">No activities planned.</p>
              </div>
            ) : (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={(trip.days[selectedDayIdx]?.activities || []).map(
                    (a) => a.id,
                  )}
                  strategy={verticalListSortingStrategy}
                >
                  {(trip.days[selectedDayIdx]?.activities || []).map(
                    (act, index) => (
                      <SortableActivity
                        key={`${act.id}-${index}`}
                        act={act}
                        onDelete={handleDelete}
                      />
                    ),
                  )}
                </SortableContext>
              </DndContext>
            )}
          </div>

          <div className="mt-16 pt-10 border-t border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              Trip Budget Summary
            </h3>
            <BudgetSummary activities={allActivities} />
          </div>
        </main>
      </div>

      <ActivityModal
        isOpen={activeDay !== null}
        onClose={() => setActiveDay(null)}
        onSave={(data) => {
          dispatch(
            addActivity({
              dayIndex: activeDay,
              activity: { ...data, id: Date.now() },
            }),
          );
          setActiveDay(null);
        }}
      />

      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] sm:w-auto bg-gray-900 text-white px-6 py-4 rounded-2xl shadow-2xl z-50 flex items-center gap-6 border border-gray-700">
        <div className="flex gap-4">
          <div className="flex flex-col border-r border-gray-700 pr-4">
            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-tight">
              Base Price
            </span>
            <span className="text-sm font-bold">${trip.basePrice || 0}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-tight">
              Estimated Total
            </span>
            <span className="text-xl font-black text-green-400">
              ${totalCost}
            </span>
          </div>
        </div>
        <button
          onClick={handleSaveTrip}
          className="bg-[#0EA5A4] hover:bg-[#0c8a89] px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg"
        >
          Confirm Plan
        </button>
      </div>
    </div>
  );
}
