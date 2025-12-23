import Booking from "../models/Booking.js";
import Worker from "../models/Worker.js";

/**
 * Get all bookings for a specific worker (Worker Calendar)
 * GET /api/calendar/:workerId
 */
export const getWorkerCalendar = async (req, res) => {
  try {
    const { workerId } = req.params;
<<<<<<< HEAD
    const bookings = await Booking.find({ assignedWorker: workerId });

    return res.json({ success: true, data: bookings });
  } catch (err) {
    console.error("Calendar fetch error:", err);
=======

    if (!workerId) {
      return res.status(400).json({
        success: false,
        message: "Worker ID is required",
      });
    }

    const workerExists = await Worker.findById(workerId);
    if (!workerExists) {
      return res.status(404).json({
        success: false,
        message: "Worker not found",
      });
    }

    const bookings = await Booking.find({
      assignedWorker: workerId,
    }).sort({ date: 1 });

    return res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    console.error("Calendar fetch error:", error);
>>>>>>> fab8b6de725a54588d4e6356e19418cf522650ce
    return res.status(500).json({
      success: false,
      message: "Failed to load worker calendar",
    });
  }
};

/**
 * Reassign / Reschedule a booking
 * PUT /api/calendar/reassign
 */
export const reassignBooking = async (req, res) => {
  try {
    const { bookingId, workerId, date, slot } = req.body;

    if (!bookingId || !workerId || !date || !slot) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const workerExists = await Worker.findById(workerId);
    if (!workerExists) {
      return res.status(404).json({
        success: false,
        message: "Worker not found",
      });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      {
        assignedWorker: workerId,
        date,
        slot,
      },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    return res.status(200).json({
      success: true,
<<<<<<< HEAD
      message: "Booking rescheduled",
      data: updated,
    });
  } catch (err) {
    console.error("Reassign error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to reschedule",
=======
      message: "Booking rescheduled successfully",
      data: updatedBooking,
    });
  } catch (error) {
    console.error("Reassign error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to reschedule booking",
>>>>>>> fab8b6de725a54588d4e6356e19418cf522650ce
    });
  }
};
