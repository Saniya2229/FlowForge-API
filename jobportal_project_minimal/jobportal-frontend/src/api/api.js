// src/api/api.js
import axios from "axios";

// Vite: use import.meta.env (not process.env)
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE,
  // You can set a default timeout if you want:
  // timeout: 10000,
});

// Helper to set/remove Authorization header
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("token", token);
  } else {
    delete api.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
  }
  api.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response?.status === 401) {
        // token expired → logout user
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
      return Promise.reject(err);
    }
  );
};

export default api;
