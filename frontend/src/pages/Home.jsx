import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import Stats from "../components/Stats";

const API = "http://localhost:5001";

// STATIC BACKGROUND IMAGES (NO DATABASE NEEDED)
const categoryBackgrounds = {
  electrical:
    "https://img.freepik.com/free-vector/hand-drawn-job-cartoon-illustration_23-2151286062.jpg",
  installation:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4t03WoCAu2EevWnyX8tNcZkqSGZ53jav1ZQ&s",
  personal:
    "https://psychocare.biz/blog/wp-content/uploads/2025/07/What-is-wellness.jpeg",
  homeservices:
    "https://mobisoftinfotech.com/resources/wp-content/uploads/2018/08/Banner.png",
  renovation:
    "https://sourcinghardware.net/wp-content/uploads/2022/11/iStock-1384315807-2-scaled-1-1.jpg",

  // fallback image
  default:
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200"
};

export default function HomePage() {
  const [categories, setCategories] = useState([]);

    useEffect(() => {
      fetch(`${API}/api/categories`)
        .then((res) => res.json())
        .then((json) => {
          if (json.success) {
            // ✅ Sort categories alphabetically by name
            const sorted = json.data.sort((a, b) =>
              a.name.localeCompare(b.name)
            );
            setCategories(sorted);
          }
        });
    }, []);


  return (
    <div className="min-h-screen bg-[#f9f8f6] text-[#1a1a1a] font-sans">
      {/* Hero Section */}
      <section className="text-center px-6 md:px-20 py-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Home Services at Your Doorstep
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-10">
          Get expert professionals for all your home needs — safe, trusted, and
          quick.
        </p>
        <h2 className="text-3xl font-semibold mb-6">What are you looking for?</h2>
      </section>

      {/* Services Section */}
      <section className="px-8 md:px-20 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 justify-items-center">
          {categories.map((cat, index) => {
            const bg =
              categoryBackgrounds[cat.key] || categoryBackgrounds.default;

            return (
              <Link to={`/${cat.key}`} key={index} className="w-full">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl shadow hover:shadow-lg cursor-pointer transition h-56 w-full relative overflow-hidden"
                  style={{
                    backgroundImage: `url(${bg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                  }}
                >
                  <div className="absolute inset-0 bg-black/40"></div>

                  <div className="relative z-10 text-center text-white p-4 flex flex-col font-bold justify-center h-full">
                    <div className="text-4xl mb-2">{cat.icon || "🛠️"}</div>
                    <h3 className="text-lg font-semibold">{cat.name}</h3>
                    <p className="text-sm opacity-90">{cat.description}</p>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </section>

      <Stats />
    </div>
  );
}
