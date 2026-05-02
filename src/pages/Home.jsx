import { useNavigate } from "react-router-dom";
import {
  Plane,
  Sparkles,
  MapPin,
  Compass,
  Wallet,
  Clock,
  Globe,
  ArrowRight,
  Star,
  Check,
  Zap,
  Heart,
} from "lucide-react";

function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Itineraries",
      desc: "Personalized day-by-day plans generated in seconds based on your vibe.",
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: Wallet,
      title: "Smart Budget Breakdown",
      desc: "Know exactly where every dollar goes — stay, food, transport, activities.",
      color: "from-sky-500 to-cyan-500",
    },
    {
      icon: Compass,
      title: "Hidden Gems",
      desc: "Discover local spots tourists miss, curated by AI from real traveler data.",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: Clock,
      title: "Save Hours of Planning",
      desc: "Skip the research rabbit hole. Get a ready-to-go plan instantly.",
      color: "from-amber-500 to-orange-500",
    },
  ];

  const steps = [
    { num: "01", title: "Tell us your dream", desc: "Destination, days, budget & interests." },
    { num: "02", title: "AI crafts your trip", desc: "Day-wise itinerary, hotels & budget plan." },
    { num: "03", title: "Pack and go", desc: "Save, share, tweak & start your adventure." },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-sans">
      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/60">
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-8 py-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-sky-500 flex items-center justify-center shadow-md">
              <Plane className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">
              Travel<span className="text-indigo-600">AI</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-indigo-600 transition">Features</a>
            <a href="#how" className="hover:text-indigo-600 transition">How it Works</a>
            <a href="#reviews" className="hover:text-indigo-600 transition">Reviews</a>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-indigo-600 transition"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-sky-500 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              Get Started
            </button>
          </div>
        </nav>
      </header>

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-10 -left-20 w-96 h-96 bg-indigo-300/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 -right-20 w-[500px] h-[500px] bg-sky-300/30 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Powered by Advanced AI
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.05]">
              Travel smarter, <br />
              <span className="bg-gradient-to-r from-indigo-600 via-sky-500 to-cyan-500 bg-clip-text text-transparent">
                not harder.
              </span>
            </h1>

            <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-lg">
              Your personal AI travel assistant. Plan unforgettable trips in seconds —
              discover hidden gems, optimize your itinerary, and travel on any budget.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate("/register")}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-sky-500 hover:from-indigo-500 hover:to-sky-400 shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 transform hover:-translate-y-0.5 transition-all"
              >
                Start Planning Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate("/login")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-slate-700 bg-white border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 shadow-sm transition-all"
              >
                I already have an account
              </button>
            </div>

            {/* Trust badges */}
            <div className="mt-10 flex items-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-medium">
                <span className="text-slate-900 font-bold">4.9/5</span> · 12k+ happy travelers
              </span>
            </div>
          </div>

          {/* Right — hero image collage */}
          <div className="relative hidden lg:block">
            <div className="relative h-[560px]">
              {/* Main image */}
              <div className="absolute top-0 right-0 w-[380px] h-[460px] rounded-3xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=900&q=80"
                  alt="Travel"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold mb-2">
                    <MapPin className="w-3 h-3" />
                    Santorini, Greece
                  </div>
                  <p className="text-lg font-bold">7-day AI itinerary</p>
                  <p className="text-xs text-white/80">Generated in 8 seconds</p>
                </div>
              </div>

              {/* Floating card 1 */}
              <div className="absolute top-8 left-0 w-56 bg-white rounded-2xl shadow-xl p-4 border border-slate-100 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                    <Wallet className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-xs font-semibold text-slate-500">Budget saved</p>
                </div>
                <p className="text-2xl font-extrabold text-slate-900">$420</p>
                <p className="text-xs text-emerald-600 font-medium">↑ 34% vs avg trip</p>
              </div>

              {/* Floating card 2 */}
              <div className="absolute bottom-8 left-8 w-64 bg-white rounded-2xl shadow-xl p-4 border border-slate-100 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-sky-500 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-xs font-semibold text-slate-700">AI Suggestion</p>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  "Skip Oia at sunset — try <span className="font-bold text-slate-900">Imerovigli</span> for smaller crowds and same view."
                </p>
              </div>

              {/* Floating card 3 — plane */}
              <div className="absolute top-40 left-40 w-14 h-14 rounded-2xl bg-white shadow-xl flex items-center justify-center animate-bounce">
                <Plane className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          {[
            { num: "10k+", label: "Trips Planned", icon: Plane },
            { num: "120+", label: "Countries", icon: Globe },
            { num: "8 sec", label: "Avg plan time", icon: Zap },
            { num: "4.9★", label: "User Rating", icon: Heart },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">{s.num}</p>
                  <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">{s.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm font-bold uppercase tracking-widest text-indigo-600 mb-3">Features</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Everything you need to plan <br className="hidden sm:block" />
            the <span className="text-indigo-600">perfect trip</span>.
          </h2>
          <p className="mt-5 text-slate-600 leading-relaxed">
            Powered by cutting-edge AI, built for real travelers. Every feature designed to make your journey smoother.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="group bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 hover:border-indigo-200 transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center shadow-lg mb-5 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section id="how" className="max-w-7xl mx-auto px-4 sm:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm font-bold uppercase tracking-widest text-indigo-600 mb-3">How it works</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Plan your trip in <span className="text-indigo-600">3 simple steps</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-indigo-200 via-sky-200 to-indigo-200"></div>

          {steps.map((s, i) => (
            <div key={i} className="relative text-center">
              <div className="relative z-10 mx-auto w-24 h-24 rounded-2xl bg-white border-2 border-indigo-200 flex items-center justify-center shadow-lg mb-5">
                <span className="text-2xl font-extrabold bg-gradient-to-br from-indigo-600 to-sky-500 bg-clip-text text-transparent">
                  {s.num}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{s.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed max-w-xs mx-auto">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= REVIEWS ================= */}
      <section id="reviews" className="max-w-7xl mx-auto px-4 sm:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm font-bold uppercase tracking-widest text-indigo-600 mb-3">Loved by travelers</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Stories from the road
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              name: "Priya S.",
              trip: "Japan, 10 days",
              text: "Planned my Tokyo-Kyoto trip in 3 minutes. The AI caught things I'd have spent days researching.",
            },
            {
              name: "Marco L.",
              trip: "Bali, 7 days",
              text: "Budget breakdown was on point. Hit every hidden beach and local warung. Felt like a local, not a tourist.",
            },
            {
              name: "Sara K.",
              trip: "Paris, 5 days",
              text: "The itinerary flow is genius. No backtracking, no wasted time. This is the future of travel.",
            },
          ].map((r, i) => (
            <div
              key={i}
              className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-slate-700 leading-relaxed mb-5">"{r.text}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-sky-500 text-white flex items-center justify-center font-bold">
                  {r.name[0]}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{r.name}</p>
                  <p className="text-xs text-slate-500">{r.trip}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-sky-600 p-10 sm:p-14 text-white shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -translate-y-20 translate-x-20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-400/20 rounded-full blur-3xl translate-y-20 -translate-x-20"></div>

          <div className="relative max-w-2xl">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Your next adventure is <br />
              one click away.
            </h2>
            <p className="mt-4 text-white/80 text-lg">
              Join 10,000+ travelers planning smarter with AI. Free forever.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate("/register")}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-indigo-700 bg-white hover:bg-slate-50 shadow-xl transform hover:-translate-y-0.5 transition-all"
              >
                Create Free Account
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate("/login")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 transition-all"
              >
                Login
              </button>
            </div>

            <div className="mt-6 flex items-center gap-5 text-sm text-white/80">
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4" /> No credit card
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4" /> Free forever
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4" /> Setup in 30s
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-slate-200 bg-white/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-sky-500 flex items-center justify-center">
              <Plane className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-slate-900">
              Travel<span className="text-indigo-600">AI</span>
            </span>
          </div>
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} TravelAI · Wander smarter ✈️
          </p>
          <div className="flex gap-5 text-xs text-slate-500">
            <a href="#" className="hover:text-indigo-600 transition">Privacy</a>
            <a href="#" className="hover:text-indigo-600 transition">Terms</a>
            <a href="#" className="hover:text-indigo-600 transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;