import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/users";

/*
========================================
REGISTER USER
========================================
*/
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);

  return response.data;
};

/*
========================================
LOGIN USER
========================================
*/
export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);

  return response.data;
};

/*
========================================
GET CURRENT AUTHENTICATED USER
========================================
*/
export const getCurrentUser = async (token) => {
  const response = await axios.get(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

/*
========================================
GET STORED TOKEN
========================================
*/
export const getToken = () => {
  return localStorage.getItem("access_token");
};

/*
========================================
GET STORED USER
========================================
*/
export const getStoredUser = () => {
  const user = localStorage.getItem("user");

  return user ? JSON.parse(user) : null;
};

/*
========================================
LOGOUT USER
========================================
*/
export const logoutUser = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user");
};
