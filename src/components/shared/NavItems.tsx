import { NavLink } from "react-router-dom";

export interface NavItemsProps {
  name: string;
  href: string;
}

const navItems: NavItemsProps[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const NavItems = () => {
  return (
    <nav>
      <ul className="flex items-center flex-col md:flex-row gap-4 md:gap-6">
        {navItems.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.href}
              className={({ isActive }) =>
                `group relative pb-1 transition-colors duration-300 
                ${isActive ? "text-[#4CF035] font-semibold" : "text-gray-700 hover:text-[#4BF035]"}`
              }
            >
              {item.name}
              {/* underline animation */}
              <span
                className={`
                  absolute left-0 -bottom-0.5 h-[2px] w-0 bg-[#4CF035] 
                  transition-all duration-300 
                  group-hover:w-full
                  ${item.href === window.location.pathname ? "w-full" : ""}
                `}
              ></span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavItems;
