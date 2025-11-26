import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Shop() {
  const [cart, setCart] = useState([]);

  const items = [
    { id: 1, name: "Electrical Services", price: 499, desc: "Safe wiring, appliance repair." },
    { id: 2, name: "Installation Services", price: 299, desc: "AC, TV, appliance installation." },
    { id: 3, name: "Home Services", price: 399, desc: "Cleaning, pest control." },
  ];

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  return (
    <div className="min-h-screen bg-[#f4efe9] px-8 py-16">
      <h1 className="text-5xl font-bold text-center mb-10">
        Shop Services ({cart.length})
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-semibold mb-2">{item.name}</h2>
            <p className="text-gray-600 mb-3">{item.desc}</p>
            <p className="font-bold text-lg mb-4">₹{item.price}</p>

            <button
              onClick={() => addToCart(item)}
              className="bg-black text-white px-5 py-2 rounded-xl hover:bg-gray-800 transition"
            >
              Add to Cart
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
