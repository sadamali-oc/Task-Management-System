import React from "react";
import InputText from "../../atoms/inputText";
import { Box } from "@mui/material";

const EmailInputField = ({ value, onChange, sx = {} }) => (
  <Box sx={{ mb: 2 }}>
    <InputText
      label="Email"
      type="email"
      value={value}
      onChange={onChange}
      sx={sx}
    />
  </Box>
);

export default EmailInputField;
