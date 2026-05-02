const calculateBudget = (days, budgetType) => {
  let base;

  if (budgetType === "low") base = 50;
  else if (budgetType === "medium") base = 100;
  else base = 200;

  const flights = base * 4;
  const accommodation = base * days;
  const food = base * 0.5 * days;
  const activities = base * 0.3 * days;

  const total =
    flights + accommodation + food + activities;

  return {
    flights,
    accommodation,
    food,
    activities,
    total,
    dailyCost: base,
  };
};

module.exports = calculateBudget;