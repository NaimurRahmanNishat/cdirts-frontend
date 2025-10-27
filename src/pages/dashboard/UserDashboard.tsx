import { Link, NavLink } from "react-router";

const navItems = [
  {
    path: "/dashboard/user",
    label: "Dashboard",
  },
  {
    path: "/dashboard/create-issue",
    label: "Create Issue",
  },
  {
    path: "/dashboard/my-issues",
    label: "My Issues",
  },
    {
    path: "/dashboard/profile-settings",
    label: "Profile Settings",
  },
];

const UserDashboard = () => {

  return (
    <div className="bg-white p-8 md:h-screen flex flex-col justify-between">
      <div>
        <div className="text-2xl font-extrabold text-[#0f172a]">
          <Link to="/" className="text-[#239c47]">  
            Cdirts<span className="text-[#3b82f6] text-4xl">.</span>
          </Link>
          <p className="text-xs italic text-pink-500">User dashboard</p>
        </div>
        <hr className="mt-5" />
        <ul className="space-y-5 pt-5">
          {navItems.map((item, index) => (
            <li key={index} className="text-[#0f172a] hover:text-[#f95937]">
              <NavLink
                to={item.path}
                end
                className={({ isActive }) =>
                  isActive ? "text-[#f95937] font-semibold" : ""
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserDashboard;