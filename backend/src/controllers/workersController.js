import Booking from "../models/Booking.js";
import Attendance from "../models/Attendance.js";
import { generateTimesheet } from "../utils/timesheet.js";

// controllers/workersController.js
export const getTasks = async (req, res) => {
  const tasks = await Booking.find({
    assignedWorker: req.user._id
  }).sort({ createdAt: -1 });

  res.json(tasks);
};


export const updateTaskStatus = async (req, res) => {
  const task = await Booking.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(task);
};

// controllers/workersController.js
export const clockEvent = async (req, res) => {
  const { type } = req.body;

  const last = await Attendance.findOne({ worker: req.user._id })
    .sort({ createdAt: -1 });

  if (last && last.type === type) {
    return res.status(400).json({
      message: `Already clocked ${type}`
    });
  }

  const event = await Attendance.create({
    worker: req.user._id,
    type
  });

  res.json(event);
};


export const getTimesheet = async (req, res) => {
  const start = new Date(req.query.start);
  const end = new Date(req.query.end);

  if (isNaN(start) || isNaN(end)) {
    return res.status(400).json({ message: "Invalid dates" });
  }

  const sheet = await generateTimesheet(
    req.user._id,
    start,
    end
  );

  res.json(sheet);
};

export const getNotifications = async (req, res) => {
  const notifications = await Notification.find({
    worker: req.user._id
  }).sort({ createdAt: -1 });

  res.json(notifications);
};
