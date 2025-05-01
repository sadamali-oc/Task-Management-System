import React from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";

const BasicButton = ({
  label = "Button",
  variant = "contained",
  color = "primary",
  textTransform = "none",
  onClick,
  size = "medium",
  ...props
}) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Button
        variant={variant}
        color={color}
        onClick={onClick}
        size={size}
        sx={{ textTransform }}
        {...props}
      >
        {label}
      </Button>
    </Box>
  );
};

export default BasicButton;
