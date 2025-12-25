import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post(
      "http://localhost:5001/api/auth/register",
      form
    );

    localStorage.setItem("token", res.data.token);
    window.dispatchEvent(new Event("auth-change"));

    navigate("/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-80 p-6 bg-white shadow">
        <h2 className="text-xl mb-4">Sign Up</h2>

        <input name="name" placeholder="Name" className="border w-full mb-3 px-3 py-2" onChange={handleChange} required />
        <input name="email" placeholder="Email" className="border w-full mb-3 px-3 py-2" onChange={handleChange} required />
        <input name="phone" placeholder="Phone" className="border w-full mb-3 px-3 py-2" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" className="border w-full mb-3 px-3 py-2" onChange={handleChange} required />

        <button className="w-full bg-[#B57655] text-white py-2">
          Create Account
        </button>

        <p className="text-sm mt-3">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
