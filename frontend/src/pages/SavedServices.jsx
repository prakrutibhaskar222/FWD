import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, Star, MapPin, Clock, Trash2, RefreshCw, Search, Filter } from "lucide-react";
import { Card, Button, Badge, LoadingSpinner } from "../components/ui";
import { useAutoRefresh } from "../hooks/useAutoRefresh";
import toast from "react-hot-toast";

const API = "http://localhost:5001";

export default function SavedServices() {
  const [savedServices, setSavedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [categories, setCategories] = useState([]);

  // Auto-refresh functionality
  const refreshSavedServices = async (source = 'manual') => {
    console.log(`Saved services refreshed from ${source}`);
    await fetchSavedServices();
  };

  const { isRefreshing, refreshCount } = useAutoRefresh(
    refreshSavedServices,
    {
      enabled: true,
      onButtonClick: true,
      debounceMs: 1000,
    }
  );

  const fetchSavedServices = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      if (!token) {
        toast.error("Please login to view saved services");
        return;
      }

      const response = await fetch(`${API}/api/user/favorites`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch saved services');
      }

      const data = await response.json();
      
      if (data.success) {
        setSavedServices(data.data || []);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(data.data.map(service => service.category))];
        setCategories(uniqueCategories);
      } else {
        throw new Error(data.message || 'Failed to fetch saved services');
      }
    } catch (error) {
      console.error("Error fetching saved services:", error);
      toast.error("Failed to load saved services");
      setSavedServices([]);
    } finally {
      setLoading(false);
    }
  };

  const removeSavedService = async (serviceId) => {
    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        toast.error("Please login to manage saved services");
        return;
      }

      const response = await fetch(`${API}/api/user/favorites/${serviceId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to remove service');
      }

      const data = await response.json();
      
      if (data.success) {
        setSavedServices(prev => prev.filter(service => service._id !== serviceId));
        toast.success("Service removed from favorites");
      } else {
        throw new Error(data.message || 'Failed to remove service');
      }
    } catch (error) {
      console.error("Error removing saved service:", error);
      toast.error("Failed to remove service");
    }
  };

  useEffect(() => {
    fetchSavedServices();
  }, []);

  // Filter services based on search and category
  const filteredServices = savedServices.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || service.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading && !isRefreshing) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300">
      {/* Refresh Indicator */}
      {isRefreshing && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-20 right-4 z-50 bg-primary-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2"
        >
          <RefreshCw className="w-4 h-4 animate-spin" />
          <span className="text-sm font-medium">Refreshing...</span>
        </motion.div>
      )}

      {/* Header */}
      <section className="bg-gradient-to-r from-primary-600 to-accent-600 text-white py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 mr-3 text-accent-300" />
              <h1 className="text-4xl lg:text-5xl font-display font-bold">
                Saved Services
              </h1>
            </div>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Your favorite services, saved for quick access and future bookings
            </p>
            <div className="mt-6 flex items-center justify-center space-x-4 text-sm">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                {savedServices.length} Services Saved
              </Badge>
              {refreshCount > 0 && (
                <Badge variant="secondary" className="bg-accent-500/20 text-accent-200 border-accent-300/30">
                  Refreshed {refreshCount} times
                </Badge>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search saved services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-neutral-200 dark:border-neutral-600 rounded-xl focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-800 focus:border-primary-500 focus:outline-none transition-all duration-200 bg-white dark:bg-neutral-700 dark:text-neutral-100"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-neutral-500" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2.5 border border-neutral-200 dark:border-neutral-600 rounded-xl focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-800 focus:border-primary-500 focus:outline-none transition-all duration-200 bg-white dark:bg-neutral-700 dark:text-neutral-100"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category} className="capitalize">
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Refresh Button */}
            <Button
              onClick={() => refreshSavedServices('manual')}
              variant="outline"
              size="sm"
              disabled={isRefreshing}
              className="flex items-center space-x-2"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12">
        <div className="container-custom">
          {filteredServices.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <Heart className="w-16 h-16 text-neutral-300 dark:text-neutral-600 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                {searchTerm || filterCategory !== "all" ? "No matching services found" : "No saved services yet"}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6 max-w-md mx-auto">
                {searchTerm || filterCategory !== "all" 
                  ? "Try adjusting your search or filter criteria"
                  : "Start exploring services and save your favorites for quick access"
                }
              </p>
              <Link to="/home">
                <Button variant="primary">
                  Explore Services
                </Button>
              </Link>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {filteredServices.map((service, index) => (
                  <motion.div
                    key={service._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    layout
                  >
                    <Card hover className="h-full group relative overflow-hidden">
                      {/* Service Image */}
                      <div className="relative h-48 bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900 dark:to-accent-900">
                        {service.image ? (
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="text-4xl">🛠️</div>
                          </div>
                        )}
                        
                        {/* Remove Button */}
                        <motion.button
                          onClick={() => removeSavedService(service._id)}
                          className="absolute top-3 right-3 w-8 h-8 bg-white/90 dark:bg-neutral-800/90 rounded-full flex items-center justify-center text-error-600 hover:bg-error-50 dark:hover:bg-error-900/50 transition-colors duration-200 opacity-0 group-hover:opacity-100"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>

                        {/* Category Badge */}
                        <div className="absolute top-3 left-3">
                          <Badge variant="secondary" size="sm" className="bg-white/90 dark:bg-neutral-800/90 text-neutral-700 dark:text-neutral-300 capitalize">
                            {service.category}
                          </Badge>
                        </div>
                      </div>

                      {/* Service Content */}
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                            {service.title}
                          </h3>
                          <div className="flex items-center space-x-1 text-warning-500">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="text-sm font-medium">{service.rating || 4.5}</span>
                          </div>
                        </div>

                        <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4 line-clamp-2">
                          {service.description}
                        </p>

                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2 text-sm text-neutral-500 dark:text-neutral-400">
                            <MapPin className="w-4 h-4" />
                            <span>{service.location || "Available citywide"}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-neutral-500 dark:text-neutral-400">
                            <Clock className="w-4 h-4" />
                            <span>{service.duration || "1-2 hours"}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                            ₹{service.price}
                          </div>
                          <Link to={`/service/${service._id}`}>
                            <Button variant="primary" size="sm">
                              Book Now
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}