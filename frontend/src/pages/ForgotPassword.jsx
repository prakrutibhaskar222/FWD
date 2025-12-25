import { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await console.log(
  "URL==>",
  "http://localhost:5001/api/auth/forgot-password"
);


      setMessage("If the email exists, a reset link has been sent.");
    } catch (err) {
      console.error("❌ Forgot password error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-80 p-6 bg-white shadow">
        <h2 className="text-xl mb-3">Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="border w-full mb-3 px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button className="w-full bg-[#B57655] text-white py-2">
          Send Reset Link
        </button>

        {message && <p className="text-sm mt-3">{message}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;
