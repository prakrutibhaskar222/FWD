import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

import R1 from "../subpages/renovation/r1";
import R2 from "../subpages/renovation/r2";
import R3 from "../subpages/renovation/r3";
import R4 from "../subpages/renovation/r4";
import R5 from "../subpages/renovation/r5";
import R6 from "../subpages/renovation/r6";
import R7 from "../subpages/renovation/r7";
import R8 from "../subpages/renovation/r8";
import R9 from "../subpages/renovation/r9";

export default function Renovation() {
  const [active, setActive] = useState(null);

  const services = [
    { text: "Civil renovation (walls, floors, tiles, ceilings)", id: "r1" },
    { text: "Bathroom & kitchen remodeling", id: "r2" },
    { text: "False ceiling design & installation", id: "r3" },
    { text: "Wall plastering & painting", id: "r4" },
    { text: "Carpentry & woodwork renovation", id: "r5" },
    { text: "Flooring replacement (tiles, marble, laminate)", id: "r6" },
    { text: "Space redesign / partitioning", id: "r7" },
    { text: "Masonry & waterproofing works", id: "r8" },
    { text: "Interior lighting revamp", id: "r9" },
  ];

  // Switching pages
  if (active === "r1") return <R1 setActive={setActive} />;
  if (active === "r2") return <R2 setActive={setActive} />;
  if (active === "r3") return <R3 setActive={setActive} />;
  if (active === "r4") return <R4 setActive={setActive} />;
  if (active === "r5") return <R5 setActive={setActive} />;
  if (active === "r6") return <R6 setActive={setActive} />;
  if (active === "r7") return <R7 setActive={setActive} />;
  if (active === "r8") return <R8 setActive={setActive} />;
  if (active === "r9") return <R9 setActive={setActive} />;

  return (
    <div className="min-h-screen bg-[#f9f8f6] text-[#1a1a1a] font-sans">

      {/* Hero Section */}
      <section className="text-center px-6 md:px-20 py-16 bg-gradient-to-b from-amber-100 to-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Renovation Services 🎨
        </h1>
        <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
          Transform your home or workspace with our expert renovation and remodeling solutions.
          From flooring to false ceilings, we handle every detail to bring your vision to life.
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
              onClick={() => setActive(service.id)}
              className="cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-lg p-6 
                         flex items-start gap-3 border border-gray-100"
            >
              <CheckCircle className="text-amber-500 w-6 h-6 flex-shrink-0 mt-1" />
              <p className="text-gray-700 font-medium">{service.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center bg-black text-white py-20">
        <h2 className="text-3xl font-light mb-6">Ready to Renovate?</h2>

        <a 
          href="/booking/renovation"
          className="bg-amber-400 text-black px-8 py-3 text-lg rounded-xl hover:bg-amber-300 transition inline-block"
        >
          Book a Renovation Service
        </a>
      </section>
    </div>
  );
}
