import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, ArrowLeft } from "lucide-react";

export default function FitnessTrainerYoga({ setActive }) {
  return (
    <div className="min-h-screen bg-[#e2d7c1] text-[#1a1a1a] font-sans">

      {/* BACK BUTTON */}
      <button
        onClick={() => setActive(null)}
        className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg 
                   hover:bg-gray-800 transition m-6"
      >
        <ArrowLeft size={20} /> Back
      </button>

      {/* Header Section */}
      <section className="text-center px-6 md:px-20 py-16 bg-gradient-to-b from-amber-100 to-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Personal Fitness Trainer / Yoga Instructor 🧘‍♂️💪
        </h1>
        <p className="text-black text-lg max-w-3xl mx-auto leading-relaxed">
          Achieve your fitness goals with personalized workout or yoga sessions 
          at your home. Our certified trainers and yoga instructors help improve 
          strength, flexibility, posture, weight management, and overall wellness.
        </p>
      </section>

      {/* Details Section */}
      <section className="px-8 md:px-20 py-20 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-10 text-center">How It Works</h2>

        <div className="space-y-6">
          {[
            "We assess your fitness goals, health conditions, and preferred workout/yoga style.",
            "Customized one-on-one sessions for weight loss, strength training, flexibility, or relaxation yoga.",
            "Continuous progress tracking with guidance on diet, posture correction, and technique improvement.",
          ].map((text, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex items-start gap-4"
            >
              <CheckCircle className="text-purple-600 w-6 h-6 mt-1" />
              <p className="text-gray-700 text-lg">{text}</p>
            </motion.div>
          ))}
        </div>

        {/* Duration & Pricing */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <h3 className="text-2xl font-semibold mb-6 text-center">Service Details</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-center">
            <div>
              <p className="text-gray-600 font-medium">⏱ Session Duration</p>
              <p className="text-xl text-black mt-2">45 – 60 minutes</p>
            </div>
            <div>
              <p className="text-gray-600 font-medium">💰 Price</p>
              <p className="text-xl text-black mt-2">₹300 – ₹800 per session</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-black text-white py-20">
        <h2 className="text-3xl font-light mb-6">Ready to Start Your Fitness Journey?</h2>

        <a 
          href="/booking/p4"
          className="bg-purple-400 text-black px-8 py-3 text-lg rounded-xl hover:bg-purple-300 transition inline-block"
        >
          Book a Session
        </a>
      </section>

    </div>
  );
}
