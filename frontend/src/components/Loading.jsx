import { motion } from 'framer-motion';
import { LoadingSpinner } from './ui';

const Loading = ({ 
  type = 'page', 
  message = 'Loading...', 
  size = 'md',
  className = '' 
}) => {
  if (type === 'page') {
    return (
      <motion.div 
        className={`min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50 flex flex-col items-center justify-center ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 300 }}
          className="text-center"
        >
          <div className="mb-8">
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
              className="w-16 h-16 mx-auto mb-4"
            >
              <div className="w-full h-full bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">C</span>
              </div>
            </motion.div>
            <LoadingSpinner size="lg" />
          </div>
          
          <motion.h3 
            className="text-xl font-semibold text-neutral-800 mb-3"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {message}
          </motion.h3>
          
          <motion.p 
            className="text-neutral-600 text-sm max-w-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Please wait while we load your content. This won't take long!
          </motion.p>

          {/* Loading Progress Dots */}
          <div className="flex justify-center space-x-2 mt-6">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="w-2 h-2 bg-primary-400 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: index * 0.2
                }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    );
  }

  if (type === 'card') {
    return (
      <motion.div 
        className={`bg-white rounded-2xl shadow-soft p-8 text-center border border-neutral-100 ${className}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <LoadingSpinner size={size} className="mx-auto mb-4" />
        <p className="text-neutral-600 font-medium">{message}</p>
      </motion.div>
    );
  }

  if (type === 'inline') {
    return (
      <motion.div 
        className={`flex items-center space-x-3 ${className}`}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <LoadingSpinner size={size} />
        <span className="text-neutral-600 font-medium">{message}</span>
      </motion.div>
    );
  }

  if (type === 'overlay') {
    return (
      <motion.div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-2xl p-8 shadow-large text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p className="text-neutral-700 font-medium">{message}</p>
        </motion.div>
      </motion.div>
    );
  }

  // Default spinner
  return (
    <div className={`flex justify-center ${className}`}>
      <LoadingSpinner size={size} />
    </div>
  );
};

// Enhanced Skeleton components with better animations
const ServiceCardSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
    <div className="h-48 bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 animate-shimmer"></div>
    <div className="p-6 space-y-4">
      <div className="h-6 bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 rounded w-3/4 animate-shimmer"></div>
      <div className="h-4 bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 rounded w-1/2 animate-shimmer"></div>
      <div className="space-y-2">
        <div className="h-3 bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 rounded animate-shimmer"></div>
        <div className="h-3 bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 rounded w-5/6 animate-shimmer"></div>
      </div>
      <div className="flex justify-between items-center">
        <div className="h-8 bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 rounded w-20 animate-shimmer"></div>
        <div className="h-8 bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 rounded w-24 animate-shimmer"></div>
      </div>
    </div>
  </div>
);

const CategoryCardSkeleton = () => (
  <div className="h-80 bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 rounded-2xl animate-shimmer"></div>
);

const TableRowSkeleton = () => (
  <tr>
    <td className="px-6 py-4">
      <div className="h-4 bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 rounded w-32 animate-shimmer"></div>
    </td>
    <td className="px-6 py-4">
      <div className="h-4 bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 rounded w-24 animate-shimmer"></div>
    </td>
    <td className="px-6 py-4">
      <div className="h-4 bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 rounded w-20 animate-shimmer"></div>
    </td>
    <td className="px-6 py-4">
      <div className="h-4 bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 rounded w-16 animate-shimmer"></div>
    </td>
  </tr>
);

const ProfileSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-soft p-6">
    <div className="flex items-center space-x-4 mb-6">
      <div className="w-16 h-16 bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 rounded-full animate-shimmer"></div>
      <div className="space-y-2">
        <div className="h-5 bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 rounded w-32 animate-shimmer"></div>
        <div className="h-4 bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 rounded w-24 animate-shimmer"></div>
      </div>
    </div>
    <div className="space-y-3">
      <div className="h-4 bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 rounded animate-shimmer"></div>
      <div className="h-4 bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 rounded w-4/5 animate-shimmer"></div>
      <div className="h-4 bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 rounded w-3/5 animate-shimmer"></div>
    </div>
  </div>
);

Loading.ServiceCard = ServiceCardSkeleton;
Loading.CategoryCard = CategoryCardSkeleton;
Loading.TableRow = TableRowSkeleton;
Loading.Profile = ProfileSkeleton;

export default Loading;