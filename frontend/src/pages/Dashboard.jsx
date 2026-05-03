import { useEffect, useState, useContext } from "react";
import logo from "../assets/logo.webp";
import bgimg from "../assets/bgimg.jpg";

import { getTrips } from "../services/api";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import {
  LayoutDashboard,
  PlusCircle,
  LogOut,
  Plane,
  MapPin,
  Calendar,
  Search,
  Bell,
  Compass,
  Luggage,
  Sparkles,
  CheckCircle,
  Info,
} from "lucide-react";

function Dashboard() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const [notifications, setNotifications] = useState([
    { id: 1, text: "Trip to Paris created successfully! ✈️", type: "success" },
    { id: 2, text: "AI Suggestion: Add more nature spots to Day 2.", type: "ai" },
    { id: 3, text: "Reminder: Your Bali trip starts in 3 days!", type: "info" },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const data = await getTrips();
      setTrips(data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  const filteredTrips = trips.filter((t) =>
    t.destination?.toLowerCase().includes(search.toLowerCase())
  );

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { label: "Create Trip", icon: PlusCircle, path: "/create-trip" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-800">
      {/* ===================== SIDEBAR ===================== */}
      <aside 
        className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 shadow-sm relative overflow-hidden"
        style={{ 
          backgroundImage: `url(${bgimg})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center' 
        }}
      >
        {/* Dark semi-transparent overlay for premium look and image visibility */}
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px] z-0"></div>


        <div className="relative z-10 flex flex-col h-full">

        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
          <img src={logo} alt="logo" className="w-10 h-10 rounded-lg shadow-md" />
          <span className="text-lg font-bold tracking-tight text-white">
            Travel<span className="text-indigo-400">AI</span>
          </span>
        </div>


        {/* Nav */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-white/20 text-white shadow-sm backdrop-blur-md"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}

              >
                <Icon className="w-4.5 h-4.5" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-4 py-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:bg-red-500/20 hover:text-red-400 transition-all"
          >
            <LogOut className="w-4.5 h-4.5" />
            Logout
          </button>
        </div>

        </div>
      </aside>


      {/* ===================== MAIN ===================== */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* ----------- TOP NAVBAR ----------- */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-200">
          <div className="flex items-center justify-between px-4 sm:px-8 py-4">
            {/* Mobile logo */}
            <div className="flex items-center gap-2 lg:hidden">
              <img src={logo} alt="logo" className="w-8 h-8 rounded-lg shadow-sm" />
              <span className="font-bold">TravelAI</span>
            </div>

            {/* Search */}
            <div className="hidden sm:flex flex-1 max-w-md mx-6">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search trips..."
                  className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100 border border-transparent rounded-lg focus:bg-white focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition"
                />
              </div>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3 relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className={`relative p-2 rounded-lg transition-all ${
                  showNotifications ? "bg-indigo-50 text-indigo-600" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Bell className="w-5 h-5" />
                {notifications.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <h3 className="font-bold text-slate-900 text-sm">Notifications</h3>
                    <button
                      onClick={() => setNotifications([])}
                      className="text-xs text-indigo-600 hover:underline font-medium"
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center">
                        <Bell className="w-8 h-8 text-slate-200 mx-auto mb-2" />
                        <p className="text-sm text-slate-400">No new notifications</p>
                      </div>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          className="px-5 py-4 border-b border-slate-50 hover:bg-slate-50 transition-colors flex gap-3"
                        >
                          {n.type === "success" && <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />}
                          {n.type === "ai" && <Sparkles className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />}
                          {n.type === "info" && <Info className="w-4 h-4 text-sky-500 mt-0.5 flex-shrink-0" />}
                          <p className="text-sm text-slate-600 leading-snug">{n.text}</p>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="px-5 py-3 bg-slate-50/50 border-t border-slate-100 text-center">
                    <button className="text-xs text-slate-500 font-medium hover:text-indigo-600">
                      View all activity
                    </button>
                  </div>
                </div>
              )}

              <div className="relative">
                <div 
                  onClick={() => setShowProfile(!showProfile)}
                  className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-sky-500 flex items-center justify-center text-white font-semibold text-sm shadow-md cursor-pointer hover:scale-105 transition-transform"
                >
                  {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>

                {/* Profile Dropdown */}
                {showProfile && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50">
                      <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">User Profile</p>
                      <h3 className="font-bold text-slate-900 text-sm truncate">{user?.name || "User Name"}</h3>
                      <p className="text-xs text-slate-500 truncate">{user?.email || "user@example.com"}</p>
                    </div>
                    <div className="p-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* ----------- CONTENT ----------- */}
        <main className="flex-1 px-4 sm:px-8 py-8">
          {/* Header section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                My Trips
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Plan and manage your journeys with AI ✈️
              </p>
            </div>

            <button
              onClick={() => navigate("/create-trip")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-sky-500 hover:from-indigo-500 hover:to-sky-400 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transform hover:-translate-y-0.5 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              Create Trip
            </button>
          </div>

          {/* Stats row */}
          {trips.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <StatCard
                icon={Luggage}
                label="Total Trips"
                value={trips.length}
                color="indigo"
              />
              <StatCard
                icon={Calendar}
                label="Total Days Planned"
                value={trips.reduce((acc, t) => acc + (Number(t.days) || 0), 0)}
                color="sky"
              />
              <StatCard
                icon={Compass}
                label="Destinations"
                value={new Set(trips.map((t) => t.destination)).size}
                color="emerald"
              />
            </div>
          )}

          {/* Trips */}
          {loading ? (
            <SkeletonGrid />
          ) : filteredTrips.length === 0 ? (
            <EmptyState
              hasTrips={trips.length > 0}
              onCreate={() => navigate("/create-trip")}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredTrips.map((trip, idx) => (
                <TripCard key={trip._id} trip={trip} index={idx} navigate={navigate} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

/* ===================== SUB-COMPONENTS ===================== */

function StatCard({ icon: Icon, label, value, color }) {
  const colors = {
    indigo: "from-indigo-500 to-indigo-600 shadow-indigo-500/20",
    sky: "from-sky-500 to-sky-600 shadow-sky-500/20",
    emerald: "from-emerald-500 to-emerald-600 shadow-emerald-500/20",
  };
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div
          className={`w-11 h-11 rounded-xl bg-gradient-to-br ${colors[color]} flex items-center justify-center shadow-lg`}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-xs text-slate-500 font-medium">{label}</p>
          <p className="text-2xl font-bold text-slate-900">{value}</p>
        </div>
      </div>
    </div>
  );
}

function TripCard({ trip, index, navigate }) {
  // Soft gradient placeholder per card
  const gradients = [
    "from-indigo-400 via-purple-400 to-pink-400",
    "from-sky-400 via-cyan-400 to-teal-400",
    "from-amber-400 via-orange-400 to-rose-400",
    "from-emerald-400 via-green-400 to-lime-400",
    "from-fuchsia-400 via-pink-400 to-rose-400",
    "from-blue-400 via-indigo-400 to-violet-400",
  ];
  const gradient = gradients[index % gradients.length];

  return (
    <div
      className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-indigo-200 hover:-translate-y-1 transition-all duration-300"
      style={{ animation: `fadeInUp 0.4s ease ${index * 0.05}s both` }}
    >
      {/* Cover */}
      <div
        className={`relative h-36 bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden`}
      >
        <Plane className="w-12 h-12 text-white/90 drop-shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500" />
        <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/25 backdrop-blur-md rounded-full text-xs font-semibold text-white border border-white/30">
          {trip.days} days
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="flex items-start gap-2 mb-2">
          <MapPin className="w-4 h-4 text-indigo-500 mt-1 flex-shrink-0" />
          <h3 className="font-bold text-slate-900 text-lg leading-tight line-clamp-1">
            {trip.destination}
          </h3>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-slate-500">
          <Calendar className="w-3.5 h-3.5" />
          <span>{trip.days} day itinerary</span>
        </div>

        <button 
          onClick={() => navigate(`/trip/${trip._id}`)}
          className="mt-4 w-full py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
}

function EmptyState({ hasTrips, onCreate }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4 bg-white border border-dashed border-slate-300 rounded-2xl">
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-100 to-sky-100 flex items-center justify-center mb-5">
        <Compass className="w-10 h-10 text-indigo-500" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">
        {hasTrips ? "No matching trips" : "No trips yet"}
      </h3>
      <p className="text-sm text-slate-500 max-w-sm mb-6">
        {hasTrips
          ? "Try adjusting your search to find what you're looking for."
          : "Your adventure starts here. Create your first AI-powered travel plan in seconds."}
      </p>
      {!hasTrips && (
        <button
          onClick={onCreate}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-sky-500 hover:from-indigo-500 hover:to-sky-400 shadow-lg shadow-indigo-500/20 transform hover:-translate-y-0.5 transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          Create your first trip
        </button>
      )}
    </div>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="bg-white border border-slate-200 rounded-2xl overflow-hidden animate-pulse"
        >
          <div className="h-36 bg-slate-200" />
          <div className="p-5 space-y-3">
            <div className="h-4 bg-slate-200 rounded w-3/4" />
            <div className="h-3 bg-slate-200 rounded w-1/2" />
            <div className="h-8 bg-slate-100 rounded mt-4" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* Inject keyframes once */
const styleId = "dashboard-anim";
if (typeof document !== "undefined" && !document.getElementById(styleId)) {
  const style = document.createElement("style");
  style.id = styleId;
  style.innerHTML = `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
}

export default Dashboard;