import React from "react";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

const IconLabelButton = ({ icon, label, onClick, sx }) => {
  return (
    <div>
      <ListItemButton onClick={onClick} sx={sx}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
    </div>
  );
};

export default IconLabelButton;
