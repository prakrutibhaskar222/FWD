import React from "react";
import { Link } from "react-router"; 
import { motion } from "framer-motion";
import { Wrench, Zap } from "lucide-react"; // Using Wrench for repair feel, and Zap for electric feel

export default function SwitchboardInstallation() {
  return (
    <div className="min-h-screen bg-[#c1e2d7] text-[#1a1a1a] font-sans">
      
      {/* Header Section */}
      <section className="text-center px-6 md:px-20 py-16 bg-gradient-to-b from-green-100 to-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Switchboard Installation & Repair ⚡
        </h1>
        <p className="text-[#000000] text-lg max-w-3xl mx-auto leading-relaxed">
          From fixing tripping breakers to complete distribution board upgrades, we ensure the heart of your home's electrical system is safe and fully functional.
        </p>
      </section>

      ---

      {/* Details Section */}
      <section className="px-8 md:px-20 py-20 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-10 text-center">Our Process for Switchboards</h2>
        <div className="space-y-6">
          {[
            "We diagnose issues like short circuits, loose connections, or breaker problems immediately.",
            "Installation of new switchboards adheres to current safety codes and load requirements.",
            "All components (MCBs, RCCBs) are checked for proper ratings and secure fitting.",
            "Clear labeling and final operational testing are performed before job completion.",
          ].map((text, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex items-start gap-4"
            >
              <Zap className="text-[#0e9851] w-6 h-6 mt-1" /> {/* Green check/zap icon */}
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
              {/* Changed Duration */}
              <p className="text-xl text-black mt-2">45 mins – 3 hours</p> 
            </div>
            <div>
              <p className="text-gray-600 font-medium">💰 Price Range</p>
              {/* Changed Price */}
              <p className="text-xl text-black mt-2">₹499 – ₹2,500</p> 
            </div>
          </div>
        </div>
      </section>

      ---

      {/* CTA Section */}
      <section className="text-center bg-gradient-to-r from-[#8eca9a] to-[#a2daad] text-black py-20"> {/* Blue/cyan gradient */}
        <h2 className="text-3xl font-light mb-6">Need Your Switchboard Inspected or Fixed?</h2>
        <Link to="/booking/e2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-black text-white px-10 py-4 text-lg rounded-full hover:bg-gray-800 transition"
          >
            Book Switchboard Service
          </motion.button>
        </Link>
      </section>
    </div>
  );
}