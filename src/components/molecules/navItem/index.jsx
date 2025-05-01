import React from "react";
import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

export default function NavigationItem({ icon, label, path, onClick }) {
  return (
    <ListItem disablePadding>
      <ListItemButton component={Link} to={path} onClick={onClick}>
        {icon}
        <ListItemText primary={label} />
      </ListItemButton>
    </ListItem>
  );
}
