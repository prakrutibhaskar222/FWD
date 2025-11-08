import React from "react";
import { motion } from "framer-motion";

export default function PremiumLanding() {
  return (
    <div className="min-h-screen bg-[#f4efe9] text-[#000000] font-sans px-8 py-10">
      

      {/* Hero Section */}
      <section className="text-center mb-14">
        <h1 className="text-6xl md:text-8xl font-light tracking-tight uppercase">
          Premium Quality
        </h1>
        <p className="mt-6 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          With a legacy built on precision and quality, we remain committed to showcasing the know‑how of premium service craftsmanship.
        </p>
      </section>

      {/* Images Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <motion.div whileHover={{ scale: 1.03 }} className="space-y-2">
          <img src="https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800" alt="Service 1" className="rounded-xl shadow-md" />
          <p className="text-sm">We understand that true quality isn’t just about service — it's about care.</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.03 }} className="space-y-2 md:translate-y-10">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800" alt="Service 2" className="rounded-xl shadow-md" />
          <p className="text-sm">Crafted for those who appreciate fine service and luxury experience.</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.03 }} className="space-y-2">
          <img src="https://images.unsplash.com/photo-1560448075-bb4bfcf7cde7?w=800" alt="Service 3" className="rounded-xl shadow-md" />
          <p className="text-sm">Designed with elegance, executed with professionalism.</p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm pt-10 border-t border-gray-300">
        <div className="space-y-2">
          <h4 className="font-semibold uppercase text-xs">Navigation</h4>
          <p>Shop</p>
          <p>Legacy</p>
          <p>Support</p>
        </div>
        <div className="space-y-2">
          <h4 className="font-semibold uppercase text-xs">Services</h4>
          <p>Home Cleaning</p>
          <p>Salon & Grooming</p>
          <p>Repair & Maintenance</p>
        </div>
        <div className="space-y-2">
          <h4 className="font-semibold uppercase text-xs">Contact</h4>
          <p>Email</p>
          <p>Store</p>
          <p>FAQ</p>
        </div>
        <div className="space-y-2 text-xs opacity-80">
          <p>© Urban Premium 2025</p>
          <p>Made in India</p>
        </div>
      </footer>
    </div>
  );
}
