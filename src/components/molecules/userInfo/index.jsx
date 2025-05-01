import * as React from 'react';
import Box from '@mui/material/Box';
import BasicLabel from '../../atoms/basicLabel';  // Use BasicLabel for labels
import Typography from '@mui/material/Typography'; // Importing Typography for text display

function UserInfo({ user }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2 }}>
      <Box sx={{ marginBottom: 2 }}>
        <BasicLabel htmlFor="userName" label="Name:" />
        <Typography variant="body1">{user.name}</Typography>
      </Box>

      <Box sx={{ marginBottom: 2 }}>
        <BasicLabel htmlFor="userEmail" label="Email:" />
        <Typography variant="body1">{user.email}</Typography>
      </Box>
    </Box>
  );
}

export default UserInfo;
