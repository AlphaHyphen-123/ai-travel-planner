import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { loginUser } from "../services/api";
import bgImg from "../assets/bgimg.jpg";
import logo from "../assets/logo.webp";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const normalizedForm = {
        ...form,
        email: form.email.trim().toLowerCase(),
      };
      const res = await loginUser(normalizedForm);
      login(res.token);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">

      {/* 🔵 LEFT SIDE (IMAGE) */}
      <div
        className="hidden md:flex w-1/2 text-white p-12 flex-col justify-center relative bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-6">
            <img src={logo} alt="logo" className="w-10 h-10 rounded-lg" />
            <h2 className="text-xl font-semibold">TripPlanner</h2>
          </div>

          <h1 className="text-4xl font-bold mb-4">
            Welcome back
          </h1>

          <p className="text-white/80 mb-10">
            Continue planning your journeys and explore the world smarter.
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

          {/* Logo + Heading */}
          <div className="flex flex-col items-center mb-6">
            <img src={logo} alt="logo" className="w-16 h-16 mb-2" />
            <h2 className="text-2xl font-bold text-gray-800">
              Login to your account
            </h2>
            <p className="text-gray-500 text-sm">
              Welcome back 👋
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 text-sm text-red-500 text-center">
              {error}
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className="space-y-4"
          >
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              autoComplete="off"
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              autoComplete="new-password"
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Register link */}
          <p className="text-sm text-gray-500 mt-4 text-center">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600 font-medium">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;