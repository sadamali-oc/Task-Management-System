import React from "react";
import { Box, CssBaseline, AppBar, Toolbar, Typography } from "@mui/material";
import Sidebar from "../../organisms/sideBar";
import { Outlet } from "react-router-dom";
import UserAvator from "../../molecules/userAvator";

export default function MainDashboardTemplate() {

  return (
    <Box sx={{ display: "flex",  padding:"10px"}}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
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
      <Sidebar />

      <Box component="main" sx={{ flexGrow: 1, p: 0 }}>


        <Toolbar />


        <Outlet />
      </Box>
    </Box>
  );
}
