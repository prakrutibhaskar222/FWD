import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import toast from "react-hot-toast";

/**
 * Booking.jsx
 * - shows service info (fetched)
 * - select date -> fetch available slots
 * - pick slot, fill customer details
 * - confirm booking (POST /api/bookings/create)
 */

const API = "http://localhost:5001";

export default function Booking() {
  const { id } = useParams(); // service id
  const [service, setService] = useState(null);
  const [loadingService, setLoadingService] = useState(true);

  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState("");

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [notes, setNotes] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [successBooking, setSuccessBooking] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoadingService(true);
        const res = await fetch(`${API}/api/services/${id}`);
        const json = await res.json();
        if (json.success) setService(json.data);
        else toast.error("Service not found");
      } catch (err) {
        console.error(err);
        toast.error("Failed to load service");
      } finally {
        setLoadingService(false);
      }
    };
    fetchService();
  }, [id]);

  useEffect(() => {
    if (!date) {
      setSlots([]);
      setSelectedSlot("");
      return;
    }

    const fetchSlots = async () => {
      try {
        setLoadingSlots(true);
        const res = await fetch(`${API}/api/bookings/slots?serviceId=${id}&date=${date}`);
        const json = await res.json();
        if (json.success) {
          // compatible with either {data: ["10:00", ...]} or {data: {availableSlots: [...], ...}}
          const d = json.data;
          if (Array.isArray(d)) setSlots(d);
          else if (d.availableSlots) setSlots(d.availableSlots);
          else if (d) setSlots(d); // fallback
        } else {
          setSlots([]);
          toast.error(json.error || "Could not load slots");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch slots");
      } finally {
        setLoadingSlots(false);
      }
    };

    fetchSlots();
  }, [date, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !date || !selectedSlot) {
      toast.error("Please fill required fields and select a slot");
      return;
    }

    const payload = {
      userId: null, // keep null or fill with real user id later
      serviceId: id,
      customerName,
      customerPhone,
      notes,
      date,
      slot: selectedSlot,
    };

    try {
      setSubmitting(true);
      const res = await fetch(`${API}/api/bookings/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.success) {
        toast.success("Booking confirmed");
        setSuccessBooking(json.data);
        // clear form
        setCustomerName("");
        setCustomerPhone("");
        setNotes("");
        setDate("");
        setSelectedSlot("");
        setSlots([]);
      } else {
        toast.error(json.error || "Booking failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error during booking");
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingService) return <div className="p-8 text-center">Loading service…</div>;
  if (!service) return <div className="p-8 text-center text-red-500">Service not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">{service.title}</h1>
            <p className="text-sm text-gray-600">{service.category}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold">₹{service.price}</p>
            <p className="text-xs text-gray-500">Duration: {service.duration || 60} mins</p>
          </div>
        </div>

        <p className="text-gray-700 mb-6">{service.description}</p>

        {!successBooking ? (
          <>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Date */}
              <div>
                <label className="block text-sm font-medium mb-2">Select Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full border rounded-md px-3 py-2"
                  required
                />
              </div>

              {/* Slots */}
              <div>
                <label className="block text-sm font-medium mb-2">Available Slots</label>

                {loadingSlots ? (
                  <div className="p-4 text-center text-sm text-gray-600">Loading slots…</div>
                ) : slots.length === 0 ? (
                  <div className="p-3 text-sm text-gray-500">No slots available for selected date</div>
                ) : (
                  <div className="grid grid-cols-3 gap-2">
                    {slots.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedSlot(s)}
                        className={`py-2 px-3 rounded-md text-sm border ${
                          selectedSlot === s ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-800"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Customer info */}
              <div>
                <label className="block text-sm font-medium mb-2">Your name</label>
                <input
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full border rounded-md px-3 py-2"
                  placeholder="Full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <input
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full border rounded-md px-3 py-2"
                  placeholder="Mobile number"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Notes (optional)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 min-h-[80px]"
                  placeholder="Anything we should know?"
                />
              </div>

              <div className="flex gap-3 items-center">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold disabled:opacity-60"
                >
                  {submitting ? "Booking…" : "Confirm Booking"}
                </button>

                <Link to={`/${service.category || ""}`} className="text-sm text-gray-600 hover:underline">
                  Back to category
                </Link>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <h2 className="text-2xl font-semibold mb-2">Booking Confirmed</h2>
            <p className="text-gray-700 mb-4">Booking ID: <strong>{successBooking._id}</strong></p>
            <p className="text-gray-700">Date: <strong>{successBooking.date}</strong></p>
            <p className="text-gray-700 mb-6">Slot: <strong>{successBooking.slot}</strong></p>
            <Link to="/admin/bookings" className="text-blue-600 hover:underline">View in admin</Link>
          </div>
        )}
      </div>
    </div>
  );
}
