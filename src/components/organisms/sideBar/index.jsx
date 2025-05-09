import React, { useState, useEffect } from "react";
import { Drawer, Toolbar, Box, Divider } from "@mui/material";
import SidebarSection from "../sidebarSection";
import PeopleIcon from "@mui/icons-material/People";
import ListAltIcon from "@mui/icons-material/ListAlt";
import TaskIcon from "@mui/icons-material/Task";
import ListIcon from "@mui/icons-material/List";
import LogoutIcon from "@mui/icons-material/Logout";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../store/useAuthStore";


const drawerWidth = 240;

const navItems = [
 

  {
    label: "View Tasks",
    icon: <ListIcon />,
    path: "tasks",
    roles: ["client"],
  },
  
  {
    label: "Create Task",
    icon: <TaskIcon />,
    path: "client/create-task",
    roles: ["client"],
  },

  {
    label: "Assigned Tasks",
    icon: <ListAltIcon />,
    path: "assign",
    roles: ["developer"],
  },

  {
    label: "Assigned Developers",
    icon: <AssignmentIndIcon />,
    path: "developer",
    roles: ["admin"],
  },

  {
    label: "Create Users",
    icon: <PeopleIcon />,
    path: "signup",
    roles: ["admin"],
  },

];

const logoutItems = [
  // {
  //   label: "Profile",
  //   icon: <AssignmentIcon />,
  //   path: "/profile",
  //   roles: ["admin"],
  // },
  {
    label: "Logout",
    icon: <LogoutIcon />,
    path: "/",
    roles: ["admin", "developer", "client"],
  },
];

export default function Sidebar() {


  const [activeTab, setActiveTab] = useState("/");

  const role = useAuthStore((state) => state.user?.role); 
  const navigate = useNavigate(); 

  useEffect(() => {
    if (role === "client") {
      setActiveTab("tasks"); 
      navigate("tasks"); 

    }


    if (role === "developer") {
      setActiveTab("assign"); 
      navigate("assign"); 

    }


    if (role === "admin") {
      setActiveTab("developer"); 
      navigate("developer"); 

    }




  }, [role]);

  const filteredNavItems = navItems.filter(item => item.roles.includes(role));

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
          items={filteredNavItems}
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
