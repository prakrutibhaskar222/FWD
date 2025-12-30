import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  User,
  MapPin,
  Phone,
  Eye,
  Filter,
  RefreshCw,
  Plus
} from "lucide-react";
import WorkerLayout from "../../components/worker/WorkerLayout";
import { Card, Button, Badge } from "../../components/ui";
import toast from "react-hot-toast";

const API = "http://localhost:5001";

export default function WorkerSchedule() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('week'); // 'day', 'week', 'month'
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    fetchSchedule();
  }, [currentDate, view]);

  const fetchSchedule = async () => {
    try {
      setLoading(true);
      
      // Mock data for calendar
      const mockJobs = [
        {
          _id: '1',
          serviceTitle: 'Electrical Repair',
          customerName: 'John Doe',
          customerPhone: '+91 9876543210',
          date: new Date().toISOString(),
          startTime: '10:00',
          endTime: '12:00',
          status: 'pending',
          location: '123 Main St, Delhi',
          priority: 'high'
        },
        {
          _id: '2',
          serviceTitle: 'Plumbing Service',
          customerName: 'Jane Smith',
          customerPhone: '+91 9876543211',
          date: new Date(Date.now() + 86400000).toISOString(),
          startTime: '14:00',
          endTime: '16:00',
          status: 'confirmed',
          location: '456 Oak Ave, Mumbai',
          priority: 'medium'
        },
        {
          _id: '3',
          serviceTitle: 'Home Cleaning',
          customerName: 'Mike Johnson',
          customerPhone: '+91 9876543212',
          date: new Date(Date.now() + 172800000).toISOString(),
          startTime: '09:00',
          endTime: '11:00',
          status: 'in-progress',
          location: '789 Pine Rd, Bangalore',
          priority: 'low'
        }
      ];
      
      setJobs(mockJobs);
    } catch (error) {
      console.error("Error fetching schedule:", error);
      toast.error("Failed to load schedule");
    } finally {
      setLoading(false);
    }
  };

  const navigateDate = (direction) => {
    const newDate = new Date(currentDate);
    if (view === 'day') {
      newDate.setDate(newDate.getDate() + direction);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() + (direction * 7));
    } else if (view === 'month') {
      newDate.setMonth(newDate.getMonth() + direction);
    }
    setCurrentDate(newDate);
  };

  const getWeekDays = () => {
    const start = new Date(currentDate);
    const day = start.getDay();
    const diff = start.getDate() - day;
    start.setDate(diff);
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const getJobsForDate = (date) => {
    return jobs.filter(job => {
      const jobDate = new Date(job.date);
      return jobDate.toDateString() === date.toDateString();
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'primary';
      case 'confirmed': return 'info';
      case 'pending': return 'warning';
      case 'cancelled': return 'danger';
      default: return 'secondary';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 border-red-300 text-red-800';
      case 'medium': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'low': return 'bg-green-100 border-green-300 text-green-800';
      default: return 'bg-neutral-100 border-neutral-300 text-neutral-800';
    }
  };

  const formatDateHeader = () => {
    if (view === 'day') {
      return currentDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } else if (view === 'week') {
      const weekDays = getWeekDays();
      const start = weekDays[0];
      const end = weekDays[6];
      return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    } else {
      return currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    }
  };

  const JobCard = ({ job, compact = false }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${getPriorityColor(job.priority)}`}
      onClick={() => setSelectedJob(job)}
    >
      <div className="flex items-center justify-between mb-2">
        <p className="font-medium text-sm truncate">{job.serviceTitle}</p>
        <Badge variant={getStatusColor(job.status)} size="sm">
          {job.status}
        </Badge>
      </div>
      <div className="space-y-1 text-xs">
        <div className="flex items-center space-x-1">
          <Clock className="w-3 h-3" />
          <span>{job.startTime} - {job.endTime}</span>
        </div>
        {!compact && (
          <>
            <div className="flex items-center space-x-1">
              <User className="w-3 h-3" />
              <span className="truncate">{job.customerName}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-3 h-3" />
              <span className="truncate">{job.location}</span>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );

  const DayView = () => {
    const dayJobs = getJobsForDate(currentDate);
    const hours = Array.from({ length: 24 }, (_, i) => i);

    return (
      <Card className="p-6">
        <div className="space-y-4">
          {hours.map(hour => {
            const hourJobs = dayJobs.filter(job => {
              const startHour = parseInt(job.startTime.split(':')[0]);
              return startHour === hour;
            });

            return (
              <div key={hour} className="flex items-start space-x-4 min-h-[60px] border-b border-neutral-100 last:border-b-0">
                <div className="w-16 text-sm text-neutral-500 pt-2">
                  {hour.toString().padStart(2, '0')}:00
                </div>
                <div className="flex-1">
                  {hourJobs.length > 0 ? (
                    <div className="space-y-2">
                      {hourJobs.map(job => (
                        <JobCard key={job._id} job={job} />
                      ))}
                    </div>
                  ) : (
                    <div className="h-full flex items-center">
                      <span className="text-neutral-300 text-sm">No jobs scheduled</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    );
  };

  const WeekView = () => {
    const weekDays = getWeekDays();

    return (
      <Card className="p-6">
        <div className="grid grid-cols-7 gap-4">
          {weekDays.map((day, index) => {
            const dayJobs = getJobsForDate(day);
            const isToday = day.toDateString() === new Date().toDateString();

            return (
              <div key={index} className="space-y-3">
                <div className={`text-center p-2 rounded-lg ${
                  isToday ? 'bg-blue-100 text-blue-800' : 'bg-neutral-50 text-neutral-600'
                }`}>
                  <p className="text-xs font-medium">
                    {day.toLocaleDateString('en-US', { weekday: 'short' })}
                  </p>
                  <p className="text-lg font-bold">
                    {day.getDate()}
                  </p>
                </div>
                <div className="space-y-2 min-h-[200px]">
                  {dayJobs.map(job => (
                    <JobCard key={job._id} job={job} compact />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    );
  };

  const MonthView = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const current = new Date(startDate);
    
    while (current <= lastDay || days.length < 42) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return (
      <Card className="p-6">
        <div className="grid grid-cols-7 gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-2 text-center text-sm font-medium text-neutral-600">
              {day}
            </div>
          ))}
          {days.map((day, index) => {
            const dayJobs = getJobsForDate(day);
            const isCurrentMonth = day.getMonth() === month;
            const isToday = day.toDateString() === new Date().toDateString();

            return (
              <div
                key={index}
                className={`min-h-[100px] p-2 border rounded-lg cursor-pointer transition-colors ${
                  isCurrentMonth 
                    ? isToday 
                      ? 'bg-blue-50 border-blue-200' 
                      : 'bg-white border-neutral-200 hover:bg-neutral-50'
                    : 'bg-neutral-50 border-neutral-100 text-neutral-400'
                }`}
                onClick={() => {
                  setCurrentDate(day);
                  setView('day');
                }}
              >
                <div className="text-sm font-medium mb-1">
                  {day.getDate()}
                </div>
                <div className="space-y-1">
                  {dayJobs.slice(0, 2).map(job => (
                    <div
                      key={job._id}
                      className={`text-xs p-1 rounded truncate ${getPriorityColor(job.priority)}`}
                    >
                      {job.serviceTitle}
                    </div>
                  ))}
                  {dayJobs.length > 2 && (
                    <div className="text-xs text-neutral-500">
                      +{dayJobs.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    );
  };

  return (
    <WorkerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Schedule</h1>
            <p className="text-neutral-600 mt-1">View and manage your job schedule</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm" onClick={fetchSchedule}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button variant="primary" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Block Time
            </Button>
          </div>
        </div>

        {/* Calendar Controls */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateDate(-1)}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <h2 className="text-xl font-semibold text-neutral-900">
                {formatDateHeader()}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateDate(1)}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentDate(new Date())}
              >
                Today
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              {['day', 'week', 'month'].map(viewType => (
                <Button
                  key={viewType}
                  variant={view === viewType ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setView(viewType)}
                >
                  {viewType.charAt(0).toUpperCase() + viewType.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Calendar View */}
        {loading ? (
          <Card className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-neutral-200 rounded w-1/4"></div>
              <div className="grid grid-cols-7 gap-4">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="h-32 bg-neutral-200 rounded"></div>
                ))}
              </div>
            </div>
          </Card>
        ) : (
          <>
            {view === 'day' && <DayView />}
            {view === 'week' && <WeekView />}
            {view === 'month' && <MonthView />}
          </>
        )}

        {/* Job Detail Modal */}
        <AnimatePresence>
          {selectedJob && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-2xl shadow-xl max-w-md w-full"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-neutral-900">
                      {selectedJob.serviceTitle}
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedJob(null)}
                    >
                      ×
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <User className="w-4 h-4 text-neutral-400" />
                      <span>{selectedJob.customerName}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-neutral-400" />
                      <span>{selectedJob.customerPhone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-4 h-4 text-neutral-400" />
                      <span>{selectedJob.location}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-4 h-4 text-neutral-400" />
                      <span>{selectedJob.startTime} - {selectedJob.endTime}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-4 h-4 text-neutral-400" />
                      <span>{new Date(selectedJob.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 mt-6">
                    <Button
                      variant="primary"
                      className="flex-1"
                      onClick={() => {
                        window.location.href = `/worker/jobs/${selectedJob._id}`;
                      }}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => window.open(`tel:${selectedJob.customerPhone}`)}
                    >
                      <Phone className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </WorkerLayout>
  );
}