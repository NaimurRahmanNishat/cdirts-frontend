import { useState } from "react";
import { Menu, X } from "lucide-react";
import userIcon from "../../assets/user.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/redux/store";
import { toast } from "react-toastify";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import { logout } from "@/redux/features/auth/authSlice";
import logo from "../../assets/logo.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutUser] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      const res = await logoutUser().unwrap();
      if (res.success) {
        dispatch(logout());
        toast.success(res.message || "Logged out successfully!");
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
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-6 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-14 h-14 object-contain" />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6 font-medium text-gray-700">
          <Link to="/" className="hover:text-[#239c47] transition">
            Home
          </Link>
          <Link to="/electricity" className="hover:text-[#239c47] transition">
            Electricity
          </Link>
          <Link to="/gas" className="hover:text-[#239c47] transition">
            Gas
          </Link>
          <Link to="/road" className="hover:text-[#239c47] transition">
            Road
          </Link>
          <Link to="/watar" className="hover:text-[#239c47] transition">
            Water
          </Link>
          <Link to="/others" className="hover:text-[#239c47] transition">
            Others
          </Link>
        </nav>

        {/* User / Auth Controls */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <img
                src={user?.avatar?.url || userIcon}
                alt="user avatar"
                onClick={handleProfileClick}
                className="w-9 h-9 rounded-full border border-gray-300 cursor-pointer hover:ring-2 hover:ring-[#239c47] transition"
              />
              <button
                onClick={handleLogout}
                className="hidden md:inline-block hover:cursor-pointer text-gray-700 hover:text-[#239c47] transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-5">
              <Link to="/login" className="hover:text-[#239c47] transition">
                Login
              </Link>
              <Link to="/register" className="hover:text-[#239c47] transition">
                Register
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-700"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Overlay background (blur when menu open) */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* Right-Side Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-4 py-4 border-b border-gray-200">
          <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-8 h-8 object-contain" />
        </Link>
          <button onClick={() => setMenuOpen(false)}>
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        <nav className="flex flex-col px-6 py-4 space-y-4 text-gray-700 font-medium">
          <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-[#239c47] transition">Home</Link>
          <Link to="/electricity" onClick={() => setMenuOpen(false)} className="hover:text-[#239c47] transition">Electricity</Link>
          <Link to="/gas" onClick={() => setMenuOpen(false)} className="hover:text-[#239c47] transition">Gas</Link>
          <Link to="/road" onClick={() => setMenuOpen(false)} className="hover:text-[#239c47] transition">Road</Link>
          <Link to="/watar" onClick={() => setMenuOpen(false)} className="hover:text-[#239c47] transition">Water</Link>
          <Link to="/others" onClick={() => setMenuOpen(false)} className="hover:text-[#239c47] transition">Others</Link>

          <div className="border-t border-gray-300 pt-4">
            {user ? (
              <>
                <button
                  onClick={() => {
                    handleProfileClick();
                    setMenuOpen(false);
                  }}
                  className="block w-full text-left hover:text-[#239c47] transition"
                >
                  Profile
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="block w-full text-left hover:text-[#239c47] transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <Link to="/login" onClick={() => setMenuOpen(false)} className="hover:text-[#239c47] transition">Login</Link>
                <Link to="/register" onClick={() => setMenuOpen(false)} className="hover:text-[#239c47] transition">Register</Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
