// src/pages/ServiceDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle, ArrowLeft, Clock9, IndianRupee } from "lucide-react";
import Reviews from "../components/Reviews"; // new component

export default function ServiceDetails() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = "http://localhost:5001";

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(`${API}/api/services/${id}/view`);
        const json = await res.json();
        if (json.success) {
          setService(json.data.service);
          setReviews(json.data.reviews || []);
          // recently viewed
          try {
            const rv = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
            const newList = [json.data.service._id, ...rv.filter(i => i !== json.data.service._id)].slice(0, 10);
            localStorage.setItem("recentlyViewed", JSON.stringify(newList));
          } catch (e) { /* ignore */ }
        }
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchService();
  }, [id]);

  if (loading) return <div className="p-10 text-center text-gray-500">Loading...</div>;
  if (!service) return <div className="p-10 text-center text-red-500">Service not found.</div>;

  return (
    <div className="min-h-screen bg-[#dce6f5] text-black pb-20">
      <div className="p-6">
        <Link to={`/${service.category}`} className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg w-fit hover:bg-gray-800 transition">
          <ArrowLeft size={18} /> Back
        </Link>
      </div>

      <section className="text-center px-6 md:px-20 py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">{service.title}</h1>
        <p className="text-gray-700 text-lg max-w-2xl mx-auto leading-relaxed">{service.description}</p>
      </section>

      <section className="px-6 md:px-20 mt-10">
        <h2 className="text-2xl font-semibold text-center mb-6">How It Works</h2>
        <ul className="max-w-3xl mx-auto space-y-4">
          {service.features?.map((item, idx) => (
            <li key={idx} className="flex gap-3 text-lg">
              <CheckCircle className="text-blue-600 w-6 h-6 mt-1" />
              <span className="text-gray-800">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="flex justify-center mt-14">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-[90%] max-w-xl">
          <h3 className="text-xl font-semibold text-center mb-6">Service Details</h3>
          <div className="grid grid-cols-2 gap-8 text-center">
            <div>
              <Clock9 className="w-7 h-7 text-purple-600 mx-auto mb-2" />
              <p className="font-medium text-gray-600">Estimated Duration</p>
              <p className="text-lg font-semibold mt-1">{service.duration || "—"}</p>
            </div>
            <div>
              <IndianRupee className="w-7 h-7 text-yellow-600 mx-auto mb-2" />
              <p className="font-medium text-gray-600">Price</p>
              <p className="text-lg font-semibold mt-1">₹{service.price}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="max-w-3xl mx-auto mt-10 px-4">
        <Reviews serviceId={service._id} initialReviews={reviews} onNewReview={(r) => setReviews(prev => [r, ...prev])} />
      </div>

      <div className="text-center py-16 bg-black text-white mt-20">
        <h2 className="text-3xl font-light mb-6">Ready to Book This Service?</h2>
        <Link to={`/booking/service/${service._id}`} className="bg-blue-500 text-white px-8 py-3 rounded-xl text-lg font-semibold hover:bg-blue-400 transition">
          Book a Service
        </Link>
      </div>
    </div>
  );
}
