import { useState } from "react";
import api from "../../api.js";
import toast from "react-hot-toast";

const RegisterWorker = () => {
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
    try {
      await api.post("/api/admin/register-worker", form);
      toast.success("Worker registered successfully");
      setForm({ name: "", email: "", password: "", phone: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to register worker");
    }
  };

  return (
    <div className="p-6 max-w-md">
      <h2 className="text-xl font-semibold mb-4">Register Worker</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="name" placeholder="Name" onChange={handleChange} className="input input-bordered w-full" required />
        <input name="email" placeholder="Email" onChange={handleChange} className="input input-bordered w-full" required />
        <input name="phone" placeholder="Phone" onChange={handleChange} className="input input-bordered w-full" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="input input-bordered w-full" required />

        <button className="btn btn-primary w-full">Create Worker</button>
      </form>
    </div>
  );
};

export default RegisterWorker;
