import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  User,
  Phone,
  MapPin,
  CheckCircle,
  AlertCircle,
  Eye,
  Play,
  Flag,
  Search,
  Download,
  RefreshCw
} from "lucide-react";
import WorkerLayout from "../../components/worker/WorkerLayout";
import { Card, Badge, Button, Input } from "../../components/ui";
import toast from "react-hot-toast";

export default function WorkerJobs() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');

  const tabs = [
    { id: 'all', label: 'All Jobs', count: jobs.length },
    { id: 'today', label: 'Today', count: jobs.filter(job => isToday(job.date)).length },
    { id: 'upcoming', label: 'Upcoming', count: jobs.filter(job => isUpcoming(job.date)).length },
    { id: 'completed', label: 'Completed', count: jobs.filter(job => job.status === 'completed').length }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const serviceTypes = [
    { value: 'all', label: 'All Services' },
    { value: 'electrical', label: 'Electrical' },
    { value: 'plumbing', label: 'Plumbing' },
    { value: 'cleaning', label: 'Cleaning' },
    { value: 'repair', label: 'Repair' }
  ];

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    filterJobs();
  }, [jobs, activeTab, searchTerm, statusFilter, serviceFilter, dateRange]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      // Mock data for now
      const mockJobs = [
        {
          _id: '1',
          bookingId: 'BK001',
          serviceTitle: 'Electrical Repair',
          customerName: 'John Doe',
          customerPhone: '+91 9876543210',
          date: new Date().toISOString(),
          slot: '10:00 AM - 12:00 PM',
          status: 'pending',
          address: '123 Main St, Delhi',
          price: 1500,
          serviceType: 'electrical'
        },
        {
          _id: '2',
          bookingId: 'BK002',
          serviceTitle: 'Plumbing Service',
          customerName: 'Jane Smith',
          customerPhone: '+91 9876543211',
          date: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
          slot: '2:00 PM - 4:00 PM',
          status: 'in-progress',
          address: '456 Oak Ave, Mumbai',
          price: 2000,
          serviceType: 'plumbing'
        },
        {
          _id: '3',
          bookingId: 'BK003',
          serviceTitle: 'Home Cleaning',
          customerName: 'Mike Johnson',
          customerPhone: '+91 9876543212',
          date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
          slot: '9:00 AM - 11:00 AM',
          status: 'completed',
          address: '789 Pine Rd, Bangalore',
          price: 800,
          serviceType: 'cleaning'
        }
      ];
      setJobs(mockJobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  const filterJobs = () => {
    let filtered = [...jobs];

    // Tab filter
    if (activeTab === 'today') {
      filtered = filtered.filter(job => isToday(job.date));
    } else if (activeTab === 'upcoming') {
      filtered = filtered.filter(job => isUpcoming(job.date));
    } else if (activeTab === 'completed') {
      filtered = filtered.filter(job => job.status === 'completed');
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.serviceTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.bookingId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(job => job.status === statusFilter);
    }

    // Service filter
    if (serviceFilter !== 'all') {
      filtered = filtered.filter(job => job.serviceType === serviceFilter);
    }

    setFilteredJobs(filtered);
  };

  const isToday = (dateString) => {
    const today = new Date().toDateString();
    return new Date(dateString).toDateString() === today;
  };

  const isUpcoming = (dateString) => {
    const jobDate = new Date(dateString);
    const now = new Date();
    return jobDate > now;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'primary';
      case 'pending': return 'warning';
      case 'cancelled': return 'danger';
      default: return 'secondary';
    }
  };

  const handleStatusUpdate = async (jobId, newStatus) => {
    try {
      // Mock API call
      setJobs(prev => prev.map(job => 
        job._id === jobId ? { ...job, status: newStatus } : job
      ));
      toast.success(`Job status updated to ${newStatus}`);
    } catch (error) {
      toast.error("Failed to update job status");
    }
  };

  const exportJobs = () => {
    const csvData = [
      ["Booking ID", "Service", "Customer", "Phone", "Date", "Time", "Status", "Amount"],
      ...filteredJobs.map(job => [
        job.bookingId,
        job.serviceTitle,
        job.customerName,
        job.customerPhone,
        new Date(job.date).toLocaleDateString(),
        job.slot,
        job.status,
        job.price
      ])
    ];

    const csvContent = csvData.map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "my-jobs.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const JobCard = ({ job, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="p-6 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <Badge variant="outline" size="sm">
                {job.bookingId}
              </Badge>
              <Badge variant={getStatusColor(job.status)}>
                {job.status}
              </Badge>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-1">
              {job.serviceTitle}
            </h3>
            <div className="flex items-center space-x-4 text-sm text-neutral-600">
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>{job.customerName}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Phone className="w-4 h-4" />
                <span>{job.customerPhone}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-neutral-900">₹{job.price}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 mb-4 text-sm text-neutral-600">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date(job.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{job.slot}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4" />
            <span className="truncate">{job.address}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link to={`/worker/jobs/${job._id}`}>
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </Button>
            </Link>
            {job.status === 'pending' && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleStatusUpdate(job._id, 'in-progress')}
              >
                <Play className="w-4 h-4 mr-2" />
                Start Job
              </Button>
            )}
            {job.status === 'in-progress' && (
              <Button
                variant="success"
                size="sm"
                onClick={() => handleStatusUpdate(job._id, 'completed')}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Complete
              </Button>
            )}
          </div>
          <Button variant="ghost" size="sm">
            <Flag className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );

  if (loading) {
    return (
      <WorkerLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="h-8 bg-neutral-200 rounded w-48 animate-pulse"></div>
            <div className="h-10 bg-neutral-200 rounded w-32 animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="p-6">
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
                  <div className="h-6 bg-neutral-200 rounded w-1/2"></div>
                  <div className="h-4 bg-neutral-200 rounded w-full"></div>
                  <div className="h-10 bg-neutral-200 rounded w-full"></div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </WorkerLayout>
    );
  }

  return (
    <WorkerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">My Jobs</h1>
            <p className="text-neutral-600 mt-1">Manage your assigned jobs and tasks</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" onClick={exportJobs}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm" onClick={fetchJobs}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-neutral-200">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                }`}
              >
                {tab.label}
                <span className="ml-2 bg-neutral-100 text-neutral-600 py-0.5 px-2 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Filters */}
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 focus:outline-none"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 focus:outline-none"
            >
              {serviceTypes.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 focus:outline-none"
            >
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </Card>

        {/* Jobs Grid */}
        {filteredJobs.length === 0 ? (
          <Card className="p-12 text-center">
            <AlertCircle className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-neutral-900 mb-2">No jobs found</h3>
            <p className="text-neutral-600">
              {searchTerm || statusFilter !== 'all' || serviceFilter !== 'all'
                ? 'Try adjusting your filters to see more results.'
                : 'No jobs available at the moment.'}
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job, index) => (
              <JobCard key={job._id} job={job} index={index} />
            ))}
          </div>
        )}
      </div>
    </WorkerLayout>
  );
}