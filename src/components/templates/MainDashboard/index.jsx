import React from 'react';
import { Box, CssBaseline, AppBar, Toolbar, Typography } from '@mui/material';
import Sidebar from '../../organisms/sideBar';

const DRAWER_WIDTH = 240;

export default function MainDashboard({ children, user }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Typography variant="h6" noWrap>
            Task Management System
          </Typography>

          {user && (
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="body1">Hello {user.name}!</Typography>
              <Typography variant="body2">{user.email}</Typography>
              <Typography variant="body2">Role: {user.role}</Typography> {/* Display Role */}
            </Box>
          )}
        </Toolbar>

        
      </AppBar>
      
      <Sidebar />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
