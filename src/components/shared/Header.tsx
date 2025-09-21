import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import NavItems from "./NavItems";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="container mx-auto max-w-screen-xl px-4 md:px-0">
        <div className="flex items-center justify-between py-4">
          <Link to={"/"}>
            <img src={logo} alt="logo" className="h-12 w-12" />
          </Link>
          <nav className="md:flex hidden">
            <NavItems />
          </nav>
          <div className="flex items-center">
            <Link to="/login">
              <button className="mr-4 ml-4 bg-[#4CF035] px-4 py-2 text-white rounded hover:bg-green-400 font-semibold transition-colors hover:text-white cursor-pointer">Login</button>
            </Link>
            <Link to="/register">
              <button className="bg-[#4CF035] px-4 py-2 text-white rounded hover:bg-green-400 font-semibold transition-colors hover:text-white cursor-pointer">Register</button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
