import React from "react";
import { Typography } from "@mui/material";

const Title = ({ text }) => {
  return (
    <div>
      <Typography
        variant="h5"
        sx={{ mb: 2, fontWeight: 600, textAlign: "center", color: "#1976d2" }}
      >
        {text}
      </Typography>
    </div>
  );
};

export default Title;
