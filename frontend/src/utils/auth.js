import axios from "axios";

const API = "http://localhost:5001/api/auth";

export const getToken = () => localStorage.getItem("token");

export const fetchMe = async () => {
  const token = getToken();
  if (!token) throw new Error("No token");

  const res = await axios.get(`${API}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.user;
};

export const logout = () => {
  localStorage.removeItem("token");
  window.dispatchEvent(new Event("auth-change"));
};
