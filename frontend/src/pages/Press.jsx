import { motion } from "framer-motion";
import { Calendar, Download, ExternalLink, Users, Award, TrendingUp, ArrowRight } from "lucide-react";
import { Button, Card, Badge } from "../components/ui";
import { useAutoRefresh } from "../hooks/useAutoRefresh";

export default function Press() {
  // Auto-refresh functionality
  const refreshPressData = async (source = 'manual') => {
    console.log(`Press page refreshed from ${source}`);
  };

  const { isRefreshing, refreshCount } = useAutoRefresh(
    refreshPressData,
    {
      enabled: true,
      onButtonClick: true,
      debounceMs: 1000,
    }
  );

  const pressReleases = [
    {
      id: 1,
      title: "COOLIE Raises $10M Series A to Expand Home Services Platform",
      date: "December 15, 2024",
      excerpt: "Leading home services platform secures funding to accelerate growth and expand to new cities across India.",
      category: "Funding",
      readTime: "3 min read",
      featured: true
    },
    {
      id: 2,
      title: "COOLIE Launches AI-Powered Service Matching Technology",
      date: "November 28, 2024",
      excerpt: "New smart matching algorithm improves service quality and reduces booking time by 40%.",
      category: "Product",
      readTime: "2 min read",
      featured: true
    },
    {
      id: 3,
      title: "COOLIE Reaches 10,000+ Happy Customers Milestone",
      date: "October 20, 2024",
      excerpt: "Platform celebrates major customer milestone with 95% satisfaction rate and 500+ verified professionals.",
      category: "Milestone",
      readTime: "2 min read",
      featured: false
    },
    {
      id: 4,
      title: "COOLIE Partners with Leading Insurance Provider for Enhanced Coverage",
      date: "September 15, 2024",
      excerpt: "Strategic partnership ensures comprehensive insurance coverage for all services booked through the platform.",
      category: "Partnership",
      readTime: "3 min read",
      featured: false
    },
    {
      id: 5,
      title: "COOLIE Wins 'Best Home Services Platform' Award",
      date: "August 10, 2024",
      excerpt: "Recognition from Indian Startup Awards for innovation in home services and customer satisfaction.",
      category: "Award",
      readTime: "2 min read",
      featured: false
    },
    {
      id: 6,
      title: "COOLIE Expands to 5 New Cities Across India",
      date: "July 5, 2024",
      excerpt: "Platform now available in 10 major cities with plans for further expansion in 2024.",
      category: "Expansion",
      readTime: "2 min read",
      featured: false
    }
  ];

  const mediaKit = [
    {
      title: "Company Logo Pack",
      description: "High-resolution logos in various formats",
      fileSize: "2.5 MB",
      format: "ZIP"
    },
    {
      title: "Brand Guidelines",
      description: "Complete brand identity and usage guidelines",
      fileSize: "5.2 MB",
      format: "PDF"
    },
    {
      title: "Product Screenshots",
      description: "High-quality app and website screenshots",
      fileSize: "8.1 MB",
      format: "ZIP"
    },
    {
      title: "Executive Photos",
      description: "Professional headshots of leadership team",
      fileSize: "3.7 MB",
      format: "ZIP"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Happy Customers", icon: "👥" },
    { number: "500+", label: "Verified Professionals", icon: "🔧" },
    { number: "50+", label: "Service Categories", icon: "🏠" },
    { number: "10", label: "Cities Served", icon: "🌆" }
  ];

  const awards = [
    {
      title: "Best Home Services Platform 2024",
      organization: "Indian Startup Awards",
      year: "2024"
    },
    {
      title: "Customer Choice Award",
      organization: "Service Excellence Awards",
      year: "2024"
    },
    {
      title: "Innovation in Technology",
      organization: "Tech Innovation Summit",
      year: "2023"
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container-custom py-20 lg:py-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/30">
              Press & Media
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
              Press
              <span className="block text-accent-300">Center</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-100 mb-8 leading-relaxed">
              Stay updated with the latest news, announcements, and milestones from COOLIE. 
              Find press releases, media resources, and company information.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary" 
                className="w-full sm:w-auto"
                autoRefresh={true}
                refreshDelay={1200}
              >
                Latest News
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary-600"
                autoRefresh={true}
                refreshDelay={1000}
              >
                Media Kit
                <Download className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-4xl lg:text-5xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-neutral-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Press Releases */}
      <section className="py-20 bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge variant="primary" className="mb-4">
              Latest News
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-6">
              Press Releases
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Stay informed about COOLIE's latest developments, partnerships, and achievements.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {pressReleases.map((release, index) => (
              <motion.div
                key={release.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={release.featured ? "lg:col-span-2" : ""}
              >
                <Card hover className={`h-full ${release.featured ? 'border-primary-200 bg-gradient-to-r from-primary-50 to-accent-50' : ''}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Badge 
                        variant={release.featured ? "primary" : "secondary"} 
                        size="sm"
                      >
                        {release.category}
                      </Badge>
                      {release.featured && (
                        <Badge variant="accent" size="sm">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center text-sm text-neutral-500 space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{release.date}</span>
                      </div>
                      <span>{release.readTime}</span>
                    </div>
                  </div>
                  
                  <h3 className={`font-bold text-neutral-900 mb-3 ${release.featured ? 'text-2xl' : 'text-xl'}`}>
                    {release.title}
                  </h3>
                  
                  <p className="text-neutral-600 mb-6 leading-relaxed">
                    {release.excerpt}
                  </p>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    autoRefresh={true}
                    refreshDelay={800}
                  >
                    Read Full Release
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge variant="primary" className="mb-4">
              Recognition
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-6">
              Awards & Recognition
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              COOLIE has been recognized by industry leaders for innovation, customer satisfaction, and excellence.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {awards.map((award, index) => (
              <motion.div
                key={award.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card hover className="text-center h-full">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center text-white mb-6 mx-auto">
                    <Award className="w-8 h-8" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-neutral-900 mb-3">
                    {award.title}
                  </h3>
                  
                  <p className="text-neutral-600 mb-2">
                    {award.organization}
                  </p>
                  
                  <p className="text-primary-600 font-semibold">
                    {award.year}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Kit Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge variant="primary" className="mb-4">
              Media Resources
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-6">
              Media Kit
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Download high-quality assets, logos, and brand materials for your stories and coverage.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mediaKit.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card hover className="text-center h-full">
                  <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600 mb-6 mx-auto">
                    <Download className="w-8 h-8" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-neutral-900 mb-3">
                    {item.title}
                  </h3>
                  
                  <p className="text-neutral-600 text-sm mb-4">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center justify-center space-x-2 text-xs text-neutral-500 mb-4">
                    <span>{item.fileSize}</span>
                    <span>•</span>
                    <span>{item.format}</span>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    autoRefresh={true}
                    refreshDelay={800}
                  >
                    Download
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-accent-600 text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6">
              Media Inquiries
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              For press inquiries, interviews, or additional information, please contact our media team.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="secondary" 
                size="lg" 
                className="w-full sm:w-auto"
                autoRefresh={true}
                refreshDelay={1200}
              >
                Contact Media Team
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary-600"
                autoRefresh={true}
                refreshDelay={1000}
              >
                Download Media Kit
                <Download className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Debug Info */}
      {process.env.NODE_ENV === 'development' && refreshCount > 0 && (
        <div className="fixed bottom-4 left-4 bg-neutral-800 text-white px-3 py-2 rounded-lg text-xs">
          Press Refreshes: {refreshCount}
        </div>
      )}
    </div>
  );
}