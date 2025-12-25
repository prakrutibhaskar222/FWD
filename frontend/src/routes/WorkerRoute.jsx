import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const WorkerRoute = ({ children }) => {
  const [allowed, setAllowed] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAllowed(false);
      return;
    }

    axios
      .get("http://localhost:5001/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setAllowed(res.data.user.role === "worker");
      })
      .catch(() => setAllowed(false));
  }, []);

  if (allowed === null) return null;
  return allowed ? children : <Navigate to="/unauthorized" />;
};

export default WorkerRoute;
