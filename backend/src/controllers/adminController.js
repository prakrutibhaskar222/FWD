// src/controllers/adminController.js
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Booking from "../models/Booking.js"; // assuming you have a Booking model

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a user's role
export const updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = role;
    await user.save();

    res.json({ message: "User role updated", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const registerWorker = async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Name, email, and password are required"
    });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      message: "User already exists"
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const worker = await User.create({
    name,
    email,
    phone,
    password: hashedPassword,
    role: "worker"
  });

  res.status(201).json({
    success: true,
    message: "Worker registered successfully",
    worker: {
      id: worker._id,
      name: worker.name,
      email: worker.email,
      role: worker.role
    }
  });
};

export const getAllWorkers = async (req, res) => {
  const workers = await User.find({ role: "worker" }).select("-password");
  res.json({ success: true, data: workers });
};