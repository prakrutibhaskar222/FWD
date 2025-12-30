import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Wrench,
  Plus,
  Star,
  Award,
  CheckCircle,
  X,
  Edit,
  Save,
  RefreshCw
} from "lucide-react";
import WorkerLayout from "../../components/worker/WorkerLayout";
import { Card, Button, Badge, Input } from "../../components/ui";
import toast from "react-hot-toast";

export default function WorkerServices() {
  const [services, setServices] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    fetchServicesAndSkills();
  }, []);

  const fetchServicesAndSkills = async () => {
    try {
      setLoading(true);
      
      // Mock data
      const mockServices = [
        {
          id: 1,
          name: 'Electrical Repair',
          category: 'Electrical',
          status: 'active',
          completedJobs: 45,
          rating: 4.8,
          earnings: 25000
        },
        {
          id: 2,
          name: 'Home Wiring',
          category: 'Electrical',
          status: 'active',
          completedJobs: 32,
          rating: 4.9,
          earnings: 18000
        },
        {
          id: 3,
          name: 'Appliance Installation',
          category: 'Installation',
          status: 'pending',
          completedJobs: 0,
          rating: 0,
          earnings: 0
        }
      ];

      const mockSkills = [
        { id: 1, name: 'Electrical Wiring', level: 'Expert', verified: true },
        { id: 2, name: 'Circuit Analysis', level: 'Advanced', verified: true },
        { id: 3, name: 'Safety Protocols', level: 'Expert', verified: true },
        { id: 4, name: 'Appliance Repair', level: 'Intermediate', verified: false },
        { id: 5, name: 'Home Automation', level: 'Beginner', verified: false }
      ];

      setServices(mockServices);
      setSkills(mockSkills);
    } catch (error) {
      console.error("Error fetching services:", error);
      toast.error("Failed to load services and skills");
    } finally {
      setLoading(false);
    }
  };

  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    
    const skill = {
      id: Date.now(),
      name: newSkill,
      level: 'Beginner',
      verified: false
    };
    
    setSkills(prev => [...prev, skill]);
    setNewSkill('');
    setShowAddSkill(false);
    toast.success("Skill added successfully");
  };

  const handleRemoveSkill = (skillId) => {
    setSkills(prev => prev.filter(s => s.id !== skillId));
    toast.success("Skill removed");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'pending': return 'warning';
      case 'inactive': return 'secondary';
      default: return 'secondary';
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Expert': return 'success';
      case 'Advanced': return 'primary';
      case 'Intermediate': return 'warning';
      case 'Beginner': return 'secondary';
      default: return 'secondary';
    }
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
            <h1 className="text-3xl font-bold text-neutral-900">Services & Skills</h1>
            <p className="text-neutral-600 mt-1">Manage your service offerings and skill set</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" onClick={fetchServicesAndSkills}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button variant="primary" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Request New Service
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Assigned Services */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Assigned Services</h3>
            
            <div className="space-y-4">
              {services.map((service) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 border border-neutral-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-neutral-900">{service.name}</h4>
                      <p className="text-sm text-neutral-500">{service.category}</p>
                    </div>
                    <Badge variant={getStatusColor(service.status)}>
                      {service.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-neutral-500">Jobs Completed</p>
                      <p className="font-medium text-neutral-900">{service.completedJobs}</p>
                    </div>
                    <div>
                      <p className="text-neutral-500">Rating</p>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="font-medium text-neutral-900">
                          {service.rating > 0 ? service.rating : 'N/A'}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-neutral-500">Earnings</p>
                      <p className="font-medium text-neutral-900">₹{service.earnings.toLocaleString()}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Skills */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-neutral-900">Skills & Expertise</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAddSkill(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Skill
              </Button>
            </div>

            {/* Add Skill Form */}
            {showAddSkill && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mb-4 p-4 bg-neutral-50 rounded-lg"
              >
                <div className="space-y-3">
                  <Input
                    placeholder="Enter skill name..."
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                  />
                  <div className="flex items-center space-x-2">
                    <Button variant="primary" size="sm" onClick={handleAddSkill}>
                      <Save className="w-4 h-4 mr-2" />
                      Add Skill
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => {
                        setShowAddSkill(false);
                        setNewSkill('');
                      }}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div className="space-y-3">
              {skills.map((skill) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      {skill.verified ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <div className="w-4 h-4 border-2 border-neutral-300 rounded-full"></div>
                      )}
                      <span className="font-medium text-neutral-900">{skill.name}</span>
                    </div>
                    <Badge variant={getLevelColor(skill.level)} size="sm">
                      {skill.level}
                    </Badge>
                    {skill.verified && (
                      <Badge variant="success" size="sm">
                        <Award className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveSkill(skill.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>

        {/* Service Performance */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Service Performance</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {services.filter(s => s.status === 'active').length}
              </div>
              <div className="text-sm text-neutral-600">Active Services</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {services.reduce((sum, s) => sum + s.completedJobs, 0)}
              </div>
              <div className="text-sm text-neutral-600">Total Jobs Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600 mb-1">
                {services.length > 0 ? 
                  (services.reduce((sum, s) => sum + s.rating, 0) / services.filter(s => s.rating > 0).length).toFixed(1) 
                  : '0.0'}
              </div>
              <div className="text-sm text-neutral-600">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                ₹{services.reduce((sum, s) => sum + s.earnings, 0).toLocaleString()}
              </div>
              <div className="text-sm text-neutral-600">Total Earnings</div>
            </div>
          </div>
        </Card>

        {/* Skill Development */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Skill Development</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-neutral-900 mb-3">Skill Distribution</h4>
              <div className="space-y-2">
                {['Expert', 'Advanced', 'Intermediate', 'Beginner'].map(level => {
                  const count = skills.filter(s => s.level === level).length;
                  const percentage = skills.length > 0 ? (count / skills.length) * 100 : 0;
                  
                  return (
                    <div key={level} className="flex items-center justify-between">
                      <span className="text-sm text-neutral-600">{level}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 h-2 bg-neutral-200 rounded-full">
                          <div 
                            className={`h-full rounded-full ${
                              level === 'Expert' ? 'bg-green-500' :
                              level === 'Advanced' ? 'bg-blue-500' :
                              level === 'Intermediate' ? 'bg-yellow-500' :
                              'bg-neutral-400'
                            }`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-neutral-900">{count}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-neutral-900 mb-3">Verification Status</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-green-900">Verified Skills</span>
                  </div>
                  <span className="text-lg font-bold text-green-600">
                    {skills.filter(s => s.verified).length}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-yellow-500 rounded-full"></div>
                    <span className="text-sm font-medium text-yellow-900">Pending Verification</span>
                  </div>
                  <span className="text-lg font-bold text-yellow-600">
                    {skills.filter(s => !s.verified).length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </WorkerLayout>
  );
}