import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  User,
  Phone,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  CheckCircle,
  Play,
  Pause,
  Flag,
  MessageSquare,
  Navigation,
  AlertTriangle,
  RefreshCw,
  Save,
  X
} from "lucide-react";
import WorkerLayout from "../../components/worker/WorkerLayout";
import { Card, Button, Badge, Input, Alert } from "../../components/ui";
import toast from "react-hot-toast";

export default function  JobDetail() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notes, setNotes] = useState('');
  const [showAddNote, setShowAddNote] = useState(false);
  const [statusHistory, setStatusHistory] = useState([]);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  useEffect(() => {
    fetchJobDetail();
  }, [jobId]);

  const fetchJobDetail = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Mock data for now
      const mockJob = {
        _id: jobId,
        bookingId: 'BK001',
        serviceTitle: 'Electrical Repair - Circuit Breaker Replacement',
        serviceDescription: 'Replace faulty circuit breaker in main electrical panel. Customer reports frequent tripping and burning smell.',
        customerName: 'John Doe',
        customerPhone: '+91 9876543210',
        customerEmail: 'john.doe@email.com',
        date: new Date().toISOString(),
        timeSlot: '10:00 AM - 12:00 PM',
        estimatedDuration: 120,
        status: 'pending',
        priority: 'high',
        location: '123 Main Street, Sector 15, Noida, UP 201301',
        coordinates: { lat: 28.5355, lng: 77.3910 },
        price: 1500,
        serviceType: 'electrical',
        customerNotes: 'Please call before arriving. Gate code is 1234. Circuit breaker is in the basement.',
        adminNotes: 'Customer is a repeat client. Handle with priority.',
        workerNotes: [],
        images: [
          'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400',
          'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'
        ],
        tools: ['Multimeter', 'Wire strippers', 'Circuit breaker', 'Safety gloves'],
        skills: ['Electrical wiring', 'Circuit analysis', 'Safety protocols']
      };

      const mockStatusHistory = [
        {
          status: 'assigned',
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          note: 'Job assigned to worker'
        },
        {
          status: 'pending',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          note: 'Waiting for worker to start'
        }
      ];

      setJob(mockJob);
      setStatusHistory(mockStatusHistory);
    } catch (error) {
      console.error("Error fetching job detail:", error);
      setError("Failed to load job details. Please try again.");
      toast.error("Failed to load job details");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      setIsUpdatingStatus(true);
      const token = localStorage.getItem("token");
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setJob(prev => ({ ...prev, status: newStatus }));
      setStatusHistory(prev => [...prev, {
        status: newStatus,
        timestamp: new Date().toISOString(),
        note: `Status updated to ${newStatus}`
      }]);
      
      toast.success(`Job marked as ${newStatus}`);
    } catch (error) {
      toast.error("Failed to update job status");
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleAddNote = async () => {
    if (!notes.trim()) return;
    
    try {
      const newNote = {
        id: Date.now(),
        text: notes,
        timestamp: new Date().toISOString(),
        author: 'Worker'
      };
      
      setJob(prev => ({
        ...prev,
        workerNotes: [...(prev.workerNotes || []), newNote]
      }));
      
      setNotes('');
      setShowAddNote(false);
      toast.success("Note added successfully");
    } catch (error) {
      toast.error("Failed to add note");
    }
  };

  const handleCallCustomer = () => {
    if (job?.customerPhone) {
      window.open(`tel:${job.customerPhone}`);
    }
  };

  const handleNavigate = () => {
    if (job?.coordinates) {
      const { lat, lng } = job.coordinates;
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`);
    }
  };

  const handleReportIssue = () => {
    // Navigate to issue reporting page or open modal
    toast.info("Issue reporting feature coming soon");
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

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'secondary';
    }
  };

  if (loading) {
    return (
      <WorkerLayout>
        <div className="space-y-6">
          <div className="animate-pulse">
            <div className="h-8 bg-neutral-200 rounded w-1/4 mb-4"></div>
            <div className="h-64 bg-neutral-200 rounded mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 h-96 bg-neutral-200 rounded"></div>
              <div className="h-96 bg-neutral-200 rounded"></div>
            </div>
          </div>
        </div>
      </WorkerLayout>
    );
  }

  if (error || !job) {
    return (
      <WorkerLayout>
        <div className="flex items-center justify-center h-64">
          <Alert variant="error" className="max-w-md">
            <AlertTriangle className="w-4 h-4" />
            <div>
              <p className="font-medium">Error Loading Job</p>
              <p className="text-sm mt-1">{error || "Job not found"}</p>
              <div className="flex space-x-2 mt-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => fetchJobDetail()}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Retry
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => navigate('/worker/jobs')}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Jobs
                </Button>
              </div>
            </div>
          </Alert>
        </div>
      </WorkerLayout>
    );
  }

  return (
    <WorkerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/worker/jobs')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Jobs
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-neutral-900">{job.serviceTitle}</h1>
              <div className="flex items-center space-x-3 mt-1">
                <Badge variant="outline">{job.bookingId}</Badge>
                <Badge variant={getStatusColor(job.status)}>{job.status}</Badge>
                <Badge variant={getPriorityColor(job.priority)}>{job.priority} priority</Badge>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCallCustomer}
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Customer
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNavigate}
            >
              <Navigation className="w-4 h-4 mr-2" />
              Navigate
            </Button>
          </div>
        </div>

        {/* Status Actions */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Job Actions</h3>
              <p className="text-neutral-600">Update job status and manage progress</p>
            </div>
            <div className="flex items-center space-x-3">
              {job.status === 'pending' && (
                <Button
                  variant="primary"
                  onClick={() => handleStatusUpdate('in-progress')}
                  disabled={isUpdatingStatus}
                >
                  <Play className="w-4 h-4 mr-2" />
                  {isUpdatingStatus ? 'Starting...' : 'Start Job'}
                </Button>
              )}
              {job.status === 'in-progress' && (
                <>
                  <Button
                    variant="outline"
                    onClick={() => handleStatusUpdate('pending')}
                    disabled={isUpdatingStatus}
                  >
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </Button>
                  <Button
                    variant="success"
                    onClick={() => handleStatusUpdate('completed')}
                    disabled={isUpdatingStatus}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {isUpdatingStatus ? 'Completing...' : 'Complete Job'}
                  </Button>
                </>
              )}
              <Button
                variant="outline"
                onClick={handleReportIssue}
              >
                <Flag className="w-4 h-4 mr-2" />
                Report Issue
              </Button>
            </div>
          </div>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Job Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Information */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Customer Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">{job.customerName}</p>
                    <p className="text-sm text-neutral-500">Customer</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">{job.customerPhone}</p>
                    <p className="text-sm text-neutral-500">Phone</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">Service Location</p>
                    <p className="text-sm text-neutral-600">{job.location}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Service Details */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Service Details</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-neutral-900 mb-2">Description</p>
                  <p className="text-neutral-600">{job.serviceDescription}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-neutral-400" />
                    <div>
                      <p className="text-sm font-medium text-neutral-900">Date</p>
                      <p className="text-sm text-neutral-600">{new Date(job.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-neutral-400" />
                    <div>
                      <p className="text-sm font-medium text-neutral-900">Time Slot</p>
                      <p className="text-sm text-neutral-600">{job.timeSlot}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-neutral-400" />
                    <div>
                      <p className="text-sm font-medium text-neutral-900">Amount</p>
                      <p className="text-sm text-neutral-600">₹{job.price}</p>
                    </div>
                  </div>
                </div>

                {job.tools && job.tools.length > 0 && (
                  <div>
                    <p className="font-medium text-neutral-900 mb-2">Required Tools</p>
                    <div className="flex flex-wrap gap-2">
                      {job.tools.map((tool, index) => (
                        <Badge key={index} variant="outline" size="sm">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Notes */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-neutral-900">Notes & Comments</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddNote(!showAddNote)}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Add Note
                </Button>
              </div>

              <AnimatePresence>
                {showAddNote && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-4 p-4 bg-neutral-50 rounded-lg"
                  >
                    <div className="space-y-3">
                      <Input
                        placeholder="Add your note here..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        multiline
                        rows={3}
                      />
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={handleAddNote}
                          disabled={!notes.trim()}
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Save Note
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setShowAddNote(false);
                            setNotes('');
                          }}
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-4">
                {job.customerNotes && (
                  <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                    <p className="text-sm font-medium text-blue-900 mb-1">Customer Notes</p>
                    <p className="text-sm text-blue-800">{job.customerNotes}</p>
                  </div>
                )}
                
                {job.adminNotes && (
                  <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                    <p className="text-sm font-medium text-yellow-900 mb-1">Admin Notes</p>
                    <p className="text-sm text-yellow-800">{job.adminNotes}</p>
                  </div>
                )}

                {job.workerNotes && job.workerNotes.length > 0 && (
                  <div className="space-y-3">
                    <p className="font-medium text-neutral-900">Worker Notes</p>
                    {job.workerNotes.map((note) => (
                      <div key={note.id} className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium text-green-900">{note.author}</p>
                          <p className="text-xs text-green-700">
                            {new Date(note.timestamp).toLocaleString()}
                          </p>
                        </div>
                        <p className="text-sm text-green-800">{note.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Timeline */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Status Timeline</h3>
              <div className="space-y-4">
                {statusHistory.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-3 h-3 rounded-full mt-2 ${
                      item.status === 'completed' ? 'bg-green-500' :
                      item.status === 'in-progress' ? 'bg-blue-500' :
                      item.status === 'pending' ? 'bg-yellow-500' :
                      'bg-neutral-400'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-neutral-900 capitalize">
                        {item.status.replace('-', ' ')}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {new Date(item.timestamp).toLocaleString()}
                      </p>
                      {item.note && (
                        <p className="text-xs text-neutral-600 mt-1">{item.note}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={handleCallCustomer}
                >
                  <Phone className="w-4 h-4 mr-3" />
                  Call Customer
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={handleNavigate}
                >
                  <Navigation className="w-4 h-4 mr-3" />
                  Get Directions
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setShowAddNote(true)}
                >
                  <MessageSquare className="w-4 h-4 mr-3" />
                  Add Note
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={handleReportIssue}
                >
                  <Flag className="w-4 h-4 mr-3" />
                  Report Issue
                </Button>
              </div>
            </Card>

            {/* Job Images */}
            {job.images && job.images.length > 0 && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">Job Images</h3>
                <div className="grid grid-cols-2 gap-3">
                  {job.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Job image ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </WorkerLayout>
  );
}