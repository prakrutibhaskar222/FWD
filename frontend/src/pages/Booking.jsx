import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { TextField, Button, MenuItem, Card, CardContent, Typography } from "@mui/material";

export default function Booking() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    address: "",
    notes: "",
  });

  const services = [
    "Electrical Services",
    "Installation Services",
    "Personal Services",
    "Home Services",
    "Renovation Services",
  ];

  const sub_services = [
    "Electrical wiring (new installation or rewiring)",
    "Switchboard installation and repair",
    "Ceiling fan / exhaust fan installation",
    "Lighting installation (indoor, outdoor, decorative)",
    "Inverter and UPS setup",
    "Circuit breaker & fuse replacement",
    "Electrical panel maintenance",
    "Earthing & surge protection",
    "Home automation & smart lighting setup",
    "House painting & waterproofing",
    "Security guard services",
    "Landscape & gardening maintenance",
    "Electrical appliances cleaning",
    "Deep cleaning",
    "Bathroom cleaning",
    "Room cleaning",
    "New house organization",
    "Kitchen cleaning",
    "Kitchen appliance installation (chimney, hob, dishwasher)",
    "Appliance installation (AC, geyser, oven, etc.)",
    "Bathroom fittings installation (geyser, taps, shower panels)",
    "Air conditioner installation / uninstallation",
    "CCTV camera installation",
    "Water purifier installation",
    "TV wall mounting",
    "Door / window / curtain installation",
    "Modular furniture assembly & installation",
    "Solar panel installation",
     "Home cleaning & sanitization",
    "Pest control",
    "Laundry & dry cleaning pickup",
    "Personal fitness trainer / yoga instructor",
    "Babysitting or elderly care services",
    "Personal driver / chauffeur service",
    "Civil renovation (walls, floors, tiles, ceilings)",
    "Bathroom & kitchen remodeling",
    "False ceiling design & installation",
    "Wall plastering & painting",
    "Carpentry & woodwork renovation",
    "Flooring replacement (tiles, marble, laminate)",
    "Space redesign / partitioning",
    "Masonry & waterproofing works",
    "Interior lighting revamp",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // simple validation
    if (!formData.name || !formData.email || !formData.phone || !formData.service) {
      toast.error("Please fill in all required fields.");
      return;
    }

    toast.success("Your booking has been submitted successfully!");
    console.log("Booking Details:", formData);

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      date: "",
      address: "",
      notes: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#f9f8f6] text-[#1a1a1a] font-sans py-16 px-6 flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Card
          sx={{
            maxWidth: 600,
            borderRadius: 4,
            padding: 4,
            boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
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
                color: "#000",
                letterSpacing: "1px",
              }}
            >
              Book a Service
            </Typography>

            <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
              Fill out your details below to book an appointment with our experts.
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                required
              />
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
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                required
              />
              <TextField
                fullWidth
                select
                label="Select Service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                required
              >
                {services.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                fullWidth
                select
                label="Select Sub_Service"
                name="sub_service"
                value={formData.sub_service}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                required
              >
                {sub_services.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                fullWidth
                label="Preferred Date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />

              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />

              <TextField
                fullWidth
                label="Additional Notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                multiline
                rows={3}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  py: 1.3,
                  fontSize: "1rem",
                  backgroundColor: "#fbbf24",
                  color: "#000",
                  borderRadius: "12px",
                  textTransform: "none",
                  "&:hover": { backgroundColor: "#facc15" },
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
