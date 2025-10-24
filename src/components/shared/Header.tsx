import { useState } from "react";
import { Menu, X } from "lucide-react";
import userIcon from "../../assets/user.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { toast } from "react-toastify";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/auth/authSlice";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutUser] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      const res = await logoutUser().unwrap();
      if (res.success) {
        dispatch(logout());
        alert(res.message || "Logged out successfully!");
        navigate("/");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Try again.");
    }
  };

  const handleProfileClick = () => {
    if (user?.role === "user") navigate("/dashboard/user");
    else if (user?.role === "admin") navigate("/dashboard/admin");
  };

  return (
    <header className="bg-white shadow-md sticky top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center px-4 py-3 h-20">
        {/* Logo */}
        <h1 className="text-3xl font-extrabold tracking-tight">
          <Link
            to="/"
            className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent"
          >
            Zen<span className="text-yellow-500 drop-shadow-sm">mo</span>
          </Link>
        </h1>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6 text-gray-700 font-medium items-center">
          <Link to="/" className="hover:text-blue-600 transition">
            Home
          </Link>
          <Link to="/electricity" className="hover:text-blue-600 transition">
            Electricity
          </Link>
          <Link to="/gas" className="hover:text-blue-600 transition">
            Gas
          </Link>
          <Link to="/road" className="hover:text-blue-600 transition">
            Road
          </Link>
          <Link to="/watar" className="hover:text-blue-600 transition">
            Watar
          </Link>
          <Link to="/others" className="hover:text-blue-600 transition">
            Others
          </Link>
        </nav>

        {/* Conditional Render */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="relative group flex items-center gap-2 cursor-pointer">
              {/* User Icon → click to profile */}
              {user?.avatar ? (
                <img
                  src={user?.avatar.url}
                  alt="avatar"
                  onClick={handleProfileClick}
                  className="w-8 h-8 rounded-full border border-gray-300 hover:ring-2 hover:ring-blue-400 transition"
                />
              ) : (
                <img
                  src={userIcon}
                  alt="userIcons"
                  onClick={handleProfileClick}
                  className="w-8 h-8 rounded-full hover:ring-2 hover:ring-blue-400 transition"
                />
              )}

              <span
                onClick={handleLogout}
                className="px-4 hover:text-blue-600 text-gray-700"
              >
                Logout
              </span>
            </div>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-600 transition">
                Login
              </Link>
              <Link to="/register" className="hover:text-blue-600 transition">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-md">
          <nav className="flex flex-col items-center py-3 space-y-3 text-gray-700 font-medium">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="hover:text-blue-600 transition"
            >
              Home
            </Link>
            <Link
              to="/electricity"
              onClick={() => setMenuOpen(false)}
              className="hover:text-blue-600 transition"
            >
              Electricity
            </Link>
            <Link
              to="/gas"
              onClick={() => setMenuOpen(false)}
              className="hover:text-blue-600 transition"
            >
              Gas
            </Link>
            <Link
              to="/road"
              onClick={() => setMenuOpen(false)}
              className="hover:text-blue-600 transition"
            >
              Road
            </Link>
            <Link
              to="/watar"
              onClick={() => setMenuOpen(false)}
              className="hover:text-blue-600 transition"
            >
              Watar
            </Link>
            <Link
              to="/others"
              onClick={() => setMenuOpen(false)}
              className="hover:text-blue-600 transition"
            >
              Others
            </Link>

            {/* Conditional Render for Mobile */}
            {user ? (
              <>
                {/* Dashboard link for mobile */}
                <button
                  onClick={() => {
                    navigate("/dashboard");
                    setMenuOpen(false);
                  }}
                  className="hover:text-blue-600 transition"
                >
                  Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="hover:text-blue-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-blue-600 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-blue-600 transition"
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
