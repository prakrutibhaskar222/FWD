import { useState, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

const Input = forwardRef(({
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  error,
  success,
  disabled = false,
  required = false,
  icon,
  iconPosition = 'left',
  size = 'md',
  variant = 'default',
  className = '',
  hint,
  showPasswordToggle = false,
  ...props
}, ref) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const inputType = type === 'password' && showPassword ? 'text' : type;
  
  const handleFocus = (e) => {
    setFocused(true);
    onFocus?.(e);
  };
  
  const handleBlur = (e) => {
    setFocused(false);
    onBlur?.(e);
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-4 text-lg',
  };
  
  const variants = {
    default: 'border-neutral-200 dark:border-neutral-600 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-primary-200 dark:focus:ring-primary-800 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100',
    filled: 'bg-neutral-50 dark:bg-neutral-700 border-transparent focus:bg-white dark:focus:bg-neutral-800 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-primary-200 dark:focus:ring-primary-800 text-neutral-900 dark:text-neutral-100',
    underlined: 'border-0 border-b-2 border-neutral-200 dark:border-neutral-600 focus:border-primary-500 dark:focus:border-primary-400 rounded-none bg-transparent px-0 text-neutral-900 dark:text-neutral-100',
  };
  
  const baseClasses = `
    w-full transition-all duration-300 focus:outline-none focus:ring-4 
    disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-neutral-50 dark:disabled:bg-neutral-700
    ${variant === 'underlined' ? 'rounded-none' : 'rounded-xl'}
    ${error ? 'border-error-500 focus:border-error-500 focus:ring-error-200 dark:focus:ring-error-800' : ''}
    ${success ? 'border-success-500 focus:border-success-500 focus:ring-success-200 dark:focus:ring-success-800' : ''}
    ${variants[variant]}
    ${sizes[size]}
  `;
  
  const iconSize = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5';
  const iconPadding = iconPosition === 'left' ? 'pl-10' : 'pr-10';
  
  return (
    <div className={`w-full ${className}`}>
      {/* Label */}
      {label && (
        <motion.label
          initial={false}
          animate={{
            color: focused ? '#0ea5e9' : error ? '#ef4444' : success ? '#22c55e' : '#6b7280',
          }}
          className={`
            block text-sm font-medium mb-2 transition-colors duration-300 text-neutral-700 dark:text-neutral-300
            ${required ? "after:content-['*'] after:text-error-500 after:ml-1" : ''}
          `}
        >
          {label}
        </motion.label>
      )}
      
      {/* Input Container */}
      <div className="relative">
        {/* Left Icon */}
        {icon && iconPosition === 'left' && (
          <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${iconSize} text-neutral-400 dark:text-neutral-500 transition-colors duration-300 ${focused ? 'text-primary-500 dark:text-primary-400' : ''}`}>
            {icon}
          </div>
        )}
        
        {/* Input Field */}
        <motion.input
          ref={ref}
          type={inputType}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            ${baseClasses}
            ${icon ? iconPadding : ''}
            ${showPasswordToggle || type === 'password' ? 'pr-12' : ''}
            ${error ? 'pr-12' : ''}
            ${success ? 'pr-12' : ''}
          `}
          whileFocus={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          {...props}
        />
        
        {/* Right Icons */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
          {/* Success Icon */}
          {success && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-success-500"
            >
              <CheckCircle className="w-5 h-5" />
            </motion.div>
          )}
          
          {/* Error Icon */}
          {error && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-error-500"
            >
              <AlertCircle className="w-5 h-5" />
            </motion.div>
          )}
          
          {/* Password Toggle */}
          {(type === 'password' || showPasswordToggle) && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors duration-200"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          )}
          
          {/* Right Icon */}
          {icon && iconPosition === 'right' && (
            <div className={`${iconSize} text-neutral-400 dark:text-neutral-500 transition-colors duration-300 ${focused ? 'text-primary-500 dark:text-primary-400' : ''}`}>
              {icon}
            </div>
          )}
        </div>
      </div>
      
      {/* Helper Text / Error Message */}
      <AnimatePresence>
        {(hint || error) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`mt-2 text-sm ${error ? 'text-error-600 dark:text-error-400' : 'text-neutral-500 dark:text-neutral-400'}`}
          >
            {error || hint}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

Input.displayName = 'Input';

export default Input;