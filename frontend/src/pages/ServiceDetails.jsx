import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  CheckCircle, ArrowLeft, Clock, IndianRupee, Star, Shield, 
  Users, Calendar, MapPin, Phone, Mail, Award, Zap 
} from "lucide-react";
import { Button, Card, Badge, Alert, LoadingSpinner } from "../components/ui";
import Reviews from "../components/Reviews";

export default function ServiceDetails() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API = "http://localhost:5001";

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API}/api/services/${id}/view`);
        const json = await res.json();
        
        if (json.success) {
          setService(json.data.service);
          setReviews(json.data.reviews || []);
          
          // Add to recently viewed
          try {
            const rv = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
            const newList = [json.data.service._id, ...rv.filter(i => i !== json.data.service._id)].slice(0, 10);
            localStorage.setItem("recentlyViewed", JSON.stringify(newList));
          } catch (e) {
            console.error("Error updating recently viewed:", e);
          }
        } else {
          setError("Service not found");
        }
      } catch (error) {
        console.error("Error fetching service:", error);
        setError("Failed to load service details");
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchService();
    }
  }, [id]);

  if (loading) {
    return <LoadingSpinner type="page" message="Loading service details..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
        <Alert variant="error" className="max-w-md">
          <div className="text-center">
            <h3 className="font-semibold mb-2">Error Loading Service</h3>
            <p className="mb-4">{error}</p>
            <Link to="/home">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </Alert>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
        <Alert variant="warning" className="max-w-md">
          <div className="text-center">
            <h3 className="font-semibold mb-2">Service Not Found</h3>
            <p className="mb-4">The service you're looking for doesn't exist or has been removed.</p>
            <Link to="/home">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </Alert>
      </div>
    );
  }

  const features = service.features || [
    "Professional Service",
    "Quality Guaranteed",
    "Insured Workers",
    "24/7 Support"
  ];

  const serviceHighlights = [
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Verified Professional",
      description: "Background-checked and certified"
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: `${service.duration || '2-3'} Hours`,
      description: "Estimated completion time"
    },
    {
      icon: <Award className="w-5 h-5" />,
      title: "Quality Guaranteed",
      description: "100% satisfaction promise"
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Same Day Service",
      description: "Available for urgent needs"
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="container-custom py-6">
          <Link 
            to={`/${service.category}`} 
            className="inline-flex items-center space-x-2 text-neutral-600 hover:text-primary-600 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to {service.category}</span>
          </Link>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                <Badge variant="primary" className="capitalize">
                  {service.category}
                </Badge>
                {service.isPopular && (
                  <Badge variant="warning" className="bg-warning-500 text-white">
                    🔥 Popular
                  </Badge>
                )}
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-3">
                {service.title}
              </h1>
              
              <div className="flex items-center space-x-6 text-sm text-neutral-600">
                {service.rating && (
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-warning-500 fill-current" />
                    <span className="font-medium">{service.rating.toFixed(1)}</span>
                    <span>({service.reviewCount || reviews.length} reviews)</span>
                  </div>
                )}
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{service.bookingCount || 0} bookings</span>
                </div>
              </div>
            </div>
            
            <div className="lg:text-right">
              <div className="flex items-baseline space-x-2 mb-3">
                <span className="text-3xl font-bold text-neutral-900">
                  ₹{service.price}
                </span>
                {service.originalPrice && service.originalPrice > service.price && (
                  <span className="text-lg text-neutral-500 line-through">
                    ₹{service.originalPrice}
                  </span>
                )}
              </div>
              
              <Link to={`/booking/service/${service._id}`}>
                <Button size="lg" className="w-full lg:w-auto">
                  Book Now
                  <Calendar className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Service Image */}
            {service.image && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-64 lg:h-80 object-cover"
                  />
                </Card>
              </motion.div>
            )}

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card>
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                  Service Description
                </h2>
                <p className="text-neutral-700 leading-relaxed">
                  {service.description}
                </p>
              </Card>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                  What's Included
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-success-600 flex-shrink-0" />
                      <span className="text-neutral-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Reviews */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Reviews reviews={reviews} serviceId={service._id} />
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Service Highlights */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <h3 className="text-lg font-bold text-neutral-900 mb-4">
                  Service Highlights
                </h3>
                <div className="space-y-4">
                  {serviceHighlights.map((highlight, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 flex-shrink-0">
                        {highlight.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-neutral-900">
                          {highlight.title}
                        </h4>
                        <p className="text-sm text-neutral-600">
                          {highlight.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <h3 className="text-lg font-bold text-neutral-900 mb-4">
                  Need Help?
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-sm">
                    <Phone className="w-4 h-4 text-neutral-500" />
                    <span className="text-neutral-700">+91 7619443280</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <Mail className="w-4 h-4 text-neutral-500" />
                    <span className="text-neutral-700">coolie96913@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <MapPin className="w-4 h-4 text-neutral-500" />
                    <span className="text-neutral-700">Available across India</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-neutral-200">
                  <Button variant="outline" size="sm" className="w-full">
                    Contact Support
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* Booking CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
                <div className="text-center">
                  <h3 className="text-lg font-bold mb-2">
                    Ready to Book?
                  </h3>
                  <p className="text-primary-100 text-sm mb-4">
                    Get this service at your doorstep
                  </p>
                  <div className="text-2xl font-bold mb-4">
                    ₹{service.price}
                  </div>
                  <Link to={`/booking/service/${service._id}`}>
                    <Button variant="secondary" className="w-full">
                      Book Now
                      <Calendar className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
