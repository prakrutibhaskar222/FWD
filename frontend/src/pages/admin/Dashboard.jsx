// src/pages/admin/AdminDashboardPro.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
  CartesianGrid,
  Tooltip as ReTooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis
} from "recharts";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  IconButton,
  Drawer,
  Divider,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import DownloadIcon from "@mui/icons-material/Download";
import AssignIcon from "@mui/icons-material/PersonAdd";
import PaidIcon from "@mui/icons-material/Paid";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import AdminLayout from "../../components/admin/AdminLayout";
import toast from "react-hot-toast";

// Rest of your code remains the same...
const API = "http://localhost:5001";
const COLORS = ["#4B8CF5", "#1BC47D", "#FFB020", "#FF6B6B", "#9C6CFF"];


function isoToday() {
  return new Date().toISOString().split("T")[0];
}

export default function Dashboard() {
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // filters
  const [serviceFilter, setServiceFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [start, setStart] = useState(""); // YYYY-MM-DD
  const [end, setEnd] = useState("");

  // flyout (booking details)
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeBooking, setActiveBooking] = useState(null);

  // assign modal (create quick worker or assign existing)
  const [assignOpen, setAssignOpen] = useState(false);
  const [assignWorker, setAssignWorker] = useState("");

  // reschedule modal
  const [resOpen, setResOpen] = useState(false);
  const [resDate, setResDate] = useState("");
  const [resSlots, setResSlots] = useState([]);
  const [resSelected, setResSelected] = useState("");
  const [loadingSlots, setLoadingSlots] = useState(false);

  // presets
  const applyPreset = (preset) => {
    const today = new Date();
    if (preset === "today") {
      const iso = today.toISOString().split("T")[0];
      setStart(iso); setEnd(iso);
    } else if (preset === "7d") {
      const s = new Date(); s.setDate(today.getDate() - 6);
      setStart(s.toISOString().split("T")[0]); setEnd(today.toISOString().split("T")[0]);
    } else if (preset === "30d") {
      const s = new Date(); s.setDate(today.getDate() - 29);
      setStart(s.toISOString().split("T")[0]); setEnd(today.toISOString().split("T")[0]);
    } else {
      setStart(""); setEnd("");
    }
  };

  const fetchServices = async () => {
    try {
      const res = await fetch(`${API}/api/services`);
      const j = await res.json();
      if (j.success) setServices((j.data || []).sort((a,b) => (a.title||"").localeCompare(b.title||"")));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const qs = [];
      if (start) qs.push(`start=${start}`);
      if (end) qs.push(`end=${end}`);
      if (serviceFilter) qs.push(`serviceId=${serviceFilter}`);
      if (statusFilter && statusFilter !== "all") qs.push(`status=${statusFilter}`);
      const url = `${API}/api/bookings${qs.length ? ("?"+qs.join("&")) : ""}`;
      const res = await fetch(url);
      const j = await res.json();
      if (j.success) setBookings(j.data || []);
      else toast.error(j.error || "Failed to load bookings");
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
    fetchBookings();
  }, []);

  // re-fetch when filter inputs changed
  useEffect(() => {
    // small debounce could be added; for now fetch directly
    fetchBookings();
  }, [start, end, serviceFilter, statusFilter]);

  const metrics = useMemo(() => {
    const total = bookings.length;
    const completed = bookings.filter(b => b.status === "completed").length;
    const revenuePaid = bookings.reduce((acc, b) => acc + (b.paid ? (b.price || 0) : 0), 0);
    const revenueUnpaid = bookings.reduce((acc, b) => acc + (!b.paid ? (b.price || 0) : 0), 0);
    const todayCount = bookings.filter(b => b.date === isoToday()).length;
    return { total, completed, revenuePaid, revenueUnpaid, todayCount };
  }, [bookings]);

  // charts: status distribution, bookings per day (last 14), top services
  const statusDistribution = useMemo(() => {
    const map = {};
    bookings.forEach(b => map[b.status] = (map[b.status]||0) + 1);
    return Object.keys(map).map(k => ({ name: k, value: map[k] }));
  }, [bookings]);

  const bookingsPerDay = useMemo(() => {
    const N = 14;
    const bucket = {};
    for (let i = N-1; i>=0; i--) {
      const d = new Date(); d.setDate(d.getDate()-i);
      const k = d.toISOString().split("T")[0];
      bucket[k] = 0;
    }
    bookings.forEach(b => { if (bucket[b.date] !== undefined) bucket[b.date]++; });
    return Object.keys(bucket).map(k => ({ date: k.slice(5), count: bucket[k] }));
  }, [bookings]);

  const topServices = useMemo(() => {
    const map = {};
    bookings.forEach(b => { const id = String(b.serviceId); map[id] = (map[id]||0) + 1; });
    const arr = Object.entries(map).map(([id, count]) => {
      const svc = services.find(s => String(s._id) === id);
      return { id, name: svc ? svc.title : "Unknown", count };
    }).sort((a,b) => b.count - a.count).slice(0,8);
    return arr;
  }, [bookings, services]);

  // open booking details flyout
  const openBooking = async (bookingId) => {
    try {
      const res = await fetch(`${API}/api/bookings/${bookingId}`);
      const j = await res.json();
      if (j.success) {
        setActiveBooking(j.data);
        setDrawerOpen(true);
      } else toast.error(j.error || "Failed to load booking");
    } catch (err) {
      toast.error("Server error");
    }
  };

  // assign worker action (calls backend /api/bookings/:id/assign)
  const doAssignWorker = async () => {
    if (!assignWorker || !activeBooking) return toast.error("Enter worker name/id");
    try {
      const res = await fetch(`${API}/api/bookings/${activeBooking._id}/assign`, {
        method: "PUT",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ worker: assignWorker })
      });
      const j = await res.json();
      if (j.success) {
        toast.success("Worker assigned");
        setAssignOpen(false);
        // refresh active booking details
        openBooking(activeBooking._id);
        fetchBookings();
      } else toast.error(j.error || "Failed to assign");
    } catch (err) { toast.error("Server error"); }
  };

  // mark booking as paid
  const doMarkPaid = async () => {
    if (!activeBooking) return;
    try {
      const res = await fetch(`${API}/api/bookings/${activeBooking._id}/markpaid`, {
        method: "PUT",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ provider: "admin", transactionId: "MANUAL-"+Date.now(), amount: activeBooking.price || 0, currency: "INR" })
      });
      const j = await res.json();
      if (j.success) {
        toast.success("Marked paid");
        openBooking(activeBooking._id);
        fetchBookings();
      } else toast.error(j.error || "Failed");
    } catch (err) { toast.error("Server error"); }
  };

  // cancel booking
  const doCancel = async (id) => {
    if (!confirm("Cancel booking?")) return;
    try {
      const res = await fetch(`${API}/api/bookings/${id}/cancel`, { method: "PUT" });
      const j = await res.json();
      if (j.success) {
        toast.success("Cancelled");
        setDrawerOpen(false);
        fetchBookings();
      } else toast.error(j.error || "Failed");
    } catch (err) { toast.error("Server error"); }
  };

  // open reschedule modal
  const openRescheduleFor = (b) => {
    setActiveBooking(b);
    setResOpen(true);
    setResDate("");
    setResSlots([]);
    setResSelected("");
  };

  // fetch slots for reschedule
  useEffect(() => {
    if (!resDate || !activeBooking) return;
    const fetchSlots = async () => {
      try {
        setLoadingSlots(true);
        const res = await fetch(`${API}/api/bookings/slots?serviceId=${activeBooking.serviceId}&date=${resDate}`);
        const j = await res.json();
        if (j.success) {
          if (Array.isArray(j.data)) setResSlots(j.data);
          else if (j.data.availableSlots) setResSlots(j.data.availableSlots);
          else setResSlots(j.data || []);
        } else {
          toast.error(j.error || "No slots");
        }
      } catch (err) {
        toast.error("Server error");
      } finally {
        setLoadingSlots(false);
      }
    };
    fetchSlots();
  }, [resDate, activeBooking]);

  const doReschedule = async () => {
    if (!activeBooking || !resDate || !resSelected) return toast.error("Choose new date & slot");
    try {
      const res = await fetch(`${API}/api/bookings/${activeBooking._id}/reschedule`, {
        method: "PUT",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ date: resDate, slot: resSelected })
      });
      const j = await res.json();
      if (j.success) {
        toast.success("Rescheduled");
        setResOpen(false);
        setDrawerOpen(false);
        fetchBookings();
      } else toast.error(j.error || "Failed to reschedule");
    } catch (err) { toast.error("Server error"); }
  };

  // export CSV (same CSV helper as before)
  const csvDownload = (filename, rows) => {
    if (!rows.length) return toast.error("No data");
    const csv = [
      Object.keys(rows[0]).join(","), 
      ...rows.map(r => Object.values(r).map(v => `"${String(v || "") .replace(/"/g,'""')}"`).join(","))
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AdminLayout>
      <Box mb={4} className="flex justify-between items-center">
        <Typography variant="h4" fontWeight={700}>Admin Dashboard</Typography>
        <Box display="flex" gap={2}>
          <Button startIcon={<RefreshIcon />} onClick={fetchBookings}>Refresh</Button>
          <Button variant="contained" startIcon={<DownloadIcon />} onClick={() => csvDownload("bookings.csv", bookings)}>Export CSV</Button>
        </Box>
      </Box>

      {/* Filters */}
      <Card className="mb-6"><CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2">Date range</Typography>
            <Box display="flex" gap={2} alignItems="center">
              <TextField type="date" value={start} onChange={(e)=>setStart(e.target.value)} />
              <TextField type="date" value={end} onChange={(e)=>setEnd(e.target.value)} />
              <Select value="" onChange={(e)=>applyPreset(e.target.value)} displayEmpty>
                <MenuItem value="">Presets</MenuItem>
                <MenuItem value="today">Today</MenuItem>
                <MenuItem value="7d">Last 7 days</MenuItem>
                <MenuItem value="30d">Last 30 days</MenuItem>
                <MenuItem value="clear">Clear</MenuItem>
              </Select>
            </Box>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="subtitle2">Service</Typography>
            <Select fullWidth value={serviceFilter} onChange={(e)=>setServiceFilter(e.target.value)}>
              <MenuItem value="">All services</MenuItem>
              {services.map(s => <MenuItem key={s._id} value={s._id}>{s.title}</MenuItem>)}
            </Select>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="subtitle2">Status</Typography>
            <Select fullWidth value={statusFilter} onChange={(e)=>setStatusFilter(e.target.value)}>
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="in-progress">In Progress</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={12} md={2}>
            <Typography variant="subtitle2">Quick</Typography>
            <Box display="flex" gap={1}>
              <Button onClick={()=>{setStart(""); setEnd(""); setServiceFilter(""); setStatusFilter("all");}}>Reset</Button>
            </Box>
          </Grid>
        </Grid>
      </CardContent></Card>

      {/* Metrics and charts */}
      <Grid container spacing={3} className="mb-6">
        <Grid item xs={12} md={3}><Card><CardContent>
          <Typography variant="subtitle2">Total Bookings</Typography>
          <Typography variant="h5">{metrics.total}</Typography>
        </CardContent></Card></Grid>

        <Grid item xs={12} md={3}><Card><CardContent>
          <Typography variant="subtitle2">Completed</Typography>
          <Typography variant="h5">{metrics.completed}</Typography>
        </CardContent></Card></Grid>

        <Grid item xs={12} md={3}><Card><CardContent>
          <Typography variant="subtitle2">Revenue (paid)</Typography>
          <Typography variant="h5">₹{metrics.revenuePaid || 0}</Typography>
          <Typography variant="caption">Unpaid: ₹{metrics.revenueUnpaid || 0}</Typography>
        </CardContent></Card></Grid>

        <Grid item xs={12} md={3}><Card><CardContent>
          <Typography variant="subtitle2">Today</Typography>
          <Typography variant="h5">{metrics.todayCount}</Typography>
        </CardContent></Card></Grid>
      </Grid>

      <Grid container spacing={3} className="mb-6">
        <Grid item xs={12} md={4}><Card><CardContent style={{height:300}}>
          <Typography>Status Distribution</Typography>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={statusDistribution} dataKey="value" nameKey="name" outerRadius={80} innerRadius={40}>
                {statusDistribution.map((e,i)=><Cell key={i} fill={COLORS[i%COLORS.length]} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </CardContent></Card></Grid>

        <Grid item xs={12} md={5}><Card><CardContent style={{height:300}}>
          <Typography>Bookings (last 14 days)</Typography>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={bookingsPerDay}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false}/>
              <ReTooltip />
              <Line type="monotone" dataKey="count" stroke="#4B8CF5" strokeWidth={2}/>
            </LineChart>
          </ResponsiveContainer>
        </CardContent></Card></Grid>

        <Grid item xs={12} md={3}><Card><CardContent style={{height:300}}>
          <Typography>Top Services</Typography>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={topServices}>
              <XAxis dataKey="name" tick={{fontSize:12}}/>
              <YAxis allowDecimals={false}/>
              <ReTooltip />
              <Bar dataKey="count" fill="#1BC47D" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent></Card></Grid>
      </Grid>

      {/* Recent bookings table */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>Recent Bookings</Typography>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Created</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Service</TableCell>
                <TableCell>Slot</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Worker</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {bookings.map(b => (
                <TableRow key={b._id}>
                  <TableCell>{new Date(b.createdAt).toLocaleString()}</TableCell>
                  <TableCell>
                    <div style={{fontWeight:600}}>{b.customerName}</div>
                    <div style={{fontSize:12, color:"#666"}}>{b.customerPhone}</div>
                  </TableCell>
                  <TableCell>{b.serviceTitle || "—"}</TableCell>
                  <TableCell>{b.date} {b.slot}</TableCell>
                  <TableCell>{b.status}</TableCell>
                  <TableCell>{b.workerAssigned || "—"}</TableCell>
                  <TableCell>{b.paid ? "Yes" : "No"}</TableCell>
                  <TableCell>
                    <Button size="small" onClick={() => openBooking(b._id)}>Open</Button>
                    <IconButton size="small" onClick={() => { setActiveBooking(b); setAssignOpen(true); }}>
                      <AssignIcon />
                    </IconButton>
                    <IconButton size="small" onClick={() => { setActiveBooking(b); doMarkPaid(); }}>
                      <PaidIcon />
                    </IconButton>
                    <IconButton size="small" onClick={() => doCancel(b._id)}><CancelIcon/></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Booking details drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box width={520} p={3}>
          {!activeBooking ? <div>Loading…</div> : (
            <>
              <Typography variant="h6">{activeBooking.serviceTitle}</Typography>
              <Typography variant="body2" color="textSecondary">{activeBooking.serviceCategory}</Typography>
              <Divider className="my-3"/>
              <Typography variant="subtitle2">Customer</Typography>
              <Typography>{activeBooking.customerName} • {activeBooking.customerPhone}</Typography>
              <Typography variant="body2" color="textSecondary">Notes: {activeBooking.notes || "—"}</Typography>

              <Divider className="my-3"/>

              <Typography variant="subtitle2">Schedule</Typography>
              <Typography>{activeBooking.date} • {activeBooking.slot}</Typography>

              <Typography variant="subtitle2" className="mt-3">Status</Typography>
              <Select value={activeBooking.status || "pending"} onChange={async (e)=>{
                const status = e.target.value;
                const r = await fetch(`${API}/api/bookings/${activeBooking._id}/status`, {
                  method:"PUT", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ status })
                });
                const j = await r.json(); if (j.success) { toast.success("Updated"); openBooking(activeBooking._id); fetchBookings(); } else toast.error(j.error || "Failed");
              }}>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="in-progress">In Progress</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
              </Select>

              <Divider className="my-3"/>

              <Typography variant="subtitle2">Worker</Typography>
              <Typography>{activeBooking.workerAssigned || "—"}</Typography>
              <Box mt={1} display="flex" gap={1}>
                <Button variant="outlined" onClick={() => setAssignOpen(true)}>Assign</Button>
              </Box>

              <Divider className="my-3"/>

              <Box display="flex" gap={2}>
                <Button variant="contained" color="primary" onClick={() => { setResOpen(true); }}>Reschedule</Button>
                <Button variant="outlined" color="success" onClick={() => doMarkPaid()}>Mark Paid</Button>
                <Button variant="outlined" color="error" onClick={() => doCancel(activeBooking._id)}>Cancel</Button>
              </Box>
            </>
          )}
        </Box>
      </Drawer>

      {/* Assign worker dialog */}
      <Dialog open={assignOpen} onClose={() => setAssignOpen(false)}>
        <DialogTitle>Assign Worker</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Worker name or ID" value={assignWorker} onChange={(e)=>setAssignWorker(e.target.value)} />
          <Typography variant="caption">You can also store worker id if you have a Worker model</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAssignOpen(false)}>Close</Button>
          <Button onClick={doAssignWorker} variant="contained">Assign</Button>
        </DialogActions>
      </Dialog>

      {/* Reschedule dialog */}
      <Dialog open={resOpen} onClose={() => setResOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Reschedule booking</DialogTitle>
        <DialogContent>
          <TextField type="date" fullWidth value={resDate} onChange={(e)=>setResDate(e.target.value)} />
          <Box mt={2}>
            {loadingSlots ? <div>Loading slots…</div> : (
              <Box display="grid" gridTemplateColumns="repeat(3,1fr)" gap={2}>
                {resSlots.map(s => <Button key={s} variant={resSelected===s ? "contained" : "outlined"} onClick={()=>setResSelected(s)}>{s}</Button>)}
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setResOpen(false)}>Close</Button>
          <Button onClick={doReschedule} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
}
