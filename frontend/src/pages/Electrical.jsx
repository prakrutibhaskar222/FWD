import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react"; // optional icons library

export default function Electrical() {
  const services = [
    "Electrical wiring (new installation or rewiring)",
    "Switchboard installation and repair",
    "Ceiling fan / exhaust fan installation",
    "Lighting installation (indoor, outdoor, decorative)",
    "Inverter and UPS setup",
    "Circuit breaker & fuse replacement",
    "Electrical panel maintenance",
    "Earthing & surge protection",
    "Home automation & smart lighting setup",
  ];

  return (
    <div className="min-h-screen bg-[#f9f8f6] text-[#1a1a1a] font-sans">
      {/* Hero Section */}
      <section className="text-center px-6 md:px-20 py-16 bg-gradient-to-b from-amber-100 to-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Electrical Services ⚡</h1>
        <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
          Our certified electricians deliver safe, reliable, and efficient electrical
          solutions for homes, offices, and commercial spaces. From wiring to smart home
          automation — we’ve got you covered.
        </p>
      </section>

      {/* Service List Section */}
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
              <CheckCircle className="text-amber-500 w-6 h-6 flex-shrink-0 mt-1" />
              <p className="text-gray-700 font-medium">{service}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-black text-white py-20">
        <h2 className="text-3xl font-light mb-6">Need an Electrician Today?</h2>
        <button className="bg-amber-400 text-black px-8 py-3 text-lg rounded-xl hover:bg-amber-300 transition">
          Book a Service
        </button>
      </section>
    </div>
  );
}
