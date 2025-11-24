import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

import P1 from "../subpages/personal/p1";
import P2 from "../subpages/personal/p2";
import P3 from "../subpages/personal/p3";
import P4 from "../subpages/personal/p4";
import P5 from "../subpages/personal/p5";
import P6 from "../subpages/personal/p6";

export default function Personal() {
  const [active, setActive] = useState(null);

  const services = [
    { text: "Home cleaning & sanitization", id: "p1" },
    { text: "Pest control", id: "p2" },
    { text: "Laundry & dry cleaning pickup", id: "p3" },
    { text: "Personal fitness trainer / yoga instructor", id: "p4" },
    { text: "Babysitting or elderly care services", id: "p5" },
    { text: "Personal driver / chauffeur service", id: "p6" },
  ];

  if (active === "p1") return <P1 setActive={setActive} />;
  if (active === "p2") return <P2 setActive={setActive} />;
  if (active === "p3") return <P3 setActive={setActive} />;
  if (active === "p4") return <P4 setActive={setActive} />;
  if (active === "p5") return <P5 setActive={setActive} />;
  if (active === "p6") return <P6 setActive={setActive} />;

  return (
    <div className="min-h-screen bg-[#f9f8f6] text-[#1a1a1a] font-sans">

      {/* Hero Section */}
      <section className="text-center px-6 md:px-20 py-16 bg-gradient-to-b from-pink-100 to-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Personal Services 👤
        </h1>
        <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
          From home cleaning to wellness, we bring trusted personal care and convenience to your doorstep.
        </p>
      </section>

      {/* Services List */}
      <section className="px-8 md:px-20 py-16">
        <h2 className="text-3xl font-semibold mb-10 text-center">We Provide</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              onClick={() => setActive(service.id)}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-lg p-6 
                         flex items-start gap-3 border border-gray-100"
            >
              <CheckCircle className="text-pink-500 w-6 h-6 flex-shrink-0 mt-1" />
              <p className="text-gray-700 font-medium">{service.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-black text-white py-20">
        <h2 className="text-3xl font-light mb-6">
          Need Personal Help or Wellness Support?
        </h2>

        <a 
          href="/booking/personal"
          className="bg-pink-400 text-black px-8 py-3 text-lg rounded-xl 
                     hover:bg-pink-300 transition inline-block"
        >
          Book a Service
        </a>
      </section>
    </div>
  );
}
