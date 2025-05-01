import React, { useState } from "react";
import { Box, TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const PasswordInputField = ({ label = "Password", value, onChange, sx = {} }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        label={label}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        fullWidth
        sx={sx}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword((prev) => !prev)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default PasswordInputField;
