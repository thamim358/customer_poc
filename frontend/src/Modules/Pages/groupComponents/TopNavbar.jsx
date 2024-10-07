import React, { useEffect, useState } from "react";
import { Header, Text } from "../baseComponents";
import { useLocation, useNavigate } from "react-router-dom";


const TopNavbar = ({ handleToggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    let titleObject = {
      "/dashboard": "Dashboard",
      "/settings": "Settings"
    };
    setPageTitle(`${titleObject[location?.pathname] || ""} `);
  }, [location]);

  const isMobileView = window.innerWidth < 1260;
  console.log("page", pageTitle)
  return (
    <nav className="top-navbar mx-4 md:mx-10 py-3 xl:ml-72 sticky top-0 left-0 z-[98] flex justify-between items-center bg-gray-100">

      <div className="top-navbar-left flex items-center text-black">
        <div className="font-bold text-xl">
          {pageTitle}
        </div>
      </div>
      <div className="top-navbar-right flex items-center">
        {/* Static dropdown content */}
        <div className="profile-wrapper flex items-center cursor-pointer">
          {/* <EditIcon className={"mr-2"} /> */}
          <Text type={"span"} className={" text-sm"}>Settings</Text>
          {/* <DropdownIcon className={"mt-1"} /> */}
        </div>
        {/* Static logout button */}
        <div className="profile-wrapper flex items-center cursor-pointer ml-4">
          {/* <SignoutIcon className={"mr-2"} /> */}
          <Text type={"span"} className={" text-sm"}>Sign out</Text>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
