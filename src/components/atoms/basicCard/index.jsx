import React from "react";
import { Card } from "@mui/material";

const BasicCard = ({ children, sx = {}, className }) => {
  return (
    <Card
      className={className}
      sx={{
        bgcolor: " #ffffff",
        boxShadow: "0px 1px 6px rgba(112, 105, 105, 0.866)",
        borderRadius: 3,
        alignContent: "center",
        alignItems: "center",
        padding: 2,
        margin: "10px auto",
        width: "400px", // Adjusted width
        height: "400px",
        color: "#000",
        ...sx,
      }}
    >
      {children}
    </Card>
  );
};

export default BasicCard;
