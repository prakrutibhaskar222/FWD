import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import axios from "axios";
import {
  Card,
  CardContent,
  Button,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate, Link } from "react-router";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Option 2: Validate any valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
        { withCredentials: true }
      );

      toast.success(response.data.message || "Login successful!");
      navigate("/home");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4efe9] px-6">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Card
          sx={{
            maxWidth: 400,
            padding: 4,
            borderRadius: 4,
            boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
            backgroundColor: "white",
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              align="center"
              fontWeight="700"
              gutterBottom
              sx={{
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Login
            </Typography>

            <Typography
              variant="body2"
              align="center"
              color="text.secondary"
              sx={{ mb: 3 }}
            >
              Welcome back! Please enter your details.
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                required
              />

              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                required
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{
                  mt: 3,
                  py: 1.4,
                  fontSize: "1rem",
                  backgroundColor: "#fbbf24",
                  color: "black",
                  borderRadius: "12px",
                  textTransform: "none",
                  "&:hover": { backgroundColor: "#facc15" },
                }}
              >
                {loading ? "Logging in..." : "Log In"}
              </Button>
            </Box>

            <Typography
              variant="body2"
              align="center"
              sx={{ mt: 3, color: "gray" }}
            >
              Don’t have an account?{" "}
              <Link to="/signup" className="text-amber-600 hover:underline">
                Sign up
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
