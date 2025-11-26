// src/api/auth.js
import api, { setAuthToken } from "./api";

// SIGNUP (REGISTER)
export async function signup(data) {
  const res = await api.post("/auth/register", data);

  if (res.data.token) {
    // Save token + role
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", data.role);
    setAuthToken(res.data.token);
  }

  return res.data;
}

// LOGIN
export async function login(data) {
  const res = await api.post("/auth/login", data);

  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.user.role);
    setAuthToken(res.data.token);
  }

  return res.data;
}
