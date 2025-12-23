import { api } from "../api";

export default function Attendance() {
  const clock = type => api.post("/workers/attendance", { type });

  return (
    <>
      <button onClick={() => clock("in")}>Clock In</button>
      <button onClick={() => clock("out")}>Clock Out</button>
    </>
  );
}
