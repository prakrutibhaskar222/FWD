import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Legacy() {
  const [open, setOpen] = useState(null);

  const sections = [
    { title: "Our Mission", text: "To redefine modern home services with trust, speed, and quality." },
    { title: "Our Journey", text: "We have grown from a small provider to a full-scale premium services platform." },
    { title: "Our Promise", text: "Certified experts, transparent pricing, and dependable customer support." },
  ];

  return (
    <div className="min-h-screen bg-[#f4efe9] px-8 py-16">
      <h1 className="text-5xl font-bold text-center mb-10">Our Legacy</h1>

      <div className="max-w-3xl mx-auto space-y-6">
        {sections.map((sec, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <h2 className="text-2xl font-semibold">{sec.title}</h2>

            <AnimatePresence>
              {open === i && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-gray-700 mt-3"
                >
                  {sec.text}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
