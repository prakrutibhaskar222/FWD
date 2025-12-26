import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api.js";

const AdminRoute = ({ children }) => {
  const [allowed, setAllowed] = useState(null);

  useEffect(() => {
    api.get("/api/auth/me")
      .then(res => {
        setAllowed(res.data.user.role === "admin");
      })
      .catch(() => setAllowed(false));
  }, []);

  if (allowed === null) return null;
  return allowed ? children : <Navigate to="/login" />;
};

export default AdminRoute;
