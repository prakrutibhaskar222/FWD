import User from "../models/User.js";
import Worker from "../models/Worker.js";
import Booking from "../models/Booking.js";

/* ================= ADMIN OVERVIEW ================= */
export const getAdminOverview = async (req, res) => {
  const [
    totalUsers,
    totalWorkers,
    pendingWorkers,
    totalBookings,
    completedBookings,
    pendingBookings,
    revenueAgg,
    recentBookings
  ] = await Promise.all([
    User.countDocuments({ role: "user" }),
    Worker.countDocuments(),
    Worker.countDocuments({ complianceStatus: "pending" }),
    Booking.countDocuments(),
    Booking.countDocuments({ status: "completed" }),
    Booking.countDocuments({ status: { $in: ["pending", "in-progress"] } }),
    Booking.aggregate([
      { $match: { paid: true } },
      { $group: { _id: null, total: { $sum: "$price" } } }
    ]),
    Booking.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("serviceId")
  ]);

  res.json({
    success: true,
    data: {
      users: totalUsers,
      workers: totalWorkers,
      pendingWorkers,
      bookings: {
        total: totalBookings,
        completed: completedBookings,
        pending: pendingBookings
      },
      revenue: revenueAgg[0]?.total || 0,
      recentBookings
    }
  });
};

const last7Days = new Date();
last7Days.setDate(last7Days.getDate() - 6);

const chartData = await Booking.aggregate([
  {
    $match: {
      createdAt: { $gte: last7Days }
    }
  },
  {
    $group: {
      _id: {
        day: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }
      },
      bookings: { $sum: 1 },
      revenue: {
        $sum: {
          $cond: [{ $eq: ["$paid", true] }, "$price", 0]
        }
      }
    }
  },
  { $sort: { "_id.day": 1 } }
]);

const topWorkers = await Worker.find({ verified: true })
  .sort({ rating: -1, earnings: -1 })
  .limit(5)
  .select("name rating earnings");
