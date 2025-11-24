import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import E1 from "../subpages/electrical/E1";
import E2 from "../subpages/electrical/E2";
import E3 from "../subpages/electrical/E3";
import E4 from "../subpages/electrical/E4";
import E5 from "../subpages/electrical/E5";
import E6 from "../subpages/electrical/E6";
import E7 from "../subpages/electrical/E7";
import E8 from "../subpages/electrical/E8";
import E9 from "../subpages/electrical/E9";

export default function Electrical() {
  const [active, setActive] = useState(null);

  const services = [
    { text: "Electrical wiring (new installation or rewiring)", id: "e1" },
    { text: "Switchboard installation and repair", id: "e2" },
    { text: "Ceiling fan / exhaust fan installation", id: "e3" },
    { text: "Lighting installation", id: "e4" },
    { text: "Inverter and UPS setup", id: "e5" },
    { text: "Circuit breaker & fuse replacement", id: "e6" },
    { text: "Electrical panel maintenance", id: "e7" },
    { text: "Earthing & surge protection", id: "e8" },
    { text: "Home automation", id: "e9" },
  ];

  // Component switching
  if (active === "e1") return <E1 setActive={setActive} />;
  if (active === "e2") return <E2 setActive={setActive} />;
  if (active === "e3") return <E3 setActive={setActive} />;
  if (active === "e4") return <E4 setActive={setActive} />;
  if (active === "e5") return <E5 setActive={setActive} />;
  if (active === "e6") return <E6 setActive={setActive} />;
  if (active === "e7") return <E7 setActive={setActive} />;
  if (active === "e8") return <E8 setActive={setActive} />;
  if (active === "e9") return <E9 setActive={setActive} />;

  return (
    <div className="min-h-screen bg-[#f9f8f6] text-[#1a1a1a] font-sans">

      {/* HERO */}
      <section className="text-center px-6 md:px-20 py-16 bg-gradient-to-b from-blue-100 to-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Electrical Services 🏠</h1>
        <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
          Our trained professionals provide safe, efficient electrical services.
        </p>
      </section>

      {/* SERVICES */}
      <section className="px-8 md:px-20 py-16">
        <h2 className="text-3xl font-semibold mb-10 text-center">We Provide</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-lg p-6 
                         flex items-start gap-3 border border-gray-100"
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
        <h2 className="text-3xl font-light mb-6">Need an Electrical Expert Today?</h2>

        <a 
          href="/booking/electrical"
          className="bg-blue-400 text-black px-8 py-3 text-lg rounded-xl hover:bg-blue-300 transition inline-block"
        >
          Book a Service
        </a>
      </section>

    </div>
  );
}
