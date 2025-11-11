import { useDispatch, useSelector } from "react-redux";
import userIcon from "../../assets/user.png";
import type { RootState } from "@/redux/store";
import { IoNotificationsOutline } from "react-icons/io5";
import { TbWorld } from "react-icons/tb";
import { useState } from "react";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "@/redux/features/auth/authSlice";
import ProfileCard from "./ProfileCard";

const DashboardHeader = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutUser] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const res = await logoutUser().unwrap();
      if (res.success) {
        dispatch(logout());
        navigate("/");
        toast.success(res.message || "Logged out successfully!");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Try again.");
    }
  };


  return (
    <header className="relative mx-4 md:mx-12 bg-gray-200 dark:bg-gray-800 text-gray-800 rounded-lg p-4 flex justify-between items-center transition-all duration-300">
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search..."
        className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-gray-200 rounded-lg px-3 py-2 w-64 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
      />

      {/* Right Section */}
      <div className="flex items-center gap-4 relative">

        {/* Language */}
        <TbWorld className="w-6 h-6 cursor-pointer hover:text-blue-500 transition" />

        {/* Notifications */}
        <IoNotificationsOutline className="w-6 h-6 cursor-pointer hover:text-blue-500 transition" />

        {/* User Profile */}
        {user && (
          <div className="relative">
            <img
              src={user.avatar?.url || userIcon}
              alt="User avatar"
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-10 h-10 rounded-full cursor-pointer border border-gray-300 dark:border-gray-600 hover:ring-2 hover:ring-blue-400 transition"
            />

            {/* Dropdown Menu */}
            {menuOpen && (
              <div onMouseLeave={() => setMenuOpen(false)} className="absolute right-0 mt-3 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 transition-all">
                <ProfileCard setMenuOpen={setMenuOpen}/>
                <button onClick={handleLogout} className="w-full text-red-500 font-semibold text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer">
                  logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default DashboardHeader;
