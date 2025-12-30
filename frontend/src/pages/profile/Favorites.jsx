import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Trash2, Heart } from "lucide-react";
import api from "../../api.js";
import toast from "react-hot-toast";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/api/profile")
      .then((res) => {
        setFavorites(res.data.data.favorites || []);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Login required");
        setLoading(false);
      });
  }, []);

  const removeFavorite = async (serviceId) => {
    try {
      await api.post(`/api/profile/favorites/${serviceId}`);
      setFavorites((prev) => prev.filter((s) => s._id !== serviceId));
      toast.success("Removed from favorites");
    } catch {
      toast.error("Failed to remove");
    }
  };

  /* ================= EMPTY STATE ================= */
  if (!loading && favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 text-center">
        <Heart className="w-12 h-12 text-neutral-300 mb-4" />
        <h2 className="text-xl font-semibold mb-2">No saved services</h2>
        <p className="text-neutral-500 mb-4">
          Save services you like and find them here later.
        </p>
        <Link
          to="/"
          className="text-primary-600 font-medium hover:underline"
        >
          Browse services →
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Favorites</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((service, index) => (
          <motion.div
            key={service._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="relative bg-white rounded-xl border shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Remove Button */}
            <button
              onClick={() => removeFavorite(service._id)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white shadow hover:bg-red-50 text-red-500 transition"
              title="Remove from favorites"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            {/* Card Content */}
            <Link to={`/service/${service._id}`} className="block p-5">
              <h3 className="text-lg font-semibold mb-1 line-clamp-1">
                {service.title}
              </h3>
              <p className="text-sm text-neutral-500 capitalize mb-3">
                {service.category}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-primary-600 font-medium">
                  ₹{service.price}
                </span>
                <span className="text-sm text-neutral-400">
                  View →
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
