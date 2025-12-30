import { CheckCircle, AlertCircle, AlertTriangle, XCircle, X } from 'lucide-react';

const Alert = ({
  children,
  variant = 'info',
  dismissible = false,
  onDismiss,
  className = '',
  ...props
}) => {
  const baseClasses = 'alert flex items-start space-x-3';
  
  const variants = {
    info: 'alert-info',
    success: 'alert-success',
    warning: 'alert-warning',
    error: 'alert-error',
  };
  
  const icons = {
    info: <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />,
    success: <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" />,
    error: <XCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />,
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${className}`;
  
  return (
    <div className={classes} {...props}>
      {icons[variant]}
      <div className="flex-1">
        {children}
      </div>
      {dismissible && (
        <button
          onClick={onDismiss}
          className="flex-shrink-0 ml-auto text-current opacity-70 hover:opacity-100 transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default Alert;