import axios from "axios";

const API = "http://localhost:5001/api/auth";

export const registerUser = (data) =>
  axios.post(`${API}/register`, data);

export const loginUser = (data) =>
  axios.post(`${API}/login`, data);

export const getMe = (token) =>
  axios.get(`${API}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
