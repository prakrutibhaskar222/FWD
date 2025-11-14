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
    "1.Electrical wiring (new installation or rewiring)",
    "2.Switchboard installation and repair",
    "3.Ceiling fan / exhaust fan installation",
    "4.Lighting installation (indoor, outdoor, decorative)",
    "5.Inverter and UPS setup",
    "6.Circuit breaker & fuse replacement",
    "7.Electrical panel maintenance",
    "8.Earthing & surge protection",
    "9.Home automation & smart lighting setup",
    "1.Kitchen appliance installation (chimney, hob, dishwasher)",
    "2.Appliance installation (AC, geyser, oven, etc.)",
    "3.Bathroom fittings installation (geyser, taps, shower panels)",
    "4.Air conditioner installation / uninstallation",
    "5.CCTV camera installation",
    "6.Water purifier installation",
    "7.TV wall mounting",
    "8.Door / window / curtain installation",
    "9.Modular furniture assembly & installation",
    "10.Solar panel installation",
    "1.Home cleaning & sanitization",
    "2.Pest control",
    "3.Laundry & dry cleaning pickup",
    "4.Personal fitness trainer / yoga instructor",
    "5.Babysitting or elderly care services",
    "6.Personal driver / chauffeur service",
    "1.House painting & waterproofing",
    "2.Security guard services",
    "3.Landscape & gardening maintenance",
    "4.Electrical appliances cleaning",
    "5.Deep cleaning",
    "6.Bathroom cleaning",
    "7.Room cleaning",
    "8.New house organization",
    "9.Kitchen cleaning",
    "1.Civil renovation (walls, floors, tiles, ceilings)",
    "2.Bathroom & kitchen remodeling",
    "3.False ceiling design & installation",
    "4.Wall plastering & painting",
    "5.Carpentry & woodwork renovation",
    "6.Flooring replacement (tiles, marble, laminate)",
    "7.Space redesign / partitioning",
    "8.Masonry & waterproofing works",
    "9.Interior lighting revamp",
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
