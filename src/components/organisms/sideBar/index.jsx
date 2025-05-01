import React, { useState } from "react";
import { Drawer, List, Toolbar, Box, Divider } from "@mui/material";
import NavigationItem from "../../molecules/navItem"; // Assuming NavigationItem exists
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PeopleIcon from "@mui/icons-material/People";
import ListAltIcon from "@mui/icons-material/ListAlt";
import TaskIcon from "@mui/icons-material/Task";
import RemoveCircleOutline from "@mui/icons-material/RemoveCircleOutline";
import ListIcon from '@mui/icons-material/List';

const drawerWidth = 240;

const navItems = [
  {
    label: "Dashboard",
    icon: <DashboardIcon />,
    path: "/",
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
    path: "/create-task",
    roles: ["client"],
  },
  {
    label: "View Tasks",
    icon: <ListIcon />,
    path: "/tasks",
    roles: ["admin", "client"],
  },
  {
    label: "Assigned Tasks",
    icon: <ListAltIcon />,
    path: "/tasks",
    roles: ["admin", "developer"],
  },
];

const logoutItem = [
  {
    label: "Profile",
    icon: <AssignmentIcon />,
    path: "/profile",
    roles: ["admin", "developer", "client"],
  },
  {
    label: "Logout",
    icon: <RemoveCircleOutline />,
    path: "#",
    roles: ["admin", "developer", "client"],
  },
];

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState("/"); // State to store active tab's path
  const role = "client";

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    sessionStorage.removeItem("userToken");
    console.log("Logging out...");
    window.location.href = "/login";
  };

  const handleTabClick = (path) => {
    setActiveTab(path); // Set active tab when a navigation item is clicked
  };

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
        <List>
          {navItems
            .filter((item) => item.roles.includes(role))
            .map((item) => (
              <NavigationItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                path={item.path}
                onClick={() => handleTabClick(item.path)} // Handle tab click
                sx={{
                  // Conditional styling for active tab
                  backgroundColor: activeTab === item.path ? '#d6dbe08d' : 'transparent',
                  '&:hover': {
                    backgroundColor: activeTab === item.path ? '#116dca8d' : '#b46464', // Hover effect for active tab
                  },
                }}
              />
            ))}
        </List>
        <Divider />
        <List>
          {logoutItem
            .filter((item) => item.roles.includes(role))
            .map((item) => (
              <NavigationItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                path={item.path}
                onClick={item.label === "Logout" ? handleLogout : null} // Attach logout handler to logout item
                sx={{
                  backgroundColor: activeTab === item.path ? '#d6dbe08d' : 'transparent',
                  '&:hover': {
                    backgroundColor: activeTab === item.path ? '#d6dbe08d' : '#f1f1f1', // Hover effect for active tab
                  },
                }}
              />
            ))}
        </List>
      </Box>
    </Drawer>
  );
}
