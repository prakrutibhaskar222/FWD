import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function ApplianceInstallation() {
  return (
    <div className="min-h-screen bg-[#e2d7c1] text-[#1a1a1a] font-sans">      
      {/* Header Section */}
      <section className="text-center px-6 md:px-20 py-16 bg-gradient-to-b from-amber-100 to-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Appliance Installation ⚙️
        </h1>
        <p className="text-[#000000] text-lg max-w-3xl mx-auto leading-relaxed">
          From ACs to geysers to kitchen ovens, our trained professionals ensure fast, safe, and reliable installation with proper testing and setup.
        </p>
      </section>

      {/* Details Section */}
      <section className="px-8 md:px-20 py-20 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-10 text-center">How It Works</h2>
        <div className="space-y-6">
          {[
            "Certified technicians inspect the appliance type and installation requirements.",
            "All installations follow safety standards, ensuring secure mounting and proper connections.",
            "Post-installation testing and guidance on usage are provided for your convenience.",
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
              <p className="text-xl text-black mt-2">1–3 hours</p>
            </div>
            <div>
              <p className="text-gray-600 font-medium">💰 Price Range</p>
              <p className="text-xl text-black mt-2">₹800 – ₹2,500</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-gradient-to-r from-[#eac38c] to-[#e2ab34] text-black py-20">
        <h2 className="text-3xl font-light mb-6">Ready to Install Your Appliance?</h2>
        <Link to="/booking/a1">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-black text-white px-10 py-4 text-lg rounded-full hover:bg-gray-800 transition"
          >
            Book Appliance Installation
          </motion.button>
        </Link>
      </section>
    </div>
  );
}