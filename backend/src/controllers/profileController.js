import User from "../models/User.js";
import Booking from "../models/Booking.js";

export const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id)
    .select("-password")
    .populate("favorites");

  res.json({ success: true, data: user });
};

export const updateProfile = async (req, res) => {
  const { name, phone, address } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { name, phone, address },
    { new: true }
  ).select("-password");

  res.json({ success: true, data: user });
};

export const toggleFavorite = async (req, res) => {
  const { serviceId } = req.params;

  const user = await User.findById(req.user.id);

  const index = user.favorites.indexOf(serviceId);

  if (index === -1) {
    user.favorites.push(serviceId);
  } else {
    user.favorites.splice(index, 1);
  }

  await user.save();

  res.json({ success: true, favorites: user.favorites });
};

export const getServiceHistory = async (req, res) => {
  const history = await Booking.find({
    userId: req.user.id,
    status: "completed"
  }).populate("serviceId");

  res.json({ success: true, data: history });
};

export const getInvoices = async (req, res) => {
  const invoices = await Booking.find({
    userId: req.user.id,
    paid: true
  });

  res.json({ success: true, data: invoices });
};
