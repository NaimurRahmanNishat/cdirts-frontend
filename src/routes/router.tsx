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
import Gas from "@/pages/gas/Gas";
import Road from "@/pages/road/Road";
import Watar from "@/pages/watar/Watar";
import Others from "@/pages/others/Others";
import ActivateUser from "@/pages/register/ActivateUser";
import ElectricityPage from "@/pages/electricity/Electricity";
import SinglePage from "@/pages/[id]/SinglePage";

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
        path: "/register-otp",
        element: <ActivateUser />,
      },
      {
        path: "/register",
        element: <Register />,
      },
            {
        path: "/electricity",
        element: <ElectricityPage />,
      },
      {
        path: "/gas",
        element: <Gas />,
      },
      {
        path: "/road",
        element: <Road />,
      },
      {
        path: "/watar",
        element: <Watar />,
      },
      {
        path: "/others",
        element: <Others />,
      },
      {
        path: "/:issueId",
        element: <SinglePage />,
      }
    ],
  },
  {
    path: "/dashboard", 
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
