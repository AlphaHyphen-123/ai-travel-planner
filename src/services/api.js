import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api", // backend URL
});

// Attach token in every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Handle expired or invalid tokens
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login"; // Force redirect to login
    }
    return Promise.reject(error);
  }
);

// 🔐 Auth APIs
export const registerUser = async (formData) => {
  const { data } = await API.post("/auth/register", formData);
  return data;
};

export const loginUser = async (formData) => {
  const { data } = await API.post("/auth/login", formData);
  return data;
};

// ✈️ Trip APIs
export const createTrip = async (formData) => {
  const { data } = await API.post("/trips", formData);
  return data;
};

export const getTrips = async () => {
  const { data } = await API.get("/trips");
  return data;
};

export const deleteTrip = async (id) => {
  const { data } = await API.delete(`/trips/${id}`);
  return data;
};

export const updateTrip = async (id, formData) => {
  const { data } = await API.put(`/trips/${id}`, formData);
  return data;
};

export const getTripById = async (id) => {
  const { data } = await API.get(`/trips/${id}`);
  return data;
};

export const regenerateDay = async (id, formData) => {
  const { data } = await API.post(`/trips/regenerate-day/${id}`, formData);
  return data;
};