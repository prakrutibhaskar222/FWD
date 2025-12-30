const Badge = ({
  children,
  variant = 'neutral',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full';
  
  const variants = {
    primary: 'bg-primary-100 dark:bg-primary-900/50 text-primary-800 dark:text-primary-200',
    secondary: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200',
    success: 'bg-success-100 dark:bg-success-900/50 text-success-800 dark:text-success-200',
    warning: 'bg-warning-100 dark:bg-warning-900/50 text-warning-800 dark:text-warning-200',
    error: 'bg-error-100 dark:bg-error-900/50 text-error-800 dark:text-error-200',
    neutral: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200',
  };
  
  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
  
  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
};

export default Badge;