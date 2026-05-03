import { useState, useEffect } from "react";
import logo from "../assets/logo.webp";
import { createTrip } from "../services/api";
import { useNavigate, useLocation } from "react-router-dom";
import {
  MapPin,
  Calendar,
  Wallet,
  Sparkles,
  Plane,
  LayoutDashboard,
  PlusCircle,
  ArrowLeft,
  Loader2,
  Check,
  Mountain,
  UtensilsCrossed,
  Trees,
  Camera,
  Building2,
  Music,
  ShoppingBag,
  Waves,
  Brain,
  Map,
  Hotel,
  Compass,
} from "lucide-react";

const INTEREST_OPTIONS = [
  { label: "Adventure", icon: Mountain },
  { label: "Food", icon: UtensilsCrossed },
  { label: "Nature", icon: Trees },
  { label: "Photography", icon: Camera },
  { label: "Culture", icon: Building2 },
  { label: "Nightlife", icon: Music },
  { label: "Shopping", icon: ShoppingBag },
  { label: "Beaches", icon: Waves },
];

// 🆕 Loading steps for the dynamic overlay
const LOADING_STEPS = [
  { icon: Brain, title: "Analyzing your preferences", desc: "Understanding your vibe & budget..." },
  { icon: Compass, title: "Scouting top destinations", desc: "Finding hidden gems just for you..." },
  { icon: Map, title: "Crafting day-wise itinerary", desc: "Optimizing your perfect route..." },
  { icon: Hotel, title: "Picking the best stays", desc: "Matching hotels to your budget..." },
  { icon: Wallet, title: "Calculating budget breakdown", desc: "Every dollar, accounted for..." },
  { icon: Sparkles, title: "Adding final touches", desc: "Making it truly magical..." },
];

