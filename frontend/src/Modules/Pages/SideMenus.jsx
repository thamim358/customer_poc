import { ScheduleOutlined ,SettingOutlined} from "@ant-design/icons";

export const DashboardSideMenus = () => {
  const menus = [
    { path: "/dashboard", title: "Dashboard", icon: <ScheduleOutlined /> },
    // { path: "/settings", title: "Settings", icon: < SettingOutlined/> },
  ];

  return menus;
};
