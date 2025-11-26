// src/components/Reviews.jsx
import React, { useEffect, useState } from "react";

export default function Reviews({ serviceId, initialReviews = [], onNewReview }) {
  const [reviews, setReviews] = useState(initialReviews);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const API = "http://localhost:5001";

  useEffect(() => setReviews(initialReviews), [initialReviews]);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${API}/api/reviews/service/${serviceId}`);
      const json = await res.json();
      if (json.success) setReviews(json.data);
    } catch (err) { console.error(err); }
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/api/reviews/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service: serviceId, name, rating, comment })
      });
      const json = await res.json();
      if (json.success) {
        setName(""); setRating(5); setComment("");
        // push new review into list (might await moderation in real app)
        setReviews(prev => [json.data, ...prev]);
        if (onNewReview) onNewReview(json.data);
      } else {
        alert(json.error || "Failed to post review");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Reviews</h3>

      <form onSubmit={submit} className="space-y-3 mb-6">
        <input required value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" className="w-full p-2 border rounded" />
        <div className="flex items-center gap-4">
          <label>Rating</label>
          <select value={rating} onChange={e=>setRating(Number(e.target.value))} className="p-2 border rounded">
            {[5,4,3,2,1].map(n=> <option key={n} value={n}>{n} stars</option>)}
          </select>
        </div>
        <textarea value={comment} onChange={e=>setComment(e.target.value)} placeholder="Write a quick review" className="w-full p-2 border rounded" rows={3}></textarea>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Post review</button>
      </form>

      <div className="space-y-4">
        {reviews.length === 0 && <p className="text-gray-600">No reviews yet.</p>}
        {reviews.map(r => (
          <div key={r._id || r.createdAt} className="border p-4 rounded">
            <div className="flex justify-between">
              <strong>{r.name}</strong>
              <span>{r.rating} ★</span>
            </div>
            <p className="text-gray-700 mt-2">{r.comment}</p>
            <p className="text-xs text-gray-400 mt-2">{new Date(r.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
