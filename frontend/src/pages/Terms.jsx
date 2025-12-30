import { motion } from "framer-motion";
import { FileText, Shield, AlertCircle, CheckCircle, ArrowRight } from "lucide-react";
import { Button, Card, Badge } from "../components/ui";
import { useAutoRefresh } from "../hooks/useAutoRefresh";

export default function Terms() {
  // Auto-refresh functionality
  const refreshTermsData = async (source = 'manual') => {
    console.log(`Terms page refreshed from ${source}`);
  };

  const { isRefreshing, refreshCount } = useAutoRefresh(
    refreshTermsData,
    {
      enabled: true,
      onButtonClick: true,
      debounceMs: 1000,
    }
  );

  const sections = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      content: "By accessing and using COOLIE's services, you accept and agree to be bound by the terms and provision of this agreement. These Terms of Service constitute a legally binding agreement between you and COOLIE."
    },
    {
      id: "services",
      title: "2. Description of Services",
      content: "COOLIE is a platform that connects customers with service professionals for various home services including electrical work, plumbing, cleaning, repairs, and renovations. We act as an intermediary and do not directly provide the services."
    },
    {
      id: "registration",
      title: "3. User Registration",
      content: "To use our services, you must register for an account and provide accurate, current, and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account."
    },
    {
      id: "booking",
      title: "4. Booking and Payment",
      content: "When you book a service through our platform, you enter into a direct agreement with the service professional. Payment terms, cancellation policies, and service guarantees are clearly stated during the booking process."
    },
    {
      id: "responsibilities",
      title: "5. User Responsibilities",
      content: "Users must provide accurate information, ensure safe access to their property, be present during service delivery, and treat service professionals with respect. Any misuse of the platform may result in account suspension."
    },
    {
      id: "professional-standards",
      title: "6. Professional Standards",
      content: "All service professionals on our platform are verified, insured, and trained. However, COOLIE does not guarantee the quality of work and acts as a facilitator. Any disputes should be reported within 24 hours of service completion."
    },
    {
      id: "privacy",
      title: "7. Privacy and Data Protection",
      content: "We collect and process personal information in accordance with our Privacy Policy. Your data is protected and used only for service delivery, communication, and platform improvement purposes."
    },
    {
      id: "liability",
      title: "8. Limitation of Liability",
      content: "COOLIE's liability is limited to the service fee paid. We are not liable for any indirect, incidental, or consequential damages. Our maximum liability shall not exceed the amount paid for the specific service."
    },
    {
      id: "termination",
      title: "9. Termination",
      content: "Either party may terminate this agreement at any time. Upon termination, your right to use the services ceases immediately. Provisions regarding liability, indemnification, and dispute resolution shall survive termination."
    },
    {
      id: "changes",
      title: "10. Changes to Terms",
      content: "We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Continued use of our services after changes constitutes acceptance of the new terms."
    }
  ];

  const keyPoints = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Your Rights",
      description: "Right to quality service, transparent pricing, and customer support"
    },
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: "Your Responsibilities",
      description: "Provide accurate information and ensure safe access to your property"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Our Commitment",
      description: "Verified professionals, secure platform, and satisfaction guarantee"
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
              Legal Information
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
              Terms of
              <span className="block text-accent-300">Service</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-100 mb-8 leading-relaxed">
              Please read these terms carefully before using our services. 
              By using COOLIE, you agree to be bound by these terms and conditions.
            </p>
            
            <div className="flex items-center justify-center space-x-4 text-sm text-primary-200">
              <span>Last updated: December 29, 2024</span>
              <span>•</span>
              <span>Effective: Immediately</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Points Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-display font-bold text-neutral-900 mb-4">
              Key Points Summary
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Here are the most important points from our terms of service
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {keyPoints.map((point, index) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card hover className="text-center h-full">
                  <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600 mb-6 mx-auto">
                    {point.icon}
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-3">
                    {point.title}
                  </h3>
                  <p className="text-neutral-600">
                    {point.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Terms Content Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <Badge variant="primary" className="mb-4">
                Full Terms
              </Badge>
              <h2 className="text-4xl font-display font-bold text-neutral-900 mb-6">
                Complete Terms of Service
              </h2>
              <p className="text-xl text-neutral-600">
                Please read through all sections carefully to understand your rights and responsibilities.
              </p>
            </motion.div>

            <div className="space-y-8">
              {sections.map((section, index) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="w-6 h-6 text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-neutral-900 mb-4">
                          {section.title}
                        </h3>
                        <p className="text-neutral-600 leading-relaxed">
                          {section.content}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Contact Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-16"
            >
              <Card className="bg-gradient-to-r from-primary-50 to-accent-50 border-primary-200">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                    Questions About These Terms?
                  </h3>
                  <p className="text-neutral-600 mb-6">
                    If you have any questions about these Terms of Service, please don't hesitate to contact us.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      variant="primary"
                      autoRefresh={true}
                      refreshDelay={1200}
                    >
                      Contact Legal Team
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                    <Button 
                      variant="outline"
                      autoRefresh={true}
                      refreshDelay={1000}
                    >
                      View Privacy Policy
                    </Button>
                  </div>
                </div>
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
              Now that you understand our terms, you can confidently book services on our platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="secondary" 
                size="lg" 
                className="w-full sm:w-auto"
                autoRefresh={true}
                refreshDelay={1200}
              >
                Browse Services
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary-600"
                autoRefresh={true}
                refreshDelay={1000}
              >
                Create Account
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Debug Info */}
      {process.env.NODE_ENV === 'development' && refreshCount > 0 && (
        <div className="fixed bottom-4 left-4 bg-neutral-800 text-white px-3 py-2 rounded-lg text-xs">
          Terms Refreshes: {refreshCount}
        </div>
      )}
    </div>
  );
}