import App from "@/App";
import Home from "@/pages/home/Home";
import Login from "@/pages/login/Login";
import Register from "@/pages/register/Register";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./protectedRoute";
import DashboardLayout from "@/pages/dashboard/DashboardLayout";
import UserDashboardMain from "@/pages/dashboard/user/dashboard/UserDashboardMain";
import ErrorPage from "@/components/shared/Error";
import BrowseChairs from "@/pages/dashboard/user/browse-chairs/BrowseChairs";
import MyBookings from "@/pages/dashboard/user/my-bookings/MyBookings";
import PaymentHistory from "@/pages/dashboard/user/payment-history/PaymentHistory";
import Reviews from "@/pages/dashboard/user/reviews/Reviews";
import ProfileSettings from "@/pages/dashboard/user/profile-settings/ProfileSettings";
import Support from "@/pages/dashboard/user/support/Support";
import AdminDashboardMain from "@/pages/dashboard/admin/dashboard/AdminDashboardMain";
import VendorManagement from "@/pages/dashboard/admin/vendor-management/VendorManagement";
import UserManagement from "@/pages/dashboard/admin/user-management/UserManagement";
import ServiceManagement from "@/pages/dashboard/admin/service-management/ServiceManagement";
import BookingManagement from "@/pages/dashboard/admin/booking-management/BookingManagement";
import CommissionAndPayment from "@/pages/dashboard/admin/commission/CommissionAndPayment";
import ReportsAndAnalytics from "@/pages/dashboard/admin/reports/ReportsAndAnalytics";
import Settings from "@/pages/dashboard/admin/settings/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard", // parents absolute path
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      // user routes
      {
        path: "user", // children relative path
        element: <UserDashboardMain />,
      },
      {
        path: "browse-chairs", // children relative path
        element: <BrowseChairs />,
      },
      {
        path: "my-bookings", // children relative path
        element: <MyBookings />,
      },
      {
        path: "payment-history", // children relative path
        element: <PaymentHistory />,
      },
      {
        path: "reviews", // children relative path
        element: <Reviews/>,
      },
      {
        path: "profile-settings", // children relative path
        element: <ProfileSettings/>,
      },
      {
        path: "support", // children relative path
        element: <Support/>,
      },

      // admin routes
      {
        path: "admin", // children relative path
        element: (
          <ProtectedRoute role="admin">
            <AdminDashboardMain />
          </ProtectedRoute>
        ),
      },
      {
        path: "vendor-management", // children relative path
        element: (
          <ProtectedRoute role="admin">
            <VendorManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: "user-management", // children relative path
        element: (
          <ProtectedRoute role="admin">
            <UserManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: "service-management", // children relative path
        element: (
          <ProtectedRoute role="admin">
            <ServiceManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: "booking-management", // children relative path
        element: (
          <ProtectedRoute role="admin">
            <BookingManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: "commission", // children relative path
        element: (
          <ProtectedRoute role="admin">
            <CommissionAndPayment />
          </ProtectedRoute>
        ),
      },
      {
        path: "reports", // children relative path
        element: (
          <ProtectedRoute role="admin">
            <ReportsAndAnalytics />
          </ProtectedRoute>
        ),
      },
      {
        path: "settings", // children relative path
        element: (
          <ProtectedRoute role="admin">
            <Settings />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
