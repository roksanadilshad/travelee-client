import { configureStore } from '@reduxjs/toolkit';
import itineraryReducer from './itinerarySlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      itinerary: itineraryReducer,
    }
  });
};