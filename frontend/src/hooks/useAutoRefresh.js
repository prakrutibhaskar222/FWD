import { useEffect, useState, useCallback } from 'react';

// Debounce utility function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Custom hook for handling auto-refresh functionality
 * @param {Function} refreshCallback - Function to call when refresh is triggered
 * @param {Object} options - Configuration options
 * @returns {Object} - Refresh state and controls
 */
export const useAutoRefresh = (refreshCallback, options = {}) => {
  const {
    enabled = true,
    interval = null, // Auto refresh interval in ms
    onButtonClick = true, // Listen for button click refreshes
    onCustomEvent = true, // Listen for custom refresh events
    debounceMs = 500, // Debounce multiple refresh calls
  } = options;

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(Date.now());
  const [refreshCount, setRefreshCount] = useState(0);

  // Debounced refresh function
  const debouncedRefresh = useCallback(
    debounce(async (source = 'manual') => {
      if (!enabled || isRefreshing) return;
      
      setIsRefreshing(true);
      setRefreshCount(prev => prev + 1);
      
      try {
        await refreshCallback(source);
        setLastRefresh(Date.now());
      } catch (error) {
        console.error('Auto refresh error:', error);
      } finally {
        setIsRefreshing(false);
      }
    }, debounceMs),
    [refreshCallback, enabled, isRefreshing, debounceMs]
  );

  // Manual refresh trigger
  const triggerRefresh = useCallback((source = 'manual') => {
    debouncedRefresh(source);
  }, [debouncedRefresh]);

  // Listen for button click refresh events
  useEffect(() => {
    if (!enabled || !onButtonClick) return;

    const handleButtonRefresh = (event) => {
      debouncedRefresh('button-click');
    };

    const handleAutoRefresh = (event) => {
      debouncedRefresh('auto-refresh');
    };

    document.addEventListener('buttonRefresh', handleButtonRefresh);
    window.addEventListener('autoRefresh', handleAutoRefresh);

    return () => {
      document.removeEventListener('buttonRefresh', handleButtonRefresh);
      window.removeEventListener('autoRefresh', handleAutoRefresh);
    };
  }, [enabled, onButtonClick, debouncedRefresh]);

  // Interval-based auto refresh
  useEffect(() => {
    if (!enabled || !interval) return;

    const intervalId = setInterval(() => {
      debouncedRefresh('interval');
    }, interval);

    return () => clearInterval(intervalId);
  }, [enabled, interval, debouncedRefresh]);

  // Listen for custom refresh events
  useEffect(() => {
    if (!enabled || !onCustomEvent) return;

    const handleCustomRefresh = (event) => {
      debouncedRefresh(`custom-${event.type}`);
    };

    // Listen for common refresh events
    const events = ['focus', 'visibilitychange', 'online'];
    
    events.forEach(event => {
      if (event === 'visibilitychange') {
        document.addEventListener(event, () => {
          if (!document.hidden) {
            handleCustomRefresh({ type: 'visibility' });
          }
        });
      } else {
        window.addEventListener(event, handleCustomRefresh);
      }
    });

    return () => {
      events.forEach(event => {
        if (event === 'visibilitychange') {
          document.removeEventListener(event, handleCustomRefresh);
        } else {
          window.removeEventListener(event, handleCustomRefresh);
        }
      });
    };
  }, [enabled, onCustomEvent, debouncedRefresh]);

  return {
    isRefreshing,
    lastRefresh,
    refreshCount,
    triggerRefresh,
    enabled,
  };
};

export default useAutoRefresh;