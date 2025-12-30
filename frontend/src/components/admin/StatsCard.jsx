import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function StatsCard({ 
  title, 
  value, 
  change, 
  changeType = "positive", 
  icon, 
  color = "primary",
  loading = false 
}) {
  const colorClasses = {
    primary: "from-primary-500 to-primary-600",
    success: "from-green-500 to-green-600",
    warning: "from-yellow-500 to-orange-600",
    danger: "from-red-500 to-red-600",
    info: "from-blue-500 to-blue-600",
    purple: "from-purple-500 to-purple-600"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200 hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-neutral-600 mb-1">{title}</p>
          {loading ? (
            <div className="h-8 bg-neutral-200 rounded animate-pulse"></div>
          ) : (
            <p className="text-3xl font-bold text-neutral-900">{value}</p>
          )}
          
          {change && !loading && (
            <div className={`flex items-center mt-2 text-sm ${
              changeType === "positive" ? "text-green-600" : "text-red-600"
            }`}>
              {changeType === "positive" ? (
                <TrendingUp className="w-4 h-4 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 mr-1" />
              )}
              <span>{change}</span>
            </div>
          )}
        </div>
        
        {icon && (
          <div className={`w-12 h-12 bg-gradient-to-r ${colorClasses[color]} rounded-xl flex items-center justify-center text-white`}>
            {icon}
          </div>
        )}
      </div>
    </motion.div>
  );
}