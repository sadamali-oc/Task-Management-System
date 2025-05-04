import React from "react";
import { Box, CssBaseline, AppBar, Toolbar, Typography } from "@mui/material";
import Sidebar from "../../organisms/sideBar";
import { Outlet } from "react-router-dom";
import UserAvator from "../../molecules/userAvator";

export default function MainDashboardTemplate() {
  return (
    <Box sx={{ display: "flex", padding: "20px" }}>
      
      <CssBaseline />

      {/* AppBar for the top navigation bar */}
      <AppBar
        position="fixed" 
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1,
       
         }} 
        
      >
        <Toolbar
          sx={{
            display: "flex", 
            justifyContent: "space-between", 
            width: "100%",
          
          }}
        >
          <Typography variant="h6" noWrap>
            Task Management System
          </Typography>

          <UserAvator />
        </Toolbar>
      </AppBar>



      {/* Sidebar for navigation */}
      <Sidebar />

      {/* Main content area where the dynamic content is rendered */}
      <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
        
        {/* Spacer Toolbar to prevent content from being hidden behind the fixed AppBar */}
        <Toolbar />

        {/* Renders the content of nested routes */}
        <Outlet />
      </Box>
    </Box>
  );
}
