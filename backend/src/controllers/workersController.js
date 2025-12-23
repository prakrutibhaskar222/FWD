import Booking from "../models/Booking.js";
import Attendance from "../models/Attendance.js";
import { generateTimesheet } from "../utils/timesheet.js";

export const getTasks = async (req, res) => {
  const tasks = await Booking.find({ assignedWorker: req.user.id });
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

export const clockEvent = async (req, res) => {
  const event = await Attendance.create({
    worker: req.user.id,
    type: req.body.type
  });
  res.json(event);
};

export const getTimesheet = async (req, res) => {
  const sheet = await generateTimesheet(
    req.user.id,
    new Date(req.query.start),
    new Date(req.query.end)
  );
  res.json(sheet);
};

export default {
  getTasks,
  updateTaskStatus,
  clockEvent,
  getTimesheet
};
