import { useEffect, useState } from "react";
import api from "../../api.js";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    api.get("/api/profile")
      .then((res) => setFavorites(res.data.data.favorites))
      .catch(() => toast.error("Login required"));
  }, []);

  const removeFavorite = async (serviceId) => {
    try {
      await api.post(`/api/profile/favorites/${serviceId}`);
      setFavorites((prev) => prev.filter((f) => f._id !== serviceId));
      toast.success("Removed from favorites");
    } catch {
      toast.error("Failed to remove");
    }
  };

  if (!favorites.length) {
    return <p className="text-center mt-10">No favorites yet</p>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4">My Favorites</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-15">
        {favorites.map((service) => (
          <div key={service._id} className="border rounded p-4 relative">
            <button
              onClick={() => removeFavorite(service._id)}
              className="absolute top-2 right-2 text-red-600 text-sm"
            >
              Remove
            </button>

            <Link to={`/service/${service._id}`}>
              <h3 className="font-semibold">{service.title}</h3>
              <p className="text-sm text-gray-500">{service.category}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
