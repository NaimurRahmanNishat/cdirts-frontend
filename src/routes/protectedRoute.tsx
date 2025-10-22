import { useSelector, useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import type { RootState } from "@/redux/store";
import { setUser, logout } from "@/redux/features/auth/authSlice";
import type { Role } from "@/types";
import { useRefreshTokenMutation } from "@/redux/features/auth/authApi";

type Props = {
  children: React.ReactNode;
  role?: Role;
};

const ProtectedRoute = ({ children, role }: Props) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [checking, setChecking] = useState(true);
  const [refreshToken] = useRefreshTokenMutation();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!user) {
          const res = await refreshToken().unwrap();
          if (res?.data) {
            dispatch(setUser(res.data)); // refresh token and set user
          } else {
            throw new Error("No user data returned from refresh");
          }
        }
      } catch (error) {
        console.error("checkAuth error:", error);
        dispatch(logout());
      } finally {
        setChecking(false);
      }
    };
    checkAuth();
  }, [user, dispatch, refreshToken]);

  if (checking)
    return <div className="text-center p-5">Checking authentication...</div>;

  if (!user) {
    alert("Please login first");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role && user.role !== role) {
    alert("You are not authorized to access this page");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
