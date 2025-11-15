import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react"; // optional icon library
import { Link } from "react-router";

export default function Personal() {
  const services = [
    "Home cleaning & sanitization",
    "Pest control",
    "Laundry & dry cleaning pickup",
    "Personal fitness trainer / yoga instructor",
    "Babysitting or elderly care services",
    "Personal driver / chauffeur service",
  ];

  return (
    <div className="min-h-screen bg-[#f9f8f6] text-[#1a1a1a] font-sans">
      {/* Hero Section */}
      <section className="text-center px-6 md:px-20 py-16 bg-gradient-to-b from-pink-100 to-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Personal Services 👤
        </h1>
        <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
          From home cleaning to wellness, we bring trusted personal care and convenience right to your doorstep.  
          Professional, safe, and reliable services for your everyday needs.
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
              <CheckCircle className="text-pink-500 w-6 h-6 flex-shrink-0 mt-1" />
              <p className="text-gray-700 font-medium">{service}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-black text-white py-20">
        <h2 className="text-3xl font-light mb-6">
          Need Personal Help or Wellness Support?
        </h2>
        <button className="bg-pink-400 text-black px-8 py-3 text-lg rounded-xl hover:bg-pink-300 transition">
          <Link to="/booking/personal">
            Book a Service
          </Link>
        </button>
      </section>
    </div>
  );
}
