import { useSelector } from "react-redux";
import userIcon from "../../assets/user.png";
import type { RootState } from "@/redux/store";
import { IoNotificationsOutline } from "react-icons/io5";
import { TbWorld } from "react-icons/tb";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProfileCard from "./ProfileCard";

const DashboardHeader = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Logout successful!");
    navigate("/");
    window.location.reload();
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
              <ProfileCard setMenuOpen={setMenuOpen} handleLogout={handleLogout}/>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default DashboardHeader;
