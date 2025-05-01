import React, { useState } from "react";
import { Drawer, Toolbar, Box, Divider } from "@mui/material";
import SidebarSection from "../sidebarSection";

import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PeopleIcon from "@mui/icons-material/People";
import ListAltIcon from "@mui/icons-material/ListAlt";
import TaskIcon from "@mui/icons-material/Task";
import ListIcon from "@mui/icons-material/List";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 240;

const navItems = [
  {
    label: "Dashboard",
    icon: <DashboardIcon />,
    path: "/dashboard",
    roles: ["admin", "developer", "client"],
  },
  {
    label: "Manage Users",
    icon: <PeopleIcon />,
    path: "/admin/users",
    roles: ["admin"],
  },
  {
    label: "Create Task",
    icon: <TaskIcon />,
    path: "create-task",
    roles: ["client"],
  },
  {
    label: "View Tasks",
    icon: <ListIcon />,
    path: "tasks",
    roles: ["admin", "client"],
  },
  {
    label: "Assigned Tasks",
    icon: <ListAltIcon />,
    path: "assign",
    roles: ["admin", "developer"],
  },
];

const logoutItems = [
  {
    label: "Profile",
    icon: <AssignmentIcon />,
    path: "/profile",
    roles: ["admin", "developer", "client"],
  },
  {
    label: "Logout",
    icon: <LogoutIcon />,
    path: "#",
    roles: ["admin", "developer", "client"],
  },
];

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState("/");
  //role
  const role = "developer";

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <SidebarSection
          items={navItems}
          role={role}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <Divider />
        <SidebarSection
          items={logoutItems}
          role={role}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </Box>
    </Drawer>
  );
}
