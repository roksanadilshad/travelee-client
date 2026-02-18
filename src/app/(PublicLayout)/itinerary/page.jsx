'use client';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addDay, addActivity, setTripDetails } from '@/lib/redux/itinerarySlice';
import { FaPlus, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaTrash, FaCheckCircle } from 'react-icons/fa';
import ActivityModal from '@/components/Itinerary/ActivityModal';
import Swal from 'sweetalert2';

export default function ProfessionalItinerary() {
  const dispatch = useDispatch();
  const trip = useSelector((state) => state.itinerary.currentTrip);
  const [activeDay, setActiveDay] = useState(null);
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);

  const handleSaveTrip = async () => {
  // 1. Check if there is actually data to save
  if (!trip.destination) {
    alert("Please enter a destination name first!");
    return;
  }

  try {
    // 2. API Call to your Node.js server
    const response = await fetch('http://localhost:500/itineraries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(trip), 
    });

    const result = await response.json();

    if (response.ok) {
Swal.fire({
  title: "Trip plan save successfully",
  icon: "success",
  draggable: true
});
      console.log("Saved ID:", result.insertedId);
    } else {
      alert("Failed to save: " + result.message);
    }
  } catch (error) {
    console.error("Connection Error:", error);
    alert("Cannot connect to server. Is your Node.js backend running?");
  }
};

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* { HEADER } */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 p-3 rounded-xl text-white shadow-lg shadow-blue-200">
              <FaCalendarAlt size={20} />
            </div>
            <div>
              <input 
                className="text-xl font-bold text-gray-900 bg-transparent outline-none placeholder-gray-300 border-b border-transparent focus:border-blue-500 transition-all"
                placeholder="Name your adventure..."
                value={trip.destination}
                onChange={(e) => dispatch(setTripDetails({ destination: e.target.value }))}
              />
              <p className="text-xs text-gray-400 font-medium uppercase tracking-widest mt-1">Travel Itinerary Builder</p>
            </div>
          </div>
          <button onClick={handleSaveTrip} className="bg-gray-900 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-black transition-all shadow-xl shadow-gray-200">
            Save Trip
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex px-8 py-10 gap-8">
        {/* 2. SIDEBAR - DAY NAVIGATION */}
        <aside className="w-64 hidden lg:block">
          <h3 className="text-sm font-bold text-gray-400 uppercase mb-4 px-2">Trip Timeline</h3>
          <nav className="space-y-2">
            {trip.days.map((day, idx) => (
              <button
                key={day.id}
                onClick={() => setSelectedDayIdx(idx)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                  selectedDayIdx === idx 
                  ? 'bg-white shadow-md border border-gray-100 text-blue-600' 
                  : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                <span className="font-bold text-sm">Day {idx + 1}</span>
                {day.activities.length > 0 && <FaCheckCircle className="text-green-500" size={12} />}
              </button>
            ))}
            <button 
              onClick={() => dispatch(addDay())}
              className="w-full mt-4 flex items-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 hover:border-blue-300 hover:text-blue-500 transition-all text-sm font-bold"
            >
              <FaPlus size={10} /> Add Day
            </button>
          </nav>
        </aside>

        {/* 3. MAIN CONTENT - THE SELECTED DAY */}
        <main className="flex-1 max-w-2xl">
          {trip.days.length > 0 ? (
            <div className="space-y-6">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-4xl font-black text-gray-900">Day {selectedDayIdx + 1}</h2>
                  <p className="text-gray-500 mt-1">{trip.days[selectedDayIdx].activities.length} activities planned</p>
                </div>
                <button 
                  onClick={() => setActiveDay(selectedDayIdx)}
                  className="bg-blue-600 text-white flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-100 hover:scale-105 transition-transform"
                >
                  <FaPlus size={14} /> Add Activity
                </button>
              </div>

              {/* TIMELINE CARDS */}
              <div className="relative space-y-4">
                {/* Connecting Line */}
                <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gray-200"></div>

                {trip.days[selectedDayIdx].activities.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
                        <p className="text-gray-400 italic">No activities yet. Click <span className='text-gray-700'>Add Activity</span> to start.</p>
                    </div>
                ) : (
                    trip.days[selectedDayIdx].activities.map((act, i) => (
                    <div key={i} className="relative flex gap-6 items-start">
                        <div className="z-10 bg-white border-4 border-[#F8FAFC] text-blue-600 p-2 rounded-full shadow-md">
                        <FaClock size={16} />
                        </div>
                        <div className="bg-white flex-1 p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">{act.time}</span>
                                    <h4 className="text-lg font-bold text-gray-800 mt-2">{act.task}</h4>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-black text-green-600">${act.cost}</p>
                                    <button className="text-red-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 mt-2">
                                        <FaTrash size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    ))
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-200">
                <p className="text-gray-400 mb-4">You have not added any days to your trip.</p>
                <button onClick={() => dispatch(addDay())} className="text-blue-600 font-bold hover:underline underline-offset-4">Click here to start Day 1</button>
            </div>
          )}
        </main>
      </div>

      {/* MODAL COMPONENT */}
      <ActivityModal 
        isOpen={activeDay !== null} 
        onClose={() => setActiveDay(null)} 
        onSave={(data) => dispatch(addActivity({ dayIndex: activeDay, activity: data }))}
      />
    </div>
  );
}