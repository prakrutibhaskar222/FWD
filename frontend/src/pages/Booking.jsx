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

  // MAIN CATEGORY TITLES
  const serviceNames = {
    electrical: "Electrical Services",
    installation: "Installation Services",
    personal: "Personal Services",
    homeservices: "Home Services",
    renovation: "Renovation Services",
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

  // SUB SERVICES
  const subServiceCategories = {
    electrical: [
      "Electrical wiring (new installation or rewiring)",
      "Switchboard installation & repair",
      "Ceiling fan / exhaust fan installation",
      "Lighting installation (indoor & outdoor)",
      "Inverter / UPS installation",
      "Circuit breaker & fuse replacement",
      "Electrical panel maintenance",
      "Earthing & surge protection",
      "Home automation & smart lighting setup",
    ],

    installation: [
      "Kitchen appliance installation (chimney, hob, dishwasher)",
      "AC / geyser / oven installation",
      "Bathroom fittings installation",
      "AC installation / uninstallation",
      "CCTV camera installation",
      "Water purifier installation",
      "TV wall mounting",
      "Door / window / curtain installation",
      "Furniture assembly",
      "Solar panel installation",
    ],

    personal: [
      "Home cleaning & sanitization",
      "Pest control",
      "Laundry & dry cleaning pickup",
      "Personal fitness trainer / yoga instructor",
      "Babysitting or elderly care",
      "Driver / chauffeur service",
    ],

    homeservices: [
      "House painting & waterproofing",
      "Security guard services",
      "Landscape & gardening maintenance",
      "Appliance deep cleaning",
      "Home deep cleaning",
      "Bathroom cleaning",
      "Room cleaning",
      "New house setup",
      "Kitchen cleaning",
    ],

    renovation: [
      "Civil renovation (walls, floors, tiles)",
      "Bathroom & kitchen remodeling",
      "False ceiling installation",
      "Wall plastering & painting",
      "Carpentry & woodwork",
      "Flooring replacement",
      "Space redesign / partitioning",
      "Waterproofing works",
      "Interior lighting redesign",
    ],
  };

  // Get the subservice list for this topic
  const filteredSubServices = subServiceCategories[topic] || [];

  // Auto-fill service category when topic updates
  useEffect(() => {
    if (topic && serviceNames[topic]) {
      setFormData((prev) => ({
        ...prev,
        service: serviceNames[topic],
        sub_service: "",
      }));
    }
  }, [topic]);

  // Track input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  // Submit form
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

              {/* Main Service (Auto-filled) */}
              <TextField
                fullWidth
                label="Service Category"
                value={formData.service}
                InputProps={{ readOnly: true }}
                margin="normal"
              />

              {/* User Details */}
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                margin="normal"
                required
              />

              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
              />

              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                margin="normal"
                required
              />

              {/* Sub-services */}
              {filteredSubServices.length > 0 && (
                <TextField
                  fullWidth
                  select
                  label="Select Sub-Service"
                  name="sub_service"
                  value={formData.sub_service}
                  onChange={handleChange}
                  margin="normal"
                  required
                >
                  {filteredSubServices.map((s, i) => (
                    <MenuItem key={i} value={s}>
                      {s}
                    </MenuItem>
                  ))}
                </TextField>
              )}

              {/* Address */}
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                margin="normal"
              />

              {/* Notes */}
              <TextField
                fullWidth
                label="Additional Notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                margin="normal"
                multiline
                rows={3}
              />

              {/* Submit */}
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
