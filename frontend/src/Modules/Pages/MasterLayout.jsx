import React, { useState, useEffect } from 'react';
import DashboardRoutes from './Routes';
import { Routes } from 'react-router-dom';
import TopNavbar from './groupComponents/TopNavbar';
import SideNavbar from './groupComponents/SideNavbar';
;

export const MasterLayout = () => {
  const isMobileOrTabletView = window.innerWidth < 1280;
  const [showSidebar, setShowSidebar] = useState(!isMobileOrTabletView);

  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1280) {
        setShowSidebar(false);
      } else if (window.innerWidth >= 1280) {
        setShowSidebar(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="master-layout h-screen overflow-y-auto bg-cover bg-center bg-no-repeat bg-gray-100"
    >
      <SideNavbar
        showSidebar={showSidebar}
        handleToggleSidebar={handleToggleSidebar}
      />
      <TopNavbar
        handleToggleSidebar={handleToggleSidebar}
      />
      <div className="mx-4 md:mx-10 md:my-4 xl:ml-60 xl:mr-5">
        <Routes>
          {DashboardRoutes()}
        </Routes>
      </div>
    </div>
  )
}
