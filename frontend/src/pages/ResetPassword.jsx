import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/reset-password/${token}`,
        { password }
      );
      navigate("/login");
    } catch (err) {
      console.error("❌ Reset password error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-80 p-6 bg-white shadow">
        <h2 className="text-xl mb-3">Reset Password</h2>

        <input
          type="password"
          placeholder="New password"
          className="border w-full mb-3 px-3 py-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-[#B57655] text-white py-2">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
