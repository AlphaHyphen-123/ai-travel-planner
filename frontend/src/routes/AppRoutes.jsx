import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import CreateTrip from "../pages/CreateTrip";
import TripDetails from "../pages/TripDetails";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Home Page */}
      <Route path="/" element={<Home />} />

      {/* Auth Routes - Redirect to dashboard if already logged in */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      {/* Protected Routes - Redirect to home if not logged in */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/create-trip"
        element={
          <PrivateRoute>
            <CreateTrip />
          </PrivateRoute>
        }
      />
      
      <Route
        path="/trip/:id"
        element={
          <PrivateRoute>
            <TripDetails />
          </PrivateRoute>
        }
      />

      {/* Catch-all: Redirect to Home */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRoutes;