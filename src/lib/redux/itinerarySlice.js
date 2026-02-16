import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentTrip: {
    destination: '',
    days: []
  },
  savedTrips: []
};

const itinerarySlice = createSlice({
  name: 'itinerary',
  initialState,
  reducers: {
    setDestination: (state, action) => {
      state.currentTrip.destination = action.payload;
    },
    addDay: (state) => {
      state.currentTrip.days.push({ id: Date.now(), activities: [] });
    },
    updateActivity: (state, action) => {
      const { dayIndex, activityIndex, data } = action.payload;
      state.currentTrip.days[dayIndex].activities[activityIndex] = data;
    }
  }
});

export const { setDestination, addDay, updateActivity } = itinerarySlice.actions;
export default itinerarySlice.reducer;