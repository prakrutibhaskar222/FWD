// src/pages/admin/AdminWorkerCalendar.jsx

import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";

import AdminLayout from "../../components/admin/AdminLayout";
import toast from "react-hot-toast";

export default function AdminWorkerCalendar() {
  const API = "http://localhost:5001";

  const [workers, setWorkers] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState("");
  const [events, setEvents] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Fetch workers
  const fetchWorkers = async () => {
    const res = await fetch(`${API}/api/workers`);
    const json = await res.json();
    if (json.success) setWorkers(json.data);
  };

  // Fetch worker events
  const fetchWorkerBookings = async (workerId) => {
    const res = await fetch(`${API}/api/calendar/worker/${workerId}`);
    const json = await res.json();

    if (json.success) {
      const formattedEvents = json.data.map((b) => ({
        id: b._id,
        title: b.serviceTitle,
        start: `${b.date}T${b.slot}:00`,
        backgroundColor: "#3b82f6",
        borderColor: "#1d4ed8",
      }));
      setEvents(formattedEvents);
    }
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  useEffect(() => {
    if (selectedWorker) {
      fetchWorkerBookings(selectedWorker);
    }
  }, [selectedWorker]);

  // When event dragged → update backend
  const handleEventDrop = async (info) => {
    const bookingId = info.event.id;
    const newDate = info.event.startStr.split("T")[0];
    const newSlot = info.event.startStr.split("T")[1].substring(0, 5);

    const res = await fetch(`${API}/api/calendar/reassign`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bookingId,
        workerId: selectedWorker,
        date: newDate,
        slot: newSlot,
      }),
    });

    const json = await res.json();

    if (json.success) {
      toast.success("Booking rescheduled!");
    } else {
      toast.error("Failed to reschedule");
      info.revert();
    }
  };

  // When event clicked → open modal
  const handleEventClick = (info) => {
    setSelectedEvent({
      id: info.event.id,
      title: info.event.title,
      datetime: info.event.startStr,
    });
    setModalOpen(true);
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Worker Calendar</h1>

      {/* Worker Selector */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Select Worker</InputLabel>
        <Select
          value={selectedWorker}
          label="Select Worker"
          onChange={(e) => setSelectedWorker(e.target.value)}
        >
          {workers.map((w) => (
            <MenuItem key={w._id} value={w._id}>
              {w.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Calendar */}
      {selectedWorker && (
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          height="80vh"
          events={events}
          editable={true}
          eventDrop={handleEventDrop}
          eventClick={handleEventClick}
        />
      )}

      {/* Modal */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>Booking Details</DialogTitle>
        <DialogContent>
          {selectedEvent && (
            <Box>
              <p>
                <strong>Service:</strong> {selectedEvent.title}
              </p>
              <p>
                <strong>Scheduled:</strong>{" "}
                {new Date(selectedEvent.datetime).toLocaleString()}
              </p>
            </Box>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setModalOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
}
