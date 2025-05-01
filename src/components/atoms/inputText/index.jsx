import React from "react";
import TextField from "@mui/material/TextField";

const InputText = ({ label, value, onChange, sx = {},  inputSlotProps = {},multiline= false,...props }) => (
  <TextField
    label={label}
    value={value}
    onChange={onChange}
    minRows={4} 
    maxRows={6}
    multiline={multiline}
    slotProps={{
      input: inputSlotProps,
    }}
    variant="outlined"
    sx={{ width: "100%", ...sx }} 
    {...props}
  />
);

export default InputText;
