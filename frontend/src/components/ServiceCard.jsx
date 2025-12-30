import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, Clock, Shield, ArrowRight, Heart, Bookmark } from 'lucide-react';
import { Card, Button, Badge } from './ui';
import { useState } from 'react';

const ServiceCard = ({ service, index = 0 }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  
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
    discount = null
  } = service;

  const handleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
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
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden">
          <motion.img
            src={image || `https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=400`}
            alt={title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.7 }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
            <motion.button
              onClick={handleBookmark}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`w-10 h-10 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 ${
                isBookmarked 
                  ? 'bg-primary-500 text-white' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </motion.button>
            
            <motion.button
              onClick={handleLike}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`w-10 h-10 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 ${
                isLiked 
                  ? 'bg-error-500 text-white' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </motion.button>
          </div>
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {isPopular && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Badge variant="warning" size="sm" className="bg-gradient-to-r from-warning-500 to-warning-600 text-white shadow-lg">
                  🔥 Popular
                </Badge>
              </motion.div>
            )}
            {discount && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Badge variant="error" size="sm" className="bg-gradient-to-r from-error-500 to-error-600 text-white shadow-lg">
                  {discount}% OFF
                </Badge>
              </motion.div>
            )}
          </div>

          {/* Category Badge */}
          <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
            <Badge variant="secondary" size="sm" className="bg-white/90 backdrop-blur-sm text-neutral-700 capitalize shadow-lg">
              {category}
            </Badge>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Title and Rating */}
          <div className="mb-4">
            <motion.h3 
              className="text-xl font-bold text-neutral-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors duration-300"
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {title}
            </motion.h3>
            
            {rating && (
              <motion.div 
                className="flex items-center space-x-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-warning-500 fill-current" />
                  <span className="text-sm font-medium text-neutral-700">
                    {rating.toFixed(1)}
                  </span>
                </div>
                {reviewCount && (
                  <span className="text-sm text-neutral-500">
                    ({reviewCount} reviews)
                  </span>
                )}
              </motion.div>
            )}
          </div>

          {/* Description */}
          <p className="text-neutral-600 text-sm leading-relaxed mb-4 line-clamp-3">
            {description}
          </p>

          {/* Features */}
          {features.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {features.slice(0, 3).map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                  >
                    <Badge variant="neutral" size="sm" className="text-xs bg-neutral-100 hover:bg-neutral-200 transition-colors">
                      {feature}
                    </Badge>
                  </motion.div>
                ))}
                {features.length > 3 && (
                  <Badge variant="neutral" size="sm" className="text-xs bg-primary-50 text-primary-600">
                    +{features.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Service Info */}
          <div className="flex items-center justify-between mb-6 text-sm text-neutral-600">
            {duration && (
              <div className="flex items-center space-x-1 group-hover:text-primary-600 transition-colors">
                <Clock className="w-4 h-4" />
                <span>{duration}</span>
              </div>
            )}
            <div className="flex items-center space-x-1 text-success-600">
              <Shield className="w-4 h-4" />
              <span>Insured</span>
            </div>
          </div>

          {/* Price and CTA */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline space-x-2">
              <motion.span 
                className="text-2xl font-bold text-neutral-900 group-hover:text-primary-600 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                ₹{price}
              </motion.span>
              {discount && (
                <span className="text-sm text-neutral-500 line-through">
                  ₹{Math.round(price / (1 - discount / 100))}
                </span>
              )}
            </div>
            
            <Link to={`/service/${_id}`}>
              <Button 
                size="sm" 
                className="group-hover:bg-primary-700 transition-all duration-300 transform group-hover:scale-105"
                autoRefresh={true}
                refreshDelay={600}
              >
                <span className="group-hover:mr-1 transition-all duration-300">View Details</span>
                <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/5 to-accent-500/5"></div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ServiceCard;