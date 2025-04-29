import React from "react";
import Button from "@mui/material/Button";

const BasicButton = ({
  variant = "contained",
  color = "primary",
  children,
  onClick,
  ...props
}) => {
  return (
    <Button variant={variant} color={color} onClick={onClick} {...props}>
      {children}
    </Button>
  );
};

export default BasicButton;
