import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import toast from "react-hot-toast";

const API = "http://localhost:5001";

export default function Booking() {
  const { id } = useParams();

  const [service, setService] = useState(null);
  const [loadingService, setLoadingService] = useState(true);

  const [date, setDate] = useState("");
  const [allSlots, setAllSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState("");

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const [address, setAddress] = useState("");
  const [savedAddress, setSavedAddress] = useState("");
  const [addressMode, setAddressMode] = useState("new"); // saved | new


  const [notes, setNotes] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [successBooking, setSuccessBooking] = useState(null);

  /* ---------------- FETCH SERVICE ---------------- */
  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoadingService(true);
        const res = await fetch(`${API}/api/services/${id}`);
        const json = await res.json();
        if (json.success) setService(json.data);
        else toast.error("Service not found");
      } catch {
        toast.error("Failed to load service");
      } finally {
        setLoadingService(false);
      }
    };
    fetchService();
  }, [id]);





  /* ---------------- FETCH SLOTS ---------------- */
  useEffect(() => {
    if (!date) {
      setAllSlots([]);
      setBookedSlots([]);
      setSelectedSlot("");
      return;
    }

    const fetchSlots = async () => {
      try {
        setLoadingSlots(true);
        const res = await fetch(
          `${API}/api/bookings/slots?serviceId=${id}&date=${date}`
        );
        const json = await res.json();

        if (json.success) {
          setAllSlots(json.data.allSlots || []);
          setBookedSlots(json.data.bookedSlots || []);
        } else {
          toast.error(json.error || "Failed to load slots");
        }
      } catch {
        toast.error("Error fetching slots");
      } finally {
        setLoadingSlots(false);
      }
    };

    fetchSlots();
  }, [date, id]);

  /* ---------------- SUBMIT BOOKING ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!customerName || !customerPhone || !date || !selectedSlot) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch(`${API}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: null,
          serviceId: id,
          customerName,
          customerPhone,
          address,
          notes,
          date,
          slot: selectedSlot,
        }),
      });

      const json = await res.json();
      if (json.success) {
        toast.success("Booking confirmed");
        setSuccessBooking(json.data);

        // reset form
        setCustomerName("");
        setCustomerPhone("");
        setAddress("");
        setAddressMode("saved");
        setNotes("");
        setDate("");
        setSelectedSlot("");
        setAllSlots([]);
        setBookedSlots([]);
      } else {
        toast.error(json.error || "Booking failed");
      }
    } catch {
      toast.error("Server error");
    } finally {
      setSubmitting(false);
    }
  };

  /* ---------------- FETCH SAVED ADDRESS FROM PROFILE ---------------- */
useEffect(() => {
  const fetchProfileAddress = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return; // not logged in

      const res = await fetch(`${API}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await res.json();
      if (json.success && json.data?.address) {
        setSavedAddress(json.data.address);
        setAddress(json.data.address);
        setAddressMode("saved");
              }
    } catch (err) {
      console.log("No saved address found");
    }
  };

  fetchProfileAddress();
}, []);


  /* ---------------- UI ---------------- */
  if (loadingService)
    return <div className="p-8 text-center">Loading service…</div>;

  if (!service)
    return <div className="p-8 text-center text-red-500">Service not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-8">

        {/* HEADER */}
        <div className="flex justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">{service.title}</h1>
            <p className="text-sm text-gray-600">{service.category}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold">₹{service.price}</p>
            <p className="text-xs text-gray-500">30-minute slots</p>
          </div>
        </div>

        <p className="text-gray-700 mb-6">{service.description}</p>

        {!successBooking ? (
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* DATE */}
            <div>
              <label className="block text-sm font-medium mb-2">Select Date</label>
              <input
                type="date"
                value={date}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border rounded-md px-3 py-2"
                required
              />
            </div>

            {/* SLOTS */}
            <div>
              <label className="block text-sm font-medium mb-2">Select Slot</label>

              {loadingSlots ? (
                <p className="text-sm text-gray-500">Loading slots…</p>
              ) : allSlots.length === 0 ? (
                <p className="text-sm text-gray-500">No slots available</p>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {allSlots.map((slot) => {
                    const taken = bookedSlots.includes(slot);

                    return (
                      <button
                        key={slot}
                        type="button"
                        disabled={taken}
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-2 px-3 rounded-md text-sm border
                          ${
                            taken
                              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                              : selectedSlot === slot
                              ? "bg-blue-600 text-white border-blue-600"
                              : "bg-white"
                          }
                        `}
                      >
                        {slot}
                        {taken && (
                          <div className="text-xs text-red-500">
                            Already Taken
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* CUSTOMER INFO */}
            <input
              placeholder="Your name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
              required
            />

            <input
              type="tel"
              value={customerPhone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, ""); // only digits
                if (value.length <= 10) {
                  setCustomerPhone(value);
                }
              }}
              maxLength={10}
              pattern="[0-9]{10}"
              className="w-full border rounded-md px-3 py-2"
              placeholder="10-digit mobile number"
              required
            />

            {/* ADDRESS */}
<div>
  <label className="block text-sm font-medium mb-2">
    Service Address
  </label>

  {savedAddress && (
    <div className="flex gap-4 mb-2 text-sm">
      <label className="flex items-center gap-2">
        <input
          type="radio"
          checked={addressMode === "saved"}
          onChange={() => {
            setAddressMode("saved");
            setAddress(savedAddress);
          }}
        />
        Use saved address
      </label>

      <label className="flex items-center gap-2">
        <input
          type="radio"
          checked={addressMode === "new"}
          onChange={() => {
            setAddressMode("new");
            setAddress("");
          }}
        />
        Enter new address
            </label>
          </div>
        )}

        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          disabled={addressMode === "saved"}
          className="w-full border rounded-md px-3 py-2 min-h-[90px]"
          placeholder="House no, street, area, city, pincode"
          required
        />
      </div>


            <textarea
              placeholder="Notes (optional)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
            />

            <div className="flex gap-4 items-center">
              <button
                type="submit"
                disabled={submitting}
                className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold disabled:opacity-60"
              >
                {submitting ? "Booking…" : "Confirm Booking"}
              </button>

              <Link to={`/${service.category || ""}`} className="text-sm text-gray-600 hover:underline">
                Back
              </Link>
            </div>
          </form>
        ) : (
          <div className="text-center py-8">
            <h2 className="text-2xl font-semibold mb-2">Booking Confirmed 🎉</h2>
            <p>Booking ID: <b>{successBooking._id}</b></p>
            <p>Date: <b>{successBooking.date}</b></p>
            <p>Slot: <b>{successBooking.slot}</b></p>
          </div>
        )}
      </div>
    </div>
  );
}
