import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  User,
  Phone,
  MapPin,
  Clock,
  DollarSign,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Edit,
  Trash2,
  UserPlus,
  RefreshCw,
  Download,
  Filter,
  Search,
  ChevronDown
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import DataTable from "../../components/admin/DataTable";
import StatsCard from "../../components/admin/StatsCard";
import { Button, Card, Badge, Input } from "../../components/ui";
import { useAutoRefresh } from "../../hooks/useAutoRefresh";
import toast from "react-hot-toast";

const API = "http://localhost:5001";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showWorkerModal, setShowWorkerModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedWorker, setSelectedWorker] = useState("");

  // Auto-refresh functionality
  const refreshBookingsData = async (source = 'manual') => {
    console.log(`Bookings refreshed from ${source}`);
    await fetchBookings();
  };

  const { isRefreshing, refreshCount } = useAutoRefresh(
    refreshBookingsData,
    {
      enabled: true,
      onButtonClick: true,
      debounceMs: 2000,
    }
  );

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const [bookingsRes, workersRes] = await Promise.all([
        fetch(`${API}/api/bookings`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API}/api/workers`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      ]);
      
      const [bookingsData, workersData] = await Promise.all([
        bookingsRes.json(),
        workersRes.json()
      ]);
      
      if (bookingsData.success) {
        setBookings(bookingsData.data || []);
      } else {
        toast.error("Failed to fetch bookings");
      }
      
      if (workersData.success) {
        setWorkers(workersData.data || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Calculate booking statistics
  const bookingStats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === "pending").length,
    inProgress: bookings.filter(b => b.status === "in-progress").length,
    completed: bookings.filter(b => b.status === "completed").length,
    cancelled: bookings.filter(b => b.status === "cancelled").length,
    totalRevenue: bookings
      .filter(b => b.status === "completed" && b.paid)
      .reduce((sum, b) => sum + (b.price || 0), 0),
    pendingRevenue: bookings
      .filter(b => b.status === "completed" && !b.paid)
      .reduce((sum, b) => sum + (b.price || 0), 0)
  };

  // Table columns configuration
  const columns = [
    {
      key: "customer",
      title: "Customer",
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <div className="font-medium text-neutral-900">{row.customerName}</div>
            <div className="text-sm text-neutral-500 flex items-center">
              <Phone className="w-3 h-3 mr-1" />
              {row.customerPhone}
            </div>
          </div>
        </div>
      )
    },
    {
      key: "service",
      title: "Service",
      sortable: true,
      render: (value, row) => (
        <div>
          <div className="font-medium text-neutral-900">{row.serviceTitle || "Unknown Service"}</div>
          <div className="text-sm text-neutral-500">{row.serviceCategory}</div>
        </div>
      )
    },
    {
      key: "schedule",
      title: "Schedule",
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-neutral-400" />
          <div>
            <div className="font-medium text-neutral-900">{row.date}</div>
            <div className="text-sm text-neutral-500">{row.slot || "Not scheduled"}</div>
          </div>
        </div>
      )
    },
    {
      key: "status",
      title: "Status",
      sortable: true,
      render: (value) => (
        <Badge 
          variant={
            value === "completed" ? "success" :
            value === "pending" ? "warning" :
            value === "in-progress" ? "primary" :
            value === "cancelled" ? "danger" :
            "secondary"
          }
        >
          {value}
        </Badge>
      )
    },
    {
      key: "worker",
      title: "Worker",
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center space-x-2">
          {row.workerAssigned ? (
            <>
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-neutral-900">{row.workerAssigned}</span>
            </>
          ) : (
            <>
              <AlertCircle className="w-4 h-4 text-yellow-500" />
              <span className="text-neutral-500">Unassigned</span>
            </>
          )}
        </div>
      )
    },
    {
      key: "payment",
      title: "Payment",
      sortable: true,
      render: (value, row) => (
        <div>
          <div className="font-medium text-neutral-900">₹{row.price || 0}</div>
          <Badge variant={row.paid ? "success" : "warning"} size="sm">
            {row.paid ? "Paid" : "Pending"}
          </Badge>
        </div>
      )
    },
    {
      key: "created",
      title: "Created",
      sortable: true,
      render: (value, row) => (
        <div className="text-sm text-neutral-600">
          {new Date(row.createdAt).toLocaleDateString()}
        </div>
      )
    }
  ];

  // Handle booking actions with modals
  const handleViewBooking = (booking) => {
    setSelectedBooking(booking);
    setShowDetails(true);
  };

  const handleStatusUpdate = (booking) => {
    setSelectedBooking(booking);
    setSelectedStatus(booking.status);
    setShowStatusModal(true);
  };

  const handleWorkerAssignment = (booking) => {
    setSelectedBooking(booking);
    setSelectedWorker(booking.workerAssigned || "");
    setShowWorkerModal(true);
  };

  const confirmStatusUpdate = async () => {
    if (!selectedBooking || !selectedStatus) return;
    
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API}/api/bookings/${selectedBooking._id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: selectedStatus }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Status updated successfully");
        fetchBookings();
        setShowStatusModal(false);
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  const confirmWorkerAssignment = async () => {
    if (!selectedBooking || !selectedWorker) return;
    
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API}/api/bookings/${selectedBooking._id}/assign`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ worker: selectedWorker }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Worker assigned successfully");
        fetchBookings();
        setShowWorkerModal(false);
      } else {
        toast.error("Failed to assign worker");
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  const exportBookings = () => {
    const csvData = [
      ["Customer", "Phone", "Service", "Date", "Time", "Status", "Worker", "Amount", "Paid"],
      ...bookings.map(b => [
        b.customerName,
        b.customerPhone,
        b.serviceTitle || "Unknown",
        b.date,
        b.slot || "Not scheduled",
        b.status,
        b.workerAssigned || "Unassigned",
        b.price || 0,
        b.paid ? "Yes" : "No"
      ])
    ];

    const csvContent = csvData.map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bookings-export.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Status and worker options
  const statusOptions = [
    { value: "pending", label: "Pending", color: "yellow" },
    { value: "in-progress", label: "In Progress", color: "blue" },
    { value: "completed", label: "Completed", color: "green" },
    { value: "cancelled", label: "Cancelled", color: "red" }
  ];

  const availableWorkers = workers.filter(w => w.status === "available");

  return (
    <AdminLayout>
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8 mb-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-accent-600 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-neutral-900">Bookings Management</h1>
                <p className="text-neutral-600">Manage all customer bookings and assignments</p>
              </div>
            </div>
            
            {/* Quick Stats Summary */}
            <div className="flex flex-wrap items-center gap-6 mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm font-medium text-neutral-700">
                  {bookingStats.pending} Pending
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium text-neutral-700">
                  {bookingStats.inProgress} In Progress
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-neutral-700">
                  {bookingStats.completed} Completed
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={exportBookings}
              className="bg-white hover:bg-neutral-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            
            <Button
              variant="primary"
              size="sm"
              onClick={() => refreshBookingsData('manual')}
              disabled={isRefreshing}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Bookings"
          value={bookingStats.total}
          icon={<Calendar className="w-6 h-6" />}
          color="primary"
          loading={loading}
        />
        
        <StatsCard
          title="Pending"
          value={bookingStats.pending}
          icon={<Clock className="w-6 h-6" />}
          color="warning"
          loading={loading}
        />
        
        <StatsCard
          title="Completed"
          value={bookingStats.completed}
          change={`${bookingStats.completed > 0 ? ((bookingStats.completed / bookingStats.total) * 100).toFixed(1) : 0}% completion rate`}
          changeType="positive"
          icon={<CheckCircle className="w-6 h-6" />}
          color="success"
          loading={loading}
        />
        
        <StatsCard
          title="Total Revenue"
          value={`₹${bookingStats.totalRevenue.toLocaleString()}`}
          change={`₹${bookingStats.pendingRevenue} pending`}
          changeType="positive"
          icon={<DollarSign className="w-6 h-6" />}
          color="success"
          loading={loading}
        />
      </div>

      {/* Bookings Table */}
      <DataTable
        data={bookings}
        columns={columns}
        loading={loading}
        searchable={true}
        filterable={true}
        exportable={true}
        pagination={true}
        pageSize={15}
        onRowClick={handleViewBooking}
        actions={(row) => (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleViewBooking(row);
              }}
              autoRefresh={true}
              refreshDelay={600}
            >
              <Eye className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleStatusUpdate(row);
              }}
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleWorkerAssignment(row);
              }}
            >
              <UserPlus className="w-4 h-4" />
            </Button>
          </>
        )}
      />

      {/* Booking Details Modal */}
      {showDetails && selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-neutral-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-neutral-900">Booking Details</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDetails(false)}
                >
                  <XCircle className="w-5 h-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div>
                <h3 className="text-lg font-medium text-neutral-900 mb-3">Customer Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-neutral-400" />
                    <div>
                      <p className="font-medium text-neutral-900">{selectedBooking.customerName}</p>
                      <p className="text-sm text-neutral-500">Customer</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-neutral-400" />
                    <div>
                      <p className="font-medium text-neutral-900">{selectedBooking.customerPhone}</p>
                      <p className="text-sm text-neutral-500">Phone</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Info */}
              <div>
                <h3 className="text-lg font-medium text-neutral-900 mb-3">Service Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-neutral-900">{selectedBooking.serviceTitle}</p>
                    <p className="text-sm text-neutral-500">{selectedBooking.serviceCategory}</p>
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">₹{selectedBooking.price || 0}</p>
                    <Badge variant={selectedBooking.paid ? "success" : "warning"} size="sm">
                      {selectedBooking.paid ? "Paid" : "Pending"}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Schedule Info */}
              <div>
                <h3 className="text-lg font-medium text-neutral-900 mb-3">Schedule</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-neutral-400" />
                    <div>
                      <p className="font-medium text-neutral-900">{selectedBooking.date}</p>
                      <p className="text-sm text-neutral-500">Date</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-neutral-400" />
                    <div>
                      <p className="font-medium text-neutral-900">{selectedBooking.slot || "Not scheduled"}</p>
                      <p className="text-sm text-neutral-500">Time</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status and Worker */}
              <div>
                <h3 className="text-lg font-medium text-neutral-900 mb-3">Assignment</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Badge 
                      variant={
                        selectedBooking.status === "completed" ? "success" :
                        selectedBooking.status === "pending" ? "warning" :
                        selectedBooking.status === "in-progress" ? "primary" :
                        selectedBooking.status === "cancelled" ? "danger" :
                        "secondary"
                      }
                    >
                      {selectedBooking.status}
                    </Badge>
                    <p className="text-sm text-neutral-500 mt-1">Status</p>
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">
                      {selectedBooking.workerAssigned || "Unassigned"}
                    </p>
                    <p className="text-sm text-neutral-500">Worker</p>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {selectedBooking.notes && (
                <div>
                  <h3 className="text-lg font-medium text-neutral-900 mb-3">Notes</h3>
                  <p className="text-neutral-600 bg-neutral-50 p-3 rounded-lg">
                    {selectedBooking.notes}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center space-x-3 pt-4 border-t border-neutral-200">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleStatusUpdate(selectedBooking)}
                >
                  Update Status
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleWorkerAssignment(selectedBooking)}
                >
                  Assign Worker
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Status Update Modal */}
      <AnimatePresence>
        {showStatusModal && selectedBooking && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl max-w-md w-full"
            >
              <div className="p-6 border-b border-neutral-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-neutral-900">Update Status</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowStatusModal(false)}
                  >
                    <XCircle className="w-5 h-5" />
                  </Button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <p className="text-sm text-neutral-600 mb-2">
                    Booking for: <span className="font-medium">{selectedBooking.customerName}</span>
                  </p>
                  <p className="text-sm text-neutral-600">
                    Service: <span className="font-medium">{selectedBooking.serviceTitle}</span>
                  </p>
                </div>
                
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-neutral-700">
                    Select Status
                  </label>
                  <div className="space-y-2">
                    {statusOptions.map((option) => (
                      <label
                        key={option.value}
                        className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          selectedStatus === option.value
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-neutral-200 hover:border-neutral-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="status"
                          value={option.value}
                          checked={selectedStatus === option.value}
                          onChange={(e) => setSelectedStatus(e.target.value)}
                          className="sr-only"
                        />
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full bg-${option.color}-500`}></div>
                          <span className="font-medium text-neutral-900">{option.label}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 mt-6">
                  <Button
                    variant="primary"
                    onClick={confirmStatusUpdate}
                    disabled={!selectedStatus}
                    className="flex-1"
                  >
                    Update Status
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowStatusModal(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Worker Assignment Modal */}
      <AnimatePresence>
        {showWorkerModal && selectedBooking && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl max-w-md w-full"
            >
              <div className="p-6 border-b border-neutral-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-neutral-900">Assign Worker</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowWorkerModal(false)}
                  >
                    <XCircle className="w-5 h-5" />
                  </Button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <p className="text-sm text-neutral-600 mb-2">
                    Booking for: <span className="font-medium">{selectedBooking.customerName}</span>
                  </p>
                  <p className="text-sm text-neutral-600">
                    Service: <span className="font-medium">{selectedBooking.serviceTitle}</span>
                  </p>
                </div>
                
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-neutral-700">
                    Select Worker
                  </label>
                  
                  {availableWorkers.length > 0 ? (
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      <label
                        className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          selectedWorker === ""
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-neutral-200 hover:border-neutral-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="worker"
                          value=""
                          checked={selectedWorker === ""}
                          onChange={(e) => setSelectedWorker(e.target.value)}
                          className="sr-only"
                        />
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-neutral-200 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-neutral-500" />
                          </div>
                          <span className="font-medium text-neutral-500">Unassigned</span>
                        </div>
                      </label>
                      
                      {availableWorkers.map((worker) => (
                        <label
                          key={worker._id}
                          className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                            selectedWorker === worker.name
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-neutral-200 hover:border-neutral-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="worker"
                            value={worker.name}
                            checked={selectedWorker === worker.name}
                            onChange={(e) => setSelectedWorker(e.target.value)}
                            className="sr-only"
                          />
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-primary-600" />
                            </div>
                            <div>
                              <span className="font-medium text-neutral-900">{worker.name}</span>
                              <p className="text-sm text-neutral-500">{worker.skills?.join(', ')}</p>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <AlertCircle className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
                      <p className="text-neutral-600">No available workers found</p>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-3 mt-6">
                  <Button
                    variant="primary"
                    onClick={confirmWorkerAssignment}
                    className="flex-1"
                  >
                    Assign Worker
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowWorkerModal(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Debug Info */}
      {process.env.NODE_ENV === 'development' && refreshCount > 0 && (
        <div className="fixed bottom-4 right-4 bg-neutral-800 text-white px-3 py-2 rounded-lg text-xs">
          Bookings Refreshes: {refreshCount}
        </div>
      )}
    </AdminLayout>
  );
}
