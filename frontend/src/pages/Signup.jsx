import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(form);
      localStorage.setItem("token", res.data.token);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h2>Sign Up</h2>

        {error && <p style={styles.error}>{error}</p>}

        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="phone" placeholder="Phone" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />

        <button type="submit">Create Account</button>

        <p onClick={() => navigate("/login")} style={styles.link}>
          Already have an account? Login
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f8",
  },
  card: {
    width: 320,
    padding: 20,
    background: "#fff",
    display: "flex",
    flexDirection: "column",
    gap: 12,
    borderRadius: 6,
  },
  error: { color: "red", fontSize: 14 },
  link: { color: "blue", cursor: "pointer", fontSize: 14 },
};
