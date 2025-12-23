import { useState } from "react";

export default function WorkerHeader() {
  const [clockedIn, setClockedIn] = useState(false);

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold">Worker Dashboard</h1>

      {!clockedIn ? (
        <button
          onClick={() => setClockedIn(true)}
          className="btn-green"
        >
          Clock In
        </button>
      ) : (
        <button
          onClick={() => setClockedIn(false)}
          className="btn-red"
        >
          Clock Out
        </button>
      )}
    </div>
  );
}
