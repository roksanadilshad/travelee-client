export const selectTotalCost = (state) => {
  const base = state.itinerary.currentTrip.basePrice || 0;
  const activitiesTotal = state.itinerary.currentTrip.days.reduce((sum, day) => {
    return sum + day.activities.reduce((daySum, act) => daySum + Number(act.cost), 0);
  }, 0);
  
  return activitiesTotal;
};