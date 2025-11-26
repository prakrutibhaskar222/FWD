import Booking from "../models/Booking.js";
import Service from "../models/Service.js";
import { generateTimeSlots } from "../utils/slotGenerator.js";

export const WORK_HOURS = {
  start: "09:00",
  end: "19:00"
}
/* ---------------- CREATE BOOKING ---------------- */
export const createBooking = async (req, res) => {
  try {
    const { customerName, customerPhone, notes, date, slot, serviceId, userId } = req.body;

    const service = await Service.findById(serviceId);
    if (!service) return res.json({ success: false, error: "Service not found" });

    const existing = await Booking.findOne({ serviceId, date, slot });
    if (existing) {
      return res.json({ success: false, error: "Slot already booked" });
    }

    const booking = await Booking.create({
      customerName,
      customerPhone,
      notes,
      date,
      slot,
      serviceId,
      userId: userId || null,

      serviceTitle: service.title,
      serviceCategory: service.category,
      serviceDuration: service.duration,
    });

    res.json({ success: true, data: booking });

  } catch (e) {
    res.json({ success: false, error: e.message });
  }
};

/* ---------------- GET SLOTS ---------------- */
export const getAvailableSlots = async (req, res) => {
  try {
    const { serviceId, date } = req.query;

    if (!serviceId || !date) {
      return res.json({ success: false, error: "serviceId and date required" });
    }

    const service = await Service.findById(serviceId);
    if (!service) return res.json({ success: false, error: "Service not found" });

    const allSlots = generateTimeSlots("10:00", "18:00", service.duration);

    const booked = await Booking.find({ serviceId, date }).select("slot");

    const bookedSlots = booked.map(b => b.slot);

    const available = allSlots.filter(s => !bookedSlots.includes(s));

    res.json({
      success: true,
      data: {
        availableSlots: available,
        allSlots
      }
    });

  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};


/* ---------------- GET BOOKINGS (Admin) ---------------- */
export const getAllBookings = async (req, res) => {
  const list = await Booking.find().sort({ createdAt: -1 });
  res.json({ success: true, data: list });
};

/* ---------------- USER BOOKINGS ---------------- */
export const getBookingsByUser = async (req, res) => {
  const list = await Booking.find({ userId: req.params.id }).sort({ createdAt: -1 });
  res.json({ success: true, data: list });
};

/* ---------------- SERVICE BOOKINGS ---------------- */
export const getBookingsByService = async (req, res) => {
  const list = await Booking.find({ serviceId: req.params.id });
  res.json({ success: true, data: list });
};

/* ---------------- CANCEL BOOKING ---------------- */
export const cancelBooking = async (req, res) => {
  const updated = await Booking.findByIdAndUpdate(
    req.params.id,
    { status: "cancelled" },
    { new: true }
  );
  res.json({ success: true, data: updated });
};

/* ---------------- RESCHEDULE BOOKING ---------------- */
export const rescheduleBooking = async (req, res) => {
  try {
    const { date, slot } = req.body;

    if (!date || !slot) {
      return res.json({ success: false, error: "Date and slot required" });
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.json({ success: false, error: "Booking not found" });

    const service = await Service.findById(booking.serviceId);
    if (!service) return res.json({ success: false, error: "Service not found" });

    // Generate new available slots for that date
    const allSlots = generateTimeSlots("10:00", "18:00", service.duration);

    // Validate selected slot
    if (!allSlots.includes(slot)) {
      return res.json({ success: false, error: "Selected slot is not valid for this service" });
    }

    // Check if slot already booked for same service
    const clash = await Booking.findOne({
      serviceId: booking.serviceId,
      date,
      slot,
      _id: { $ne: booking._id }
    });

    if (clash) {
      return res.json({ success: false, error: "This slot is already booked" });
    }

    // Update booking
    booking.date = date;
    booking.slot = slot;
    await booking.save();

    res.json({ success: true, data: booking });

  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};


/* ---------------- UPDATE STATUS (Admin) ---------------- */
export const updateBookingStatus = async (req, res) => {
  const updated = await Booking.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json({ success: true, data: updated });
};

// GET bookings with filters (start, end, serviceId, status, worker, q)
export const getBookingsFiltered = async (req, res) => {
  try {
    // query params: start=YYYY-MM-DD end=YYYY-MM-DD serviceId=... status=...
    const { start, end, serviceId, status, worker } = req.query;
    const q = {};
    if (serviceId) q.serviceId = serviceId;
    if (status) q.status = status;
    if (worker) q.workerAssigned = worker;

    if (start && end) {
      q.date = { $gte: start, $lte: end };
    } else if (start) {
      q.date = start;
    }

    const bookings = await Booking.find(q).sort({ createdAt: -1 });
    res.json({ success: true, data: bookings });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};

// GET single booking by id
export const getBookingById = async (req, res) => {
  try {
    const b = await Booking.findById(req.params.id);
    if (!b) return res.json({ success: false, error: "Booking not found" });
    res.json({ success: true, data: b });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};

export const assignWorker = async (req, res) => {
  try {
    const { workerId } = req.body;

    const updated = await Booking.findByIdAndUpdate(
      req.params.id,
      { workerId },
      { new: true }
    ).populate("workerId");

    res.json({ success: true, data: updated });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};


// Mark paid and attach payment info
export const markPaid = async (req, res) => {
  try {
    const { provider, transactionId, amount, currency } = req.body;
    const updated = await Booking.findByIdAndUpdate(
      req.params.id,
      { paid: true, paymentInfo: { provider, transactionId, amount, currency } },
      { new: true }
    );
    res.json({ success: true, data: updated });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
};

