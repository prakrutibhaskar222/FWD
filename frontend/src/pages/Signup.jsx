// SignUpPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";

// Backend URL (change to your backend port if different)
const API_URL = "http://localhost:5001";

const PALETTE = {
  beige: "#F3D79E",
  brown: "#B57655",
  cream: "#F2E3C6",
  tan: "#E7D2AC",
  nude: "#D0B79A",
  black: "#000000",
};

export default function SignUpPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [loading, setLoading] = useState(false);

  // Handle input change
  const onChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // Handle signup submit
  const handleCreate = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.name || !form.email || !form.password || !form.confirm) {
      toast.error("Please fill all fields");
      return;
    }

    if (form.password !== form.confirm) {
      toast.error("Passwords do not match");
      return;
    }

    // Optional: email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast.error("Please enter a valid email");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        toast.error("Server did not return valid JSON");
        setLoading(false);
        return;
      }

      if (res.ok) {
        // Save token and user
        localStorage.setItem("token", data.token);
        localStorage.setItem(
          "user",
          JSON.stringify(
            data.user || {
              _id: data._id,
              name: data.name,
              email: data.email,
            }
          )
        );

        window.dispatchEvent(new Event("storage"));
        toast.success(`Welcome, ${data.name}!`);
        navigate("/home");
      } else {
        toast.error(data.message || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-[#f4efe9] px-4"
    >
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden shadow-xl">
        {/* Left panel */}
        <div
          className="hidden md:flex items-center justify-center p-8"
          style={{ background: PALETTE.nude }}
        >
          <div className="text-center text-white max-w-sm p-6 backdrop-blur-sm">
            <h2 className="text-3xl font-bold mb-3">Welcome!</h2>
            <p className="mb-6">
              Join our community — save, like & share your favorite recipes.
            </p>
            <Link
              to="/login"
              className="inline-block px-6 py-2 rounded-full border border-white border-opacity-30 hover:bg-white hover:text-black transition"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Signup form */}
        <div className="p-8 md:p-12 bg-white">
          <h2
            className="text-3xl font-bold mb-3"
            style={{ color: PALETTE.brown }}
          >
            Create Account
          </h2>
          <p className="text-gray-600 mb-6">
            Register with your personal details
          </p>

          <form className="space-y-4" onSubmit={handleCreate}>
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder="Full Name"
              className="input input-bordered w-full p-3 rounded-lg border"
              style={{ borderColor: PALETTE.tan }}
              required
            />
            <input
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="Email Address"
              type="email"
              className="input input-bordered w-full p-3 rounded-lg border"
              style={{ borderColor: PALETTE.tan }}
              required
            />
            <input
              name="password"
              value={form.password}
              onChange={onChange}
              placeholder="Password"
              type="password"
              className="input input-bordered w-full p-3 rounded-lg border"
              style={{ borderColor: PALETTE.tan }}
              required
            />
            <input
              name="confirm"
              value={form.confirm}
              onChange={onChange}
              placeholder="Confirm Password"
              type="password"
              className="input input-bordered w-full p-3 rounded-lg border"
              style={{ borderColor: PALETTE.tan }}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg text-white font-semibold"
              style={{ background: PALETTE.brown }}
            >
              {loading ? "Creating..." : "Sign Up"}
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold"
              style={{ color: PALETTE.brown }}
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
