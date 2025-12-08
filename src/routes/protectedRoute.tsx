import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import type { RootState } from "@/redux/store";
import { toast } from "react-toastify";
import type { Role } from "@/types/authType";
import { useAutoRefreshToken } from "@/hooks/autoRefreshToken";
import { useSocket } from "@/hooks/useSocket";

type Props = {
  children: React.ReactNode;
  role?: Role;
};

const ProtectedRoute = ({ children, role }: Props) => {
    // Initialize WebSocket connection
    useSocket();        
  
    // Auto refresh token hook
    useAutoRefreshToken(); 
  const { user } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (!user) {
    toast.error("You must be logged in to view this page.");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role && user.role !== role) {
    toast.error("You are not authorized to access this page");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
