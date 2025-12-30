import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Calendar, Shield, Edit3, Save, X, Camera, Star, Award } from "lucide-react";
import { Card, Button, Badge, LoadingSpinner } from "../../components/ui";
import { useAutoRefresh } from "../../hooks/useAutoRefresh";
import api from "../../api";
import toast from "react-hot-toast";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [stats, setStats] = useState({
    totalBookings: 0,
    completedServices: 0,
    totalSpent: 0,
    memberSince: null
  });

  // Auto-refresh functionality
  const refreshProfile = async (source = 'manual') => {
    console.log(`Profile refreshed from ${source}`);
    await fetchProfile();
  };

  const { isRefreshing, refreshCount } = useAutoRefresh(
    refreshProfile,
    {
      enabled: true,
      onButtonClick: true,
      debounceMs: 1000,
    }
  );

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/profile");
      
      if (response.data.success) {
        const profileData = response.data.data;
        setProfile(profileData);
        setForm(profileData);
        
        // Mock stats - replace with actual API call
        setStats({
          totalBookings: 12,
          completedServices: 10,
          totalSpent: 15750,
          memberSince: profileData.createdAt || new Date().toISOString()
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setForm(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const saveProfile = async () => {
    try {
      setSaving(true);
      const response = await api.put("/api/profile", {
        name: form.name,
        phone: form.phone,
        address: form.address,
      });
      
      if (response.data.success) {
        setProfile(form);
        setEditing(false);
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const cancelEdit = () => {
    setForm(profile);
    setEditing(false);
  };

  if (loading && !isRefreshing) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary-600 to-accent-600 text-white py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8"
          >
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                {profile?.avatar ? (
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User className="w-12 h-12 text-white" />
                )}
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center hover:bg-accent-600 transition-colors">
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl font-bold mb-2">{profile?.name || 'User'}</h1>
              <p className="text-primary-100 mb-4">{profile?.email}</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  <Shield className="w-3 h-3 mr-1" />
                  Verified Member
                </Badge>
                <Badge variant="secondary" className="bg-accent-500/20 text-accent-200 border-accent-300/30">
                  <Star className="w-3 h-3 mr-1" />
                  Premium User
                </Badge>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              {!editing ? (
                <Button
                  onClick={() => setEditing(true)}
                  variant="secondary"
                  className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex space-x-2">
                  <Button
                    onClick={saveProfile}
                    disabled={saving}
                    variant="secondary"
                    className="bg-success-500 text-white border-success-500 hover:bg-success-600"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {saving ? 'Saving...' : 'Save'}
                  </Button>
                  <Button
                    onClick={cancelEdit}
                    variant="secondary"
                    className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                {stats.totalBookings}
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">Total Bookings</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-success-600 mb-1">
                {stats.completedServices}
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">Completed</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-accent-600 mb-1">
                ₹{stats.totalSpent.toLocaleString()}
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">Total Spent</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-purple-600 mb-1">
                {stats.memberSince ? new Date(stats.memberSince).getFullYear() : new Date().getFullYear()}
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">Member Since</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Profile Details */}
      <section className="py-12">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Personal Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="h-full">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                    Personal Information
                  </h2>
                  <User className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Full Name
                    </label>
                    {editing ? (
                      <input
                        name="name"
                        value={form.name || ""}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className="w-full px-4 py-2.5 border border-neutral-200 dark:border-neutral-600 rounded-xl focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-800 focus:border-primary-500 focus:outline-none transition-all duration-200 bg-white dark:bg-neutral-700 dark:text-neutral-100"
                      />
                    ) : (
                      <div className="px-4 py-2.5 bg-neutral-50 dark:bg-neutral-700 rounded-xl text-neutral-900 dark:text-neutral-100">
                        {profile?.name || 'Not provided'}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Email Address
                    </label>
                    <div className="px-4 py-2.5 bg-neutral-100 dark:bg-neutral-600 rounded-xl text-neutral-600 dark:text-neutral-400 flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      {profile?.email}
                      <Badge variant="success" size="sm" className="ml-auto">Verified</Badge>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Phone Number
                    </label>
                    {editing ? (
                      <input
                        name="phone"
                        value={form.phone || ""}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        className="w-full px-4 py-2.5 border border-neutral-200 dark:border-neutral-600 rounded-xl focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-800 focus:border-primary-500 focus:outline-none transition-all duration-200 bg-white dark:bg-neutral-700 dark:text-neutral-100"
                      />
                    ) : (
                      <div className="px-4 py-2.5 bg-neutral-50 dark:bg-neutral-700 rounded-xl text-neutral-900 dark:text-neutral-100 flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-neutral-500" />
                        {profile?.phone || 'Not provided'}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Address Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="h-full">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                    Address Information
                  </h2>
                  <MapPin className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Address Line 1
                    </label>
                    {editing ? (
                      <input
                        name="address.line1"
                        value={form.address?.line1 || ""}
                        onChange={handleChange}
                        placeholder="Street address, apartment, suite, etc."
                        className="w-full px-4 py-2.5 border border-neutral-200 dark:border-neutral-600 rounded-xl focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-800 focus:border-primary-500 focus:outline-none transition-all duration-200 bg-white dark:bg-neutral-700 dark:text-neutral-100"
                      />
                    ) : (
                      <div className="px-4 py-2.5 bg-neutral-50 dark:bg-neutral-700 rounded-xl text-neutral-900 dark:text-neutral-100">
                        {profile?.address?.line1 || 'Not provided'}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Address Line 2
                    </label>
                    {editing ? (
                      <input
                        name="address.line2"
                        value={form.address?.line2 || ""}
                        onChange={handleChange}
                        placeholder="Landmark, area, etc. (optional)"
                        className="w-full px-4 py-2.5 border border-neutral-200 dark:border-neutral-600 rounded-xl focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-800 focus:border-primary-500 focus:outline-none transition-all duration-200 bg-white dark:bg-neutral-700 dark:text-neutral-100"
                      />
                    ) : (
                      <div className="px-4 py-2.5 bg-neutral-50 dark:bg-neutral-700 rounded-xl text-neutral-900 dark:text-neutral-100">
                        {profile?.address?.line2 || 'Not provided'}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        City
                      </label>
                      {editing ? (
                        <input
                          name="address.city"
                          value={form.address?.city || ""}
                          onChange={handleChange}
                          placeholder="City"
                          className="w-full px-4 py-2.5 border border-neutral-200 dark:border-neutral-600 rounded-xl focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-800 focus:border-primary-500 focus:outline-none transition-all duration-200 bg-white dark:bg-neutral-700 dark:text-neutral-100"
                        />
                      ) : (
                        <div className="px-4 py-2.5 bg-neutral-50 dark:bg-neutral-700 rounded-xl text-neutral-900 dark:text-neutral-100">
                          {profile?.address?.city || 'Not provided'}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        Pincode
                      </label>
                      {editing ? (
                        <input
                          name="address.pincode"
                          value={form.address?.pincode || ""}
                          onChange={handleChange}
                          placeholder="Pincode"
                          className="w-full px-4 py-2.5 border border-neutral-200 dark:border-neutral-600 rounded-xl focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-800 focus:border-primary-500 focus:outline-none transition-all duration-200 bg-white dark:bg-neutral-700 dark:text-neutral-100"
                        />
                      ) : (
                        <div className="px-4 py-2.5 bg-neutral-50 dark:bg-neutral-700 rounded-xl text-neutral-900 dark:text-neutral-100">
                          {profile?.address?.pincode || 'Not provided'}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Account Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                  Account Settings
                </h2>
                <Shield className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-700 rounded-xl">
                    <div>
                      <h3 className="font-medium text-neutral-900 dark:text-neutral-100">Two-Factor Authentication</h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">Add an extra layer of security</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Enable
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-700 rounded-xl">
                    <div>
                      <h3 className="font-medium text-neutral-900 dark:text-neutral-100">Email Notifications</h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">Receive booking updates via email</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-700 rounded-xl">
                    <div>
                      <h3 className="font-medium text-neutral-900 dark:text-neutral-100">Privacy Settings</h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">Control your data and privacy</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-error-50 dark:bg-error-900/20 rounded-xl">
                    <div>
                      <h3 className="font-medium text-error-900 dark:text-error-100">Delete Account</h3>
                      <p className="text-sm text-error-600 dark:text-error-400">Permanently delete your account</p>
                    </div>
                    <Button variant="error" size="sm">
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
