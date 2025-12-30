import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  DollarSign,
  TrendingUp,
  Calendar,
  Download,
  RefreshCw,
  CreditCard,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import WorkerLayout from "../../components/worker/WorkerLayout";
import { Card, Button, Badge } from "../../components/ui";
import toast from "react-hot-toast";

export default function WorkerEarnings() {
  const [earnings, setEarnings] = useState({
    total: 0,
    thisMonth: 0,
    thisWeek: 0,
    today: 0,
    pending: 0,
    paid: 0
  });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  useEffect(() => {
    fetchEarnings();
  }, [selectedPeriod]);

  const fetchEarnings = async () => {
    try {
      setLoading(true);
      
      // Mock data
      const mockEarnings = {
        total: 125000,
        thisMonth: 28500,
        thisWeek: 7200,
        today: 1500,
        pending: 4500,
        paid: 120500
      };

      const mockTransactions = [
        {
          id: 1,
          jobId: 'BK001',
          service: 'Electrical Repair',
          customer: 'John Doe',
          amount: 1500,
          status: 'paid',
          date: new Date().toISOString(),
          paymentMethod: 'Bank Transfer'
        },
        {
          id: 2,
          jobId: 'BK002',
          service: 'Plumbing Service',
          customer: 'Jane Smith',
          amount: 2000,
          status: 'pending',
          date: new Date(Date.now() - 86400000).toISOString(),
          paymentMethod: 'Cash'
        },
        {
          id: 3,
          jobId: 'BK003',
          service: 'Home Cleaning',
          customer: 'Mike Johnson',
          amount: 800,
          status: 'paid',
          date: new Date(Date.now() - 172800000).toISOString(),
          paymentMethod: 'UPI'
        },
        {
          id: 4,
          jobId: 'BK004',
          service: 'Appliance Installation',
          customer: 'Sarah Wilson',
          amount: 1200,
          status: 'processing',
          date: new Date(Date.now() - 259200000).toISOString(),
          paymentMethod: 'Bank Transfer'
        }
      ];

      setEarnings(mockEarnings);
      setTransactions(mockTransactions);
    } catch (error) {
      console.error("Error fetching earnings:", error);
      toast.error("Failed to load earnings data");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'success';
      case 'pending': return 'warning';
      case 'processing': return 'primary';
      case 'failed': return 'danger';
      default: return 'secondary';
    }
  };

  const exportEarnings = () => {
    const csvData = [
      ["Job ID", "Service", "Customer", "Amount", "Status", "Date", "Payment Method"],
      ...transactions.map(t => [
        t.jobId,
        t.service,
        t.customer,
        t.amount,
        t.status,
        new Date(t.date).toLocaleDateString(),
        t.paymentMethod
      ])
    ];

    const csvContent = csvData.map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `earnings-${selectedPeriod}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <WorkerLayout>
        <div className="space-y-6">
          <div className="animate-pulse">
            <div className="h-8 bg-neutral-200 rounded w-1/4 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-32 bg-neutral-200 rounded"></div>
              ))}
            </div>
            <div className="h-96 bg-neutral-200 rounded"></div>
          </div>
        </div>
      </WorkerLayout>
    );
  }

  return (
    <WorkerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Earnings & Payments</h1>
            <p className="text-neutral-600 mt-1">Track your income and payment history</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
            <Button variant="outline" size="sm" onClick={exportEarnings}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm" onClick={fetchEarnings}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Earnings Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-700">Total Earnings</p>
                  <p className="text-3xl font-bold text-green-900">₹{earnings.total.toLocaleString()}</p>
                  <p className="text-xs text-green-600 mt-1">All time</p>
                </div>
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shadow-lg">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700">This Month</p>
                  <p className="text-3xl font-bold text-blue-900">₹{earnings.thisMonth.toLocaleString()}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-green-600" />
                    <p className="text-xs text-green-600">+12% vs last month</p>
                  </div>
                </div>
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-700">Pending</p>
                  <p className="text-3xl font-bold text-yellow-900">₹{earnings.pending.toLocaleString()}</p>
                  <p className="text-xs text-yellow-600 mt-1">Awaiting payment</p>
                </div>
                <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Clock className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-700">This Week</p>
                  <p className="text-3xl font-bold text-purple-900">₹{earnings.thisWeek.toLocaleString()}</p>
                  <p className="text-xs text-purple-600 mt-1">7 days</p>
                </div>
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Payment Status Overview */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Payment Status Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">₹{earnings.paid.toLocaleString()}</div>
              <div className="text-sm text-green-700">Paid</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <Clock className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-600">₹{earnings.pending.toLocaleString()}</div>
              <div className="text-sm text-yellow-700">Pending</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <CreditCard className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">
                {((earnings.paid / earnings.total) * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-blue-700">Payment Rate</div>
            </div>
          </div>
        </Card>

        {/* Recent Transactions */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-neutral-900">Recent Transactions</h3>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="text-left py-3 px-4 font-medium text-neutral-700">Job ID</th>
                  <th className="text-left py-3 px-4 font-medium text-neutral-700">Service</th>
                  <th className="text-left py-3 px-4 font-medium text-neutral-700">Customer</th>
                  <th className="text-left py-3 px-4 font-medium text-neutral-700">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-neutral-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-neutral-700">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-neutral-700">Method</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <motion.tr
                    key={transaction.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b border-neutral-100 hover:bg-neutral-50"
                  >
                    <td className="py-4 px-4">
                      <Badge variant="outline" size="sm">
                        {transaction.jobId}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-neutral-900">{transaction.service}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-neutral-700">{transaction.customer}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-neutral-900">₹{transaction.amount}</div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-neutral-600">
                        {new Date(transaction.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-neutral-600">{transaction.paymentMethod}</div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Earnings Chart Placeholder */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Earnings Trend</h3>
          <div className="h-64 bg-neutral-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
              <p className="text-neutral-600">Earnings chart will be displayed here</p>
              <p className="text-sm text-neutral-500">Integration with charting library needed</p>
            </div>
          </div>
        </Card>

        {/* Payment Information */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Payment Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-neutral-900 mb-3">Payment Schedule</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Payment Frequency:</span>
                  <span className="font-medium">Weekly</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Next Payment:</span>
                  <span className="font-medium">Friday, Jan 19</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Processing Time:</span>
                  <span className="font-medium">2-3 business days</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-neutral-900 mb-3">Bank Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Account Number:</span>
                  <span className="font-medium">****1234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Bank Name:</span>
                  <span className="font-medium">State Bank of India</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">IFSC Code:</span>
                  <span className="font-medium">SBIN0001234</span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="mt-3">
                Update Bank Details
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </WorkerLayout>
  );
}