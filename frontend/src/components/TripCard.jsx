import { deleteTrip } from "../services/api";

function TripCard({ trip, onDelete }) {
  const handleDelete = async () => {
    await deleteTrip(trip._id);
    onDelete(trip._id);
  };

  return (
    <div>
      <h3>{trip.destination}</h3>
      <p>{trip.days} days</p>
      <p>Budget: {trip.estimatedBudget}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default TripCard;