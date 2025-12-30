import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className={`
        relative inline-flex items-center justify-center w-12 h-12 
        rounded-full bg-neutral-100 dark:bg-neutral-800 
        hover:bg-neutral-200 dark:hover:bg-neutral-700
        transition-colors duration-300 focus:outline-none focus:ring-2 
        focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900
        ${className}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <motion.div
        initial={false}
        animate={{
          rotate: isDark ? 180 : 0,
          scale: isDark ? 0.8 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 10,
        }}
      >
        {isDark ? (
          <Moon className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
        ) : (
          <Sun className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
        )}
      </motion.div>
      
      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-primary-500/20"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 0, opacity: 0 }}
        whileTap={{ scale: 1.2, opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
    </motion.button>
  );
};

export default ThemeToggle;