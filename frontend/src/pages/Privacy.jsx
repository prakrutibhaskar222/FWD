import { motion } from "framer-motion";
import { Shield, Lock, Eye, Database, UserCheck, ArrowRight } from "lucide-react";
import { Button, Card, Badge } from "../components/ui";
import { useAutoRefresh } from "../hooks/useAutoRefresh";

export default function Privacy() {
  // Auto-refresh functionality
  const refreshPrivacyData = async (source = 'manual') => {
    console.log(`Privacy page refreshed from ${source}`);
  };

  const { isRefreshing, refreshCount } = useAutoRefresh(
    refreshPrivacyData,
    {
      enabled: true,
      onButtonClick: true,
      debounceMs: 1000,
    }
  );

  const principles = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Data Protection",
      description: "We use industry-standard security measures to protect your personal information",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Secure Storage",
      description: "All data is encrypted and stored securely with regular security audits",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Transparency",
      description: "We're transparent about what data we collect and how we use it",
      color: "from-purple-500 to-indigo-600"
    },
    {
      icon: <UserCheck className="w-8 h-8" />,
      title: "Your Control",
      description: "You have full control over your data and can request deletion anytime",
      color: "from-orange-500 to-red-600"
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
              Privacy & Security
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
              Privacy
              <span className="block text-accent-300">Policy</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-100 mb-8 leading-relaxed">
              Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
            </p>
            
            <div className="flex items-center justify-center space-x-4 text-sm text-primary-200">
              <span>Last updated: December 29, 2024</span>
              <span>•</span>
              <span>Effective: Immediately</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Privacy Principles */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge variant="primary" className="mb-4">
              Our Commitment
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-6">
              Privacy Principles
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              We are committed to protecting your privacy and ensuring your data is handled responsibly.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card hover className="text-center h-full">
                  <div className={`w-16 h-16 bg-gradient-to-r ${principle.color} rounded-2xl flex items-center justify-center text-white mb-6 mx-auto`}>
                    {principle.icon}
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-3">
                    {principle.title}
                  </h3>
                  <p className="text-neutral-600">
                    {principle.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-20 bg-neutral-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {/* Information We Collect */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Database className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                        Information We Collect
                      </h3>
                      <div className="space-y-4 text-neutral-600">
                        <p><strong>Personal Information:</strong> Name, email address, phone number, and address when you create an account or book services.</p>
                        <p><strong>Payment Information:</strong> Credit card details and billing information processed securely through our payment partners.</p>
                        <p><strong>Service Information:</strong> Details about services booked, preferences, and service history.</p>
                        <p><strong>Usage Data:</strong> How you interact with our platform, including pages visited and features used.</p>
                        <p><strong>Device Information:</strong> IP address, browser type, device type, and operating system.</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* How We Use Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <UserCheck className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                        How We Use Your Information
                      </h3>
                      <div className="space-y-4 text-neutral-600">
                        <p><strong>Service Delivery:</strong> To connect you with service professionals and facilitate bookings.</p>
                        <p><strong>Communication:</strong> To send booking confirmations, updates, and customer support.</p>
                        <p><strong>Payment Processing:</strong> To process payments and manage billing.</p>
                        <p><strong>Platform Improvement:</strong> To analyze usage patterns and improve our services.</p>
                        <p><strong>Marketing:</strong> To send promotional offers and updates (with your consent).</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Data Sharing */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                        Information Sharing
                      </h3>
                      <div className="space-y-4 text-neutral-600">
                        <p><strong>Service Professionals:</strong> We share necessary contact and service details with professionals to complete your bookings.</p>
                        <p><strong>Payment Processors:</strong> Payment information is shared with secure payment partners for transaction processing.</p>
                        <p><strong>Legal Requirements:</strong> We may disclose information when required by law or to protect our rights.</p>
                        <p><strong>Business Transfers:</strong> Information may be transferred in case of merger, acquisition, or sale of assets.</p>
                        <p><strong>Third-Party Services:</strong> We use trusted third-party services for analytics, marketing, and customer support.</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Your Rights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Lock className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                        Your Rights and Choices
                      </h3>
                      <div className="space-y-4 text-neutral-600">
                        <p><strong>Access:</strong> You can request access to your personal information we hold.</p>
                        <p><strong>Correction:</strong> You can update or correct your personal information through your account settings.</p>
                        <p><strong>Deletion:</strong> You can request deletion of your account and personal information.</p>
                        <p><strong>Opt-out:</strong> You can unsubscribe from marketing communications at any time.</p>
                        <p><strong>Data Portability:</strong> You can request a copy of your data in a portable format.</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
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
                    Questions About Your Privacy?
                  </h3>
                  <p className="text-neutral-600 mb-6">
                    If you have any questions about this Privacy Policy or how we handle your data, please contact us.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      variant="primary"
                      autoRefresh={true}
                      refreshDelay={1200}
                    >
                      Contact Privacy Team
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                    <Button 
                      variant="outline"
                      autoRefresh={true}
                      refreshDelay={1000}
                    >
                      Manage Data Settings
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
              Your Privacy is Protected
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              With robust privacy protections in place, you can confidently use our platform for all your home service needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="secondary" 
                size="lg" 
                className="w-full sm:w-auto"
                autoRefresh={true}
                refreshDelay={1200}
              >
                Start Using COOLIE
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary-600"
                autoRefresh={true}
                refreshDelay={1000}
              >
                View Terms of Service
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Debug Info */}
      {process.env.NODE_ENV === 'development' && refreshCount > 0 && (
        <div className="fixed bottom-4 left-4 bg-neutral-800 text-white px-3 py-2 rounded-lg text-xs">
          Privacy Refreshes: {refreshCount}
        </div>
      )}
    </div>
  );
}