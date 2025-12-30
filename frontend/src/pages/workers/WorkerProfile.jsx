import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star,
  Edit3,
  Camera,
  Save,
  X,
  Shield,
  Award,
  Clock,
  CheckCircle
} from "lucide-react";
import WorkerLayout from "../../components/worker/WorkerLayout";
import { Card, Button, Input, Badge } from "../../components/ui";
import toast from "react-hot-toast";

export default function WorkerProfile() {
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchWorkerProfile();
  }, []);

  const fetchWorkerProfile = async () => {
    try {
      setLoading(true);
      
      // Mock worker data
      const mockWorker = {
        id: 1,
        name: "Rajesh Kumar",
        email: "rajesh.kumar@coolie.com",
        phone: "+91 98765 43210",
        address: "123 Service Street, Mumbai, Maharashtra 400001",
        joinDate: "2023-01-15",
        avatar: null,
        skills: ["Electrical", "Plumbing", "AC Repair"],
        experience: "5 years",
        rating: 4.8,
        totalJobs: 247,
        completedJobs: 235,
        verificationStatus: "verified",
        documents: {
          aadhar: "verified",
          pan: "verified",
          license: "pending"
        },
        availability: {
          monday: { start: "09:00", end: "18:00", available: true },
          tuesday: { start: "09:00", end: "18:00", available: true },
          wednesday: { start: "09:00", end: "18:00", available: true },
          thursday: { start: "09:00", end: "18:00", available: true },
          friday: { start: "09:00", end: "18:00", available: true },
          saturday: { start: "10:00", end: "16:00", available: true },
          sunday: { start: "", end: "", available: false }
        },
        preferences: {
          notifications: {
            email: true,
            sms: true,
            push: true
          },
          workRadius: 15,
          autoAcceptJobs: false
        }
      };

      setWorker(mockWorker);
      setFormData({
        name: mockWorker.name,
        email: mockWorker.email,
        phone: mockWorker.phone,
        address: mockWorker.address,
        skills: mockWorker.skills.join(", "),
        experience: mockWorker.experience
      });
    } catch (error) {
      console.error("Error fetching worker profile:", error);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setWorker(prev => ({
        ...prev,
        ...formData,
        skills: formData.skills.split(",").map(s => s.trim())
      }));
      
      setEditing(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: worker.name,
      email: worker.email,
      phone: worker.phone,
      address: worker.address,
      skills: worker.skills.join(", "),
      experience: worker.experience
    });
    setEditing(false);
  };

  const getVerificationBadge = (status) => {
    switch (status) {
      case 'verified':
        return <Badge variant="success" size="sm">Verified</Badge>;
      case 'pending':
        return <Badge variant="warning" size="sm">Pending</Badge>;
      case 'rejected':
        return <Badge variant="error" size="sm">Rejected</Badge>;
      default:
        return <Badge variant="secondary" size="sm">Not Submitted</Badge>;
    }
  };

  if (loading) {
    return (
      <WorkerLayout>
        <div className="space-y-6">
          <div className="animate-pulse">
            <div className="h-8 bg-neutral-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-64 bg-neutral-200 rounded"></div>
                <div className="h-48 bg-neutral-200 rounded"></div>
              </div>
              <div className="space-y-6">
                <div className="h-32 bg-neutral-200 rounded"></div>
                <div className="h-48 bg-neutral-200 rounded"></div>
              </div>
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
            <h1 className="text-3xl font-bold text-neutral-900">Profile</h1>
            <p className="text-neutral-600 mt-1">Manage your personal information and preferences</p>
          </div>
          
          <div className="flex items-center space-x-3">
            {editing ? (
              <>
                <Button variant="outline" onClick={handleCancel} disabled={saving}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleSave} loading={saving}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </>
            ) : (
              <Button onClick={() => setEditing(true)}>
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Profile */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                    {worker.avatar ? (
                      <img src={worker.avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <User className="w-10 h-10 text-white" />
                    )}
                  </div>
                  {editing && (
                    <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                      <Camera className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900">{worker.name}</h2>
                  <p className="text-neutral-600">{worker.skills.join(" • ")}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{worker.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-neutral-600">{worker.completedJobs} jobs completed</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Full Name
                    </label>
                    {editing ? (
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter your full name"
                      />
                    ) : (
                      <p className="text-neutral-900">{worker.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email Address
                    </label>
                    {editing ? (
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="Enter your email"
                      />
                    ) : (
                      <p className="text-neutral-900">{worker.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Phone Number
                    </label>
                    {editing ? (
                      <Input
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="Enter your phone number"
                      />
                    ) : (
                      <p className="text-neutral-900">{worker.phone}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      <MapPin className="w-4 h-4 inline mr-2" />
                      Address
                    </label>
                    {editing ? (
                      <textarea
                        value={formData.address}
                        onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                        placeholder="Enter your address"
                        rows={3}
                        className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-neutral-900">{worker.address}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      <Award className="w-4 h-4 inline mr-2" />
                      Skills
                    </label>
                    {editing ? (
                      <Input
                        value={formData.skills}
                        onChange={(e) => setFormData(prev => ({ ...prev, skills: e.target.value }))}
                        placeholder="Enter skills separated by commas"
                      />
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {worker.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary">{skill}</Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      <Clock className="w-4 h-4 inline mr-2" />
                      Experience
                    </label>
                    {editing ? (
                      <Input
                        value={formData.experience}
                        onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                        placeholder="Enter your experience"
                      />
                    ) : (
                      <p className="text-neutral-900">{worker.experience}</p>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            {/* Document Verification */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Document Verification
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border border-neutral-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-neutral-900">Aadhar Card</span>
                    {getVerificationBadge(worker.documents.aadhar)}
                  </div>
                  <p className="text-sm text-neutral-600">Government ID verification</p>
                </div>

                <div className="p-4 border border-neutral-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-neutral-900">PAN Card</span>
                    {getVerificationBadge(worker.documents.pan)}
                  </div>
                  <p className="text-sm text-neutral-600">Tax identification</p>
                </div>

                <div className="p-4 border border-neutral-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-neutral-900">License</span>
                    {getVerificationBadge(worker.documents.license)}
                  </div>
                  <p className="text-sm text-neutral-600">Professional certification</p>
                </div>
              </div>

              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <CheckCircle className="w-4 h-4 inline mr-2" />
                  Complete document verification to increase your job opportunities and customer trust.
                </p>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">Member Since</span>
                  <span className="font-medium">
                    {new Date(worker.joinDate).toLocaleDateString('en-US', { 
                      month: 'short', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">Total Jobs</span>
                  <span className="font-medium">{worker.totalJobs}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">Success Rate</span>
                  <span className="font-medium text-green-600">
                    {Math.round((worker.completedJobs / worker.totalJobs) * 100)}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">Rating</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{worker.rating}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Account Status */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Account Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">Verification</span>
                  {getVerificationBadge(worker.verificationStatus)}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">Account Type</span>
                  <Badge variant="primary" size="sm">Worker</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">Status</span>
                  <Badge variant="success" size="sm">Active</Badge>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-3" />
                  Update Availability
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="w-4 h-4 mr-3" />
                  Upload Documents
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Star className="w-4 h-4 mr-3" />
                  View Reviews
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </WorkerLayout>
  );
}