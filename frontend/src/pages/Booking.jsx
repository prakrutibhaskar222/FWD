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
    i1: " Kitchen appliance installation (chimney, hob, dishwasher)",
    i2: " AC / geyser / oven installation",
    i3: " Bathroom fittings installation",
    i4: " AC installation / uninstallation",
    i5: " CCTV camera installation",
    i6: " Water purifier installation",
    i7: " TV wall mounting",
    i8: " Door / window / curtain installation",
    i9: " Furniture assembly",
    i10: " Solar panel installation",
    h1: " House painting & waterproofing",
    h2: " Security guard services",
    h3: " Landscape & gardening maintenance",
    h4: " Appliance deep cleaning",
    h5: "Home deep cleaning",
    h6: "Bathroom cleaning",
    h7: " Room cleaning",
    h8: " New house setup",
    h9: " Kitchen cleaning",
    p1: " Home cleaning & sanitization",
    p2: " Pest control",
    p3: " Laundry & dry cleaning pickup",
    p4: " Personal fitness trainer / yoga instructor",
    p5: "Babysitting or elderly care",
    p6: " Driver / chauffeur service",
    r1: " Civil renovation (walls, floors, tiles)",
    r2: " Bathroom & kitchen remodeling",
    r3: " False ceiling installation",
    r4: " Wall plastering & painting",
    r5: " Carpentry & woodwork",
    r6: " Flooring replacement",
    r7: " Space redesign / partitioning",
    r8: " Waterproofing works",
    r9: " Interior lighting redesign",

  };

  // SUB SERVICES
  const subServiceCategories = {
    electrical: [
      "1.Electrical wiring (new installation or rewiring)",
      "2.Switchboard installation & repair",
      "3.Ceiling fan / exhaust fan installation",
      "4.Lighting installation (indoor & outdoor)",
      "5.Inverter / UPS installation",
      "6.Circuit breaker & fuse replacement",
      "7.Electrical panel maintenance",
      "8.Earthing & surge protection",
      "9.Home automation & smart lighting setup",
    ],

    installation: [
      "1. Kitchen appliance installation (chimney, hob, dishwasher)",
      "2. AC / geyser / oven installation",
      "3. Bathroom fittings installation",
      "4. AC installation / uninstallation",
      "5. CCTV camera installation",
      "6. Water purifier installation",
      "7. TV wall mounting",
      "8. Door / window / curtain installation",
      "9. Furniture assembly",
      "10. Solar panel installation",
    ],

    personal: [
      "1. Home cleaning & sanitization",
      "2. Pest control",
      "3. Laundry & dry cleaning pickup",
      "4. Personal fitness trainer / yoga instructor",
      "5. Babysitting or elderly care",
      "6. Driver / chauffeur service",

    ],

    homeservices: [
      "1. House painting & waterproofing",
      "2. Security guard services",
      "3. Landscape & gardening maintenance",
      "4. Appliance deep cleaning",
      "5. Home deep cleaning",
      "6. Bathroom cleaning",
      "7. Room cleaning",
      "8. New house setup",
      "9. Kitchen cleaning",

    ],

    renovation: [
      "1. Civil renovation (walls, floors, tiles)",
      "2. Bathroom & kitchen remodeling",
      "3. False ceiling installation",
      "4. Wall plastering & painting",
      "5. Carpentry & woodwork",
      "6. Flooring replacement",
      "7. Space redesign / partitioning",
      "8. Waterproofing works",
      "9. Interior lighting redesign",

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
