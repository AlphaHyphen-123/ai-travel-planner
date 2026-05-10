const calculateBudget = (startPlace, destination, days, budgetType) => {
  const indianDestinations = [
    "delhi", "mumbai", "goa", "jaipur", "manali", 
    "shimla", "kerala", "agra", "bangalore"
  ];
  
  const destIsIndia = indianDestinations.some(d => 
    destination.toLowerCase().includes(d)
  );

  const startIsIndia = startPlace ? indianDestinations.some(d => 
    startPlace.toLowerCase().includes(d)
  ) : destIsIndia; // fallback if startPlace somehow missing

  let flights, hotelPerDay, foodPerDay, activitiesPerDay;

  const type = budgetType ? budgetType.toLowerCase() : "medium";

  // Transportation Cost Logic
  const isSamePlace = startPlace && destination.toLowerCase().trim() === startPlace.toLowerCase().trim();
  const isDomestic = destIsIndia === startIsIndia;

  let transportMultiplier = 1;
  if (isSamePlace) {
    transportMultiplier = 0.2; // very low transport cost
  } else if (!isDomestic) {
    transportMultiplier = 5; // high international cost
  }

  if (destIsIndia) {
    if (type === "low") {
      flights = 5000;
      hotelPerDay = 1000;
      foodPerDay = 500;
      activitiesPerDay = 500;
    } else if (type === "high") {
      flights = 12000;
      hotelPerDay = 8000;
      foodPerDay = 3000;
      activitiesPerDay = 2500;
    } else { // medium
      flights = 8000;
      hotelPerDay = 3000;
      foodPerDay = 1200;
      activitiesPerDay = 1000;
    }
  } else { // International
    if (type === "low") {
      flights = 40000;
      hotelPerDay = 4000;
      foodPerDay = 1500;
      activitiesPerDay = 1000;
    } else if (type === "high") {
      flights = 100000;
      hotelPerDay = 15000;
      foodPerDay = 5000;
      activitiesPerDay = 4000;
    } else { // medium
      flights = 60000;
      hotelPerDay = 8000;
      foodPerDay = 2500;
      activitiesPerDay = 2000;
    }
  }

  flights = flights * transportMultiplier;

  const accommodation = hotelPerDay * days;
  const food = foodPerDay * days;
  const activities = activitiesPerDay * days;
  const total = flights + accommodation + food + activities;
  const dailyCost = hotelPerDay + foodPerDay + activitiesPerDay;

  return {
    flights,
    accommodation,
    food,
    activities,
    total,
    dailyCost
  };
};

module.exports = calculateBudget;