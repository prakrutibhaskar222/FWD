import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, HelpCircle, MessageCircle, Phone, Mail, ArrowRight } from "lucide-react";
import { Button, Card, Badge, Input } from "../components/ui";
import { useAutoRefresh } from "../hooks/useAutoRefresh";
import { useState } from "react";

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [openFAQ, setOpenFAQ] = useState(null);

  // Auto-refresh functionality
  const refreshFAQData = async (source = 'manual') => {
    console.log(`FAQ page refreshed from ${source}`);
  };

  const { isRefreshing, refreshCount } = useAutoRefresh(
    refreshFAQData,
    {
      enabled: true,
      onButtonClick: true,
      debounceMs: 1000,
    }
  );

  const categories = [
    { id: "all", name: "All Questions", count: 24 },
    { id: "booking", name: "Booking & Scheduling", count: 8 },
    { id: "payment", name: "Payment & Pricing", count: 6 },
    { id: "services", name: "Services", count: 5 },
    { id: "account", name: "Account & Profile", count: 3 },
    { id: "support", name: "Support", count: 2 }
  ];

  const faqs = [
    {
      id: 1,
      category: "booking",
      question: "How do I book a service?",
      answer: "You can book a service in three easy steps: 1) Select the service you need from our homepage, 2) Choose your preferred date and time, 3) Confirm your booking and make payment. You'll receive a confirmation email with all the details."
    },
    {
      id: 2,
      category: "booking",
      question: "Can I reschedule or cancel my booking?",
      answer: "Yes, you can reschedule or cancel your booking up to 2 hours before the scheduled time. Go to 'My Bookings' in your account dashboard, select the booking you want to modify, and choose 'Reschedule' or 'Cancel'. Cancellations made within 2 hours may incur a small fee."
    },
    {
      id: 3,
      category: "booking",
      question: "How far in advance can I book a service?",
      answer: "You can book services up to 30 days in advance. For urgent services, we also offer same-day booking based on availability. Emergency services are available 24/7 for critical issues."
    },
    {
      id: 4,
      category: "payment",
      question: "What payment methods do you accept?",
      answer: "We accept all major payment methods including credit/debit cards (Visa, MasterCard, American Express), UPI, net banking, digital wallets (Paytm, PhonePe, Google Pay), and cash on completion of service."
    },
    {
      id: 5,
      category: "payment",
      question: "When do I need to pay for the service?",
      answer: "Payment can be made either online while booking or after the service is completed. For online payments, you'll be charged immediately upon booking confirmation. For cash payments, you pay the professional directly after service completion."
    },
    {
      id: 6,
      category: "payment",
      question: "Are there any hidden charges?",
      answer: "No, we believe in transparent pricing. The price you see during booking is the final price you pay. This includes all taxes and fees. The only additional charges might apply for extra materials or services requested during the job, which will be discussed with you beforehand."
    },
    {
      id: 7,
      category: "services",
      question: "Are your professionals verified and insured?",
      answer: "Yes, all our professionals undergo thorough background checks, skill verification, and are fully insured. We verify their identity, check their work history, and ensure they have the necessary certifications for their respective services."
    },
    {
      id: 8,
      category: "services",
      question: "What if I'm not satisfied with the service?",
      answer: "We offer a 100% satisfaction guarantee. If you're not happy with the service quality, contact us within 24 hours and we'll either send another professional to fix the issue at no extra cost or provide a full refund."
    },
    {
      id: 9,
      category: "services",
      question: "Do you provide warranty on services?",
      answer: "Yes, we provide warranty on most of our services. The warranty period varies by service type - typically 30 days for repairs, 90 days for installations, and 1 year for major renovations. Warranty details are provided after service completion."
    },
    {
      id: 10,
      category: "account",
      question: "How do I create an account?",
      answer: "Creating an account is simple. Click on 'Sign Up' in the top right corner, enter your mobile number or email, verify with the OTP sent to you, and complete your profile. You can also sign up using your Google or Facebook account."
    },
    {
      id: 11,
      category: "account",
      question: "Can I update my profile information?",
      answer: "Yes, you can update your profile information anytime by going to 'My Profile' in your account dashboard. You can change your name, contact details, address, and preferences. Some changes may require verification."
    },
    {
      id: 12,
      category: "support",
      question: "How can I contact customer support?",
      answer: "You can reach our customer support team through multiple channels: 1) Call us at +91 7619443280, 2) Email us at coolie96913@gmail.com, 3) Use the live chat feature on our website, or 4) WhatsApp us. Our support team is available 24/7."
    },
    {
      id: 13,
      category: "support",
      question: "What should I do in case of an emergency?",
      answer: "For emergency services (like electrical issues, plumbing leaks, or security concerns), call our emergency hotline at +91 7619443280. We have professionals available 24/7 for urgent situations and will dispatch someone to your location as quickly as possible."
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

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
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
              Frequently Asked
              <span className="block text-accent-300">Questions</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-100 mb-8 leading-relaxed">
              Find answers to common questions about our services, booking process, and more. 
              Can't find what you're looking for? Contact our support team.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-6 h-6" />
                <input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 text-lg border border-white/20 rounded-2xl focus:ring-4 focus:ring-white/20 focus:border-white/40 focus:outline-none transition-all duration-300 bg-white/10 backdrop-blur-sm text-white placeholder-white/60"
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/home">
              <Button 
                size="lg" 
                variant="secondary" 
                className="w-full sm:w-auto"
                autoRefresh={true}
                refreshDelay={1200}
              >
                Browse Categories
                <HelpCircle className="ml-2 w-5 h-5" />
              </Button>
              </Link>
              <Link to="/contact">
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary-600"
                autoRefresh={true}
                refreshDelay={1000}
              >
                Contact Support
                <MessageCircle className="ml-2 w-5 h-5" />
              </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
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
              Select a category to find relevant questions and answers
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {category.name}
                <span className="ml-2 text-sm opacity-75">({category.count})</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-display font-bold text-neutral-900 mb-4">
                {activeCategory === "all" ? "All Questions" : categories.find(c => c.id === activeCategory)?.name}
              </h2>
              <p className="text-neutral-600">
                {filteredFAQs.length} question{filteredFAQs.length !== 1 ? 's' : ''} found
                {searchTerm && ` for "${searchTerm}"`}
              </p>
            </motion.div>

            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden">
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full text-left p-6 flex items-center justify-between hover:bg-neutral-50 transition-colors"
                    >
                      <h3 className="text-lg font-semibold text-neutral-900 pr-4">
                        {faq.question}
                      </h3>
                      <motion.div
                        animate={{ rotate: openFAQ === faq.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0"
                      >
                        <ChevronDown className="w-6 h-6 text-neutral-500" />
                      </motion.div>
                    </button>
                    
                    <AnimatePresence>
                      {openFAQ === faq.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-0">
                            <div className="border-t border-neutral-100 pt-4">
                              <p className="text-neutral-600 leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredFAQs.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <HelpCircle className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  No questions found
                </h3>
                <p className="text-neutral-600 mb-6">
                  Try adjusting your search terms or browse different categories.
                </p>
                <Button 
                  variant="outline"
                  autoRefresh={true}
                  refreshDelay={1000}
                  onClick={() => {
                    setSearchTerm("");
                    setActiveCategory("all");
                  }}
                >
                  Clear Filters
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <Badge variant="primary" className="mb-4">
              Still Need Help?
            </Badge>
            <h2 className="text-4xl font-display font-bold text-neutral-900 mb-6">
              Contact Our Support Team
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Can't find the answer you're looking for? Our friendly support team is here to help you 24/7.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card hover className="text-center h-full">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6 mx-auto">
                  <Phone className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">
                  Phone Support
                </h3>
                <p className="text-neutral-600 mb-4 text-sm">
                  Speak directly with our support team
                </p>
                <p className="font-semibold text-neutral-900 mb-4">
                  +91 7619443280
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  autoRefresh={true}
                  refreshDelay={800}
                >
                  Call Now
                </Button>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card hover className="text-center h-full">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-6 mx-auto">
                  <Mail className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">
                  Email Support
                </h3>
                <p className="text-neutral-600 mb-4 text-sm">
                  Send us a detailed message
                </p>
                <p className="font-semibold text-neutral-900 mb-4">
                  coolie96913@gmail.com
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  autoRefresh={true}
                  refreshDelay={800}
                >
                  Send Email
                </Button>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card hover className="text-center h-full">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-6 mx-auto">
                  <MessageCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">
                  Live Chat
                </h3>
                <p className="text-neutral-600 mb-4 text-sm">
                  Get instant help from our team
                </p>
                <p className="font-semibold text-neutral-900 mb-4">
                  Available 24/7
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  autoRefresh={true}
                  refreshDelay={800}
                >
                  Start Chat
                </Button>
              </Card>
            </motion.div>
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
              Ready to Get Started?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Now that you have your answers, book a service and experience the COOLIE difference.
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
          FAQ Refreshes: {refreshCount}
        </div>
      )}
    </div>
  );
}