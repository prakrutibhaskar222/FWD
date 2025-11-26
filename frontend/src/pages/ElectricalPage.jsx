import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router";

export default function Electrical() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = "http://localhost:5001";

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${API}/api/services/category/electrical`);
      const json = await res.json();

      if (json.success) setServices(json.data);
      setLoading(false);
    };

    fetchData();
  }, []);

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

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {services.map((service) => (
              <Link
                key={service._id}
                to={`/service/${service._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                  className="cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-lg p-6 
                            flex items-start gap-3 border border-gray-100"
                >
                  <CheckCircle className="text-blue-500 w-6 h-6 flex-shrink-0 mt-1" />
                  <p className="text-gray-700 font-medium">{service.title}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
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
