import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

import H1 from "../subpages/HS/h1";
import H2 from "../subpages/HS/h2";
import H3 from "../subpages/HS/h3";
import H4 from "../subpages/HS/h4";
import H5 from "../subpages/HS/h5";
import H6 from "../subpages/HS/h6";
import H7 from "../subpages/HS/h7";
import H8 from "../subpages/HS/h8";
import H9 from "../subpages/HS/h9";

export default function HomeServices() {
  const [active, setActive] = useState(null);

  const services = [
    { text: "House painting & waterproofing", id: "h1" },
    { text: "Security guard services", id: "h2" },
    { text: "Landscape & gardening maintenance", id: "h3" },
    { text: "Electrical appliances cleaning", id: "h4" },
    { text: "Deep cleaning", id: "h5" },
    { text: "Bathroom cleaning", id: "h6" },
    { text: "Room cleaning", id: "h7" },
    { text: "New house organization", id: "h8" },
    { text: "Kitchen cleaning", id: "h9" },
  ];

  // Component switching
  if (active === "h1") return <H1 setActive={setActive} />;
  if (active === "h2") return <H2 setActive={setActive} />;
  if (active === "h3") return <H3 setActive={setActive} />;
  if (active === "h4") return <H4 setActive={setActive} />;
  if (active === "h5") return <H5 setActive={setActive} />;
  if (active === "h6") return <H6 setActive={setActive} />;
  if (active === "h7") return <H7 setActive={setActive} />;
  if (active === "h8") return <H8 setActive={setActive} />;
  if (active === "h9") return <H9 setActive={setActive} />;

  return (
    <div className="min-h-screen bg-[#f9f8f6] text-[#1a1a1a] font-sans">

      {/* Hero Section */}
      <section className="text-center px-6 md:px-20 py-16 bg-gradient-to-b from-green-100 to-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Home Services 🏡</h1>
        <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
          We provide complete home care solutions.
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
              <CheckCircle className="text-green-500 w-6 h-6 flex-shrink-0 mt-1" />
              <p className="text-gray-700 font-medium">{service.text}</p>
            </motion.div>
          ))}
        </div>

      </section>

      {/* CTA Section */}
      <section className="text-center bg-black text-white py-20">
        <h2 className="text-3xl font-light mb-6">Need Home Help?</h2>

        <a 
          href="/booking/homeservices"
          className="bg-green-400 text-black px-8 py-3 text-lg rounded-xl 
                     hover:bg-green-300 transition inline-block"
        >
          Book a Service
        </a>
      </section>

    </div>
  );
}
