import { motion } from "framer-motion";
import { Calendar, User, Clock, Tag, Search, TrendingUp, ArrowRight, BookOpen } from "lucide-react";
import { Button, Card, Badge, Input } from "../components/ui";
import { useAutoRefresh } from "../hooks/useAutoRefresh";
import { useState } from "react";

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Auto-refresh functionality
  const refreshBlogData = async (source = 'manual') => {
    console.log(`Blog page refreshed from ${source}`);
  };

  const { isRefreshing, refreshCount } = useAutoRefresh(
    refreshBlogData,
    {
      enabled: true,
      onButtonClick: true,
      debounceMs: 1000,
    }
  );

  const categories = [
    { id: "all", name: "All Posts", count: 24 },
    { id: "home-improvement", name: "Home Improvement", count: 8 },
    { id: "maintenance", name: "Maintenance Tips", count: 6 },
    { id: "technology", name: "Technology", count: 4 },
    { id: "lifestyle", name: "Lifestyle", count: 3 },
    { id: "company", name: "Company News", count: 3 }
  ];

  const blogPosts = [
    {
      id: 1,
      title: "10 Essential Home Maintenance Tasks for Winter",
      excerpt: "Prepare your home for the winter season with these essential maintenance tasks that will keep your family warm and safe.",
      author: "Priya Sharma",
      date: "December 20, 2024",
      readTime: "5 min read",
      category: "maintenance",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
      featured: true,
      tags: ["Winter", "Maintenance", "Home Care"]
    },
    {
      id: 2,
      title: "How AI is Revolutionizing Home Services",
      excerpt: "Discover how artificial intelligence is transforming the way we book, manage, and deliver home services.",
      author: "Rajesh Kumar",
      date: "December 15, 2024",
      readTime: "4 min read",
      category: "technology",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
      featured: true,
      tags: ["AI", "Technology", "Innovation"]
    },
    {
      id: 3,
      title: "Creating a Smart Home on a Budget",
      excerpt: "Transform your home into a smart home without breaking the bank. Here are affordable smart home solutions.",
      author: "Amit Patel",
      date: "December 10, 2024",
      readTime: "6 min read",
      category: "home-improvement",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
      featured: false,
      tags: ["Smart Home", "Budget", "Technology"]
    },
    {
      id: 4,
      title: "The Ultimate Guide to Electrical Safety at Home",
      excerpt: "Learn essential electrical safety tips to protect your family and property from electrical hazards.",
      author: "Sneha Gupta",
      date: "December 5, 2024",
      readTime: "7 min read",
      category: "maintenance",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=400&fit=crop",
      featured: false,
      tags: ["Electrical", "Safety", "Home"]
    },
    {
      id: 5,
      title: "Sustainable Living: Eco-Friendly Home Improvements",
      excerpt: "Make your home more environmentally friendly with these sustainable improvement ideas and tips.",
      author: "Kavya Reddy",
      date: "November 28, 2024",
      readTime: "5 min read",
      category: "home-improvement",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop",
      featured: false,
      tags: ["Sustainability", "Eco-Friendly", "Green Living"]
    },
    {
      id: 6,
      title: "COOLIE's Journey: From Startup to Market Leader",
      excerpt: "Read about COOLIE's incredible journey from a small startup to becoming India's leading home services platform.",
      author: "Rajesh Kumar",
      date: "November 20, 2024",
      readTime: "8 min read",
      category: "company",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
      featured: false,
      tags: ["Company", "Journey", "Success Story"]
    },
    {
      id: 7,
      title: "5 Signs Your Home Needs Professional Plumbing Service",
      excerpt: "Don't ignore these warning signs that indicate you need to call a professional plumber immediately.",
      author: "Vikram Singh",
      date: "November 15, 2024",
      readTime: "4 min read",
      category: "maintenance",
      image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&h=400&fit=crop",
      featured: false,
      tags: ["Plumbing", "Maintenance", "Home Care"]
    },
    {
      id: 8,
      title: "Work From Home: Creating the Perfect Home Office",
      excerpt: "Design and set up a productive home office space that enhances your work-from-home experience.",
      author: "Meera Joshi",
      date: "November 10, 2024",
      readTime: "6 min read",
      category: "lifestyle",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
      featured: false,
      tags: ["Home Office", "Productivity", "Lifestyle"]
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);
  const trendingTags = ["Home Improvement", "Maintenance", "Smart Home", "Technology", "Safety", "Eco-Friendly"];

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
              COOLIE Blog
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
              Home & Living
              <span className="block text-accent-300">Insights</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-100 mb-8 leading-relaxed">
              Discover expert tips, home improvement guides, and the latest trends in home services. 
              Your go-to resource for all things home and lifestyle.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-6 h-6" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 text-lg border border-white/20 rounded-2xl focus:ring-4 focus:ring-white/20 focus:border-white/40 focus:outline-none transition-all duration-300 bg-white/10 backdrop-blur-sm text-white placeholder-white/60"
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary" 
                className="w-full sm:w-auto"
                autoRefresh={true}
                refreshDelay={1200}
              >
                Browse Articles
                <BookOpen className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary-600"
                autoRefresh={true}
                refreshDelay={1000}
              >
                Subscribe to Newsletter
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge variant="primary" className="mb-4">
              Featured
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-6">
              Featured Articles
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Our most popular and trending articles handpicked by our editorial team.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {featuredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card hover className="overflow-hidden h-full">
                  <div className="relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="primary">
                        Featured
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-4 text-sm text-neutral-500 mb-3">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-neutral-900 mb-3">
                      {post.title}
                    </h3>
                    
                    <p className="text-neutral-600 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 2).map(tag => (
                          <Badge key={tag} variant="secondary" size="sm">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        size="sm"
                        autoRefresh={true}
                        refreshDelay={800}
                      >
                        Read More
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-neutral-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-display font-bold text-neutral-900 mb-4">
              Browse by Category
            </h2>
            <p className="text-neutral-600">
              Find articles that match your interests
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-white text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                {category.name}
                <span className="ml-2 text-sm opacity-75">({category.count})</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <h2 className="text-3xl font-display font-bold text-neutral-900 mb-4">
                  {selectedCategory === "all" ? "All Articles" : categories.find(c => c.id === selectedCategory)?.name}
                </h2>
                <p className="text-neutral-600">
                  {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
                  {searchTerm && ` for "${searchTerm}"`}
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8">
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card hover className="overflow-hidden h-full">
                      <div className="relative">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-40 object-cover"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge variant="secondary" size="sm">
                            {categories.find(c => c.id === post.category)?.name}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-center space-x-3 text-xs text-neutral-500 mb-3">
                          <span>{post.author}</span>
                          <span>•</span>
                          <span>{post.date}</span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>
                        
                        <h3 className="text-lg font-bold text-neutral-900 mb-3">
                          {post.title}
                        </h3>
                        
                        <p className="text-neutral-600 text-sm mb-4 leading-relaxed">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {post.tags.slice(0, 2).map(tag => (
                              <Badge key={tag} variant="outline" size="sm" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <Button 
                            variant="ghost" 
                            size="sm"
                            autoRefresh={true}
                            refreshDelay={800}
                          >
                            Read
                            <ArrowRight className="ml-1 w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-8">
                {/* Trending Tags */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card>
                    <div className="flex items-center space-x-2 mb-4">
                      <TrendingUp className="w-5 h-5 text-primary-600" />
                      <h3 className="text-lg font-bold text-neutral-900">
                        Trending Tags
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {trendingTags.map(tag => (
                        <Badge 
                          key={tag} 
                          variant="outline" 
                          size="sm" 
                          className="cursor-pointer hover:bg-primary-50 hover:border-primary-300"
                        >
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                </motion.div>

                {/* Newsletter Signup */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card className="bg-gradient-to-r from-primary-50 to-accent-50 border-primary-200">
                    <h3 className="text-lg font-bold text-neutral-900 mb-3">
                      Stay Updated
                    </h3>
                    <p className="text-neutral-600 text-sm mb-4">
                      Get the latest articles and home tips delivered to your inbox.
                    </p>
                    <div className="space-y-3">
                      <Input
                        placeholder="Enter your email"
                        type="email"
                        size="sm"
                      />
                      <Button 
                        size="sm" 
                        className="w-full"
                        autoRefresh={true}
                        refreshDelay={1000}
                      >
                        Subscribe
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-accent-600 text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6">
              Ready to Transform Your Home?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Put these tips into action by booking professional services through COOLIE.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="secondary" 
                size="lg" 
                className="w-full sm:w-auto"
                autoRefresh={true}
                refreshDelay={1200}
              >
                Book a Service
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary-600"
                autoRefresh={true}
                refreshDelay={1000}
              >
                Browse Services
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Debug Info */}
      {process.env.NODE_ENV === 'development' && refreshCount > 0 && (
        <div className="fixed bottom-4 left-4 bg-neutral-800 text-white px-3 py-2 rounded-lg text-xs">
          Blog Refreshes: {refreshCount}
        </div>
      )}
    </div>
  );
}