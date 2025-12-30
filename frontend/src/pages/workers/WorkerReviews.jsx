import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
  User,
  Calendar,
  MessageSquare,
  TrendingUp,
  Award,
  RefreshCw,
  Filter
} from "lucide-react";
import WorkerLayout from "../../components/worker/WorkerLayout";
import { Card, Button, Badge } from "../../components/ui";
import toast from "react-hot-toast";

export default function WorkerReviews() {
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({
    averageRating: 0,
    totalReviews: 0,
    ratingDistribution: {}
  });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchReviews();
  }, [filter]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      
      // Mock data
      const mockReviews = [
        {
          id: 1,
          customerName: 'John Doe',
          customerAvatar: 'JD',
          rating: 5,
          comment: 'Excellent work! Very professional and completed the electrical repair quickly. Highly recommended.',
          service: 'Electrical Repair',
          date: new Date().toISOString(),
          jobId: 'BK001'
        },
        {
          id: 2,
          customerName: 'Jane Smith',
          customerAvatar: 'JS',
          rating: 4,
          comment: 'Good service, arrived on time and fixed the plumbing issue. Could have been more communicative.',
          service: 'Plumbing Service',
          date: new Date(Date.now() - 86400000).toISOString(),
          jobId: 'BK002'
        },
        {
          id: 3,
          customerName: 'Mike Johnson',
          customerAvatar: 'MJ',
          rating: 5,
          comment: 'Outstanding cleaning service! Very thorough and attention to detail. Will book again.',
          service: 'Home Cleaning',
          date: new Date(Date.now() - 172800000).toISOString(),
          jobId: 'BK003'
        },
        {
          id: 4,
          customerName: 'Sarah Wilson',
          customerAvatar: 'SW',
          rating: 3,
          comment: 'Service was okay, but took longer than expected. The work quality was good though.',
          service: 'Appliance Installation',
          date: new Date(Date.now() - 259200000).toISOString(),
          jobId: 'BK004'
        }
      ];

      const mockStats = {
        averageRating: 4.3,
        totalReviews: 127,
        ratingDistribution: {
          5: 65,
          4: 35,
          3: 20,
          2: 5,
          1: 2
        }
      };

      setReviews(mockReviews);
      setStats(mockStats);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-500 fill-current' : 'text-neutral-300'
        }`}
      />
    ));
  };

  const getFilteredReviews = () => {
    if (filter === 'all') return reviews;
    return reviews.filter(review => review.rating === parseInt(filter));
  };

  if (loading) {
    return (
      <WorkerLayout>
        <div className="space-y-6">
          <div className="animate-pulse">
            <div className="h-8 bg-neutral-200 rounded w-1/4 mb-4"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-32 bg-neutral-200 rounded"></div>
                ))}
              </div>
              <div className="h-96 bg-neutral-200 rounded"></div>
            </div>
          </div>
        </div>
      </WorkerLayout>
    );
  }

  const filteredReviews = getFilteredReviews();

  return (
    <WorkerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Reviews & Ratings</h1>
            <p className="text-neutral-600 mt-1">See what customers are saying about your work</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            >
              <option value="all">All Reviews</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
            <Button variant="outline" size="sm" onClick={fetchReviews}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Reviews List */}
          <div className="lg:col-span-2 space-y-4">
            {filteredReviews.length > 0 ? (
              filteredReviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                        <span className="font-semibold text-blue-700">
                          {review.customerAvatar}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-medium text-neutral-900">{review.customerName}</h4>
                            <p className="text-sm text-neutral-500">{review.service}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-1 mb-1">
                              {renderStars(review.rating)}
                            </div>
                            <p className="text-xs text-neutral-500">
                              {new Date(review.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <p className="text-neutral-700 leading-relaxed">{review.comment}</p>
                        <div className="flex items-center justify-between mt-3">
                          <Badge variant="outline" size="sm">
                            Job #{review.jobId}
                          </Badge>
                          <div className="flex items-center space-x-2 text-xs text-neutral-500">
                            <Calendar className="w-3 h-3" />
                            <span>{new Date(review.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))
            ) : (
              <Card className="p-12 text-center">
                <MessageSquare className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-neutral-900 mb-2">No reviews found</h3>
                <p className="text-neutral-600">
                  {filter === 'all' 
                    ? "You haven't received any reviews yet."
                    : `No ${filter}-star reviews found.`
                  }
                </p>
              </Card>
            )}
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            {/* Overall Rating */}
            <Card className="p-6 text-center">
              <div className="mb-4">
                <div className="text-4xl font-bold text-neutral-900 mb-2">
                  {stats.averageRating}
                </div>
                <div className="flex items-center justify-center space-x-1 mb-2">
                  {renderStars(Math.round(stats.averageRating))}
                </div>
                <p className="text-sm text-neutral-600">
                  Based on {stats.totalReviews} reviews
                </p>
              </div>
              <Badge variant="success" size="lg">
                <Award className="w-4 h-4 mr-2" />
                Top Rated Worker
              </Badge>
            </Card>

            {/* Rating Distribution */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Rating Distribution</h3>
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map(rating => {
                  const count = stats.ratingDistribution[rating] || 0;
                  const percentage = stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0;
                  
                  return (
                    <div key={rating} className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1 w-12">
                        <span className="text-sm font-medium">{rating}</span>
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      </div>
                      <div className="flex-1 h-2 bg-neutral-200 rounded-full">
                        <div 
                          className="h-full bg-yellow-500 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-neutral-600 w-8">{count}</span>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Performance Insights */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Performance Insights</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-900">Rating Trend</span>
                  </div>
                  <span className="text-sm font-bold text-green-600">+0.2 this month</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">Response Rate</span>
                  </div>
                  <span className="text-sm font-bold text-blue-600">95%</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium text-purple-900">Top Skills</span>
                  </div>
                  <span className="text-sm font-bold text-purple-600">Quality</span>
                </div>
              </div>
            </Card>

            {/* Recent Achievements */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Recent Achievements</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <Award className="w-5 h-5 text-yellow-600" />
                  <div>
                    <p className="text-sm font-medium text-yellow-900">5-Star Streak</p>
                    <p className="text-xs text-yellow-700">10 consecutive 5-star reviews</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Star className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">Customer Favorite</p>
                    <p className="text-xs text-blue-700">Top 10% in your category</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </WorkerLayout>
  );
}