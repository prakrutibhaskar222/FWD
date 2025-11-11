import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, Button } from "@mui/material";
import { Wrench, User, Home, Paintbrush } from "lucide-react";
import { Link } from "react-router"; 

export default function Landing() {
  const services = [
    {
      title: "Electrical ",
      description: "Certified electricians for safe wiring, lighting, and appliance repairs.",
      icon: <Wrench className="w-10 h-10 mb-4" />,
    },
    {
      title: "Installation",
      description: "Reliable experts for appliance, fixture, and equipment installations.",
      icon: <Wrench className="w-10 h-10 mb-4" />,
    },
    {
      title: "Personal Services",
      description: "Premium lifestyle and wellness experiences in the comfort of your home..",
      icon: <User className="w-10 h-10 mb-4" />,
    },
    {
      title: "Home Services",
      description: "Reliable home maintenance, pest control, and deep cleaning services.",
      icon: <Home className="w-10 h-10 mb-4" />,
    },
    {
      title: "Renovation",
      description: "Transform your space with interior design and full home renovation experts.",
      icon: <Paintbrush className="w-10 h-10 mb-4" />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f4efe9] text-[#000000] font-sans px-8 py-10">
      {/* Hero Section */}
      <section className="text-center mb-14">
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight uppercase">
          <span className="bg-white text-black px-6 py-3 rounded-xl shadow-lg drop-shadow-[3px_3px_6px_rgba(0,0,0,0.5)] inline-block">
            Premium Services
            <p className="mt-4 text-base md:text-lg font-normal text-black max-w-3xl mx-auto leading-relaxed tracking-normal">
          One-stop destination for ALL services — trusted professionals, quick bookings, and guaranteed satisfaction.
        </p>
          </span>
        </h1>
        
      </section>

      {/* Services Section */}
      <section className="py-20 px-6 md:px-16">
        <h2 className="text-4xl font-semibold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="shadow-lg rounded-2xl p-6 bg-white hover:shadow-2xl transition">
                <CardContent className="text-center">
                  <div className="flex justify-center">{service.icon}</div>
                  <h3 className="text-xl font-medium mb-3">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-black text-white py-20">
        <h2 className="text-3xl font-light mb-6">Need a Service Today?</h2>
        <Button className="bg-amber-400 text-black px-8 py-4 text-lg rounded-2xl hover:bg-amber-300 transition">
          <Link to="/Signup" >
            Get Started
          </Link>
        </Button>
      </section>
    </div>
  );
}
