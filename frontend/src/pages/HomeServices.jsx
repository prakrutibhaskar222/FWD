import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react"; // optional for icons
import { Link } from "react-router";

export default function HomeServices() {
  const services = [
    "House painting & waterproofing",
    "Security guard services",
    "Landscape & gardening maintenance",
    "Electrical appliances cleaning",
    "Deep cleaning",
    "Bathroom cleaning",
    "Room cleaning",
    "New house organization",
    "Kitchen cleaning",
  ];

  return (
    <div className="min-h-screen bg-[#f9f8f6] text-[#1a1a1a] font-sans">
      {/* Hero Section */}
      <section className="text-center px-6 md:px-20 py-16 bg-gradient-to-b from-green-100 to-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Home Services 🏡
        </h1>
        <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
          We provide complete home care solutions — from deep cleaning to painting, 
          gardening, and maintenance. Trusted professionals who make your home shine 
          inside and out.
        </p>
      </section>

      {/* Services List Section */}
      <section className="px-8 md:px-20 py-16">
        <h2 className="text-3xl font-semibold mb-10 text-center">We Provide</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg p-6 flex items-start gap-3 border border-gray-100"
            >
              <CheckCircle className="text-green-500 w-6 h-6 flex-shrink-0 mt-1" />
              <p className="text-gray-700 font-medium">{service}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-black text-white py-20">
        <h2 className="text-3xl font-light mb-6">
          Need Trusted Professionals for Your Home?
        </h2>
        <button className="bg-green-400 text-black px-8 py-3 text-lg rounded-xl hover:bg-green-300 transition">
          <Link to="/booking/homeservices">
            Book a Service
          </Link>
        </button>
      </section>
    </div>
  );
}
