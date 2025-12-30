const LoadingSpinner = ({ 
  size = 'md', 
  color = 'primary',
  className = '' 
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };
  
  const colors = {
    primary: 'border-primary-600',
    secondary: 'border-neutral-600',
    white: 'border-white',
  };
  
  return (
    <div className={`loading-spinner ${sizes[size]} border-4 border-neutral-200 ${colors[color]} ${className}`}></div>
  );
};

const LoadingDots = ({ 
  size = 'md',
  color = 'primary',
  className = '' 
}) => {
  const sizes = {
    sm: 'w-1 h-1',
    md: 'w-2 h-2',
    lg: 'w-3 h-3',
  };
  
  const colors = {
    primary: 'bg-primary-600',
    secondary: 'bg-neutral-600',
    white: 'bg-white',
  };
  
  return (
    <div className={`loading-dots ${className}`}>
      <div className={`${sizes[size]} ${colors[color]} rounded-full animate-pulse`}></div>
      <div className={`${sizes[size]} ${colors[color]} rounded-full animate-pulse`} style={{ animationDelay: '0.1s' }}></div>
      <div className={`${sizes[size]} ${colors[color]} rounded-full animate-pulse`} style={{ animationDelay: '0.2s' }}></div>
    </div>
  );
};

const LoadingSkeleton = ({ 
  className = '',
  lines = 1,
  avatar = false 
}) => {
  return (
    <div className={`animate-pulse ${className}`}>
      {avatar && (
        <div className="skeleton-avatar mb-4"></div>
      )}
      {Array.from({ length: lines }).map((_, index) => (
        <div key={index} className={`skeleton-text mb-2 ${index === lines - 1 ? 'w-3/4' : 'w-full'}`}></div>
      ))}
    </div>
  );
};

LoadingSpinner.Dots = LoadingDots;
LoadingSpinner.Skeleton = LoadingSkeleton;

export default LoadingSpinner;