import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function CCTVInstallation() {
  return (
    <div className="min-h-screen bg-[#e2d7c1] text-[#1a1a1a] font-sans">
      
      {/* Header Section */}
      <section className="text-center px-6 md:px-20 py-16 bg-gradient-to-b from-amber-100 to-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          CCTV Camera Installation 📹
        </h1>
        <p className="text-[#000000] text-lg max-w-3xl mx-auto leading-relaxed">
          Secure your home or office with professional CCTV camera installation.
          Our trained technicians ensure proper placement, wiring, configuration,
          and testing for maximum coverage and clarity.
        </p>
      </section>

      {/* Details Section */}
      <section className="px-8 md:px-20 py-20 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-10 text-center">How It Works</h2>
        <div className="space-y-6">
          {[
            "A trained technician inspects your property and identifies optimal camera locations.",
            "Cameras are mounted securely with proper wiring, power management, and connectivity.",
            "System testing, DVR/NVR setup, and mobile app configuration are completed for seamless monitoring.",
          ].map((text, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex items-start gap-4"
            >
              <CheckCircle className="text-[#e10e0e] w-6 h-6 mt-1" />
              <p className="text-gray-700 text-lg">{text}</p>
            </motion.div>
          ))}
        </div>

        {/* Duration & Pricing */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <h3 className="text-2xl font-semibold mb-6 text-center">Service Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-center">
            <div>
              <p className="text-gray-600 font-medium">⏱ Estimated Duration</p>
              <p className="text-xl text-black mt-2">2–5 hours</p>
            </div>
            <div>
              <p className="text-gray-600 font-medium">💰 Price Range</p>
              <p className="text-xl text-black mt-2">₹1,200 – ₹6,000</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-gradient-to-r from-[#eac38c] to-[#e2ab34] text-black py-20">
        <h2 className="text-3xl font-light mb-6">Ready to Secure Your Property?</h2>
        <Link to="/booking/cctv1">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-black text-white px-10 py-4 text-lg rounded-full hover:bg-gray-800 transition"
          >
            Book CCTV Installation
          </motion.button>
        </Link>
      </section>
    </div>
  );
}