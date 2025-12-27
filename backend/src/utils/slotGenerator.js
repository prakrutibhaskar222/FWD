export function generateTimeSlots(startTime, endTime) {
  const slots = [];

  let [startH, startM] = startTime.split(":").map(Number);
  let [endH, endM] = endTime.split(":").map(Number);

  const start = startH * 60 + startM;
  const end = endH * 60 + endM;

  for (let time = start; time < end; time += 30) {
    const h = Math.floor(time / 60).toString().padStart(2, "0");
    const m = (time % 60).toString().padStart(2, "0");
    slots.push(`${h}:${m}`);
  }

  return slots;
}
