import { createSlice } from '@reduxjs/toolkit';

const itinerarySlice = createSlice({
  name: 'itinerary',
  initialState: {
    currentTrip: {
      destination: '',
      basePrice: 0, // Added to store the destination's starting cost
      days: [] // Structure: [{ id, activities: [{ id, time, task, cost }] }]
    }
  },
  reducers: {
    // Correctly merges incoming details like destination and basePrice
    setTripDetails: (state, action) => {
      state.currentTrip = { 
        ...state.currentTrip, 
        ...action.payload,
        // Ensure basePrice is always a number
        basePrice: action.payload.basePrice ? Number(action.payload.basePrice) : state.currentTrip.basePrice 
      };
    },

    addDay: (state) => {
      // Initialize days array if it doesn't exist (safety check)
      if (!state.currentTrip.days) state.currentTrip.days = [];
      
      state.currentTrip.days.push({ 
        id: Date.now() + Math.random(), // Unique ID for keys
        activities: [] 
      });
    },

    addActivity: (state, action) => {
      const { dayIndex, activity } = action.payload;
      // Ensure the day exists before pushing
      if (state.currentTrip.days[dayIndex]) {
        state.currentTrip.days[dayIndex].activities.push({
          ...activity,
          cost: Number(activity.cost) || 0 // Ensure cost is a number for calculations
        });
      }
    },

    // Updated to use activityId for more reliable deletion
    removeActivity: (state, action) => {
      const { dayIndex, activityId } = action.payload;
      if (state.currentTrip.days[dayIndex]) {
        state.currentTrip.days[dayIndex].activities = state.currentTrip.days[dayIndex].activities.filter(
          (act) => act.id !== activityId
        );
      }
    },

    // Optional: Useful for starting over
    resetTrip: (state) => {
      state.currentTrip = { destination: '', basePrice: 0, days: [] };
    },
    reorderActivities: (state, action) => {
  const { dayIndex, newActivities } = action.payload;
  state.currentTrip.days[dayIndex].activities = newActivities;
},
  }
});

export const { 
  setTripDetails, 
  addDay, 
  addActivity, 
  removeActivity, 
  resetTrip ,
  reorderActivities
} = itinerarySlice.actions;

export default itinerarySlice.reducer;