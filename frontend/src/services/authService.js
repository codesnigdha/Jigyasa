import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/users";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// =====================================================
// REGISTER
// =====================================================

export const registerUser = async (userData) => {
  const response = await api.post("/register", userData);

  return response.data;
};

// =====================================================
// LOGIN
// =====================================================

export const loginUser = async (credentials) => {
  const response = await api.post("/login", credentials);

  return response.data;
};

// =====================================================
// CURRENT USER
// =====================================================

export const getCurrentUser = async () => {
  const response = await api.get("/session");

  return response.data.user;
};

// =====================================================
// LOGOUT
// =====================================================

export const logoutUser = async () => {
  const response = await api.post("/logout");

  return response.data;
};
