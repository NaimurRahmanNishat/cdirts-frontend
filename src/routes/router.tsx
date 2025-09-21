import { createBrowserRouter } from "react-router";
import App from "../App";
import Login from "@/pages/login/Login";
import Home from "@/pages/home/Home";
import Register from "@/pages/register/Register";
import VerifyOtp from "@/pages/verifyOtp/VerifyOtp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>404</div>,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
  {
    path: "/verify-otp",
    element: <VerifyOtp />,
  },
]);

export default router;
