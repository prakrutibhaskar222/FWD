import FavoriteButton from "./FavoriteButton";
import { Link } from "react-router-dom";

const ServiceCard = ({ service, favorites, setFavorites }) => {
  return (
    <div className="relative border rounded-lg p-4 hover:shadow">

      {/* ❤️ FAVORITE */}
      <FavoriteButton
        serviceId={service._id}
        favorites={favorites}
        setFavorites={setFavorites}
      />

      <Link to={`/service/${service._id}`}>
        <h3 className="font-semibold text-lg">{service.title}</h3>
        <p className="text-sm text-gray-600">{service.category}</p>
        <p className="mt-2 font-medium">₹{service.price}</p>
      </Link>
    </div>
  );
};

export default ServiceCard;
