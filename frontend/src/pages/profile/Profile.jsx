import { useEffect, useState } from "react";
import api from "../../api";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/profile").then((res) => {
      setProfile(res.data.data);
      setForm(res.data.data);
      setLoading(false);
    });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveProfile = async () => {
    await api.put("/api/profile", {
      name: form.name,
      phone: form.phone,
      address: form.address,
    });
    alert("Profile updated");
  };

  if (loading) return <div className="p-6">Loading…</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">My Profile</h1>

      <input
        name="name"
        value={form.name || ""}
        onChange={handleChange}
        placeholder="Name"
        className="input input-bordered w-full"
      />

      <input
        value={profile.email}
        disabled
        className="input input-bordered w-full bg-gray-100"
      />

      <input
        name="phone"
        value={form.phone || ""}
        onChange={handleChange}
        placeholder="Phone"
        className="input input-bordered w-full"
      />

      <input
        name="address.line1"
        value={form.address?.line1 || ""}
        onChange={(e) =>
          setForm({
            ...form,
            address: { ...form.address, line1: e.target.value },
          })
        }
        placeholder="Address Line 1"
        className="input input-bordered w-full"
      />

      <button onClick={saveProfile} className="btn btn-primary">
        Save Changes
      </button>
    </div>
  );
};

export default Profile;
