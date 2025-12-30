import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  Search,
  ChevronDown,
  ChevronRight,
  MessageCircle,
  Phone,
  Mail,
  FileText,
  Video,
  Book,
  Users,
  AlertCircle,
  CheckCircle,
  Clock,
  Star,
  Send
} from "lucide-react";
import WorkerLayout from "../../components/worker/WorkerLayout";
import { Card, Button, Input, Badge } from "../../components/ui";
import toast from "react-hot-toast";

export default function WorkerHelp() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [contactForm, setContactForm] = useState({
    subject: "",
    message: "",
    priority: "medium"
  });
  const [submitting, setSubmitting] = useState(false);

  const categories = [
    { id: "all", label: "All Topics", icon: Book },
    { id: "jobs", label: "Job Management", icon: FileText },
    { id: "payments", label: "Payments & Earnings", icon: Star },
    { id: "schedule", label: "Schedule & Availability", icon: Clock },
    { id: "account", label: "Account & Profile", icon: Users },
    { id: "technical", label: "Technical Issues", icon: AlertCircle }
  ];

  const faqs = [
    {
      id: 1,
      category: "jobs",
      question: "How do I accept or decline job assignments?",
      answer: "You can accept or decline jobs from your Dashboard or Jobs page. Click on the job card and use the 'Accept' or 'Decline' buttons. You have 30 minutes to respond to new job assignments."
    },
    {
      id: 2,
      category: "jobs",
      question: "What should I do if I need to cancel an accepted job?",
      answer: "If you need to cancel an accepted job, go to the job details page and click 'Request Cancellation'. Provide a valid reason. Note that frequent cancellations may affect your rating."
    },
    {
      id: 3,
      category: "payments",
      question: "When will I receive payment for completed jobs?",
      answer: "Payments are processed within 24-48 hours after job completion and customer confirmation. You can track payment status in the Earnings section."
    },
    {
      id: 4,
      category: "payments",
      question: "How is my service fee calculated?",
      answer: "Your earnings = Job amount - Platform fee (10-15%) - Payment processing fee (2-3%). The exact breakdown is shown in each job's payment details."
    },
    {
      id: 5,
      category: "schedule",
      question: "How do I update my working hours?",
      answer: "Go to Availability page to set your working days and hours. You can also block specific time slots for personal commitments or mark yourself unavailable."
    },
    {
      id: 6,
      category: "schedule",
      question: "Can I work outside my set availability hours?",
      answer: "Yes, you can accept jobs outside your regular hours, but the system will primarily assign jobs within your set availability to ensure better work-life balance."
    },
    {
      id: 7,
      category: "account",
      question: "How do I verify my documents?",
      answer: "Upload clear photos of your Aadhar, PAN, and professional licenses in the Profile section. Verification typically takes 24-48 hours."
    },
    {
      id: 8,
      category: "account",
      question: "Why is document verification important?",
      answer: "Verified workers get priority in job assignments, higher customer trust, and access to premium job categories with better pay rates."
    },
    {
      id: 9,
      category: "technical",
      question: "The app is running slowly. What should I do?",
      answer: "Try closing other apps, check your internet connection, and restart the app. If issues persist, contact support with your device details."
    },
    {
      id: 10,
      category: "technical",
      question: "I'm not receiving job notifications. How to fix this?",
      answer: "Check notification permissions in your device settings and ensure notifications are enabled in the app's Notification Preferences."
    }
  ];

  const quickGuides = [
    {
      title: "Getting Started as a Worker",
      description: "Complete setup guide for new workers",
      duration: "5 min read",
      icon: Users,
      color: "blue"
    },
    {
      title: "Maximizing Your Earnings",
      description: "Tips to increase job opportunities and ratings",
      duration: "8 min read",
      icon: Star,
      color: "green"
    },
    {
      title: "Managing Your Schedule",
      description: "Best practices for availability management",
      duration: "6 min read",
      icon: Clock,
      color: "purple"
    },
    {
      title: "Customer Communication",
      description: "Professional communication guidelines",
      duration: "4 min read",
      icon: MessageCircle,
      color: "orange"
    }
  ];

  const contactOptions = [
    {
      title: "Live Chat",
      description: "Get instant help from our support team",
      icon: MessageCircle,
      action: "Start Chat",
      available: true,
      color: "blue"
    },
    {
      title: "Phone Support",
      description: "Call us for urgent issues",
      icon: Phone,
      action: "Call Now",
      available: true,
      color: "green",
      details: "+91 1800-123-4567"
    },
    {
      title: "Email Support",
      description: "Send detailed queries via email",
      icon: Mail,
      action: "Send Email",
      available: true,
      color: "purple",
      details: "worker-support@coolie.com"
    },
    {
      title: "Video Call",
      description: "Screen sharing for technical issues",
      icon: Video,
      action: "Schedule Call",
      available: false,
      color: "orange"
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSubmitContact = async (e) => {
    e.preventDefault();
    if (!contactForm.subject.trim() || !contactForm.message.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setSubmitting(true);
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Support ticket submitted successfully");
      setContactForm({ subject: "", message: "", priority: "medium" });
    } catch (error) {
      toast.error("Failed to submit support ticket");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <WorkerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Help & Support</h1>
          <p className="text-neutral-600">Find answers to common questions or get in touch with our support team</p>
        </div>

        {/* Search */}
        <Card className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for help articles, FAQs, or guides..."
              className="pl-10 py-3 text-lg"
            />
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Categories */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-neutral-600 hover:bg-neutral-50'
                    }`}
                  >
                    <category.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{category.label}</span>
                  </button>
                ))}
              </div>
            </Card>

            {/* Quick Contact */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Need Immediate Help?</h3>
              <div className="space-y-3">
                <Button variant="primary" className="w-full justify-start">
                  <MessageCircle className="w-4 h-4 mr-3" />
                  Live Chat
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="w-4 h-4 mr-3" />
                  Call Support
                </Button>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Quick Guides */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Quick Guides</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickGuides.map((guide, index) => (
                  <motion.div
                    key={index}
                    className={`p-4 border-l-4 border-${guide.color}-500 bg-${guide.color}-50 rounded-lg cursor-pointer hover:shadow-md transition-shadow`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start space-x-3">
                      <guide.icon className={`w-6 h-6 text-${guide.color}-600 mt-1`} />
                      <div className="flex-1">
                        <h4 className="font-medium text-neutral-900 mb-1">{guide.title}</h4>
                        <p className="text-sm text-neutral-600 mb-2">{guide.description}</p>
                        <span className="text-xs text-neutral-500">{guide.duration}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-neutral-400" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* FAQs */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-neutral-900">
                  Frequently Asked Questions
                </h3>
                <Badge variant="secondary">
                  {filteredFAQs.length} questions
                </Badge>
              </div>

              <div className="space-y-3">
                <AnimatePresence>
                  {filteredFAQs.map((faq) => (
                    <motion.div
                      key={faq.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="border border-neutral-200 rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-neutral-50 transition-colors"
                      >
                        <span className="font-medium text-neutral-900 pr-4">{faq.question}</span>
                        <ChevronDown className={`w-5 h-5 text-neutral-400 transition-transform ${
                          expandedFAQ === faq.id ? 'rotate-180' : ''
                        }`} />
                      </button>
                      
                      <AnimatePresence>
                        {expandedFAQ === faq.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="border-t border-neutral-200"
                          >
                            <div className="p-4 bg-neutral-50">
                              <p className="text-neutral-700 leading-relaxed">{faq.answer}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {filteredFAQs.length === 0 && (
                  <div className="text-center py-8">
                    <HelpCircle className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
                    <p className="text-neutral-600">No FAQs found matching your search.</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Contact Support */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Contact Support</h3>
              
              {/* Contact Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {contactOptions.map((option, index) => (
                  <div
                    key={index}
                    className={`p-4 border rounded-lg ${
                      option.available 
                        ? 'border-neutral-200 hover:border-blue-300 cursor-pointer' 
                        : 'border-neutral-100 bg-neutral-50'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        option.available 
                          ? `bg-${option.color}-100 text-${option.color}-600`
                          : 'bg-neutral-200 text-neutral-400'
                      }`}>
                        <option.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-medium mb-1 ${
                          option.available ? 'text-neutral-900' : 'text-neutral-500'
                        }`}>
                          {option.title}
                        </h4>
                        <p className={`text-sm mb-2 ${
                          option.available ? 'text-neutral-600' : 'text-neutral-400'
                        }`}>
                          {option.description}
                        </p>
                        {option.details && (
                          <p className="text-xs text-neutral-500 mb-2">{option.details}</p>
                        )}
                        <Button
                          variant={option.available ? "outline" : "ghost"}
                          size="sm"
                          disabled={!option.available}
                        >
                          {option.action}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact Form */}
              <div className="border-t border-neutral-200 pt-6">
                <h4 className="font-medium text-neutral-900 mb-4">Send us a message</h4>
                <form onSubmit={handleSubmitContact} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Subject *
                      </label>
                      <Input
                        value={contactForm.subject}
                        onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                        placeholder="Brief description of your issue"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Priority
                      </label>
                      <select
                        value={contactForm.priority}
                        onChange={(e) => setContactForm(prev => ({ ...prev, priority: e.target.value }))}
                        className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      value={contactForm.message}
                      onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Describe your issue in detail..."
                      rows={4}
                      className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                      required
                    />
                  </div>

                  <Button type="submit" loading={submitting} className="w-full md:w-auto">
                    <Send className="w-4 h-4 mr-2" />
                    Submit Support Ticket
                  </Button>
                </form>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </WorkerLayout>
  );
}