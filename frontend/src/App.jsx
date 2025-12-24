import React from "react";
import { Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Installation from "./pages/Installation";
import Personal from "./pages/Personal";
import HomeServices from "./pages/HomeServices";
import Renovation from "./pages/Renovation";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Stats from "./components/Stats";
import Booking from "./pages/Booking";
import Legacy from "./pages/Legacy";
import Support from "./pages/Support";
import Shop from "./pages/Shop";

import AdminBookings from "./pages/admin/AdminBookings";
import AdminServices from "./pages/admin/AdminServices";
import Dashboard from "./pages/admin/Dashboard";

import WorkerDashboard from "./pages/workers/WorkerDashboard";
import ServiceDetails from "./pages/ServiceDetails.jsx";
import ElectricalPage from "./pages/ElectricalPage";

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
import WorkerRoute from "./routes/WorkerRoute";
import Unauthorized from "./pages/Unauthorised.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import WorkerRegister from "./pages/WorkerRegister.jsx";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Toaster position="top-center" />

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Landing />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/legacy" element={<Legacy />} />
        <Route path="/support" element={<Support />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* USER */}
        <Route path="/home" element={<Home />} />
        <Route path="/electrical" element={<ElectricalPage />} />
        <Route path="/installation/*" element={<Installation />} />
        <Route path="/personal/*" element={<Personal />} />
        <Route path="/homeservices/*" element={<HomeServices />} />
        <Route path="/renovation/*" element={<Renovation />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/service/:id" element={<ServiceDetails />} />

        <Route
          path="/booking/service/:id"
          element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/bookings"
          element={
            <AdminRoute>
              <AdminBookings />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/services"
          element={
            <AdminRoute>
              <AdminServices />
            </AdminRoute>
          }
        />

        {/* WORKER */}
        <Route
          path="/worker/dashboard"
          element={
            <WorkerRoute>
              <WorkerDashboard />
            </WorkerRoute>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/register-worker" element={<WorkerRegister />} />

        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
