import Attendance from "../models/Attendance.js";

export async function generateTimesheet(workerId, start, end) {
  const events = await Attendance.find({
    worker: workerId,
    timestamp: { $gte: start, $lte: end }
  }).sort("timestamp");

  let totalMinutes = 0;
  let clockIn = null;

  for (const ev of events) {
    if (ev.type === "in") clockIn = ev.timestamp;
    if (ev.type === "out" && clockIn) {
      totalMinutes += (ev.timestamp - clockIn) / 60000;
      clockIn = null;
    }
  }

  return { totalMinutes };
}
