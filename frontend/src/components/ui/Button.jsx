import { motion } from 'framer-motion';
import { useState } from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  className = '',
  onClick,
  type = 'button',
  fullWidth = false,
  autoRefresh = false,
  refreshDelay = 1000,
  ...props
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group';
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white shadow-soft hover:shadow-large focus:ring-primary-200 border border-transparent',
    secondary: 'bg-white hover:bg-neutral-50 text-neutral-700 shadow-soft hover:shadow-medium focus:ring-neutral-200 border border-neutral-200 hover:border-neutral-300',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white focus:ring-primary-200 bg-transparent hover:shadow-medium',
    ghost: 'text-neutral-600 hover:text-primary-600 hover:bg-primary-50 focus:ring-primary-200 border border-transparent hover:border-primary-200',
    success: 'bg-gradient-to-r from-success-600 to-success-700 hover:from-success-700 hover:to-success-800 text-white shadow-soft hover:shadow-large focus:ring-success-200 border border-transparent',
    warning: 'bg-gradient-to-r from-warning-600 to-warning-700 hover:from-warning-700 hover:to-warning-800 text-white shadow-soft hover:shadow-large focus:ring-warning-200 border border-transparent',
    error: 'bg-gradient-to-r from-error-600 to-error-700 hover:from-error-700 hover:to-error-800 text-white shadow-soft hover:shadow-large focus:ring-error-200 border border-transparent',
  };
  
  const sizes = {
    xs: 'px-3 py-1.5 text-xs rounded-lg',
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-xl',
    xl: 'px-10 py-5 text-xl rounded-2xl',
  };
  
  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`;
  
  const handleClick = async (e) => {
    if (disabled || loading || isRefreshing) return;
    
    setClickCount(prev => prev + 1);
    
    // Execute the original onClick handler
    if (onClick) {
      await onClick(e);
    }
    
    // Auto refresh functionality
    if (autoRefresh) {
      setIsRefreshing(true);
      
      setTimeout(() => {
        // Trigger page refresh or data refresh
        if (typeof window !== 'undefined') {
          // Option 1: Full page refresh
          // window.location.reload();
          
          // Option 2: Dispatch custom refresh event for components to listen to
          window.dispatchEvent(new CustomEvent('autoRefresh', {
            detail: { 
              timestamp: Date.now(),
              clickCount: clickCount + 1,
              buttonVariant: variant
            }
          }));
          
          // Option 3: Trigger React state updates by dispatching to parent components
          const refreshEvent = new CustomEvent('buttonRefresh', {
            detail: { source: 'button-click', variant, timestamp: Date.now() }
          });
          document.dispatchEvent(refreshEvent);
        }
        
        setIsRefreshing(false);
      }, refreshDelay);
    }
  };
  
  const LoadingSpinner = () => (
    <div className={`animate-spin rounded-full border-2 border-current border-t-transparent ${iconSizes[size]} mr-2`}></div>
  );
  
  const RefreshSpinner = () => (
    <motion.div
      className={`animate-spin rounded-full border-2 border-current border-t-transparent ${iconSizes[size]} mr-2`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );
  
  const IconComponent = icon && (
    <span className={`${iconSizes[size]} ${iconPosition === 'right' ? 'ml-2' : 'mr-2'} transition-transform duration-300 group-hover:scale-110`}>
      {icon}
    </span>
  );
  
  const currentLoading = loading || isRefreshing;
  
  return (
    <motion.button
      whileHover={{ 
        scale: disabled || currentLoading ? 1 : 1.02,
        y: disabled || currentLoading ? 0 : -1
      }}
      whileTap={{ 
        scale: disabled || currentLoading ? 1 : 0.98,
        y: disabled || currentLoading ? 0 : 0
      }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 17 
      }}
      className={classes}
      disabled={disabled || currentLoading}
      onClick={handleClick}
      type={type}
      {...props}
    >
      {/* Ripple effect background */}
      <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
      
      {/* Refresh progress indicator */}
      {isRefreshing && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: refreshDelay / 1000, ease: "linear" }}
        />
      )}
      
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center">
        {currentLoading && (isRefreshing ? <RefreshSpinner /> : <LoadingSpinner />)}
        {!currentLoading && icon && iconPosition === 'left' && IconComponent}
        <span className={`transition-all duration-300 group-hover:tracking-wide ${isRefreshing ? 'opacity-75' : ''}`}>
          {isRefreshing ? 'Refreshing...' : children}
        </span>
        {!currentLoading && icon && iconPosition === 'right' && IconComponent}
      </span>
      
      {/* Click count indicator (for debugging) */}
      {clickCount > 0 && process.env.NODE_ENV === 'development' && (
        <span className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {clickCount}
        </span>
      )}
    </motion.button>
  );
};

export default Button;