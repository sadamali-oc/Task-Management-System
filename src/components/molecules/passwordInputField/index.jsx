import React, { useState } from "react";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import InputText from "../../atoms/inputText";
import { Box } from "@mui/material";

const PasswordInputField = ({label="Password", value, onChange, sx = {} }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <Box sx={{ mb: 2 }}>
        <InputText
          label={label}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
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
    </div>
  );
};

export default PasswordInputField;
