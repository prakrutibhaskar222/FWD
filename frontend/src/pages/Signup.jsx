// SignUpPage.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import axios from "axios";
import { Card, CardContent, Button, TextField, Typography, Box } from "@mui/material";

export default function Signup({ navigate }) {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5001/api/auth/signup", formData, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      navigate("/login"); // pass navigate from parent or use react-router
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4efe9]">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <Card sx={{ maxWidth: 400, p: 4 }}>
          <CardContent>
            <Typography variant="h4" align="center" gutterBottom>
              Sign Up
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField fullWidth label="Name" name="name" margin="normal" value={formData.name} onChange={handleChange} required />
              <TextField fullWidth label="Email" name="email" margin="normal" value={formData.email} onChange={handleChange} required />
              <TextField fullWidth label="Password" name="password" type="password" margin="normal" value={formData.password} onChange={handleChange} required />
              <Button type="submit" fullWidth variant="contained" disabled={loading} sx={{ mt: 2 }}>
                {loading ? "Creating..." : "Sign Up"}
              </Button>
            </Box>
            <Typography align="center" sx={{ mt: 2 }}>
              Already have an account? <Button onClick={() => navigate("/login")}>Login</Button>
            </Typography>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
