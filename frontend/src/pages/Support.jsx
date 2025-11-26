import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Support() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setError("Please fill all fields.");
      return;
    }

    // Simulated success
    setSuccess("Your message has been submitted successfully!");
    setForm({ name: "", email: "", message: "" });

    setTimeout(() => {
      setSuccess("");
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#f4efe9] px-8 py-16">
      <h1 className="text-5xl font-bold text-center mb-10">Support</h1>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">
          How can we help you?
        </h2>

        {error && (
          <p className="text-red-600 text-center mb-4 font-medium">{error}</p>
        )}

        {success && (
          <p className="text-green-600 text-center mb-4 font-medium">
            {success}
          </p>
        )}

        <div className="space-y-5">
          <input
            type="text"
            name="name"
            value={form.name}
            placeholder="Your Name"
            onChange={handleChange}
            className="w-full p-3 rounded-xl border"
          />

          <input
            type="email"
            name="email"
            value={form.email}
            placeholder="Your Email"
            onChange={handleChange}
            className="w-full p-3 rounded-xl border"
          />

          <textarea
            name="message"
            value={form.message}
            placeholder="Your Message"
            rows="4"
            onChange={handleChange}
            className="w-full p-3 rounded-xl border"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
          >
            Submit
          </button>
        </div>
      </motion.form>
    </div>
  );
}
