import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router";
import { ArrowRight, CheckCircle, Star, Users, Shield, Clock, Zap, Play, Sparkles, RefreshCw } from "lucide-react";
import { Button, Card, Badge } from "../components/ui";
import { useState } from "react";
import { useAutoRefresh } from "../hooks/useAutoRefresh";

export default function Landing() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  
  // Auto-refresh functionality for landing page
  const refreshLandingData = async (source = 'manual') => {
    console.log(`Landing page refreshed from ${source}`);
    // Here you could refresh any dynamic data like testimonials, stats, etc.
    // For now, we'll just log the refresh
  };

  const { isRefreshing, refreshCount } = useAutoRefresh(
    refreshLandingData,
    {
      enabled: true,
      onButtonClick: true,
      debounceMs: 800,
    }
  );
  
  const services = [
    {
      title: "Electrical Services",
      description: "Certified electricians for safe wiring, lighting, and appliance repairs with 24/7 emergency support.",
      icon: <Zap className="w-8 h-8" />,
      color: "from-yellow-400 to-orange-500",
      features: ["Licensed Electricians", "Emergency Service", "Safety Certified"],
      stats: "500+ Projects"
    },
    {
      title: "Installation Services", 
      description: "Professional installation of appliances, fixtures, and equipment by experienced technicians.",
      icon: <CheckCircle className="w-8 h-8" />,
      color: "from-blue-400 to-blue-600",
      features: ["Expert Installation", "Warranty Included", "Quality Assured"],
      stats: "1000+ Installs"
    },
    {
      title: "Personal Services",
      description: "Premium lifestyle and wellness experiences delivered to your doorstep with personalized care.",
      icon: <Users className="w-8 h-8" />,
      color: "from-purple-400 to-pink-500", 
      features: ["Personalized Care", "Flexible Scheduling", "Premium Quality"],
      stats: "2000+ Happy Clients"
    },
    {
      title: "Home Services",
      description: "Comprehensive home maintenance, pest control, and deep cleaning services for a healthy home.",
      icon: <Shield className="w-8 h-8" />,
      color: "from-green-400 to-emerald-500",
      features: ["Eco-Friendly", "Insured Workers", "Satisfaction Guaranteed"],
      stats: "3000+ Homes Served"
    },
    {
      title: "Renovation",
      description: "Transform your space with professional interior design and complete home renovation services.",
      icon: <Clock className="w-8 h-8" />,
      color: "from-red-400 to-rose-500",
      features: ["Design Consultation", "Project Management", "Quality Materials"],
      stats: "200+ Renovations"
    },
  ];

  const stats = [
    { number: "10,000+", label: "Happy Customers", icon: "😊" },
    { number: "500+", label: "Skilled Professionals", icon: "👨‍🔧" },
    { number: "50+", label: "Service Categories", icon: "🛠️" },
    { number: "24/7", label: "Customer Support", icon: "📞" },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Homeowner",
      content: "Excellent service! The electrician arrived on time and fixed our wiring issue professionally. The booking process was seamless and the quality exceeded expectations.",
      rating: 5,
      avatar: "PS",
      location: "Mumbai"
    },
    {
      name: "Rajesh Kumar", 
      role: "Business Owner",
      content: "COOLIE's renovation team transformed our office space beautifully. Great attention to detail, professional approach, and completed on time within budget.",
      rating: 5,
      avatar: "RK",
      location: "Delhi"
    },
    {
      name: "Anita Patel",
      role: "Apartment Owner", 
      content: "The home cleaning service was outstanding. Professional, thorough, and very reasonably priced. I've been using their services for 6 months now.",
      rating: 5,
      avatar: "AP",
      location: "Bangalore"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50 overflow-hidden">
      {/* Refresh Indicator */}
      {isRefreshing && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed top-20 right-4 z-50 bg-gradient-to-r from-primary-600 to-accent-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2"
        >
          <RefreshCw className="w-4 h-4 animate-spin" />
          <span className="text-sm font-medium">Refreshing...</span>
        </motion.div>
      )}

      {/* Debug Info (Development only) */}
      {process.env.NODE_ENV === 'development' && refreshCount > 0 && (
        <div className="fixed bottom-4 right-4 bg-neutral-800 text-white px-3 py-2 rounded-lg text-xs">
          Landing Refreshes: {refreshCount}
        </div>
      )}
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div 
          style={{ y }}
          className="absolute inset-0 bg-gradient-to-br from-primary-600/10 to-accent-600/10"
        />
        
        {/* Floating Elements */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-20 h-20 bg-primary-200/30 rounded-full blur-xl"
        />
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-20 right-10 w-32 h-32 bg-accent-200/30 rounded-full blur-xl"
        />
        
        <div className="container-custom py-20 lg:py-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Badge variant="primary" className="mb-6 bg-gradient-to-r from-primary-500 to-accent-500 text-white border-none shadow-lg">
                  <Sparkles className="w-4 h-4 mr-2" />
                  🏠 Trusted Home Services Platform
                </Badge>
              </motion.div>
              
              <motion.h1 
                className="text-5xl lg:text-7xl font-display font-bold text-neutral-900 mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Professional
                <motion.span 
                  className="text-gradient block"
                  animate={{ 
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  Home Services
                </motion.span>
                at Your Doorstep
              </motion.h1>
              
              <motion.p 
                className="text-xl text-neutral-600 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Connect with verified professionals for all your home service needs. 
                From electrical work to renovations, we ensure quality, reliability, and satisfaction.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Link to="/home">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto group"
                    autoRefresh={true}
                    refreshDelay={1200}
                  >
                    <span className="mr-2">Explore Services</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/careers">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full sm:w-auto group"
                    autoRefresh={true}
                    refreshDelay={1000}
                  >
                    <Users className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    Join as Professional
                  </Button>
                </Link>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div 
                className="flex items-center space-x-6 text-sm text-neutral-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <motion.div 
                  className="flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <Shield className="w-4 h-4 text-success-600" />
                  <span>Verified Professionals</span>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <Star className="w-4 h-4 text-warning-500" />
                  <span>4.9/5 Rating</span>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <CheckCircle className="w-4 h-4 text-success-600" />
                  <span>Insured Services</span>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <motion.img
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1000"
                  alt="Professional home services"
                  className="rounded-3xl shadow-large w-full"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Floating Success Card */}
                <motion.div 
                  className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-large"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-success-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-900">Service Completed</p>
                      <p className="text-sm text-neutral-600">Customer Satisfied ⭐</p>
                    </div>
                  </div>
                </motion.div>

                {/* Play Button Overlay */}
                <motion.button
                  className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <Play className="w-6 h-6 text-primary-600 ml-1" />
                  </div>
                </motion.button>
              </div>
              
              {/* Decorative Elements */}
              <motion.div 
                className="absolute -top-4 -right-4 w-24 h-24 bg-primary-200 rounded-full opacity-60"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div 
                className="absolute -bottom-8 -right-8 w-32 h-32 bg-accent-200 rounded-full opacity-40"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 6, repeat: Infinity, delay: 1 }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-50/50 to-accent-50/50" />
        <div className="container-custom relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="text-center group"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <motion.div 
                  className="text-4xl lg:text-5xl font-bold text-primary-600 mb-2"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-neutral-600 font-medium group-hover:text-primary-600 transition-colors">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Services Section */}
      <section className="py-20 bg-neutral-50 relative">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge variant="primary" className="mb-4">
              Our Services
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-6">
              Everything You Need for Your Home
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              From routine maintenance to major renovations, our network of verified professionals 
              delivers exceptional service with guaranteed satisfaction.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card hover className="h-full group relative overflow-hidden">
                  {/* Background Gradient */}
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${service.color}`} />
                  
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    {service.icon}
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-neutral-900 group-hover:text-primary-600 transition-colors">
                      {service.title}
                    </h3>
                    <Badge variant="neutral" size="sm" className="bg-primary-50 text-primary-600">
                      {service.stats}
                    </Badge>
                  </div>
                  
                  <p className="text-neutral-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <motion.div 
                        key={feature} 
                        className="flex items-center space-x-2"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <CheckCircle className="w-4 h-4 text-success-600" />
                        <span className="text-sm text-neutral-600">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full group-hover:bg-primary-50 group-hover:text-primary-600 group-hover:border-primary-200"
                    autoRefresh={true}
                    refreshDelay={800}
                  >
                    <span className="mr-2">Learn More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge variant="primary" className="mb-4">
              Customer Reviews
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-6">
              What Our Customers Say
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our satisfied customers have to say about our services.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onHoverStart={() => setActiveTestimonial(index)}
              >
                <Card 
                  className={`h-full transition-all duration-300 ${
                    activeTestimonial === index ? 'ring-2 ring-primary-200 shadow-large' : ''
                  }`}
                  hover
                >
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Star className="w-5 h-5 text-warning-500 fill-current" />
                      </motion.div>
                    ))}
                  </div>
                  
                  <p className="text-neutral-700 mb-6 leading-relaxed italic">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-accent-100 rounded-full flex items-center justify-center">
                      <span className="font-semibold text-primary-600">
                        {testimonial.avatar}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-900">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-neutral-600">
                        {testimonial.role} • {testimonial.location}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 via-primary-700 to-accent-600 text-white relative overflow-hidden">
        {/* Animated Background */}
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
        
        <div className="container-custom text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2 
              className="text-4xl lg:text-5xl font-display font-bold mb-6"
              animate={{ 
                textShadow: [
                  '0 0 20px rgba(255,255,255,0.5)',
                  '0 0 30px rgba(255,255,255,0.8)',
                  '0 0 20px rgba(255,255,255,0.5)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Ready to Get Started?
            </motion.h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust COOLIE for their home service needs. 
              Book your first service today and experience the difference.
            </p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Link to="/home">
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="w-full sm:w-auto group"
                  autoRefresh={true}
                  refreshDelay={1500}
                >
                  <span className="mr-2">Browse Services</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/signup">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary-600 group"
                  autoRefresh={true}
                  refreshDelay={1100}
                >
                  <Users className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Create Account
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}