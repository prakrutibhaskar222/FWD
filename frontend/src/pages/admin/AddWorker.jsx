import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import AdminLayout from "../../components/admin/AdminLayout";

const AddWorker = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/api/admin/register-worker", form);
    navigate("/admin/workers");
  };

  return (
    <AdminLayout>
      <h2 className="text-xl font-bold mb-4">Add Worker</h2>

      <form onSubmit={submit} className="max-w-md space-y-3">
        <input name="name" placeholder="Name" className="input w-full" onChange={handleChange} required />
        <input name="email" placeholder="Username / Email" className="input w-full" onChange={handleChange} required />
        <input name="phone" placeholder="Phone" className="input w-full" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" className="input w-full" onChange={handleChange} required />

        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Create Worker
        </button>
      </form>
    </AdminLayout>
  );
};

export default AddWorker;
