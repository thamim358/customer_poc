import React from "react";
import { Route } from "react-router-dom";
import DashBoard from "./PageComponents/Dashboard/DashBoard"
import Settings from "./PageComponents/Dashborad2/Settings";


const DashboardRoutes = () => {
  const pages = [
    {
      path: "/dashboard",
      Component: DashBoard,
    },
    // {
    //   path: "/settings",
    //   Component: Settings,
    // },
    
  ];

  return pages.map((route, index) => {
    const { path, Component } = route;
    return <Route key={index} path={path} element={<Component />} />;
  });
};

export default DashboardRoutes;
