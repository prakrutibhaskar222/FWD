import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  Calendar,
  Plus,
  Trash2,
  Save,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  X
} from "lucide-react";
import WorkerLayout from "../../components/worker/WorkerLayout";
import { Card, Button, Badge, Alert } from "../../components/ui";
import toast from "react-hot-toast";

const API = "http://localhost:5001";

export default function WorkerAvailability() {
  const [availability, setAvailability] = useState({
    workingDays: [],
    dailyHours: {},
    blockedDates: [],
    timeSlots: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showAddBlock, setShowAddBlock] = useState(false);
  const [newBlock, setNewBlock] = useState({
    date: '',
    startTime: '',
    endTime: '',
    reason: ''
  });

  const daysOfWeek = [
    { id: 'monday', label: 'Monday', short: 'Mon' },
    { id: 'tuesday', label: 'Tuesday', short: 'Tue' },
    { id: 'wednesday', label: 'Wednesday', short: 'Wed' },
    { id: 'thursday', label: 'Thursday', short: 'Thu' },
    { id: 'friday', label: 'Friday', short: 'Fri' },
    { id: 'saturday', label: 'Saturday', short: 'Sat' },
    { id: 'sunday', label: 'Sunday', short: 'Sun' }
  ];

  useEffect(() => {
    fetchAvailability();
  }, []);

  const fetchAvailability = async () => {
    try {
      setLoading(true);
      
      // Mock data
      const mockAvailability = {
        workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
        dailyHours: {
          monday: { start: '09:00', end: '18:00' },
          tuesday: { start: '09:00', end: '18:00' },
          wednesday: { start: '09:00', end: '18:00' },
          thursday: { start: '09:00', end: '18:00' },
          friday: { start: '09:00', end: '17:00' },
          saturday: { start: '10:00', end: '16:00' },
          sunday: { start: '10:00', end: '16:00' }
        },
        blockedDates: [
          {
            id: 1,
            date: '2024-01-15',
            startTime: '14:00',
            endTime: '16:00',
            reason: 'Personal appointment'
          },
          {
            id: 2,
            date: '2024-01-20',
            startTime: '09:00',
            endTime: '18:00',
            reason: 'Vacation day'
          }
        ],
        timeSlots: [
          { id: 1, start: '09:00', end: '10:00' },
          { id: 2, start: '10:00', end: '11:00' },
          { id: 3, start: '11:00', end: '12:00' },
          { id: 4, start: '14:00', end: '15:00' },
          { id: 5, start: '15:00', end: '16:00' },
          { id: 6, start: '16:00', end: '17:00' }
        ]
      };
      
      setAvailability(mockAvailability);
    } catch (error) {
      console.error("Error fetching availability:", error);
      toast.error("Failed to load availability settings");
    } finally {
      setLoading(false);
    }
  };

  const handleWorkingDayToggle = (dayId) => {
    setAvailability(prev => ({
      ...prev,
      workingDays: prev.workingDays.includes(dayId)
        ? prev.workingDays.filter(d => d !== dayId)
        : [...prev.workingDays, dayId]
    }));
  };

  const handleDailyHoursChange = (dayId, field, value) => {
    setAvailability(prev => ({
      ...prev,
      dailyHours: {
        ...prev.dailyHours,
        [dayId]: {
          ...prev.dailyHours[dayId],
          [field]: value
        }
      }
    }));
  };

  const handleAddBlock = () => {
    if (!newBlock.date || !newBlock.startTime || !newBlock.endTime) {
      toast.error("Please fill in all required fields");
      return;
    }

    const block = {
      id: Date.now(),
      ...newBlock
    };

    setAvailability(prev => ({
      ...prev,
      blockedDates: [...prev.blockedDates, block]
    }));

    setNewBlock({ date: '', startTime: '', endTime: '', reason: '' });
    setShowAddBlock(false);
    toast.success("Time block added successfully");
  };

  const handleRemoveBlock = (blockId) => {
    setAvailability(prev => ({
      ...prev,
      blockedDates: prev.blockedDates.filter(b => b.id !== blockId)
    }));
    toast.success("Time block removed");
  };

  const handleSaveAvailability = async () => {
    try {
      setSaving(true);
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Availability settings saved successfully");
    } catch (error) {
      toast.error("Failed to save availability settings");
    } finally {
      setSaving(false);
    }
  };

  const getNextAvailableSlot = () => {
    const now = new Date();
    const today = now.getDay();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    // Find next available day
    for (let i = 0; i < 7; i++) {
      const dayIndex = (today + i) % 7;
      const dayName = daysOfWeek[dayIndex].id;
      
      if (availability.workingDays.includes(dayName)) {
        const dayHours = availability.dailyHours[dayName];
        if (dayHours) {
          const startTime = parseInt(dayHours.start.split(':')[0]) * 60 + parseInt(dayHours.start.split(':')[1]);
          
          if (i === 0 && currentTime < startTime) {
            return `Today at ${dayHours.start}`;
          } else if (i > 0) {
            return `${daysOfWeek[dayIndex].label} at ${dayHours.start}`;
          }
        }
      }
    }
    
    return "No available slots";
  };

  if (loading) {
    return (
      <WorkerLayout>
        <div className="space-y-6">
          <div className="animate-pulse">
            <div className="h-8 bg-neutral-200 rounded w-1/4 mb-4"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-96 bg-neutral-200 rounded"></div>
              <div className="h-96 bg-neutral-200 rounded"></div>
            </div>
          </div>
        </div>
      </WorkerLayout>
    );
  }

  return (
    <WorkerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Availability Management</h1>
            <p className="text-neutral-600 mt-1">Set your working hours and manage time blocks</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" onClick={fetchAvailability}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button 
              variant="primary" 
              size="sm" 
              onClick={handleSaveAvailability}
              disabled={saving}
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>

        {/* Current Status */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Current Status</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-neutral-600">Available for bookings</span>
                </div>
                <div className="text-sm text-neutral-500">
                  Next slot: {getNextAvailableSlot()}
                </div>
              </div>
            </div>
            <Badge variant="success" size="lg">
              <CheckCircle className="w-4 h-4 mr-2" />
              Active
            </Badge>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Working Days & Hours */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Working Days & Hours</h3>
            
            <div className="space-y-4">
              {daysOfWeek.map((day) => {
                const isWorking = availability.workingDays.includes(day.id);
                const dayHours = availability.dailyHours[day.id] || { start: '09:00', end: '18:00' };
                
                return (
                  <motion.div
                    key={day.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      isWorking 
                        ? 'border-blue-200 bg-blue-50' 
                        : 'border-neutral-200 bg-neutral-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleWorkingDayToggle(day.id)}
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                            isWorking 
                              ? 'border-blue-500 bg-blue-500' 
                              : 'border-neutral-300 bg-white'
                          }`}
                        >
                          {isWorking && <CheckCircle className="w-3 h-3 text-white" />}
                        </button>
                        <span className={`font-medium ${
                          isWorking ? 'text-blue-900' : 'text-neutral-500'
                        }`}>
                          {day.label}
                        </span>
                      </div>
                      
                      {isWorking && (
                        <div className="flex items-center space-x-2">
                          <input
                            type="time"
                            value={dayHours.start}
                            onChange={(e) => handleDailyHoursChange(day.id, 'start', e.target.value)}
                            className="px-2 py-1 border border-neutral-200 rounded text-sm"
                          />
                          <span className="text-neutral-400">to</span>
                          <input
                            type="time"
                            value={dayHours.end}
                            onChange={(e) => handleDailyHoursChange(day.id, 'end', e.target.value)}
                            className="px-2 py-1 border border-neutral-200 rounded text-sm"
                          />
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Card>

          {/* Blocked Time Slots */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-neutral-900">Blocked Time Slots</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAddBlock(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Block
              </Button>
            </div>

            {/* Add Block Form */}
            {showAddBlock && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mb-4 p-4 bg-neutral-50 rounded-lg"
              >
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      value={newBlock.date}
                      onChange={(e) => setNewBlock({...newBlock, date: e.target.value})}
                      className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Start Time
                      </label>
                      <input
                        type="time"
                        value={newBlock.startTime}
                        onChange={(e) => setNewBlock({...newBlock, startTime: e.target.value})}
                        className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        End Time
                      </label>
                      <input
                        type="time"
                        value={newBlock.endTime}
                        onChange={(e) => setNewBlock({...newBlock, endTime: e.target.value})}
                        className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Reason (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Personal appointment, Vacation"
                      value={newBlock.reason}
                      onChange={(e) => setNewBlock({...newBlock, reason: e.target.value})}
                      className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="primary" size="sm" onClick={handleAddBlock}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Block
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => {
                        setShowAddBlock(false);
                        setNewBlock({ date: '', startTime: '', endTime: '', reason: '' });
                      }}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Blocked Dates List */}
            <div className="space-y-3">
              {availability.blockedDates.length > 0 ? (
                availability.blockedDates.map((block) => (
                  <motion.div
                    key={block.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-red-600" />
                        <span className="font-medium text-red-900">
                          {new Date(block.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Clock className="w-3 h-3 text-red-500" />
                        <span className="text-sm text-red-700">
                          {block.startTime} - {block.endTime}
                        </span>
                        {block.reason && (
                          <span className="text-sm text-red-600">
                            • {block.reason}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveBlock(block.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8">
                  <AlertCircle className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
                  <p className="text-neutral-600">No blocked time slots</p>
                  <p className="text-sm text-neutral-500">Add blocks for times when you're unavailable</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Summary */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Availability Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {availability.workingDays.length}
              </div>
              <div className="text-sm text-neutral-600">Working Days per Week</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {availability.blockedDates.length}
              </div>
              <div className="text-sm text-neutral-600">Blocked Time Slots</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {availability.workingDays.length > 0 ? 
                  Math.round(availability.workingDays.length * 8) : 0}
              </div>
              <div className="text-sm text-neutral-600">Hours per Week (Approx.)</div>
            </div>
          </div>
        </Card>

        {/* Tips */}
        <Alert>
          <AlertCircle className="w-4 h-4" />
          <div>
            <p className="font-medium">Availability Tips</p>
            <ul className="text-sm mt-2 space-y-1">
              <li>• Set realistic working hours to maintain work-life balance</li>
              <li>• Block time slots in advance for personal appointments</li>
              <li>• Regular availability increases your booking chances</li>
              <li>• Update your schedule weekly for better planning</li>
            </ul>
          </div>
        </Alert>
      </div>
    </WorkerLayout>
  );
}