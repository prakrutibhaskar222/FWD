export function generateTimeSlots(startTime, endTime, duration) {
  const slots = [];

  // ❗ Convert duration to number
  duration = Number(duration);

  // ❗ Reject invalid duration
  if (!duration || duration <= 0 || isNaN(duration)) {
    console.error("❌ Invalid duration:", duration);
    return slots; // return empty array
  }

  let [startH, startM] = startTime.split(":").map(Number);
  let [endH, endM] = endTime.split(":").map(Number);

  const start = startH * 60 + startM;
  const end = endH * 60 + endM;

  if (end <= start) {
    console.error("❌ endTime earlier than startTime");
    return slots;
  }

  for (let time = start; time + duration <= end; time += duration) {
    const h = Math.floor(time / 60).toString().padStart(2, "0");
    const m = (time % 60).toString().padStart(2, "0");
    slots.push(`${h}:${m}`);
  }

  return slots;
}

