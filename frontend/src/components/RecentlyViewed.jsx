import { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

const RecentlyViewed = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const ids = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
    if (!ids.length) return;

    api
      .post("/api/services/by-ids", { ids })
      .then((res) => setServices(res.data.data))
      .catch(() => {});
  }, []);

  if (!services.length) return null;

  return (
    <div className="mt-10">
      <h3 className="text-lg font-semibold mb-4">Recently Viewed</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {services.map((s) => (
          <Link
            key={s._id}
            to={`/service/${s._id}`}
            className="border rounded p-3 hover:shadow"
          >
            <h4 className="font-medium">{s.title}</h4>
            <p className="text-sm text-gray-500">{s.category}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewed;
