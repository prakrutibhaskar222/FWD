import Booking from "../models/Booking.js";
import Worker from "../models/Worker.js";

export const getWorkerCalendar = async (req, res) => {
  try {
    const { workerId } = req.params;
    const bookings = await Booking.find({ assignedWorker: workerId });

    return res.json({ success: true, data: bookings });
  } catch (err) {
    console.error("Calendar fetch error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to load worker calendar",
    });
  }
};

export const reassignBooking = async (req, res) => {
  try {
    const { bookingId, workerId, date, slot } = req.body;

    const updated = await Booking.findByIdAndUpdate(
      bookingId,
      { assignedWorker: workerId, date, slot },
      { new: true }
    );

    return res.json({
      success: true,
      message: "Booking rescheduled",
      data: updated,
    });
  } catch (err) {
    console.error("Reassign error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to reschedule",
    });
  }
};
