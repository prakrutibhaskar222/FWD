import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5001/api/auth/login",
        { email, password }
      );

      // 🔑 THIS IS REQUIRED
      localStorage.setItem("token", res.data.token);
      window.dispatchEvent(new Event("auth-change"));

      navigate("/home");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-80 p-6 bg-white shadow">
        <h2 className="text-xl mb-4">Login</h2>

        {error && <p className="text-red-600">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="border w-full mb-3 px-3 py-2"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border w-full mb-3 px-3 py-2"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-[#B57655] text-white py-2">
          Login
        </button>

        <Link to="/forgot-password" className="text-sm text-blue-600">
          Forgot password?
        </Link>


        <p className="text-sm mt-3">
          No account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