function CreateTrip() {
  // ✅ FIXED — interests removed from form state (kept as array in selectedInterests)
  const [form, setForm] = useState({
    destination: "",
    startDate: "",
    days: "",
    budgetType: "",
  });


  const [selectedInterests, setSelectedInterests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [loadingStep, setLoadingStep] = useState(0); // 🆕

  const navigate = useNavigate();
  const location = useLocation();

  // 🆕 Cycle through loading steps while loading
  useEffect(() => {
    if (!loading) {
      setLoadingStep(0);
      return;
    }
    const interval = setInterval(() => {
      setLoadingStep((prev) => (prev + 1) % LOADING_STEPS.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [loading]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  // ✅ FIXED — no more string.join, keeps interests as array only
  const toggleInterest = (label) => {
    let next;
    if (selectedInterests.includes(label)) {
      next = selectedInterests.filter((i) => i !== label);
    } else {
      next = [...selectedInterests, label];
    }
    setSelectedInterests(next);

    if (errors.interests) {
      setErrors({ ...errors, interests: "" });
    }
  };

  // ✅ FIXED — days range 1–15, interests checked from array
  const validate = () => {
    const e = {};

    if (!form.destination.trim()) e.destination = "Destination is required";

    if (!form.startDate) e.startDate = "Start date is required";

    if (!form.days || Number(form.days) < 1 || Number(form.days) > 15)
      e.days = "Enter 1–15 days";


    if (!form.budgetType) e.budgetType = "Please select a budget";

    if (selectedInterests.length === 0)
      e.interests = "Pick at least one interest";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // 🔥 MAIN FIX — LLM READY structured payload
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      const payload = {
        destination: form.destination.trim(),
        startDate: form.startDate,
        days: Number(form.days),


        // ✅ LLM friendly — low / medium / high
        budgetType: form.budgetType.toLowerCase(),

        // ✅ ARRAY (not string)
        interests: selectedInterests,

        // 🔥 Extra structured context for the LLM
        preferences: {
          travelStyle: form.budgetType.toLowerCase(),
          interests: selectedInterests,
          tripType: "personalized",
        },
      };

      console.log("LLM Payload:", payload);

      const res = await createTrip(payload);

      navigate(`/trip/${res._id}`);
    } catch (err) {
      console.log(err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { label: "Create Trip", icon: PlusCircle, path: "/create-trip" },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* ============ SIDEBAR ============ */}
      <aside className="hidden lg:flex flex-col w-64 bg-white/70 backdrop-blur-xl border-r border-slate-200/60">
        <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-200/60">
          <img src={logo} alt="logo" className="w-10 h-10 rounded-lg shadow-sm" />
          <span className="text-lg font-bold tracking-tight text-slate-900">
            Travel<span className="text-indigo-600">AI</span>
          </span>
        </div>

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
                    ? "bg-indigo-50 text-indigo-700 shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* ============ MAIN ============ */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-8 py-10 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 -left-20 w-80 h-80 bg-indigo-300/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 -right-20 w-96 h-96 bg-sky-300/30 rounded-full blur-3xl"></div>

        <div className="relative w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
          {/* ========= LEFT: HERO ========= */}
          <div className="hidden lg:block">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[640px]">
              <img
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80"
                alt="Travel"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/90 via-indigo-900/30 to-transparent"></div>

              <div className="absolute top-6 left-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                AI-Powered Planning
              </div>

              <div className="absolute bottom-8 left-8 right-8 text-white">
                <h2 className="text-4xl font-extrabold leading-tight mb-3">
                  Where will your <br /> next story unfold?
                </h2>
                <p className="text-white/85 text-sm leading-relaxed">
                  Let our AI craft a personalized itinerary that matches your
                  vibe, budget, and travel dreams.
                </p>

                <div className="mt-6 flex items-center gap-6 text-xs">
                  <div>
                    <p className="text-2xl font-bold">10k+</p>
                    <p className="text-white/70">Trips planned</p>
                  </div>
                  <div className="w-px h-10 bg-white/30"></div>
                  <div>
                    <p className="text-2xl font-bold">120+</p>
                    <p className="text-white/70">Countries</p>
                  </div>
                  <div className="w-px h-10 bg-white/30"></div>
                  <div>
                    <p className="text-2xl font-bold">4.9★</p>
                    <p className="text-white/70">User rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========= RIGHT: FORM ========= */}
          <div className="relative">
            {/* Mobile back */}
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="lg:hidden inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-indigo-600 mb-4 font-medium"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </button>

            <div className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-3xl shadow-2xl p-7 sm:p-9">
              {/* Header */}
              <div className="mb-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-3">
                  <Sparkles className="w-3 h-3" />
                  AI Trip Generator
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                  Plan Your Dream Trip
                </h1>
                <p className="text-sm text-slate-500 mt-2">
                  Let AI generate your perfect itinerary in seconds.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Destination */}
                <div>
                  <label
                    htmlFor="destination"
                    className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 mb-1.5"
                  >
                    <MapPin className="w-4 h-4 text-indigo-500" />
                    Destination
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      id="destination"
                      name="destination"
                      value={form.destination}
                      onChange={handleChange}
                      placeholder="e.g. Paris, Bali, Tokyo"
                      className={`w-full pl-10 pr-4 py-3 text-sm bg-white border rounded-xl focus:outline-none focus:ring-4 transition-all ${
                        errors.destination
                          ? "border-red-300 focus:ring-red-100 focus:border-red-400"
                          : "border-slate-200 focus:ring-indigo-100 focus:border-indigo-400 hover:border-slate-300"
                      }`}
                    />
                  </div>
                  {errors.destination ? (
                    <p className="text-xs text-red-500 mt-1.5">{errors.destination}</p>
                  ) : (
                    <p className="text-xs text-slate-400 mt-1.5">
                      Where do you want to go?
                    </p>
                  )}
                </div>

                {/* Start Date */}
                <div>
                  <label
                    htmlFor="startDate"
                    className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 mb-1.5"
                  >
                    <Calendar className="w-4 h-4 text-indigo-500" />
                    Trip Start Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      id="startDate"
                      name="startDate"
                      type="date"
                      value={form.startDate}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 text-sm bg-white border rounded-xl focus:outline-none focus:ring-4 transition-all ${
                        errors.startDate
                          ? "border-red-300 focus:ring-red-100 focus:border-red-400"
                          : "border-slate-200 focus:ring-indigo-100 focus:border-indigo-400 hover:border-slate-300"
                      }`}
                    />
                  </div>
                  {errors.startDate ? (
                    <p className="text-xs text-red-500 mt-1.5">{errors.startDate}</p>
                  ) : (
                    <p className="text-xs text-slate-400 mt-1.5">
                      When does your adventure begin?
                    </p>
                  )}
                </div>


                {/* Days + Budget grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Days */}
                  <div>
                    <label
                      htmlFor="days"
                      className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 mb-1.5"
                    >
                      <Calendar className="w-4 h-4 text-indigo-500" />
                      Days
                    </label>
                    <input
                      id="days"
                      name="days"
                      type="number"
                      min="1"
                      max="15"
                      value={form.days}
                      onChange={handleChange}
                      placeholder="7"
                      className={`w-full px-4 py-3 text-sm bg-white border rounded-xl focus:outline-none focus:ring-4 transition-all ${
                        errors.days
                          ? "border-red-300 focus:ring-red-100 focus:border-red-400"
                          : "border-slate-200 focus:ring-indigo-100 focus:border-indigo-400 hover:border-slate-300"
                      }`}
                    />
                    {errors.days ? (
                      <p className="text-xs text-red-500 mt-1.5">{errors.days}</p>
                    ) : (
                      <p className="text-xs text-slate-400 mt-1.5">1–15 days</p>
                    )}
                  </div>

                  {/* Budget */}
                  <div>
                    <label
                      htmlFor="budgetType"
                      className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 mb-1.5"
                    >
                      <Wallet className="w-4 h-4 text-indigo-500" />
                      Budget
                    </label>
                    <select
                      id="budgetType"
                      name="budgetType"
                      value={form.budgetType}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 text-sm bg-white border rounded-xl focus:outline-none focus:ring-4 transition-all appearance-none cursor-pointer bg-no-repeat ${
                        errors.budgetType
                          ? "border-red-300 focus:ring-red-100 focus:border-red-400"
                          : "border-slate-200 focus:ring-indigo-100 focus:border-indigo-400 hover:border-slate-300"
                      }`}
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%2364748b' d='M6 8L0 0h12z'/%3E%3C/svg%3E\")",
                        backgroundPosition: "right 1rem center",
                        paddingRight: "2.5rem",
                      }}
                    >
                      <option value="">Select</option>
                      {/* ✅ Values match backend: low / medium / high */}
                      <option value="Low">💸 Low — Budget</option>
                      <option value="Medium">⚖️ Medium — Balanced</option>
                      <option value="High">✨ High — Luxury</option>
                    </select>
                    {errors.budgetType ? (
                      <p className="text-xs text-red-500 mt-1.5">{errors.budgetType}</p>
                    ) : (
                      <p className="text-xs text-slate-400 mt-1.5">Spending level</p>
                    )}
                  </div>
                </div>

                {/* Interests — Tag selector */}
                <div>
                  <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 mb-2">
                    <Sparkles className="w-4 h-4 text-indigo-500" />
                    Your Interests
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {INTEREST_OPTIONS.map(({ label, icon: Icon }) => {
                      const active = selectedInterests.includes(label);
                      return (
                        <button
                          key={label}
                          type="button"
                          onClick={() => toggleInterest(label)}
                          className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold border transition-all transform hover:-translate-y-0.5 ${
                            active
                              ? "bg-gradient-to-r from-indigo-500 to-sky-500 text-white border-transparent shadow-md shadow-indigo-500/30"
                              : "bg-white text-slate-700 border-slate-200 hover:border-indigo-300 hover:text-indigo-600"
                          }`}
                        >
                          {active ? (
                            <Check className="w-3.5 h-3.5" />
                          ) : (
                            <Icon className="w-3.5 h-3.5" />
                          )}
                          {label}
                        </button>
                      );
                    })}
                  </div>
                  {errors.interests ? (
                    <p className="text-xs text-red-500 mt-2">{errors.interests}</p>
                  ) : (
                    <p className="text-xs text-slate-400 mt-2">
                      Pick all that vibe with you · {selectedInterests.length} selected
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full mt-2 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:via-indigo-500 hover:to-violet-500 shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Crafting your itinerary...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                      Generate Trip with AI
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-slate-400 pt-1">
                  Your data is encrypted and never shared 🔒
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* ============================================================= */}
      {/* 🆕 DYNAMIC AI LOADING OVERLAY                                  */}
      {/* ============================================================= */}
      {loading && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-hidden">
          {/* Animated gradient backdrop */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-sky-950">
            <div className="absolute inset-0 opacity-70">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/40 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-500/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "0.5s" }}></div>
            </div>
          </div>

          {/* Flying plane across the screen */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute top-1/3 text-white/30"
              style={{ animation: "flyAcross 6s linear infinite" }}
            >
              <Plane className="w-10 h-10 -rotate-12" />
            </div>
          </div>

          {/* Main Loading Card */}
          <div className="relative w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl animate-[fadeInUp_0.5s_ease]">
            {/* Orbiting ring */}
            <div className="relative mx-auto w-32 h-32 mb-6">
              {/* Outer rotating ring */}
              <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-indigo-400 border-r-sky-400 animate-spin"></div>
              {/* Middle ring */}
              <div
                className="absolute inset-2 rounded-full border-2 border-transparent border-b-violet-400 border-l-cyan-400"
                style={{ animation: "spin 2s linear infinite reverse" }}
              ></div>
              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 via-sky-500 to-violet-500 flex items-center justify-center shadow-2xl shadow-indigo-500/50">
                  {(() => {
                    const CurrentIcon = LOADING_STEPS[loadingStep].icon;
                    return (
                      <CurrentIcon
                        key={loadingStep}
                        className="w-9 h-9 text-white animate-[popIn_0.4s_ease]"
                      />
                    );
                  })()}
                </div>
              </div>
              {/* Orbiting dots */}
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: "3s" }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-indigo-400 rounded-full shadow-lg shadow-indigo-400/70"></div>
              </div>
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: "4s", animationDirection: "reverse" }}>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-sky-400 rounded-full shadow-lg shadow-sky-400/70"></div>
              </div>
            </div>

            {/* Badge */}
            <div className="flex justify-center mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/90 text-xs font-semibold backdrop-blur-sm">
                <Sparkles className="w-3 h-3 text-sky-300 animate-pulse" />
                AI is working its magic
              </div>
            </div>

            {/* Dynamic step text */}
            <div key={loadingStep} className="text-center animate-[fadeInUp_0.4s_ease] min-h-[70px]">
              <h3 className="text-xl font-extrabold text-white tracking-tight">
                {LOADING_STEPS[loadingStep].title}
              </h3>
              <p className="text-sm text-white/70 mt-1.5">
                {LOADING_STEPS[loadingStep].desc}
              </p>
            </div>

            {/* Progress dots */}
            <div className="flex justify-center gap-1.5 mt-6">
              {LOADING_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === loadingStep
                      ? "w-8 bg-gradient-to-r from-indigo-400 to-sky-400 shadow-lg shadow-indigo-400/50"
                      : i < loadingStep
                      ? "w-1.5 bg-white/60"
                      : "w-1.5 bg-white/20"
                  }`}
                ></div>
              ))}
            </div>

            {/* Trip summary chips */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-[10px] uppercase tracking-widest text-white/50 font-semibold text-center mb-3">
                Generating trip for
              </p>
              <div className="flex flex-wrap gap-1.5 justify-center">
                {form.destination && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-medium">
                    <MapPin className="w-3 h-3 text-indigo-300" />
                    {form.destination}
                  </span>
                )}
                {form.days && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-medium">
                    <Calendar className="w-3 h-3 text-sky-300" />
                    {form.days} days
                  </span>
                )}
                {form.budgetType && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-medium">
                    <Wallet className="w-3 h-3 text-emerald-300" />
                    {form.budgetType}
                  </span>
                )}
              </div>
            </div>

            <p className="text-center text-[10px] text-white/40 mt-5 tracking-wider">
              This usually takes 10–20 seconds ✈️
            </p>
          </div>

          {/* Keyframes */}
          <style>{`
            @keyframes fadeInUp {
              from { opacity: 0; transform: translateY(15px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes popIn {
              0% { opacity: 0; transform: scale(0.5); }
              100% { opacity: 1; transform: scale(1); }
            }
            @keyframes flyAcross {
              from { transform: translateX(-20vw); }
              to { transform: translateX(120vw); }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}

export default CreateTrip;