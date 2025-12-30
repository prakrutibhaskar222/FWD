import { FaHeart, FaRegHeart } from "react-icons/fa";
import api from "../api";
import toast from "react-hot-toast";

const FavoriteButton = ({ serviceId, favorites, setFavorites }) => {
  const isFavorite = favorites.includes(serviceId);

  const toggleFavorite = async () => {
    try {
      await api.post(`/api/profile/favorites/${serviceId}`);

      // optimistic UI update
      setFavorites((prev) =>
        isFavorite
          ? prev.filter((id) => id !== serviceId)
          : [...prev, serviceId]
      );
    } catch (err) {
      toast.error("Please login to save favorites");
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className="absolute top-3 right-3 text-xl text-red-500"
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {isFavorite ? <FaHeart /> : <FaRegHeart />}
    </button>
  );
};

export default FavoriteButton;