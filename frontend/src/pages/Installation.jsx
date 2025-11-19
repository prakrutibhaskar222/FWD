import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

import I1 from "../subpages/install/i1";
import I2 from "../subpages/install/i2";
import I3 from "../subpages/install/i3";
import I4 from "../subpages/install/i4";
import I5 from "../subpages/install/i5";
import I6 from "../subpages/install/i6";
import I7 from "../subpages/install/i7";
import I8 from "../subpages/install/i8";
import I9 from "../subpages/install/i9";
import I10 from "../subpages/install/i10";

export default function Installation() {
  const [active, setActive] = useState(null);

  const services = [
    { text: "Kitchen appliance installation (chimney, hob, dishwasher)", id: "i1" },
    { text: "Appliance installation (AC, geyser, oven, etc.)", id: "i2" },
    { text: "Bathroom fittings installation (geyser, taps, shower panels)", id: "i3" },
    { text: "Air conditioner installation / uninstallation", id: "i4" },
    { text: "CCTV camera installation", id: "i5" },
    { text: "Water purifier installation", id: "i6" },
    { text: "TV wall mounting", id: "i7" },
    { text: "Door / window / curtain installation", id: "i8" },
    { text: "Modular furniture assembly & installation", id: "i9" },
    { text: "Solar panel installation", id: "i10" },
  ];

  // Page switching logic
  if (active === "i1") return <I1 setActive={setActive} />;
  if (active === "i2") return <I2 setActive={setActive} />;
  if (active === "i3") return <I3 setActive={setActive} />;
  if (active === "i4") return <I4 setActive={setActive} />;
  if (active === "i5") return <I5 setActive={setActive} />;
  if (active === "i6") return <I6 setActive={setActive} />;
  if (active === "i7") return <I7 setActive={setActive} />;
  if (active === "i8") return <I8 setActive={setActive} />;
  if (active === "i9") return <I9 setActive={setActive} />;
  if (active === "i10") return <I10 setActive={setActive} />;

  return (
    <div className="min-h-screen bg-[#f9f8f6] text-[#1a1a1a] font-sans">

      {/* Hero Section */}
      <section className="text-center px-6 md:px-20 py-16 bg-gradient-to-b from-blue-100 to-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Installation Services 🏠</h1>
        <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
          Our trained professionals provide safe, efficient installation services for your home and office.
        </p>
      </section>

      {/* Services List */}
      <section className="px-8 md:px-20 py-16">
        <h2 className="text-3xl font-semibold mb-10 text-center">We Provide</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg p-6 
                         flex items-start gap-3 border border-gray-100 cursor-pointer"
              onClick={() => setActive(service.id)}
            >
              <CheckCircle className="text-blue-500 w-6 h-6 flex-shrink-0 mt-1" />
              <p className="text-gray-700 font-medium">{service.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center bg-black text-white py-20">
        <h2 className="text-3xl font-light mb-6">Need an Installation Expert Today?</h2>

        <a
          href="/booking/installation"
          className="bg-blue-400 text-black px-8 py-3 text-lg rounded-xl hover:bg-blue-300 transition inline-block"
        >
          Book a Service
        </a>
      </section>
    </div>
  );
}
