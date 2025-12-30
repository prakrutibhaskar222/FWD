import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, HeadphonesIcon, ArrowRight } from "lucide-react";
import { Button, Card, Badge, Input } from "../components/ui";
import { useAutoRefresh } from "../hooks/useAutoRefresh";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  // Auto-refresh functionality
  const refreshContactData = async (source = 'manual') => {
    console.log(`Contact page refreshed from ${source}`);
  };

  const { isRefreshing, refreshCount } = useAutoRefresh(
    refreshContactData,
    {
      enabled: true,
      onButtonClick: true,
      debounceMs: 1000,
    }
  );

  const contactMethods = [
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Phone Support",
      description: "Speak directly with our support team",
      contact: "+91 7619443208",
      availability: "Mon-Fri, 9 AM - 6 PM IST",
      color: "from-blue-500 to-blue-600",
      action: "Call Now"
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Email Support",
      description: "Send us a detailed message",
      contact: "coolie96913@gmail.com",
      availability: "Response within 24 hours",
      color: "from-green-500 to-emerald-600",
      action: "Send Email"
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Live Chat",
      description: "Get instant help from our team",
      contact: "Available on website",
      availability: "Mon-Fri, 9 AM - 6 PM IST",
      color: "from-purple-500 to-indigo-600",
      action: "Start Chat"
    },
    {
      icon: <HeadphonesIcon className="w-8 h-8" />,
      title: "WhatsApp Support",
      description: "Quick support via WhatsApp",
      contact: "+91 7619443208",
      availability: "24/7 Available",
      color: "from-green-600 to-green-700",
      action: "Message Us"
    }
  ];

  const offices = [
    {
      city: "Bangalore",
      address: "1908 Bull Temple Road, Bangalore - 560 019 ",
      phone: "+91 76 19 4432 0819",
      email: "support@coolie.com",
      hours: "Mon-Fri: 9 AM - 6 PM"
    }
  ];

  const faqs = [
    {
      question: "How do I book a service?",
      answer: "You can book a service through our website or mobile app. Simply select the service you need, choose a time slot, and confirm your booking."
    },
    {
      question: "Are your professionals verified?",
      answer: "Yes, all our professionals go through a thorough background check and verification process before joining our platform."
    },
    {
      question: "What if I'm not satisfied with the service?",
      answer: "We offer a 100% satisfaction guarantee. If you're not happy with the service, we'll make it right or provide a full refund."
    },
    {
      question: "How do I cancel or reschedule a booking?",
      answer: "You can cancel or reschedule your booking up to 2 hours before the scheduled time through your account dashboard or by calling our support team."
    }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
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
            <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/30">
              Get in Touch
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
              We're Here to
              <span className="block text-accent-300">Help You</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-100 mb-8 leading-relaxed">
              Have questions about our services? Need support with your booking? 
              Our friendly team is ready to assist you 24/7.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary" 
                className="w-full sm:w-auto"
                autoRefresh={true}
                refreshDelay={1200}
                onClick={() => document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' })}
              >
                Send Message
                <Send className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary-600"
                autoRefresh={true}
                refreshDelay={1000}
              >
                Call Support
                <Phone className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge variant="primary" className="mb-4">
              Contact Methods
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-6">
              Choose Your Preferred Way
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              We offer multiple ways to get in touch. Choose the method that works best for you.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card hover className="h-full text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${method.color} rounded-2xl flex items-center justify-center text-white mb-6 mx-auto`}>
                    {method.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-neutral-900 mb-3">
                    {method.title}
                  </h3>
                  
                  <p className="text-neutral-600 mb-4 text-sm">
                    {method.description}
                  </p>
                  
                  <div className="mb-4">
                    <p className="font-semibold text-neutral-900 mb-1">
                      {method.contact}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {method.availability}
                    </p>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    autoRefresh={true}
                    refreshDelay={800}
                  >
                    {method.action}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-20 bg-neutral-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="primary" className="mb-4">
                Send Message
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-6">
                Get in Touch
              </h2>
              <p className="text-neutral-600 mb-8">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              <Card>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                    />
                    <Input
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      label="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                    />
                    <Input
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What's this about?"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Message <span className="text-error-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-4 focus:ring-primary-200 focus:border-primary-500 focus:outline-none transition-all duration-300 bg-white resize-none"
                      rows="6"
                      placeholder="Tell us how we can help you..."
                      required
                    ></textarea>
                  </div>
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full"
                    autoRefresh={true}
                    refreshDelay={1500}
                  >
                    Send Message
                    <Send className="ml-2 w-5 h-5" />
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <Badge variant="primary" className="mb-4">
                  Our Offices
                </Badge>
                <h3 className="text-2xl font-bold text-neutral-900 mb-6">
                  Visit Us
                </h3>
                
                <div className="space-y-6">
                  {offices.map((office, index) => (
                    <Card key={office.city} className="hover:shadow-medium transition-shadow">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-6 h-6 text-primary-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-neutral-900 mb-2">
                            {office.city}
                          </h4>
                          <p className="text-neutral-600 text-sm mb-2">
                            {office.address}
                          </p>
                          <div className="space-y-1 text-sm">
                            <p className="text-neutral-600">
                              <Phone className="w-4 h-4 inline mr-2" />
                              {office.phone}
                            </p>
                            <p className="text-neutral-600">
                              <Mail className="w-4 h-4 inline mr-2" />
                              {office.email}
                            </p>
                            <p className="text-neutral-600">
                              <Clock className="w-4 h-4 inline mr-2" />
                              {office.hours}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* FAQ Section */}
              <div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-6">
                  Frequently Asked Questions
                </h3>
                
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <Card key={index} className="hover:shadow-medium transition-shadow">
                      <h4 className="font-semibold text-neutral-900 mb-2">
                        {faq.question}
                      </h4>
                      <p className="text-neutral-600 text-sm">
                        {faq.answer}
                      </p>
                    </Card>
                  ))}
                </div>
                
                <div className="mt-6">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    autoRefresh={true}
                    refreshDelay={1000}
                  >
                    View All FAQs
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
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
              Need Immediate Assistance?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Our support team is available 24/7 to help you with any urgent issues or questions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="secondary" 
                size="lg" 
                className="w-full sm:w-auto"
                autoRefresh={true}
                refreshDelay={1200}
              >
                Call Emergency Support
                <Phone className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary-600"
                autoRefresh={true}
                refreshDelay={1000}
              >
                Start Live Chat
                <MessageCircle className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Debug Info */}
      {process.env.NODE_ENV === 'development' && refreshCount > 0 && (
        <div className="fixed bottom-4 left-4 bg-neutral-800 text-white px-3 py-2 rounded-lg text-xs">
          Contact Refreshes: {refreshCount}
        </div>
      )}
    </div>
  );
}