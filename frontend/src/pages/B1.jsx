import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import {
  TextField,
  Button,
  MenuItem,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { useParams } from "react-router";

export default function Booking() {
  const { topic } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    sub_service: "",
    date: "",
    address: "",
    notes: "",
  });

  // 🔥 Main service names
  const serviceNames = {
    
    e1: "Electrical Wiring Service",
    e2: "Switchboard installation and repair",
    e3: "Ceiling fan / exhaust fan installation",
    e4: "Lighting installation",
    e5: "Inverter and UPS setup",
    e6: "Circuit breaker & fuse replacement",
    e7: "Electrical panel maintenance",
    e8: "Earthing & surge protection",
    e9: "Home automation",
  };

  
  // 🔥 Auto-fill service when topic changes
  useEffect(() => {
    if (topic && serviceNames[topic]) {
      setFormData((prev) => ({
        ...prev,
        service: serviceNames[topic],
        sub_service: "", // reset any old selection
      }));
    }
  }, [topic]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill all required fields!");
      return;
    }

    toast.success("Booking Submitted!");
    console.log("Booking Details:", formData);
  };

  return (
    <div className="min-h-screen bg-[#f9f8f6] py-16 px-6 flex justify-center">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Card sx={{ maxWidth: 600, padding: 4, borderRadius: 4 }}>
          <CardContent>
            <Typography variant="h4" align="center" fontWeight={700}>
              Book {serviceNames[topic] || "Service"}
            </Typography>

            <form onSubmit={handleSubmit}>

              {/* Auto-filled service */}
              <TextField
                fullWidth
                label="Service Category"
                value={formData.service}
                InputProps={{ readOnly: true }}
                margin="normal"
              />

              {/* User info */}
              <TextField fullWidth label="Full Name" name="name" value={formData.name} onChange={handleChange} margin="normal" required />
              <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} margin="normal" required />
              <TextField fullWidth label="Phone" name="phone" value={formData.phone} onChange={handleChange} margin="normal" required />

              

              <Button
                type="submit"
                fullWidth
                sx={{
                  mt: 3,
                  py: 1.3,
                  backgroundColor: "#fbbf24",
                  color: "#000",
                  fontWeight: "bold",
                }}
              >
                Confirm Booking
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
