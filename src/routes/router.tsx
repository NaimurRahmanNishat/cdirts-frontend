import App from "@/App";
import Home from "@/pages/home/Home";
import Login from "@/pages/login/Login";
import Register from "@/pages/register/Register";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./protectedRoute";
import DashboardLayout from "@/pages/dashboard/DashboardLayout";
import UserDashboardMain from "@/pages/dashboard/user/dashboard/UserDashboardMain";
import ErrorPage from "@/components/shared/Error";
import ProfileSettings from "@/pages/dashboard/user/profile-settings/ProfileSettings";
import AdminDashboardMain from "@/pages/dashboard/admin/dashboard/AdminDashboardMain";
import VendorManagement from "@/pages/dashboard/admin/vendor-management/VendorManagement";
import UserManagement from "@/pages/dashboard/admin/user-management/UserManagement";
import Settings from "@/pages/dashboard/admin/settings/Settings";
import Gas from "@/pages/gas/Gas";
import Road from "@/pages/road/Road";
import Others from "@/pages/others/Others";
import ActivateUser from "@/pages/register/ActivateUser";
import ElectricityPage from "@/pages/electricity/Electricity";
import SinglePage from "@/pages/[id]/SinglePage";
import CreateIssue from "@/pages/dashboard/user/create-issue/CreateIssue";
import MyIssues from "@/pages/dashboard/user/my-issues/MyIssues";
import ForgotPassword from "@/pages/forgot-password/ForgotPassword";
import Water from "@/pages/watar/Water";

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
        path: "/forgot-password",
        element: <ForgotPassword />,
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
        path: "/water",
        element: <Water />,
      },
      {
        path: "/others",
        element: <Others />,
      },
      {
        path: "/issues/:issueId",
        element: <SinglePage />,
      },
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
        path: "create-issue", // children relative path
        element: <CreateIssue />,
      },
      {
        path: "my-issues", // children relative path
        element: <MyIssues />,
      },
      {
        path: "profile-settings", // children relative path
        element: <ProfileSettings />,
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
