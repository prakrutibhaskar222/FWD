import React from "react";
import { Link } from "react-router"; 
import { motion } from "framer-motion";
import { Wind, Wrench } from "lucide-react";

export default function FanInstallation() {
  return (
    <div className="min-h-screen bg-[#c1d7e2] text-[#1a1a1a] font-sans">
      
      {/* Header Section */}
      <section className="text-center px-6 md:px-20 py-16 bg-gradient-to-b from-yellow-100 to-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Fan Installation & Repair 🌬️
        </h1>
        <p className="text-[#000000] text-lg max-w-3xl mx-auto leading-relaxed">
          Professional installation and repair for ceiling fans and exhaust fans to ensure optimal air circulation and silent operation in your home or office.
        </p>
      </section>

      ---

      {/* Details Section */}
      <section className="px-8 md:px-20 py-20 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-10 text-center">Our Fan Service Procedure</h2>
        <div className="space-y-6">
          {[
            "We handle assembly, secure hanging, and safe electrical connection for all ceiling fans.",
            "Specialized installation for exhaust fans in bathrooms or kitchens with proper ventilation consideration.",
            "Repair services cover wobbling, noise issues, speed regulator replacement, and motor problems.",
            "Thorough testing of speed settings and fan stability is performed post-installation.",
          ].map((text, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex items-start gap-4"
            >
              <Wind className="text-[#e29334] w-6 h-6 mt-1" /> {/* Orange/yellow icon */}
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
              {/* Changed Duration for single fan service */}
              <p className="text-xl text-black mt-2">30 mins – 1.5 hours (Per Fan)</p> 
            </div>
            <div>
              <p className="text-gray-600 font-medium">💰 Price Range</p>
              {/* Changed Price */}
              <p className="text-xl text-black mt-2">₹349 – ₹899</p> 
            </div>
          </div>
        </div>
      </section>

      ---

      {/* CTA Section */}
      <section className="text-center bg-gradient-to-r from-[#eac38c] to-[#e2a034] text-black py-20"> {/* Warm orange gradient */}
        <h2 className="text-3xl font-light mb-6">Cool Your Space or Improve Ventilation!</h2>
        <Link to="/booking/e3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-black text-white px-10 py-4 text-lg rounded-full hover:bg-gray-800 transition"
          >
            Book Fan Installation Service
          </motion.button>
        </Link>
      </section>
    </div>
  );
}