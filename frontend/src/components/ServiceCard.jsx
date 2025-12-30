import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star, Clock, Shield, ArrowRight, Heart, Bookmark } from "lucide-react";
import { Card, Button, Badge } from "./ui";
import { useState } from "react";
import api from "../api";

const ServiceCard = ({ service, index = 0 }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    _id,
    title,
    description,
    price,
    duration,
    rating,
    reviewCount,
    category,
    features = [],
    image,
    isPopular = false,
    discount = null,
  } = service;

  /* ================= FAVORITES ================= */
  const toggleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setLoading(true);

      if (isFavorite) {
        await api.delete(`/api/user/favorites/${_id}`);
      } else {
        await api.post(`/api/user/favorites`, { serviceId: _id });
      }

      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Favorite toggle failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="h-full"
    >
      <Card hover className="group h-full overflow-hidden relative">
        {/* IMAGE */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={
              image ||
              "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=400"
            }
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />

          {/* FAVORITE BUTTON */}
          <button
            onClick={toggleFavorite}
            disabled={loading}
            className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition ${
              isFavorite ? "bg-error-500 text-white" : "bg-white/80"
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
          </button>

          {/* BADGES */}
          <div className="absolute top-4 left-4 space-y-2">
            {isPopular && <Badge variant="warning">🔥 Popular</Badge>}
            {discount && <Badge variant="error">{discount}% OFF</Badge>}
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-6">
          <Link to={`/service/${_id}`}>
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary-600">
              {title}
            </h3>
          </Link>

          {rating && (
            <div className="flex items-center space-x-2 mb-2">
              <Star className="w-4 h-4 text-warning-500 fill-current" />
              <span>{rating.toFixed(1)}</span>
              {reviewCount && <span>({reviewCount})</span>}
            </div>
          )}

          <p className="text-sm text-neutral-600 line-clamp-3 mb-4">
            {description}
          </p>

          <div className="flex justify-between items-center mb-4 text-sm">
            {duration && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {duration}
              </div>
            )}
            <div className="flex items-center gap-1 text-success-600">
              <Shield className="w-4 h-4" />
              Insured
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold">₹{price}</span>
            <Link to={`/service/${_id}`}>
              <Button size="sm">
                View Details <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ServiceCard;
