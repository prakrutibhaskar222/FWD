import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
  children,
  className = '',
  hover = false,
  padding = 'md',
  shadow = 'soft',
  gradient = false,
  interactive = false,
  ...props
}) => {
  const baseClasses = 'bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-100 dark:border-neutral-700 transition-all duration-300 relative overflow-hidden';
  
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };
  
  const shadows = {
    none: '',
    soft: 'shadow-soft',
    medium: 'shadow-medium',
    large: 'shadow-large',
  };
  
  const hoverClasses = hover ? 'hover:shadow-large hover:scale-[1.02] hover:-translate-y-2 cursor-pointer group' : '';
  const interactiveClasses = interactive ? 'hover:border-primary-200 dark:hover:border-primary-600 focus-within:ring-4 focus-within:ring-primary-100 dark:focus-within:ring-primary-800 focus-within:border-primary-300 dark:focus-within:border-primary-500' : '';
  const gradientClasses = gradient ? 'bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-900' : '';
  
  const classes = `${baseClasses} ${paddings[padding]} ${shadows[shadow]} ${hoverClasses} ${interactiveClasses} ${gradientClasses} ${className}`;
  
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: { 
      y: -8, 
      scale: 1.02,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 17 
      }
    }
  };
  
  if (hover) {
    return (
      <motion.div
        variants={cardVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        className={classes}
        {...props}
      >
        {/* Subtle gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/0 to-accent-50/0 group-hover:from-primary-50/30 group-hover:to-accent-50/20 dark:group-hover:from-primary-900/30 dark:group-hover:to-accent-900/20 transition-all duration-500 pointer-events-none"></div>
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </motion.div>
    );
  }
  
  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      className={classes}
      {...props}
    >
      {children}
    </motion.div>
  );
};

const CardHeader = ({ children, className = '', divider = false }) => (
  <div className={`mb-6 ${divider ? 'pb-4 border-b border-neutral-100 dark:border-neutral-700' : ''} ${className}`}>
    {children}
  </div>
);

const CardBody = ({ children, className = '' }) => (
  <div className={className}>
    {children}
  </div>
);

const CardFooter = ({ children, className = '', divider = false }) => (
  <div className={`mt-6 ${divider ? 'pt-4 border-t border-neutral-100 dark:border-neutral-700' : ''} ${className}`}>
    {children}
  </div>
);

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;