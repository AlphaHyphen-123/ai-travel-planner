import { useEffect, useState } from "react";
import logo from "../assets/logo.webp";
import { useParams, useNavigate } from "react-router-dom";
import { getTripById, updateTrip, deleteTrip, regenerateDay } from "../services/api";
import toast from "react-hot-toast";
import {
  Calendar,
  MapPin,
  Wallet,
  ArrowLeft,
  Trash2,
  Edit2,
  Check,
  X,
  Loader2,
  Plane,
  Hotel,
  AlertCircle,
  RefreshCw,
  Sun,
  CloudRain,
  Snowflake,
  Cloud,
  Thermometer,
} from "lucide-react";


function TripDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingDay, setEditingDay] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [regenLoading, setRegenLoading] = useState(null);
  const [currency, setCurrency] = useState("USD");

  const USD_TO_INR = 83;

  const formatCurrency = (amount) => {
    if (amount === undefined || amount === null) amount = 0;
    if (currency === "INR") {
      return "₹" + amount.toLocaleString("en-IN");
    } else {
      return "$" + Math.round(amount / USD_TO_INR).toLocaleString("en-US");
    }
  };

  useEffect(() => {
    fetchTrip();
  }, [id]);

  const fetchTrip = async () => {
    try {
      const data = await getTripById(id);
      setTrip(data);
    } catch (err) {
      console.error(err);
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (dayIndex, activities) => {
    setEditingDay(dayIndex);
    // Joining activities with newlines for easier editing in textarea
    setEditContent(Array.isArray(activities) ? activities.join("\n") : "");
  };

  const saveDayEdit = async () => {
    if (!trip) return;
    setSaving(true);
    try {
      const newItinerary = [...trip.itinerary];
      // Splitting by newline and filtering out empty lines to get back to array
      newItinerary[editingDay].activities = editContent.split("\n").filter(a => a.trim() !== "");

      const updatedTrip = await updateTrip(id, { itinerary: newItinerary });
      setTrip(updatedTrip);
      setEditingDay(null);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const removeActivity = async (dayIndex, actIndex) => {
    const newItinerary = [...trip.itinerary];
    newItinerary[dayIndex].activities.splice(actIndex, 1);
    const updated = await updateTrip(id, { itinerary: newItinerary });
    setTrip(updated);
  };

  const addActivity = async (dayIndex, text) => {
    if (!text.trim()) return;
    const newItinerary = [...trip.itinerary];
    newItinerary[dayIndex].activities.push(text);
    const updated = await updateTrip(id, { itinerary: newItinerary });
    setTrip(updated);
  };

  const handleRegenerate = async (dayIndex) => {
    const instruction = prompt(
      `What changes do you want for Day ${dayIndex + 1}? (e.g., more outdoor activities, cheaper food options, etc.)`
    );

    if (!instruction || !instruction.trim()) return;

    try {
      setRegenLoading(dayIndex);
      const updated = await regenerateDay(id, {
        dayIndex,
        instruction,
      });
      setTrip(updated);
      toast.success(`Day ${dayIndex + 1} regenerated! ✨`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to regenerate day.");
    } finally {
      setRegenLoading(null);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this trip?")) {
      try {
        await deleteTrip(id);
        navigate("/dashboard");
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
      </div>
    );
  }

  const handleSave = async () => {
    try {
      await updateTrip(id, { saved: true });
      toast.success("Trip Saved to Dashboard ✅");
      setTrip(prev => ({ ...prev, saved: true }));
    } catch (err) {
      console.error(err);
      toast.error("Failed to save trip.");
    }
  };

  if (!trip) return null;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* ----------- TOP NAV ----------- */}
      <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 font-medium transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div className="flex items-center gap-2">
            <img src={logo} alt="logo" className="w-8 h-8 rounded-lg shadow-sm" />
            <span className="font-bold text-slate-900 hidden sm:block text-sm">TravelAI</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleDelete}
              className="p-2.5 rounded-xl text-red-600 hover:bg-red-50 transition"
              title="Delete Trip"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* ----------- HERO ----------- */}
      <header className="bg-white border-b border-slate-200 pt-10 pb-8 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-4">
                <Plane className="w-3.5 h-3.5" />
                AI Generated Itinerary
              </div>
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
                Trip to {trip.destination}
              </h1>
              <div className="flex flex-wrap gap-4 text-sm text-slate-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  {trip.startDate ? new Date(trip.startDate).toLocaleDateString() : `${trip.days} Days`}
                </div>
                {trip.startDate && (
                   <div className="flex items-center gap-1.5">
                   <RefreshCw className="w-4 h-4 text-slate-400" />
                   {trip.days} Days
                 </div>
                )}
                <div className="flex items-center gap-1.5">
                  <Wallet className="w-4 h-4 text-slate-400" />
                  {trip.budgetType ? trip.budgetType.charAt(0).toUpperCase() + trip.budgetType.slice(1) : "Standard"} Budget
                </div>

              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {trip.interests?.map((interest) => (
                <span
                  key={interest}
                  className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ----------- CONTENT ----------- */}
      <main className="max-w-5xl mx-auto px-4 sm:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT: ITINERARY */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-indigo-500" />
              Day-by-Day Plan
            </h2>

            {Array.isArray(trip.itinerary) ? (
              trip.itinerary.map((day, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                    <h3 className="font-bold text-slate-800">Day {day.day}</h3>
                    {editingDay === idx ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={saveDayEdit}
                          disabled={saving}
                          className="p-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                        >
                          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => setEditingDay(null)}
                          className="p-1.5 bg-slate-200 text-slate-600 rounded-lg hover:bg-slate-300"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleRegenerate(idx)}
                          disabled={regenLoading !== null}
                          className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-2.5 py-1.5 rounded-lg transition-all disabled:opacity-50"
                        >
                          {regenLoading === idx ? (
                            <RefreshCw className="w-3 h-3 animate-spin" />
                          ) : (
                            <RefreshCw className="w-3 h-3" />
                          )}
                          {regenLoading === idx ? "Updating..." : "Regenerate"}
                        </button>
                        <button
                          onClick={() => handleEdit(idx, day.activities)}
                          className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    {editingDay === idx ? (
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full h-32 p-3 text-sm text-slate-600 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition"
                        placeholder="One activity per line..."
                      />
                    ) : (
                      <>
                        <ul className="space-y-3">
                          {Array.isArray(day.activities) ? (
                            day.activities.map((activity, aIdx) => (
                              <li key={aIdx} className="flex justify-between items-center text-sm text-slate-600">
                                <div className="flex items-start gap-3">
                                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 flex-shrink-0" />
                                  {activity}
                                </div>
                                <button
                                  onClick={() => removeActivity(idx, aIdx)}
                                  className="text-red-500 text-xs hover:text-red-700 font-medium"
                                >
                                  Remove
                                </button>
                              </li>
                            ))
                          ) : (
                            <li className="text-slate-400 italic text-sm">No activities listed for this day.</li>
                          )}
                        </ul>
                        <div className="mt-4 pt-4 border-t border-slate-100">
                          <input
                            type="text"
                            placeholder="Add activity... (Press Enter)"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                addActivity(idx, e.target.value);
                                e.target.value = "";
                              }
                            }}
                            className="w-full p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 text-center">
                <AlertCircle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-amber-900 mb-1">Itinerary Not Available</h3>
                <p className="text-sm text-amber-700">We couldn't load your travel plan. Please try creating a new trip.</p>
              </div>
            )}
          </div>

          {/* RIGHT: DETAILS & SUGGESTIONS */}
          <div className="space-y-8">
            {/* Budget Breakdown */}
            {trip.estimatedBudget && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    <Wallet className="w-5 h-5 text-indigo-500" />
                    Estimated Budget
                  </h3>

                  {/* Realistic Toggle Button */}
                  <div 
                    onClick={() => setCurrency(currency === "USD" ? "INR" : "USD")}
                    className="relative w-24 h-8 bg-slate-100 rounded-full p-1 cursor-pointer flex items-center border border-slate-200"
                  >
                    <div 
                      className={`absolute w-11 h-6 bg-white rounded-full shadow-sm transition-all duration-300 transform ${
                        currency === "INR" ? "translate-x-11" : "translate-x-0"
                      }`}
                    />
                    <div className="relative flex w-full justify-between px-2 text-[10px] font-bold z-10 select-none">
                      <span className={currency === "USD" ? "text-indigo-600" : "text-slate-400"}>USD</span>
                      <span className={currency === "INR" ? "text-indigo-600" : "text-slate-400"}>INR</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Hotels</span>
                    <span className="transition-all duration-300">
                      {formatCurrency(trip.estimatedBudget?.accommodation || 0)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Food</span>
                    <span className="transition-all duration-300">
                      {formatCurrency(trip.estimatedBudget?.food || 0)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Activities</span>
                    <span className="transition-all duration-300">
                      {formatCurrency(trip.estimatedBudget?.activities || 0)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Flights / Transport</span>
                    <span className="transition-all duration-300">
                      {formatCurrency(trip.estimatedBudget?.flights || 0)}
                    </span>
                  </div>

                  <div className="pt-3 border-t mt-2 flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-indigo-600 transition-all duration-300">
                      {formatCurrency(trip.estimatedBudget?.total || 0)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Weather Forecast */}
            {trip.weather && trip.weather.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-5 flex items-center gap-2">
                  <Sun className="w-5 h-5 text-amber-500" />
                  Weather Forecast
                </h3>
                <div className="space-y-4">
                  {trip.weather.map((day, index) => {
                    const condition = day.day.condition.text.toLowerCase();
                    let Icon = Cloud;
                    if (condition.includes("sun") || condition.includes("clear")) Icon = Sun;
                    else if (condition.includes("rain") || condition.includes("drizzle")) Icon = CloudRain;
                    else if (condition.includes("snow")) Icon = Snowflake;

                    return (
                      <div key={index} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-indigo-500" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-700">Day {index + 1}</p>
                            <p className="text-xs text-slate-500 capitalize">{day.day.condition.text}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-indigo-600 font-bold">
                          <Thermometer className="w-3.5 h-3.5 opacity-50" />
                          {Math.round(day.day.avgtemp_c)}°C
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}


            {/* Hotel Suggestions */}
            {trip.hotels && trip.hotels.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Hotel className="w-5 h-5 text-indigo-500" />
                  Stay Recommendations
                </h3>
                <div className="space-y-3">
                  {trip.hotels.map((hotel, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-indigo-500 shadow-sm">
                        <Hotel className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium text-slate-700">{hotel}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          {!trip.saved && (
            <div className="mt-10 text-center lg:col-span-3">
              <button
                onClick={handleSave}
                className="px-8 py-3.5 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 shadow-lg shadow-green-500/20 transform hover:-translate-y-0.5 transition-all"
              >
                Save Trip to Dashboard
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default TripDetails;
