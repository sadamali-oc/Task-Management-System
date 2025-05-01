import React from 'react';
import { Typography } from '@mui/material';

const BasicLabel = ({ label, ...props }) => {
  return (
    <Typography variant="body1" {...props}>
      {label}
    </Typography>
  );
};

export default BasicLabel;
