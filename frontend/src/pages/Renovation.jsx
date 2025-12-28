import React, { useEffect, useState } from "react";
import api from "../api";
import ServiceCard from "../components/ServiceCard";

export default function Renovation() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);



  const API = "http://localhost:5001";

useEffect(() => {
  const fetchData = async () => {
    try {
      // 1️⃣ Fetch electrical services
      const res = await fetch(`${API}/api/services/category/renovation`);
      const json = await res.json();

      if (json.success) {
        setServices(json.data);
      }

      // 2️⃣ Fetch favorites ONLY if logged in
      if (localStorage.getItem("token")) {
        const profileRes = await api.get("/api/profile");
        const favIds = profileRes.data.data.favorites.map((f) => f._id);
        setFavorites(favIds);
      }

    } catch (err) {
      console.error("Page load error:", err);
      setFavorites([]); // safe fallback
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);



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

      {/* SERVICES */}
      <section className="px-8 md:px-20 py-16">
        <h2 className="text-3xl font-semibold mb-10 text-center">We Provide</h2>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="grid grid-cols-2 gap-15">
            {services.map((service) => (
              <ServiceCard
                key={service._id}
                service={service}
                favorites={favorites}
                setFavorites={setFavorites}
              />
            ))}
          </div>
        )}
      </section>


    </div>
  );
}
