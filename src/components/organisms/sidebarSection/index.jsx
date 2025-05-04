import React from "react";
import { List } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavigationItem from "../../molecules/navItem";

const SidebarSection = ({ items, role, activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  const handleClick = (item) => {
    setActiveTab(item.path);

    if (item.label === "Logout") {
      localStorage.removeItem("userToken");
      sessionStorage.removeItem("userToken");
      navigate("/login"); 
    } else {
      navigate(item.path); 
    }
  };

  return (
    <List>
      {items
        .filter((item) => item.roles.includes(role))
        .map((item) => (
          <NavigationItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            path={item.path}
            onClick={() => handleClick(item)}
            sx={{
              backgroundColor:
                activeTab === item.path ? "#0876e446" : "transparent",
              "&:hover": {
                backgroundColor:
                  activeTab === item.path ? "#04437b8d" : "#f1f1f1",
                  
              },
            }}
          />
        ))}
    </List>
  );
};

export default SidebarSection;
