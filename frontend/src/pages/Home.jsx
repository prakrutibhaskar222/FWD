import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import Stats from "../components/Stats";

const services = [
  {
    name: "Electrical",
    icon: "⚡",
    desc: "Professional electricians for repairs, wiring & lighting.",
    bg: "https://img.freepik.com/free-vector/hand-drawn-job-cartoon-illustration_23-2151286062.jpg?semt=ais_hybrid&w=740&q=80",
    link: "/electrical",
  },
  {
    name: "Installation",
    icon: "🧰",
    desc: "Quick and reliable appliance & fixture installations.",
    bg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4t03WoCAu2EevWnyX8tNcZkqSGZ53jav1ZQ&s",
    link: "/installation",
  },
  {
    name: "Personal",
    icon: "💆‍♀️",
    desc: "Lifestyle and wellness services at your doorstep.",
    bg: "https://psychocare.biz/blog/wp-content/uploads/2025/07/What-is-wellness.jpeg",
    link: "/personal",
  },
  {
    name: "Home Services",
    icon: "🏠",
    desc: "Cleaning, pest control & home maintenance experts.",
    bg: "https://mobisoftinfotech.com/resources/wp-content/uploads/2018/08/Banner.png",
    link: "/homeservices",
  },
  {
    name: "Renovation",
    icon: "🎨",
    desc: "Painting, carpentry & full home makeover solutions.",
    bg: "https://sourcinghardware.net/wp-content/uploads/2022/11/iStock-1384315807-2-scaled-1-1.jpg",
    link: "/renovation",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f9f8f6] text-[#1a1a1a] font-sans">
    

      {/* Hero Section */}
      <section className="text-center px-6 md:px-20 py-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Home Services at Your Doorstep
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-10">
          Get expert professionals for all your home needs — safe, trusted, and quick.
        </p>
        <h2 className="text-3xl font-semibold mb-6">What are you looking for?</h2>
      </section>

      

      {/* Services Section */}
      <section className="px-8 md:px-20 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 justify-items-center">
          {services.map((service, index) => (
            <Link to={service.link} key={index} className="w-full">
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl shadow hover:shadow-lg cursor-pointer transition h-56 w-full relative overflow-hidden"
              style={{
                backgroundImage: service.bg ? `url(${service.bg})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black/40"></div>

              <div className="relative z-10 text-center text-[#ffffff] p-4 flex font-bold flex-col justify-center h-full">
                <div className="text-4xl mb-2">{service.icon}</div>
                <h3 className="text-lg font-semibold">{service.name}</h3>
                <p className="text-sm">{service.desc}</p>
              </div>
            </motion.div>
            </Link>
          ))}
        </div>
      </section>

      <Stats />
    </div>

  
  );
}
