// src/pages/admin/AdminWorkers.jsx

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  IconButton,
  Box,
  CircularProgress,
  Chip
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import AdminLayout from "../../components/admin/AdminLayout";
import toast from "react-hot-toast";

export default function AdminWorkers() {
  const API = "http://localhost:5001";

  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal & form
  const [open, setOpen] = useState(false);
  const [editWorkerId, setEditWorkerId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    skills: "",
    status: "available",
  });

  // Fetch all workers
  const fetchWorkers = async () => {
    try {
      const res = await fetch(`${API}/api/workers`);
      const data = await res.json();

      if (data.success) {
        setWorkers(data.data);
      } else {
        toast.error("Failed to load workers");
      }
    } catch (err) {
      toast.error("Server error loading workers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  // Open modal for new worker
  const openAdd = () => {
    setEditWorkerId(null);
    setForm({
      name: "",
      phone: "",
      skills: "",
      status: "available",
    });
    setOpen(true);
  };

  // Open modal for editing
  const openEdit = (worker) => {
    setEditWorkerId(worker._id);
    setForm({
      name: worker.name,
      phone: worker.phone,
      skills: worker.skills.join(", "),
      status: worker.status,
    });
    setOpen(true);
  };

  // Save worker (create or update)
  const saveWorker = async () => {
    if (!form.name || !form.phone) {
      toast.error("Name & Phone are required");
      return;
    }

    const payload = {
      name: form.name,
      phone: form.phone,
      skills: form.skills.split(",").map((s) => s.trim()),
      status: form.status,
    };

    try {
      const url = editWorkerId
        ? `${API}/api/workers/${editWorkerId}`
        : `${API}/api/workers/create`;

      const method = editWorkerId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        toast.success(editWorkerId ? "Worker updated!" : "Worker added!");
        setOpen(false);
        fetchWorkers();
      } else {
        toast.error(data.error || "Failed");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  // Delete worker
  const deleteWorker = async (id) => {
    if (!confirm("Delete this worker?")) return;

    try {
      const res = await fetch(`${API}/api/workers/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Worker deleted");
        fetchWorkers();
      } else {
        toast.error("Failed to delete worker");
      }
    } catch {
      toast.error("Server error");
    }
  };

  return (
    <AdminLayout>
      <Box className="mb-6 flex items-center justify-between">
        <Typography variant="h4" fontWeight={700}>
          Manage Workers
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={openAdd}
        >
          Add Worker
        </Button>
      </Box>

      {/* Workers List */}
      {loading ? (
        <div className="flex justify-center mt-10">
          <CircularProgress />
        </div>
      ) : workers.length === 0 ? (
        <Typography>No workers added yet.</Typography>
      ) : (
        <Grid container spacing={3}>
          {workers.map((worker) => (
            <Grid xs={12} sm={6} md={4} key={worker._id}>
              <Card sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Box className="flex justify-between">
                    <Typography variant="h6">{worker.name}</Typography>

                    <Box>
                      <IconButton onClick={() => openEdit(worker)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => deleteWorker(worker._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>

                  <Typography className="text-gray-700">
                    📞 {worker.phone}
                  </Typography>

                  <Typography className="mt-2 font-semibold">
                    Skills:
                  </Typography>
                  <Box className="flex flex-wrap gap-1">
                    {worker.skills.map((s, i) => (
                      <Chip key={i} label={s} size="small" />
                    ))}
                  </Box>

                  <Typography className="mt-3 font-semibold">
                    Status:{" "}
                    <span
                      className={
                        worker.status === "available"
                          ? "text-green-600"
                          : worker.status === "busy"
                          ? "text-orange-600"
                          : "text-gray-500"
                      }
                    >
                      {worker.status}
                    </span>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Worker Modal */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>
          {editWorkerId ? "Edit Worker" : "Add Worker"}
        </DialogTitle>

        <DialogContent>
          <Box mt={2} className="flex flex-col gap-3">

            <TextField
              label="Worker Name"
              fullWidth
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <TextField
              label="Phone Number"
              fullWidth
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            <TextField
              label="Skills (comma separated)"
              fullWidth
              value={form.skills}
              onChange={(e) => setForm({ ...form, skills: e.target.value })}
            />

            {/* Status */}
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={form.status}
                label="Status"
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value })
                }
              >
                <MenuItem value="available">Available</MenuItem>
                <MenuItem value="busy">Busy</MenuItem>
                <MenuItem value="on-leave">On Leave</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={saveWorker}>
            {editWorkerId ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
}
