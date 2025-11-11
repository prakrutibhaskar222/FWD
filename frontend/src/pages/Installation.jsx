import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react"; // optional, for icons

export default function Installation() {
  const services = [
    "Kitchen appliance installation (chimney, hob, dishwasher)",
    "Appliance installation (AC, geyser, oven, etc.)",
    "Bathroom fittings installation (geyser, taps, shower panels)",
    "Air conditioner installation / uninstallation",
    "CCTV camera installation",
    "Water purifier installation",
    "TV wall mounting",
    "Door / window / curtain installation",
    "Modular furniture assembly & installation",
    "Solar panel installation",
  ];

  return (
    <div className="min-h-screen bg-[#f9f8f6] text-[#1a1a1a] font-sans">
      {/* Hero Section */}
      <section className="text-center px-6 md:px-20 py-16 bg-gradient-to-b from-blue-100 to-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Installation Services 🏠
        </h1>
        <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
          Our trained professionals provide safe, efficient, and reliable
          installation services for your home and office. From kitchen
          appliances to smart electronics — we handle it all with precision.
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
              <CheckCircle className="text-blue-500 w-6 h-6 flex-shrink-0 mt-1" />
              <p className="text-gray-700 font-medium">{service}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-black text-white py-20">
        <h2 className="text-3xl font-light mb-6">
          Need an Installation Expert Today?
        </h2>
        <button className="bg-blue-400 text-black px-8 py-3 text-lg rounded-xl hover:bg-blue-300 transition">
          Book a Service
        </button>
      </section>
    </div>
  );
}
