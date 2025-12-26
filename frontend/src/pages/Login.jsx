import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      // 🔐 LOGIN REQUEST
      const res = await api.post("/api/auth/login", form);

      // SAVE TOKEN
      localStorage.setItem("token", res.data.token);

      const role = res.data.user.role;

      toast.success("Login successful");

      // ROLE-BASED REDIRECT
      if (role === "admin") navigate("/admin");
      else if (role === "worker") navigate("/worker/dashboard");
      else navigate("/home");

    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-full max-w-md p-6 rounded shadow">

        <h2 className="text-2xl font-bold text-center mb-6">
          Login to COOLIE
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered w-full"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* FORGOT PASSWORD */}
        <div className="text-right mt-2">
          <Link
            to="/forgot-password"
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* SIGNUP OPTION */}
        <div className="text-center mt-6 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign up
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Login;
