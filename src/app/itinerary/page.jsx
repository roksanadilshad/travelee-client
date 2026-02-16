'use client';
import { useState } from 'react';

export default function ItineraryBuilder() {
  // 1. Complex State for the Itinerary
  const [tripDetails, setTripDetails] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    userEmail: 'user@example.com' // Replace with real user from Auth later
  });

  const [days, setDays] = useState([
    { day: 1, activities: [{ time: '09:00', activity: 'Breakfast' }] }
  ]);

  // 2. Function to Add a New Day
  const handleAddDay = () => {
    setDays([...days, { day: days.length + 1, activities: [] }]);
  };

  // 3. Function to Add Activity to a Specific Day
  const handleAddActivity = (dayIndex) => {
    const newDays = [...days];
    newDays[dayIndex].activities.push({ time: '', activity: '' });
    setDays(newDays);
  };

  // 4. Save to Backend (Node.js)
  const handleSaveTrip = async () => {
    const response = await fetch('http://localhost:500/itineraries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...tripDetails, days })
    });
    
    if (response.ok) {
      alert('Trip Saved Successfully!');
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Create Your Trip Itinerary</h1>
      
      {/* 5. Trip Details Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Trip Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input 
            type="text" 
            placeholder="Destination (e.g., Cox's Bazar)"
            value={tripDetails.destination}
            onChange={(e) => setTripDetails({...tripDetails, destination: e.target.value})}
            className="border p-2 rounded-lg"
          />
          <input 
            type="date" 
            value={tripDetails.startDate}
            onChange={(e) => setTripDetails({...tripDetails, startDate: e.target.value})}
            className="border p-2 rounded-lg"
          />
        </div>
      </div>

      {/* 6. Dynamic Day Builder */}
      <div className="space-y-6">
        {days.map((day, dayIndex) => (
          <div key={dayIndex} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-4">Day {day.day}</h3>
            
            {day.activities.map((act, actIndex) => (
              <div key={actIndex} className="flex gap-4 mb-2">
                <input 
                  type="time" 
                  value={act.time}
                  onChange={(e) => {
                    const newDays = [...days];
                    newDays[dayIndex].activities[actIndex].time = e.target.value;
                    setDays(newDays);
                  }}
                  className="border p-2 rounded-lg"
                />
                <input 
                  type="text" 
                  placeholder="Activity (e.g., Morning Walk)"
                  value={act.activity}
                  onChange={(e) => {
                    const newDays = [...days];
                    newDays[dayIndex].activities[actIndex].activity = e.target.value;
                    setDays(newDays);
                  }}
                  className="border p-2 rounded-lg flex-grow"
                />
              </div>
            ))}
            
            <button 
              onClick={() => handleAddActivity(dayIndex)}
              className="mt-2 text-sm text-blue-600 hover:text-blue-800"
            >
              + Add Activity
            </button>
          </div>
        ))}

        <div className="flex justify-between items-center mt-8">
          <button 
            onClick={handleAddDay}
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300"
          >
            + Add Another Day
          </button>
          
          <button 
            onClick={handleSaveTrip}
            className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 shadow-lg"
          >
            Save Itinerary
          </button>
        </div>
      </div>
    </div>
  );
}