import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

const RefreshNotification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const handleAutoRefresh = (event) => {
      const { detail } = event;
      const id = Date.now();
      
      const notification = {
        id,
        type: 'refresh',
        message: 'Refreshing data...',
        timestamp: detail.timestamp,
        source: detail.buttonVariant || 'button',
      };

      setNotifications(prev => [...prev, notification]);

      // Auto remove after 3 seconds
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
      }, 3000);
    };

    const handleButtonRefresh = (event) => {
      const { detail } = event;
      const id = Date.now();
      
      const notification = {
        id,
        type: 'success',
        message: 'Data refreshed successfully!',
        timestamp: detail.timestamp,
        source: detail.source || 'button',
      };

      setNotifications(prev => [...prev, notification]);

      // Auto remove after 2 seconds
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
      }, 2000);
    };

    window.addEventListener('autoRefresh', handleAutoRefresh);
    document.addEventListener('buttonRefresh', handleButtonRefresh);

    return () => {
      window.removeEventListener('autoRefresh', handleAutoRefresh);
      document.removeEventListener('buttonRefresh', handleButtonRefresh);
    };
  }, []);

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30 
            }}
            className={`
              px-4 py-3 rounded-lg shadow-lg flex items-center space-x-3 min-w-[250px]
              ${notification.type === 'refresh' 
                ? 'bg-primary-600 text-white' 
                : notification.type === 'success'
                ? 'bg-success-600 text-white'
                : 'bg-error-600 text-white'
              }
            `}
          >
            {notification.type === 'refresh' && (
              <RefreshCw className="w-4 h-4 animate-spin flex-shrink-0" />
            )}
            {notification.type === 'success' && (
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
            )}
            {notification.type === 'error' && (
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
            )}
            
            <div className="flex-1">
              <p className="text-sm font-medium">{notification.message}</p>
              <p className="text-xs opacity-75">
                Source: {notification.source}
              </p>
            </div>

            {/* Progress bar for refresh notifications */}
            {notification.type === 'refresh' && (
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-white/30 rounded-b-lg"
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 3, ease: "linear" }}
              />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default RefreshNotification;