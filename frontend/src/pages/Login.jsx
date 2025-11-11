import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast"
import {
  Card,
  CardContent,
  Button,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { Link } from "react-router";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email.endsWith("@gmail.com")) {
      toast.error("Email must end with @gmail.com");
      return; // Stop submission if invalid
    }


    console.log("Login attempt:", formData);
    toast.success('Successfully login!!')
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
                color: "black",
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
                sx={{
                  mt: 3,
                  py: 1.4,
                  fontSize: "1rem",
                  backgroundColor: "#fbbf24", // amber-400
                  color: "black",
                  borderRadius: "12px",
                  textTransform: "none",
                  "&:hover": { backgroundColor: "#facc15" },
                }}
              >
                <Link to="/home" >
                Log In
            </Link>
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
