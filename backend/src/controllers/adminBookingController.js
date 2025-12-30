// controllers/adminBookingController.js
import Booking from "../models/Booking.js";

export const assignWorker = async (req, res) => {
  const { workerId } = req.body;

  if (!workerId)
    return res.status(400).json({ success: false, message: "Worker required" });

  const booking = await Booking.findByIdAndUpdate(
    req.params.id,
    {
      workerId,
      status: "assigned",
    },
    { new: true }
  );

  res.json({ success: true, data: booking });
};

export const markPayment = async (req, res) => {
  const { paymentStatus } = req.body;

  if (!["paid", "pending"].includes(paymentStatus))
    return res.status(400).json({ success: false });

  const booking = await Booking.findByIdAndUpdate(
    req.params.id,
    { paymentStatus },
    { new: true }
  );

  res.json({ success: true, data: booking });
};

export const updateBookingStatus = async (req, res) => {
  const { status } = req.body;

  const allowed = [
    "pending",
    "assigned",
    "in-progress",
    "completed",
    "cancelled",
  ];

  if (!allowed.includes(status))
    return res.status(400).json({ success: false });

  const booking = await Booking.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  res.json({ success: true, data: booking });
};


