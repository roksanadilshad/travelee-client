import { createSlice } from '@reduxjs/toolkit';

const itinerarySlice = createSlice({
  name: 'itinerary',
  initialState: {
    currentTrip: {
      destination: '',
      // startDate: '',
      days: [] // Structure: [{ id, activities: [{ time, task, cost }] }]
    }
  },
  reducers: {
    setTripDetails: (state, action) => {
      state.currentTrip = { ...state.currentTrip, ...action.payload };
    },
    addDay: (state) => {
      state.currentTrip.days.push({ 
        id: Date.now(), 
        activities: [] 
      });
    },
    addActivity: (state, action) => {
      const { dayIndex, activity } = action.payload;
      // activity = { time: '10:00', task: 'Visit Museum', cost: 50 }
      state.currentTrip.days[dayIndex].activities.push(activity);
    },
    removeActivity: (state, action) => {
      const { dayIndex, activityIndex } = action.payload;
      state.currentTrip.days[dayIndex].activities.splice(activityIndex, 1);
    }
  }
});

export const { setTripDetails, addDay, addActivity, removeActivity } = itinerarySlice.actions;
export default itinerarySlice.reducer;