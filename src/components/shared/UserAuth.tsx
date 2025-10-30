import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircleUserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import { logout } from "@/redux/features/auth/authSlice";
import { toast } from "react-toastify";
import type { RootState } from "@/redux/store";
import userIcon from "../../assets/user.png";


const UserAuth = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutUser] = useLogoutMutation();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      const res = await logoutUser().unwrap();
      if (res.success) {
        dispatch(logout());
        toast.success(res.message || "Logged out successfully!");
        navigate("/");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Try again.");
    }
  };

  const handleProfileClick = () => {
    if (user?.role === "user") navigate("/dashboard/user");
    else if (user?.role === "categoryadmin") navigate("/dashboard/categoryadmin");
    else if (user?.role === "admin") navigate("/dashboard/admin");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Icon */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="relative cursor-pointer"
      >
        {user ? (
          <img
            src={user?.avatar?.url || userIcon}
            alt="User Avatar"
            className="w-10 h-10 rounded-full border border-gray-300 hover:ring-2 hover:ring-[#239c47] transition"
          />
        ) : (
          <CircleUserRound
            size={32}
            className="text-gray-700 hover:text-[#239c47] transition"
          />
        )}
      </div>

      {/* Dropdown */}
      <div
        className={`absolute right-0 mt-3 w-52 bg-white shadow-lg rounded-xl border border-gray-400 p-4 z-50 transform transition-all duration-300 origin-top-right ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 pointer-events-none -translate-y-2"
        }`}
      >
        {user ? (
          <div className="flex flex-col space-y-3 text-gray-700">
            <button
              onClick={() => {
                handleProfileClick();
                setIsOpen(false);
              }}
              className="text-left cursor-pointer px-3 py-2 rounded-md hover:bg-[#f4f4f4] transition font-medium"
            >
              Profile
            </button>
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="text-left cursor-pointer px-3 py-2 rounded-md hover:bg-red-50 hover:text-red-600 transition font-medium"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex flex-col space-y-3 text-gray-700">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#f4f4f4] transition font-medium"
            >
              Login
            </Link>
            <Link
              to="/register"
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#f4f4f4] transition font-medium"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAuth;
