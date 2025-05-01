import React from 'react'
import { List } from "@mui/material";
import NavigationItem from  "../../molecules/navItem"


const SidbsrSection = ({ items, role, activeTab, setActiveTab }) => {
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
          onClick={() => {
            setActiveTab(item.path);
            if (item.label === "Logout") {
              localStorage.removeItem("userToken");
              sessionStorage.removeItem("userToken");
              window.location.href = "/login";
            }
          }}
          sx={{
            backgroundColor: activeTab === item.path ? "#d6dbe08d" : "transparent",
            "&:hover": {
              backgroundColor: activeTab === item.path ? "#116dca8d" : "#f1f1f1",
            },
          }}
        />
      ))}
  </List>
  )
}

export default SidbsrSection