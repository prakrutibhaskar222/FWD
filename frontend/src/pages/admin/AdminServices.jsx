import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  IconButton,
  Box,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import toast from "react-hot-toast";
import AdminLayout from "../../components/admin/AdminLayout";

export default function AdminServices() {
  const API = "http://localhost:5001";

  // SERVICES
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);

  // CATEGORIES
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // SERVICE FORM
  const [serviceModal, setServiceModal] = useState(false);
  const [editServiceId, setEditServiceId] = useState(null);
  const [serviceForm, setServiceForm] = useState({
    title: "",
    category: "",
    price: "",
    description: "",
    duration: "",
    features: "",
  });

  // CATEGORY FORM
  const [categoryModal, setCategoryModal] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [categoryForm, setCategoryForm] = useState({
    key: "",
    name: "",
    icon: "",
    description: "",
    sortOrder: 0,
  });

  // FETCH SERVICES
  const fetchServices = async () => {
    setLoadingServices(true);
    const res = await fetch(`${API}/api/services`);
    const json = await res.json();
    if (json.success) setServices(json.data);
    setLoadingServices(false);
  };

  // FETCH CATEGORIES
  const fetchCategories = async () => {
    setLoadingCategories(true);
    const res = await fetch(`${API}/api/categories`);
    const json = await res.json();
    if (json.success) {
      setCategories(json.data.sort((a, b) => a.sortOrder - b.sortOrder));
    }
    setLoadingCategories(false);
  };

  useEffect(() => {
    fetchServices();
    fetchCategories();
  }, []);

  // ========== SERVICE CRUD ==========
  const openAddService = () => {
    setEditServiceId(null);
    setServiceForm({
      title: "",
      category: "",
      price: "",
      description: "",
      duration: "",
      features: "",
    });
    setServiceModal(true);
  };

  const openEditService = (service) => {
    setEditServiceId(service._id);
    setServiceForm({
      title: service.title,
      category: service.category,
      price: service.price,
      description: service.description,
      duration: service.duration,
      features: (service.features || []).join(" "),
    });
    setServiceModal(true);
  };

  const saveService = async () => {
    const payload = {
      ...serviceForm,
      price: Number(serviceForm.price),
      features: serviceForm.features.split(" ").filter(Boolean),
    };

    const url = editServiceId
      ? `${API}/api/services/${editServiceId}`
      : `${API}/api/services/create`;

    const method = editServiceId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const json = await res.json();

    if (json.success) {
      toast.success(editServiceId ? "Updated" : "Created");
      fetchServices();
      setServiceModal(false);
    } else toast.error("Failed");
  };

  const deleteService = async (id) => {
    if (!confirm("Delete service?")) return;
    await fetch(`${API}/api/services/${id}`, { method: "DELETE" });
    toast.success("Deleted");
    fetchServices();
  };

  // ========== CATEGORY CRUD ==========
  const openAddCategory = () => {
    setCategoryForm({
      key: "",
      name: "",
      icon: "",
      description: "",
      sortOrder: 0,
    });
    setEditCategory(null);
    setCategoryModal(true);
  };

  const openEditCategoryModal = (cat) => {
    setEditCategory(cat._id);
    setCategoryForm({
      key: cat.key,
      name: cat.name,
      icon: cat.icon,
      description: cat.description,
      sortOrder: cat.sortOrder,
    });
    setCategoryModal(true);
  };

  const saveCategory = async () => {
    const url = editCategory
      ? `${API}/api/categories/${editCategory}`
      : `${API}/api/categories/create`;

    const method = editCategory ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(categoryForm),
    });

    const json = await res.json();

    if (json.success) {
      toast.success(editCategory ? "Category Updated" : "Category Created");
      fetchCategories();
      setCategoryModal(false);
    } else toast.error("Failed to save category");
  };

  const deleteCategory = async (id) => {
    if (!confirm("Delete category?")) return;
    await fetch(`${API}/api/categories/${id}`, { method: "DELETE" });
    toast.success("Category Deleted");
    fetchCategories();
  };

  return (
    <AdminLayout>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Manage Services & Categories</Typography>

        <Box>
          <Button onClick={openAddCategory} variant="outlined" sx={{ mr: 2 }}>
            Add Category
          </Button>
          <Button onClick={openAddService} variant="contained">
            Add Service
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3} mt={3}>
        {/* SERVICES LIST */}
        <Grid item xs={12} md={8}>
          <Typography variant="h6">Services</Typography>

          {loadingServices ? (
            <CircularProgress />
          ) : (
            <Grid container spacing={2}>
              {services.map((s) => (
                <Grid item xs={12} sm={6} key={s._id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">{s.title}</Typography>
                      <Typography color="gray">{s.category}</Typography>
                      <Typography>₹{s.price}</Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {s.description}
                      </Typography>

                      <Box mt={2}>
                        <IconButton onClick={() => openEditService(s)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => deleteService(s._id)}
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>

        {/* CATEGORY LIST */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6">Categories</Typography>

          {loadingCategories ? (
            <CircularProgress />
          ) : (
            categories.map((cat) => (
              <Card key={cat._id} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6">
                    {cat.icon} {cat.name}
                  </Typography>
                  <Typography variant="body2">/{cat.key}</Typography>
                  <Typography variant="body2" color="gray">
                    {cat.description}
                  </Typography>
                  <Typography variant="body2">
                    Sort Order: {cat.sortOrder}
                  </Typography>

                  <Box mt={2}>
                    <IconButton onClick={() => openEditCategoryModal(cat)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => deleteCategory(cat._id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            ))
          )}
        </Grid>
      </Grid>

      {/* SERVICE MODAL */}
      <Dialog open={serviceModal} onClose={() => setServiceModal(false)} fullWidth>
        <DialogTitle>{editServiceId ? "Edit Service" : "Add Service"}</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={2}>
            <TextField
              label="Title"
              value={serviceForm.title}
              onChange={(e) =>
                setServiceForm({ ...serviceForm, title: e.target.value })
              }
            />
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={serviceForm.category}
                label="Category"
                onChange={(e) =>
                  setServiceForm({ ...serviceForm, category: e.target.value })
                }
              >
                {categories.map((c) => (
                  <MenuItem key={c.key} value={c.key}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Price"
              type="number"
              value={serviceForm.price}
              onChange={(e) =>
                setServiceForm({ ...serviceForm, price: e.target.value })
              }
            />

            <TextField
              label="Duration"
              value={serviceForm.duration}
              onChange={(e) =>
                setServiceForm({ ...serviceForm, duration: e.target.value })
              }
            />

            <TextField
              label="Description"
              multiline
              rows={3}
              value={serviceForm.description}
              onChange={(e) =>
                setServiceForm({ ...serviceForm, description: e.target.value })
              }
            />

            <TextField
              label="Features (space separated)"
              value={serviceForm.features}
              onChange={(e) =>
                setServiceForm({ ...serviceForm, features: e.target.value })
              }
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setServiceModal(false)}>Cancel</Button>
          <Button variant="contained" onClick={saveService}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* CATEGORY MODAL */}
      <Dialog open={categoryModal} onClose={() => setCategoryModal(false)} fullWidth>
        <DialogTitle>
          {editCategory ? "Edit Category" : "Add Category"}
        </DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={2}>
            <TextField
              label="Key"
              disabled={!!editCategory}
              value={categoryForm.key}
              onChange={(e) =>
                setCategoryForm({ ...categoryForm, key: e.target.value })
              }
            />

            <TextField
              label="Name"
              value={categoryForm.name}
              onChange={(e) =>
                setCategoryForm({ ...categoryForm, name: e.target.value })
              }
            />

            <TextField
              label="Icon (emoji)"
              value={categoryForm.icon}
              onChange={(e) =>
                setCategoryForm({ ...categoryForm, icon: e.target.value })
              }
            />

            <TextField
              label="Description"
              multiline
              rows={2}
              value={categoryForm.description}
              onChange={(e) =>
                setCategoryForm({ ...categoryForm, description: e.target.value })
              }
            />

            <TextField
              label="Sort Order"
              type="number"
              value={categoryForm.sortOrder}
              onChange={(e) =>
                setCategoryForm({ ...categoryForm, sortOrder: Number(e.target.value) })
              }
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setCategoryModal(false)}>Cancel</Button>
          <Button variant="contained" onClick={saveCategory}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
}
