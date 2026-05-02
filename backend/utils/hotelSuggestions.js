const getHotelSuggestions = (destination, budgetType) => {
  const hotels = {
    low: [
      `${destination} Budget Inn`,
      `${destination} Backpackers Hostel`,
    ],
    medium: [
      `${destination} Comfort Hotel`,
      `${destination} City Residency`,
    ],
    high: [
      `${destination} Grand Palace Hotel`,
      `${destination} Luxury Resort & Spa`,
    ],
  };

  return hotels[budgetType] || [];
};

module.exports = getHotelSuggestions;