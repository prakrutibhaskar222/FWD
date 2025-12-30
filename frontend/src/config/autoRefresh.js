/**
 * Auto-refresh configuration settings
 */
export const AUTO_REFRESH_CONFIG = {
  // Default settings for auto-refresh functionality
  defaults: {
    enabled: true,
    debounceMs: 1000,
    refreshDelay: 1200,
    showNotifications: true,
    showDebugInfo: process.env.NODE_ENV === 'development',
  },

  // Button-specific refresh delays (in milliseconds)
  buttonDelays: {
    primary: 1200,
    secondary: 1000,
    outline: 1100,
    ghost: 800,
    success: 1300,
    warning: 1400,
    error: 1500,
  },

  // Page-specific settings
  pages: {
    landing: {
      enabled: true,
      debounceMs: 800,
      showNotifications: true,
    },
    home: {
      enabled: true,
      debounceMs: 1000,
      showNotifications: true,
      autoInterval: null, // Set to number for automatic refresh interval
    },
    services: {
      enabled: true,
      debounceMs: 600,
      showNotifications: false,
    },
  },

  // Event types that trigger refresh
  triggerEvents: {
    buttonClick: true,
    windowFocus: true,
    visibilityChange: true,
    networkOnline: true,
    customEvents: true,
  },

  // Notification settings
  notifications: {
    position: 'top-right',
    duration: {
      refresh: 3000,
      success: 2000,
      error: 4000,
    },
    maxVisible: 3,
    showProgress: true,
  },
};

export default AUTO_REFRESH_CONFIG;