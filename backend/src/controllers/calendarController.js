import Booking from "../models/Booking.js";
import Worker from "../models/Worker.js";

export const getWorkerCalendar = async (req, res) => {
  try {
    const { workerId } = req.params;
<<<<<<< HEAD
=======

>>>>>>> 7e93ae4b4061d9c1ce30b0fd257c119922a62608
    const bookings = await Booking.find({ assignedWorker: workerId });

    return res.json({ success: true, data: bookings });
  } catch (err) {
    console.error("Calendar fetch error:", err);
<<<<<<< HEAD
    return res
      .status(500)
      .json({ success: false, message: "Failed to load calendar" });
=======
    return res.status(500).json({
      success: false,
      message: "Failed to load worker calendar",
    });
>>>>>>> 7e93ae4b4061d9c1ce30b0fd257c119922a62608
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
<<<<<<< HEAD
      message: "Booking rescheduled successfully",
      data: updated,
    });
  } catch (err) {
    console.error("Reschedule error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to reschedule booking",
=======
      message: "Booking rescheduled",
      data: updated,
    });
  } catch (err) {
    console.error("Reassign error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to reschedule",
>>>>>>> 7e93ae4b4061d9c1ce30b0fd257c119922a62608
    });
  }
};
