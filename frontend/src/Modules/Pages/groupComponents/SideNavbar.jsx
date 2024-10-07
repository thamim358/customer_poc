import React, { useState, useEffect } from "react";
import { Logo, Text } from "../baseComponents";
import { NavLink } from "react-router-dom";
import { DashboardSideMenus } from "../SideMenus";

const SideNavbar = ({ showSidebar, handleToggleSidebar }) => {
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const dashBoardmenus = DashboardSideMenus();

  useEffect(() => {
    const storedActiveMenu = localStorage.getItem("activeMenu");
    if (storedActiveMenu) {
      setActiveMenu(storedActiveMenu);
    }
  }, []);

  const handleMenuMouseEnter = (title) => {
    setHoveredMenu(title);
  };

  const handleMenuMouseLeave = () => {
    setHoveredMenu(null);
  };

  const handleMenuClick = (title) => {
    setActiveMenu(title);
    localStorage.setItem("activeMenu", title);
  };

  const menus = [...dashBoardmenus];

  return (
    <nav className={`bg-white w-64 fixed z-[100] h-[100vh] top-0 ${showSidebar ? "left-0" : "left-[-150%]"}`}>
      <div className="p-[16px] sm:p-[20px]">
        <Logo className={"side-navbar_logo "} />
        <div className="mt-2"></div>
      </div>

      <ul>
        {Array.isArray(menus) && menus.length > 0 && menus.map((route, index) => {
          const { path, title, icon } = route;
          const isMenuHovered = hoveredMenu === title;
          const isActive = activeMenu === title;
          return (
            <div className="px-5 my-4">
               <li
              key={index}
              className={`font-semibold p-3 ${isActive ? "bg-gray-100 rounded-full p-3" : ""}`}
              onClick={window.innerWidth < 1280 ? handleToggleSidebar : () => null}
              onMouseEnter={() => handleMenuMouseEnter(title)}
              onMouseLeave={handleMenuMouseLeave}
            >
              <NavLink
                to={path}
                className={`nav-link flex items-center `}
                activeClassName="active" // Apply active styles for NavLink
                onClick={() => handleMenuClick(title)}
              >
                {icon && React.cloneElement(icon, {
                  isFilled: isMenuHovered || isActive,
                })}
                <Text
                  type={"span"}
                  className={`ml-2 ${isMenuHovered || isActive ? "#00D091" : ""}`}
                >
                  {title}
                </Text>
              </NavLink>
            </li>
            </div>
           
          );
        })}
      </ul>
    </nav>
  );
};

export default SideNavbar;
