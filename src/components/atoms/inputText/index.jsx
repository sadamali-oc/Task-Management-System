import React from 'react';
import TextField from '@mui/material/TextField';

const InputText = ({ label, value, onChange, ...props }) => {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      variant="outlined"
      fullWidth
      {...props}
    />
  );
};

export default InputText;
