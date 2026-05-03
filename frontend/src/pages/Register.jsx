import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
//import { AuthContext } from "../contexts/AuthContext";
import { registerUser } from "../services/api";
import bgImg from "../assets/bgimg.jpg"; // ✅ ADD THIS
import logo from "../assets/logo.webp"

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const normalizedForm = {
        ...form,
        email: form.email.trim().toLowerCase(),
        name: form.name?.trim(),
      };

      await registerUser(normalizedForm);

      localStorage.removeItem("token");

      navigate("/login");

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">

      {/* 🔵 LEFT SIDE (IMAGE BACKGROUND) */}
      <div
        className="hidden md:flex w-1/2 text-white p-12 flex-col justify-center relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <img
              src={logo}
              alt="Logo"
              className="w-10 h-10 object-contain rounded-lg"
            />
            <h2 className="text-xl font-semibold">TripPlanner</h2>
          </div>

          <h1 className="text-4xl font-bold mb-4 leading-tight">
            Plan your perfect journey
          </h1>

          <p className="text-lg text-white/80 mb-10">
            Organize itineraries, track expenses, and manage every detail of your travels in one beautiful place.
          </p>

          {/* Stats */}
          <div className="flex gap-6">
            <div className="bg-white/20 p-5 rounded-xl backdrop-blur-md">
              <h2 className="text-2xl font-bold">150+</h2>
              <p className="text-sm">Destinations</p>
            </div>

            <div className="bg-white/20 p-5 rounded-xl backdrop-blur-md">
              <h2 className="text-2xl font-bold">10k+</h2>
              <p className="text-sm">Trips Planned</p>
            </div>

            <div className="bg-white/20 p-5 rounded-xl backdrop-blur-md">
              <h2 className="text-2xl font-bold">50k+</h2>
              <p className="text-sm">Places Saved</p>
            </div>
          </div>
        </div>
      </div>

      {/* ⚪ RIGHT SIDE */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 p-6">

        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">

          <h2 className="text-2xl font-bold mb-2 text-gray-800">
            Create your account
          </h2>

          <p className="text-gray-500 mb-6">
            Start your journey with AI ✈️
          </p>

          {/* Error */}
          {error && (
            <div className="mb-4 text-sm text-red-500">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">

            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              autoComplete="off"
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              autoComplete="new-password"
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              {loading ? "Creating..." : "Register"}
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;