import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Database,
  Mail,
  Globe,
  Palette,
  Save,
  RefreshCw,
  Eye,
  EyeOff,
  Upload,
  Download,
  Trash2
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import { Button, Card, Input, Badge } from "../../components/ui";
import { useAutoRefresh } from "../../hooks/useAutoRefresh";
import toast from "react-hot-toast";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Auto-refresh functionality
  const refreshSettingsData = async (source = 'manual') => {
    console.log(`Settings refreshed from ${source}`);
  };

  const { isRefreshing, refreshCount } = useAutoRefresh(
    refreshSettingsData,
    {
      enabled: true,
      onButtonClick: true,
      debounceMs: 1000,
    }
  );

  // Settings state
  const [settings, setSettings] = useState({
    general: {
      siteName: "COOLIE Admin",
      siteDescription: "Professional Home Services Platform",
      contactEmail: "admin@coolie.com",
      contactPhone: "+91 7619443280",
      address: "Mumbai, India",
      timezone: "Asia/Kolkata",
      language: "en",
      currency: "INR"
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: true,
      pushNotifications: true,
      bookingAlerts: true,
      paymentAlerts: true,
      workerAlerts: true,
      systemAlerts: true
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      passwordExpiry: 90,
      loginAttempts: 5,
      ipWhitelist: "",
      auditLogging: true
    },
    business: {
      bookingWindow: 30,
      cancellationWindow: 2,
      autoAssignment: true,
      paymentGateway: "razorpay",
      taxRate: 18,
      serviceFee: 5,
      workerCommission: 80
    },
    appearance: {
      theme: "light",
      primaryColor: "#3B82F6",
      accentColor: "#10B981",
      logoUrl: "",
      faviconUrl: ""
    }
  });

  const tabs = [
    { id: "general", name: "General", icon: <SettingsIcon className="w-4 h-4" /> },
    { id: "notifications", name: "Notifications", icon: <Bell className="w-4 h-4" /> },
    { id: "security", name: "Security", icon: <Shield className="w-4 h-4" /> },
    { id: "business", name: "Business", icon: <Database className="w-4 h-4" /> },
    { id: "appearance", name: "Appearance", icon: <Palette className="w-4 h-4" /> }
  ];

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const saveSettings = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Settings saved successfully");
    } catch (error) {
      toast.error("Failed to save settings");
    } finally {
      setLoading(false);
    }
  };

  const exportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'admin-settings.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const importSettings = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedSettings = JSON.parse(e.target.result);
          setSettings(importedSettings);
          toast.success("Settings imported successfully");
        } catch (error) {
          toast.error("Invalid settings file");
        }
      };
      reader.readAsText(file);
    }
  };

  const resetSettings = () => {
    if (confirm("Are you sure you want to reset all settings to default?")) {
      // Reset to default settings
      toast.success("Settings reset to default");
    }
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Site Name"
          value={settings.general.siteName}
          onChange={(e) => handleSettingChange("general", "siteName", e.target.value)}
        />
        <Input
          label="Contact Email"
          type="email"
          value={settings.general.contactEmail}
          onChange={(e) => handleSettingChange("general", "contactEmail", e.target.value)}
        />
        <Input
          label="Contact Phone"
          value={settings.general.contactPhone}
          onChange={(e) => handleSettingChange("general", "contactPhone", e.target.value)}
        />
        <Input
          label="Address"
          value={settings.general.address}
          onChange={(e) => handleSettingChange("general", "address", e.target.value)}
        />
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">Timezone</label>
          <select
            value={settings.general.timezone}
            onChange={(e) => handleSettingChange("general", "timezone", e.target.value)}
            className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary-500 focus:outline-none"
          >
            <option value="Asia/Kolkata">Asia/Kolkata</option>
            <option value="UTC">UTC</option>
            <option value="America/New_York">America/New_York</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">Currency</label>
          <select
            value={settings.general.currency}
            onChange={(e) => handleSettingChange("general", "currency", e.target.value)}
            className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary-500 focus:outline-none"
          >
            <option value="INR">INR (₹)</option>
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">Site Description</label>
        <textarea
          value={settings.general.siteDescription}
          onChange={(e) => handleSettingChange("general", "siteDescription", e.target.value)}
          rows={3}
          className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary-500 focus:outline-none resize-none"
        />
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(settings.notifications).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
            <div>
              <h4 className="font-medium text-neutral-900 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </h4>
              <p className="text-sm text-neutral-500">
                {key === 'emailNotifications' && 'Receive notifications via email'}
                {key === 'smsNotifications' && 'Receive notifications via SMS'}
                {key === 'pushNotifications' && 'Receive push notifications'}
                {key === 'bookingAlerts' && 'Get alerts for new bookings'}
                {key === 'paymentAlerts' && 'Get alerts for payments'}
                {key === 'workerAlerts' && 'Get alerts for worker activities'}
                {key === 'systemAlerts' && 'Get system maintenance alerts'}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => handleSettingChange("notifications", key, e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
          <div>
            <h4 className="font-medium text-neutral-900">Two-Factor Authentication</h4>
            <p className="text-sm text-neutral-500">Add an extra layer of security</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.security.twoFactorAuth}
              onChange={(e) => handleSettingChange("security", "twoFactorAuth", e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
          <div>
            <h4 className="font-medium text-neutral-900">Audit Logging</h4>
            <p className="text-sm text-neutral-500">Log all admin activities</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.security.auditLogging}
              onChange={(e) => handleSettingChange("security", "auditLogging", e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
          </label>
        </div>

        <Input
          label="Session Timeout (minutes)"
          type="number"
          value={settings.security.sessionTimeout}
          onChange={(e) => handleSettingChange("security", "sessionTimeout", parseInt(e.target.value))}
        />

        <Input
          label="Password Expiry (days)"
          type="number"
          value={settings.security.passwordExpiry}
          onChange={(e) => handleSettingChange("security", "passwordExpiry", parseInt(e.target.value))}
        />

        <Input
          label="Max Login Attempts"
          type="number"
          value={settings.security.loginAttempts}
          onChange={(e) => handleSettingChange("security", "loginAttempts", parseInt(e.target.value))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">IP Whitelist</label>
        <textarea
          value={settings.security.ipWhitelist}
          onChange={(e) => handleSettingChange("security", "ipWhitelist", e.target.value)}
          placeholder="Enter IP addresses separated by commas"
          rows={3}
          className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary-500 focus:outline-none resize-none"
        />
        <p className="text-sm text-neutral-500 mt-1">Leave empty to allow all IPs</p>
      </div>
    </div>
  );

  const renderBusinessSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Booking Window (days)"
          type="number"
          value={settings.business.bookingWindow}
          onChange={(e) => handleSettingChange("business", "bookingWindow", parseInt(e.target.value))}
          help="How far in advance customers can book"
        />

        <Input
          label="Cancellation Window (hours)"
          type="number"
          value={settings.business.cancellationWindow}
          onChange={(e) => handleSettingChange("business", "cancellationWindow", parseInt(e.target.value))}
          help="Minimum notice required for cancellation"
        />

        <Input
          label="Tax Rate (%)"
          type="number"
          value={settings.business.taxRate}
          onChange={(e) => handleSettingChange("business", "taxRate", parseFloat(e.target.value))}
        />

        <Input
          label="Service Fee (%)"
          type="number"
          value={settings.business.serviceFee}
          onChange={(e) => handleSettingChange("business", "serviceFee", parseFloat(e.target.value))}
          help="Platform commission on bookings"
        />

        <Input
          label="Worker Commission (%)"
          type="number"
          value={settings.business.workerCommission}
          onChange={(e) => handleSettingChange("business", "workerCommission", parseFloat(e.target.value))}
          help="Percentage workers receive from bookings"
        />

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">Payment Gateway</label>
          <select
            value={settings.business.paymentGateway}
            onChange={(e) => handleSettingChange("business", "paymentGateway", e.target.value)}
            className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary-500 focus:outline-none"
          >
            <option value="razorpay">Razorpay</option>
            <option value="stripe">Stripe</option>
            <option value="payu">PayU</option>
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
        <div>
          <h4 className="font-medium text-neutral-900">Auto Assignment</h4>
          <p className="text-sm text-neutral-500">Automatically assign workers to bookings</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.business.autoAssignment}
            onChange={(e) => handleSettingChange("business", "autoAssignment", e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
        </label>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">Theme</label>
          <select
            value={settings.appearance.theme}
            onChange={(e) => handleSettingChange("appearance", "theme", e.target.value)}
            className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary-500 focus:outline-none"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto</option>
          </select>
        </div>

        <Input
          label="Primary Color"
          type="color"
          value={settings.appearance.primaryColor}
          onChange={(e) => handleSettingChange("appearance", "primaryColor", e.target.value)}
        />

        <Input
          label="Accent Color"
          type="color"
          value={settings.appearance.accentColor}
          onChange={(e) => handleSettingChange("appearance", "accentColor", e.target.value)}
        />

        <Input
          label="Logo URL"
          value={settings.appearance.logoUrl}
          onChange={(e) => handleSettingChange("appearance", "logoUrl", e.target.value)}
          placeholder="https://example.com/logo.png"
        />

        <Input
          label="Favicon URL"
          value={settings.appearance.faviconUrl}
          onChange={(e) => handleSettingChange("appearance", "faviconUrl", e.target.value)}
          placeholder="https://example.com/favicon.ico"
        />
      </div>

      <div className="p-4 border border-neutral-200 rounded-lg">
        <h4 className="font-medium text-neutral-900 mb-2">Logo Upload</h4>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Upload Logo
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Upload Favicon
          </Button>
        </div>
        <p className="text-sm text-neutral-500 mt-2">Recommended: Logo 200x50px, Favicon 32x32px</p>
      </div>
    </div>
  );

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Settings</h1>
          <p className="text-neutral-600 mt-1">Manage your admin panel configuration</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <input
            type="file"
            accept=".json"
            onChange={importSettings}
            className="hidden"
            id="import-settings"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => document.getElementById('import-settings').click()}
            autoRefresh={true}
            refreshDelay={800}
          >
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={exportSettings}
            autoRefresh={true}
            refreshDelay={1000}
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={resetSettings}
            autoRefresh={true}
            refreshDelay={1200}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-primary-50 text-primary-700 border border-primary-200'
                      : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                  }`}
                >
                  {tab.icon}
                  <span className="font-medium">{tab.name}</span>
                </button>
              ))}
            </nav>
          </Card>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <Card className="p-6">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-neutral-900 capitalize">
                  {activeTab} Settings
                </h2>
                <Badge variant="primary">
                  {tabs.find(t => t.id === activeTab)?.name}
                </Badge>
              </div>

              {activeTab === "general" && renderGeneralSettings()}
              {activeTab === "notifications" && renderNotificationSettings()}
              {activeTab === "security" && renderSecuritySettings()}
              {activeTab === "business" && renderBusinessSettings()}
              {activeTab === "appearance" && renderAppearanceSettings()}

              <div className="flex items-center justify-end space-x-4 mt-8 pt-6 border-t border-neutral-200">
                <Button
                  variant="outline"
                  onClick={() => refreshSettingsData('manual')}
                  disabled={isRefreshing}
                  autoRefresh={true}
                  refreshDelay={1000}
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                  Reset
                </Button>
                
                <Button
                  onClick={saveSettings}
                  disabled={loading}
                  autoRefresh={true}
                  refreshDelay={1500}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </motion.div>
          </Card>
        </div>
      </div>

      {/* Debug Info */}
      {process.env.NODE_ENV === 'development' && refreshCount > 0 && (
        <div className="fixed bottom-4 right-4 bg-neutral-800 text-white px-3 py-2 rounded-lg text-xs">
          Settings Refreshes: {refreshCount}
        </div>
      )}
    </AdminLayout>
  );
}